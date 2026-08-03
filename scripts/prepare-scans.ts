import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

type Finish = "normal" | "holo" | "reverse-holo";

type CardReference = {
  number: string;
  slug: string;
};

type Options = {
  series: string;
  set: string;
  finish: Finish;
  apply: boolean;
  all: boolean;
  start?: string;
  cards?: string[];
};

function printHelp(): void {
  console.log(`
PokéDad – klargør scanninger

Scannerfiler lægges parvis i:
  scans/<serie>/<sæt>/

Rækkefølge:
  1. kort 1 forside
  2. kort 1 bagside
  3. kort 2 forside
  4. kort 2 bagside

Eksempler:
  npm run prepare:scans -- scarlet-violet paldea-evolved --start 84
  npm run prepare:scans -- scarlet-violet paldea-evolved --cards 84,87,91
  npm run prepare:scans -- scarlet-violet paldea-evolved --all
  npm run prepare:scans -- scarlet-violet paldea-evolved --start 84 --finish holo

Kommandoen laver kun en forhåndsvisning.
Tilføj --apply for at kopiere og omdøbe filerne.
`);
}

function getFlagValue(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function parseOptions(): Options {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  const positional = args.filter((value, index) => {
    if (value.startsWith("--")) {
      return false;
    }

    const previous = args[index - 1];
    return !["--start", "--cards", "--finish"].includes(previous);
  });

  const [series, set] = positional;

  if (!series || !set) {
    printHelp();
    throw new Error("Serie og sæt skal angives.");
  }

  const finishValue = getFlagValue(args, "--finish") ?? "normal";

  if (!["normal", "holo", "reverse-holo"].includes(finishValue)) {
    throw new Error(
      "--finish skal være normal, holo eller reverse-holo."
    );
  }

  const start = getFlagValue(args, "--start");
  const cardsValue = getFlagValue(args, "--cards");
  const all = args.includes("--all");

  const selectionCount = [
    Boolean(start),
    Boolean(cardsValue),
    all,
  ].filter(Boolean).length;

  if (selectionCount !== 1) {
    throw new Error(
      "Vælg præcis én af --start, --cards eller --all."
    );
  }

  return {
    series,
    set,
    finish: finishValue as Finish,
    apply: args.includes("--apply"),
    all,
    start,
    cards: cardsValue
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

function normalizeNumber(value: string): string {
  const trimmed = value.trim();

  if (/^\d+$/.test(trimmed)) {
    return trimmed.padStart(3, "0");
  }

  return trimmed.toUpperCase().replace(/\s+/g, "");
}

function naturalSort(first: string, second: string): number {
  return first.localeCompare(second, "da", {
    numeric: true,
    sensitivity: "base",
  });
}

async function readScannerFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const files = entries
    .filter((entry) => {
      if (!entry.isFile() || entry.name === ".DS_Store") {
        return false;
      }

      return IMAGE_EXTENSIONS.has(
        path.extname(entry.name).toLowerCase()
      );
    })
    .map((entry) => entry.name)
    .sort(naturalSort);

  if (files.length === 0) {
    throw new Error(`Ingen scanninger fundet i: ${directory}`);
  }

  if (files.length % 2 !== 0) {
    throw new Error(
      `Der er ${files.length} filer. Antallet skal være lige, fordi hvert kort skal have forside og bagside.`
    );
  }

  return files;
}

async function readCardReferences(
  series: string,
  set: string
): Promise<CardReference[]> {
  const dataFile = path.join(
    PROJECT_ROOT,
    "app",
    "data",
    series,
    `${set}.ts`
  );

  const source = await fs.readFile(dataFile, "utf8");
  const blocks = source.match(/  \{[\s\S]*?\n  \},/g) ?? [];

  const references: CardReference[] = [];

  for (const block of blocks) {
    const number = block.match(
      /cardNumber:\s*"([^"/]+)\/[^"]+"/
    )?.[1];

    const slug = block.match(
      /slug:\s*"([^"]+)"/
    )?.[1];

    if (number && slug) {
      references.push({
        number: normalizeNumber(number),
        slug,
      });
    }
  }

  if (references.length === 0) {
    throw new Error(
      `Ingen kort kunne læses fra: ${dataFile}`
    );
  }

  return references;
}

