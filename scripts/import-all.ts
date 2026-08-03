import { promises as fs } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const UPLOADS_ROOT = path.join(
  PROJECT_ROOT,
  "uploads"
);

const DATA_ROOT = path.join(
  PROJECT_ROOT,
  "app",
  "data"
);

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

type ImportTarget = {
  series: string;
  set: string;
  uploadDirectory: string;
  dataFile: string;
  imageCount: number;
  sourceKind: "standard" | "legacy-root";
};

type SkippedTarget = {
  directory: string;
  reason: string;
};

type FailedTarget = {
  target: ImportTarget;
  reason: string;
};

function normalizeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function pathExists(
  targetPath: string
): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function getImageCount(
  directory: string
): Promise<number> {
  let entries;

  try {
    entries = await fs.readdir(directory, {
      withFileTypes: true,
    });
  } catch {
    return 0;
  }

  return entries.filter((entry) => {
    if (!entry.isFile()) {
      return false;
    }

    return ALLOWED_IMAGE_EXTENSIONS.has(
      path.extname(entry.name).toLowerCase()
    );
  }).length;
}

async function getDirectories(
  directory: string
): Promise<string[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((first, second) =>
      first.localeCompare(second, "da")
    );
}

async function findDataFilesBySet(
  setSlug: string
): Promise<
  {
    series: string;
    dataFile: string;
  }[]
> {
  const matches: {
    series: string;
    dataFile: string;
  }[] = [];

  if (!(await pathExists(DATA_ROOT))) {
    return matches;
  }

  const seriesDirectories =
    await getDirectories(DATA_ROOT);

  for (const series of seriesDirectories) {
    const candidate = path.join(
      DATA_ROOT,
      series,
      `${setSlug}.ts`
    );

    if (await pathExists(candidate)) {
      matches.push({
        series,
        dataFile: candidate,
      });
    }
  }

  return matches;
}

async function discoverTargets(): Promise<{
  targets: ImportTarget[];
  skipped: SkippedTarget[];
}> {
  if (!(await pathExists(UPLOADS_ROOT))) {
    throw new Error(
      `Uploads-mappen blev ikke fundet:\n${UPLOADS_ROOT}`
    );
  }

  const targets: ImportTarget[] = [];
  const skipped: SkippedTarget[] = [];
  const topLevelDirectories =
    await getDirectories(UPLOADS_ROOT);

  for (const topLevelName of topLevelDirectories) {
    const topLevelPath = path.join(
      UPLOADS_ROOT,
      topLevelName
    );

    const directImageCount =
      await getImageCount(topLevelPath);

    const childDirectories =
      await getDirectories(topLevelPath);

    /*
     * Normal struktur:
     * uploads/<serie>/<sæt>/<billeder>
     */
    for (const childName of childDirectories) {
      const childPath = path.join(
        topLevelPath,
        childName
      );

      const imageCount =
        await getImageCount(childPath);

      if (imageCount === 0) {
        continue;
      }

      const dataFile = path.join(
        DATA_ROOT,
        topLevelName,
        `${childName}.ts`
      );

      if (!(await pathExists(dataFile))) {
        skipped.push({
          directory: childPath,
          reason:
            `Datafil mangler: app/data/${topLevelName}/${childName}.ts`,
        });
        continue;
      }

      targets.push({
        series: topLevelName,
        set: childName,
        uploadDirectory: childPath,
        dataFile,
        imageCount,
        sourceKind: "standard",
      });
    }

    /*
     * Ældre/flad struktur:
     * uploads/<sæt>/<billeder>
     *
     * Serien findes automatisk ved at lede efter:
     * app/data/<serie>/<sæt>.ts
     */
    if (directImageCount > 0) {
      const normalizedSet =
        normalizeSlug(topLevelName);

      const matchingDataFiles =
        await findDataFilesBySet(normalizedSet);

      if (matchingDataFiles.length === 1) {
        targets.push({
          series: matchingDataFiles[0].series,
          set: normalizedSet,
          uploadDirectory: topLevelPath,
          dataFile: matchingDataFiles[0].dataFile,
          imageCount: directImageCount,
          sourceKind: "legacy-root",
        });
      } else if (matchingDataFiles.length === 0) {
        skipped.push({
          directory: topLevelPath,
          reason:
            `Ingen entydig datafil fundet til sættet "${normalizedSet}".`,
        });
      } else {
        skipped.push({
          directory: topLevelPath,
          reason:
            `Sættet "${normalizedSet}" findes i flere serier: ${matchingDataFiles
              .map((match) => match.series)
              .join(", ")}`,
        });
      }
    }
  }

  const uniqueTargets = new Map<
    string,
    ImportTarget
  >();

  for (const target of targets) {
    const key = `${target.series}/${target.set}`;

    /*
     * Foretræk den normale mappe frem for en gammel
     * topniveau-mappe, hvis begge findes.
     */
    const existing = uniqueTargets.get(key);

    if (
      !existing ||
      (
        existing.sourceKind === "legacy-root" &&
        target.sourceKind === "standard"
      )
    ) {
      uniqueTargets.set(key, target);
    }
  }

  return {
    targets: Array.from(
      uniqueTargets.values()
    ).sort((first, second) =>
      `${first.series}/${first.set}`.localeCompare(
        `${second.series}/${second.set}`,
        "da"
      )
    ),
    skipped,
  };
}

