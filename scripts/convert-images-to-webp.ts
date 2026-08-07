import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();
const PUBLIC_ROOT = path.join(PROJECT_ROOT, "public");
const SOURCE_ROOT = path.join(PROJECT_ROOT, "app");
const WEBP_QUALITY = 90;

const argumentsFromTerminal = new Set(process.argv.slice(2));
const dryRun = argumentsFromTerminal.has("--dry-run");
const deleteOriginals = argumentsFromTerminal.has("--delete-originals");

const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".json",
  ".md",
]);

type ImageConversion = {
  pngPath: string;
  webpPath: string;
  pngUrl: string;
  webpUrl: string;
};

async function collectFiles(
  directory: string,
  accepts: (filePath: string) => boolean
): Promise<string[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath, accepts)));
      continue;
    }

    if (entry.isFile() && accepts(entryPath)) {
      files.push(entryPath);
    }
  }

  return files;
}

function createConversion(pngPath: string): ImageConversion {
  const parsedPath = path.parse(pngPath);
  const webpPath = path.join(
    parsedPath.dir,
    `${parsedPath.name}.webp`
  );

  const pngUrl =
    `/${path.relative(PUBLIC_ROOT, pngPath)}`
      .split(path.sep)
      .join("/");

  const webpUrl =
    `/${path.relative(PUBLIC_ROOT, webpPath)}`
      .split(path.sep)
      .join("/");

  return {
    pngPath,
    webpPath,
    pngUrl,
    webpUrl,
  };
}

async function convertImage(
  conversion: ImageConversion
): Promise<"converted" | "current"> {
  try {
    const [pngStats, webpStats] = await Promise.all([
      fs.stat(conversion.pngPath),
      fs.stat(conversion.webpPath),
    ]);

    if (webpStats.mtimeMs >= pngStats.mtimeMs) {
      return "current";
    }
  } catch {
    // En manglende WebP-fil skal oprettes.
  }

  if (dryRun) {
    return "converted";
  }

  const temporaryPath = `${conversion.webpPath}.tmp`;

  await sharp(conversion.pngPath)
    .rotate()
    .webp({
      quality: WEBP_QUALITY,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(temporaryPath);

  await fs.rename(temporaryPath, conversion.webpPath);

  return "converted";
}

async function updateImageReferences(
  conversions: ImageConversion[]
): Promise<number> {
  const sourceFiles = await collectFiles(
    SOURCE_ROOT,
    (filePath) =>
      SOURCE_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  let updatedFiles = 0;

  for (const sourceFile of sourceFiles) {
    const originalSource = await fs.readFile(sourceFile, "utf8");
    let updatedSource = originalSource;

    for (const conversion of conversions) {
      updatedSource = updatedSource
        .split(conversion.pngUrl)
        .join(conversion.webpUrl);
    }

    if (updatedSource === originalSource) {
      continue;
    }

    updatedFiles += 1;

    if (!dryRun) {
      await fs.writeFile(sourceFile, updatedSource, "utf8");
    }
  }

  return updatedFiles;
}

async function removeOriginals(
  conversions: ImageConversion[]
): Promise<number> {
  if (!deleteOriginals || dryRun) {
    return 0;
  }

  let removedFiles = 0;

  for (const conversion of conversions) {
    try {
      await fs.access(conversion.webpPath);
      await fs.unlink(conversion.pngPath);
      removedFiles += 1;
    } catch {
      throw new Error(
        `PNG-filen blev ikke slettet, fordi WebP mangler: ${conversion.pngUrl}`
      );
    }
  }

  return removedFiles;
}

async function main(): Promise<void> {
  try {
    const publicStats = await fs.stat(PUBLIC_ROOT);

    if (!publicStats.isDirectory()) {
      throw new Error("Mappen public blev ikke fundet.");
    }
  } catch {
    throw new Error(
      "Mappen public blev ikke fundet. Kør kommandoen fra PokéDad-mappen."
    );
  }

  const pngFiles = await collectFiles(
    PUBLIC_ROOT,
    (filePath) => path.extname(filePath).toLowerCase() === ".png"
  );

  const conversions = pngFiles.map(createConversion);
  let convertedImages = 0;
  let currentImages = 0;

  console.log(
    dryRun
      ? "Kontrollerer PNG-filer uden at ændre noget…"
      : `Konverterer PNG til WebP i kvalitet ${WEBP_QUALITY}…`
  );

  for (const conversion of conversions) {
    const result = await convertImage(conversion);

    if (result === "converted") {
      convertedImages += 1;
    } else {
      currentImages += 1;
    }
  }

  const updatedSourceFiles = await updateImageReferences(conversions);
  const removedOriginals = await removeOriginals(conversions);

  console.log("");
  console.log(`PNG-filer fundet: ${conversions.length}`);
  console.log(
    `${dryRun ? "WebP-filer der skal oprettes" : "WebP-filer oprettet"}: ${convertedImages}`
  );
  console.log(`WebP-filer allerede ajour: ${currentImages}`);
  console.log(
    `${dryRun ? "Kodefiler der skal opdateres" : "Kodefiler opdateret"}: ${updatedSourceFiles}`
  );

  if (deleteOriginals) {
    console.log(`Gamle PNG-filer slettet: ${removedOriginals}`);
  } else if (!dryRun) {
    console.log("");
    console.log("PNG-filerne er bevaret som sikkerhed.");
    console.log(
      "Kontrollér hjemmesiden, og kør derefter npm run convert:webp:cleanup."
    );
  }

  console.log("");
  console.log(dryRun ? "✅ Kontrollen er færdig." : "✅ Konverteringen er færdig.");
}

main().catch((error) => {
  console.error("");
  console.error(
    error instanceof Error ? error.message : "Ukendt fejl under konverteringen."
  );
  process.exitCode = 1;
});