function selectCards(
  references: CardReference[],
  pairCount: number,
  options: Options
): CardReference[] {
  if (options.all) {
    if (pairCount !== references.length) {
      throw new Error(
        `--all kræver ${references.length} kortpar, men der blev fundet ${pairCount}.`
      );
    }

    return references;
  }

  if (options.cards) {
    if (options.cards.length !== pairCount) {
      throw new Error(
        `--cards indeholder ${options.cards.length} kortnumre, men der er ${pairCount} scannede kortpar.`
      );
    }

    return options.cards.map((requestedNumber) => {
      const normalized = normalizeNumber(requestedNumber);
      const match = references.find(
        (card) => card.number === normalized
      );

      if (!match) {
        throw new Error(
          `Kortnummer ${requestedNumber} findes ikke i sættet.`
        );
      }

      return match;
    });
  }

  const startNumber = normalizeNumber(options.start ?? "");
  const startIndex = references.findIndex(
    (card) => card.number === startNumber
  );

  if (startIndex === -1) {
    throw new Error(
      `Startkort ${options.start} findes ikke i sættet.`
    );
  }

  const selected = references.slice(
    startIndex,
    startIndex + pairCount
  );

  if (selected.length !== pairCount) {
    throw new Error(
      "Der er ikke nok kort efter startkortet til alle scanningerne."
    );
  }

  return selected;
}

function finishSuffix(finish: Finish): string {
  if (finish === "holo") {
    return "-holo";
  }

  if (finish === "reverse-holo") {
    return "-reverse-holo";
  }

  return "";
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const options = parseOptions();

  const sourceDirectory = path.join(
    PROJECT_ROOT,
    "scans",
    options.series,
    options.set
  );

  const destinationDirectory = path.join(
    PROJECT_ROOT,
    "uploads",
    options.series,
    options.set
  );

  const scannerFiles = await readScannerFiles(sourceDirectory);
  const pairCount = scannerFiles.length / 2;
  const references = await readCardReferences(
    options.series,
    options.set
  );
  const selectedCards = selectCards(
    references,
    pairCount,
    options
  );

  const operations = selectedCards.flatMap((card, index) => {
    const frontSource = scannerFiles[index * 2];
    const backSource = scannerFiles[index * 2 + 1];
    const suffix = finishSuffix(options.finish);
    const frontExtension = path
      .extname(frontSource)
      .toLowerCase();
    const backExtension = path
      .extname(backSource)
      .toLowerCase();

    const numberSuffix = `-${card.number.toLowerCase()}`;
    const cleanSlug = card.slug.toLowerCase().endsWith(numberSuffix)
      ? card.slug.slice(0, -numberSuffix.length)
      : card.slug;
    const baseName = `${card.number}-${cleanSlug}${suffix}`;

    return [
      {
        source: frontSource,
        destination: `${baseName}${frontExtension}`,
        side: "forside",
      },
      {
        source: backSource,
        destination: `${baseName}-back${backExtension}`,
        side: "bagside",
      },
    ];
  });

  console.log("");
  console.log("PokéDad – scanninger klar til omdøbning");
  console.log("=".repeat(56));
  console.log("");
  console.log(`Kilde: ${sourceDirectory}`);
  console.log(`Mål:   ${destinationDirectory}`);
  console.log(`Kort:  ${pairCount}`);
  console.log(`Finish: ${options.finish}`);
  console.log("");

  for (const operation of operations) {
    console.log(
      `${operation.source} -> ${operation.destination} (${operation.side})`
    );
  }

  if (!options.apply) {
    console.log("");
    console.log(
      "Forhåndsvisning færdig. Ingen filer blev ændret."
    );
    console.log(
      "Kør samme kommando med --apply, når listen ser rigtig ud."
    );
    return;
  }

  await fs.mkdir(destinationDirectory, {
    recursive: true,
  });

  const existingDestinations: string[] = [];

  for (const operation of operations) {
    const destinationPath = path.join(
      destinationDirectory,
      operation.destination
    );

    if (await fileExists(destinationPath)) {
      existingDestinations.push(operation.destination);
    }
  }

  if (existingDestinations.length > 0) {
    throw new Error(
      [
        "Importen er stoppet, fordi disse filer allerede findes:",
        ...existingDestinations.map((file) => `- ${file}`),
        "",
        "Eksisterende billeder bliver aldrig overskrevet automatisk.",
      ].join("\n")
    );
  }

  for (const operation of operations) {
    await fs.copyFile(
      path.join(sourceDirectory, operation.source),
      path.join(destinationDirectory, operation.destination)
    );
  }

  console.log("");
  console.log(
    `✅ ${operations.length} filer blev kopieret og omdøbt.`
  );
  console.log("");
  console.log("Næste trin:");
  console.log(
    `npm run import:images -- ${options.series} ${options.set}`
  );
}

main().catch((error: unknown) => {
  console.error("");
  console.error("❌ Scanningerne kunne ikke klargøres.");
  console.error("");
  console.error(
    error instanceof Error ? error.message : String(error)
  );
  console.error("");
  process.exitCode = 1;
});