function runImport(
  target: ImportTarget
): Promise<void> {
  return new Promise((resolve, reject) => {
    const npmCommand =
      process.platform === "win32"
        ? "npm.cmd"
        : "npm";

    const child = spawn(
      npmCommand,
      [
        "run",
        "import:images",
        "--",
        target.series,
        target.set,
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: "inherit",
        env: process.env,
      }
    );

    child.on("error", (error) => {
      reject(error);
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Importen sluttede med exit-kode ${code ?? "ukendt"}.`
        )
      );
    });
  });
}

function printDivider(): void {
  console.log(
    "\n" + "=".repeat(64) + "\n"
  );
}

async function main(): Promise<void> {
  const dryRun =
    process.argv.includes("--dry-run");

  const { targets, skipped } =
    await discoverTargets();

  console.log("\nPokéDad – importér alle billeder");
  printDivider();

  if (targets.length === 0) {
    console.log(
      "Der blev ikke fundet nogen mapper, som både har billeder og en datafil."
    );
  } else {
    console.log(
      `Klar til import: ${targets.length} sæt\n`
    );

    for (const target of targets) {
      const sourceLabel =
        target.sourceKind === "legacy-root"
          ? "gammel topniveau-mappe"
          : "normal struktur";

      console.log(
        `- ${target.series}/${target.set} ` +
          `(${target.imageCount} billeder, ${sourceLabel})`
      );
    }
  }

  if (skipped.length > 0) {
    console.log(
      `\nSpringes over: ${skipped.length} mapper\n`
    );

    for (const item of skipped) {
      console.log(`- ${item.directory}`);
      console.log(`  ${item.reason}`);
    }
  }

  if (dryRun) {
    printDivider();
    console.log(
      "Tørkørsel færdig. Ingen filer blev ændret."
    );
    return;
  }

  const succeeded: ImportTarget[] = [];
  const failed: FailedTarget[] = [];

  for (
    let index = 0;
    index < targets.length;
    index += 1
  ) {
    const target = targets[index];

    printDivider();

    console.log(
      `[${index + 1}/${targets.length}] ` +
        `${target.series}/${target.set}`
    );

    try {
      await runImport(target);
      succeeded.push(target);
    } catch (error) {
      failed.push({
        target,
        reason:
          error instanceof Error
            ? error.message
            : String(error),
      });

      console.error(
        `\nImporten fejlede for ${target.series}/${target.set}.`
      );
      console.error(
        "De resterende sæt fortsætter."
      );
    }
  }

  printDivider();

  console.log("Samlet rapport\n");
  console.log(
    `✅ Importeret: ${succeeded.length}`
  );
  console.log(
    `⏭️ Sprunget over: ${skipped.length}`
  );
  console.log(
    `❌ Fejlet: ${failed.length}`
  );

  if (failed.length > 0) {
    console.log("\nFejlede sæt:");

    for (const item of failed) {
      console.log(
        `- ${item.target.series}/${item.target.set}`
      );
      console.log(`  ${item.reason}`);
    }

    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error("\nImporten kunne ikke startes.\n");
  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  process.exitCode = 1;
});
