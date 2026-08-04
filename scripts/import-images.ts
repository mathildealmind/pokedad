import { promises as fs } from "node:fs";
import path from "node:path";

// ============================================================
// PokéDad – sikker billedimport + automatisk kortopdatering
// ============================================================
//
// Denne version:
//
// ✅ importerer billeder fra det valgte sæt
// ✅ beholder filnavne præcis som de er
// ✅ sletter IKKE eksisterende billeder i public
// ✅ opdaterer stock, finish, imageFront og imageBack
// ✅ opretter variants, når samme kort findes i flere finishes
// ✅ ændrer kun kort, hvor der findes både forside og bagside
// ✅ laver backup af den valgte datafil før ændringer
// ✅ stopper før ændringer, hvis filerne ikke kan valideres
//
// Enkle filnavne kan bruges direkte:
//
// 001-front.png
// 001-back.png
//
// 002-reverse-front.png
// 002-reverse-back.png
//
// 003-holo-front.png
// 003-holo-back.png
//
// De tidligere fulde filnavne understøttes stadig.
// ============================================================

const PROJECT_ROOT = process.cwd();

type SetConfig = {
  slug: string;
  series: string;
  dataFileName: string;
};

async function directoryExists(directoryPath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(directoryPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function resolveSetConfig(): Promise<SetConfig> {
  const argumentsFromTerminal = process.argv.slice(2);

  if (argumentsFromTerminal.length === 0) {
    throw new Error(
      [
        "Du skal angive serie og sæt.",
        "",
        "Eksempel:",
        "npm run import:images -- scarlet-violet paldea-evolved",
        "npm run import:images -- scarlet-violet base",
        "npm run import:images -- sword-shield brilliant-stars",
      ].join("\n")
    );
  }

  if (argumentsFromTerminal.length >= 2) {
    const [series, slug] = argumentsFromTerminal;

    return {
      series,
      slug,
      dataFileName: `${slug}.ts`,
    };
  }

  const [requestedSet] = argumentsFromTerminal;
  const uploadsRoot = path.join(PROJECT_ROOT, "uploads");
  const entries = await fs.readdir(uploadsRoot, {
    withFileTypes: true,
  });

  const matchingSeries: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const candidateDirectory = path.join(
      uploadsRoot,
      entry.name,
      requestedSet
    );

    if (await directoryExists(candidateDirectory)) {
      matchingSeries.push(entry.name);
    }
  }

  if (matchingSeries.length === 0) {
    throw new Error(
      [
        `Sættet blev ikke fundet i uploads: ${requestedSet}`,
        "",
        "Brug eksempelvis:",
        `npm run import:images -- scarlet-violet ${requestedSet}`,
      ].join("\n")
    );
  }

  if (matchingSeries.length > 1) {
    throw new Error(
      [
        `Sættet findes under flere serier: ${requestedSet}`,
        ...matchingSeries.map(
          (series) =>
            `npm run import:images -- ${series} ${requestedSet}`
        ),
      ].join("\n")
    );
  }

  return {
    series: matchingSeries[0],
    slug: requestedSet,
    dataFileName: `${requestedSet}.ts`,
  };
}

let SET_CONFIG: SetConfig;
let UPLOAD_DIRECTORY = "";
let DESTINATION_DIRECTORY = "";
let DATA_FILE = "";
let IMAGE_BASE = "";

function initializeSetPaths(
  setConfig: SetConfig
): void {
  SET_CONFIG = setConfig;

  UPLOAD_DIRECTORY = path.join(
    PROJECT_ROOT,
    "uploads",
    SET_CONFIG.series,
    SET_CONFIG.slug
  );

  DESTINATION_DIRECTORY = path.join(
    PROJECT_ROOT,
    "public",
    "series",
    SET_CONFIG.series,
    SET_CONFIG.slug
  );

  DATA_FILE = path.join(
    PROJECT_ROOT,
    "app",
    "data",
    SET_CONFIG.series,
    SET_CONFIG.dataFileName
  );

  IMAGE_BASE =
    `/series/${SET_CONFIG.series}/${SET_CONFIG.slug}`;
}

const ALLOWED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

type FinishName =
  | "Normal"
  | "ReverseHolo"
  | "Holo";

type ImageSide = "front" | "back";

type ImageFile = {
  sourcePath: string;
  relativePath: string;
  cardNumber: string;
  imageSlug: string;
  finish: FinishName;
  side: ImageSide;
};

type ImagePair = {
  front?: ImageFile;
  back?: ImageFile;
};

type CardImages = Partial<
  Record<FinishName, ImagePair>
>;

type ImportResult = {
  copied: string[];
  failed: {
    file: string;
    reason: string;
  }[];
  updatedCards: string[];
};

// ============================================================
// Hjælpefunktioner
// ============================================================

async function pathExists(
  filePath: string
): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

function formatTimestamp(date: Date): string {
  const pad = (value: number) =>
    String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function finishSuffix(
  finish: FinishName
): string {
  switch (finish) {
    case "ReverseHolo":
      return "-reverse-holo";

    case "Holo":
      return "-holo";

    case "Normal":
    default:
      return "";
  }
}

function finishEnum(
  finish: FinishName
): string {
  return `CardFinish.${finish}`;
}

function getImageExpression(
  relativePath: string
): string {
  return JSON.stringify(
    `${IMAGE_BASE}/${toPosixPath(
      relativePath
    )}`
  );
}

// ============================================================
// Læs og forstå et filnavn
// ============================================================

function parseImageFileName(
  sourcePath: string,
  relativePath: string
): ImageFile {
  const extension = path
    .extname(relativePath)
    .toLowerCase();

  const baseName = path.basename(
    relativePath,
    extension
  );

  /*
   * Kortnavnet findes allerede i datafilen. Derfor er det nok
   * at skrive kortnummer, eventuel finish og side:
   *
   * 001.png / 001-back.png
   * 002-reverse-holo.png / 002-reverse-holo-back.png
   * 003-holo.png / 003-holo-back.png
   *
   * "-front" understøttes også, men er ikke nødvendigt.
   */
  const shorthandMatch = baseName.match(
    /^(\d{1,3})(?:-(reverse-holo|reverse|holo))?(?:-(front|back))?$/i
  );

  if (shorthandMatch) {
    const finishToken =
      shorthandMatch[2]?.toLowerCase();

    const finish: FinishName =
      finishToken === "reverse" ||
      finishToken === "reverse-holo"
        ? "ReverseHolo"
        : finishToken === "holo"
          ? "Holo"
          : "Normal";

    return {
      sourcePath,
      relativePath,
      cardNumber: shorthandMatch[1].padStart(3, "0"),
      imageSlug: "",
      finish,
      side: (
        shorthandMatch[3]?.toLowerCase() ?? "front"
      ) as ImageSide,
    };
  }

  let workingName = baseName;

  let side: ImageSide = "front";

  if (
    workingName
      .toLowerCase()
      .endsWith("-back")
  ) {
    side = "back";

    workingName = workingName.slice(
      0,
      -"-back".length
    );
  }

  let finish: FinishName = "Normal";

  if (
    workingName
      .toLowerCase()
      .endsWith("-reverse-holo")
  ) {
    finish = "ReverseHolo";

    workingName = workingName.slice(
      0,
      -"-reverse-holo".length
    );
  } else if (
    workingName
      .toLowerCase()
      .endsWith("-holo")
  ) {
    finish = "Holo";

    workingName = workingName.slice(
      0,
      -"-holo".length
    );
  }

  const match = workingName.match(
    /^(\d{3})-(.+)$/
  );

  if (!match) {
    throw new Error(
      [
        `Ugyldigt filnavn: ${relativePath}`,
        "",
        "Forventede eksempler:",
        "001-front.png",
        "001-back.png",
        "002-reverse-front.png",
        "002-reverse-back.png",
      ].join("\n")
    );
  }

  return {
    sourcePath,
    relativePath,
    cardNumber: match[1],
    imageSlug: match[2],
    finish,
    side,
  };
}

// ============================================================
// Find billeder
// ============================================================

async function findImageFiles(
  directory: string,
  rootDirectory: string = directory
): Promise<ImageFile[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const imageFiles: ImageFile[] = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store") {
      continue;
    }

    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      const nestedImages =
        await findImageFiles(
          fullPath,
          rootDirectory
        );

      imageFiles.push(...nestedImages);

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      continue;
    }

    const relativePath = path.relative(
      rootDirectory,
      fullPath
    );

    imageFiles.push(
      parseImageFileName(
        fullPath,
        relativePath
      )
    );
  }

  return imageFiles;
}

// ============================================================
// Valider billeder
// ============================================================

function validateAndGroupImages(
  imageFiles: ImageFile[]
): Map<string, CardImages> {
  const exactPaths = new Map<
    string,
    string
  >();

  const grouped = new Map<
    string,
    CardImages
  >();

  const errors: string[] = [];

  for (const image of imageFiles) {
    const comparisonPath =
      image.relativePath.toLowerCase();

    const existingPath =
      exactPaths.get(comparisonPath);

    if (existingPath) {
      errors.push(
        `Dublet: ${existingPath} / ${image.relativePath}`
      );

      continue;
    }

    exactPaths.set(
      comparisonPath,
      image.relativePath
    );

    const cardImages =
      grouped.get(image.cardNumber) ?? {};

    const pair =
      cardImages[image.finish] ?? {};

    if (pair[image.side]) {
      errors.push(
        [
          `Flere ${image.side === "front" ? "forsider" : "bagsider"}`,
          `til kort ${image.cardNumber}`,
          `med finish ${image.finish}.`,
        ].join(" ")
      );

      continue;
    }

    pair[image.side] = image;

    cardImages[image.finish] = pair;

    grouped.set(
      image.cardNumber,
      cardImages
    );
  }

  for (
    const [cardNumber, cardImages] of
    grouped
  ) {
    for (
      const finish of [
        "Normal",
        "ReverseHolo",
        "Holo",
      ] as FinishName[]
    ) {
      const pair = cardImages[finish];

      if (!pair) {
        continue;
      }

      if (!pair.front || !pair.back) {
        const missing = !pair.front
          ? "forsiden"
          : "bagsiden";

        errors.push(
          [
            `Kort ${cardNumber}`,
            `(${finish}) mangler ${missing}.`,
          ].join(" ")
        );
      }

      if (
        pair.front &&
        pair.back &&
        pair.front.imageSlug.toLowerCase() !==
          pair.back.imageSlug.toLowerCase()
      ) {
        errors.push(
          [
            `Forside og bagside matcher ikke for kort ${cardNumber}`,
            `(${finish}):`,
            pair.front.relativePath,
            "/",
            pair.back.relativePath,
          ].join(" ")
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      [
        "IMPORTEN ER STOPPET.",
        "",
        "Ret disse problemer først:",
        "",
        ...errors.map(
          (error) => `- ${error}`
        ),
      ].join("\n")
    );
  }

  return grouped;
}

// ============================================================
// Kopiér billeder uden at slette eksisterende filer
// ============================================================

async function copyImage(
  image: ImageFile
): Promise<void> {
  const destinationPath = path.join(
    DESTINATION_DIRECTORY,
    image.relativePath
  );

  await fs.mkdir(
    path.dirname(destinationPath),
    {
      recursive: true,
    }
  );

  await fs.copyFile(
    image.sourcePath,
    destinationPath
  );
}

// ============================================================
// Find topniveau-kortblokke i datafilen
// ============================================================

type CardBlock = {
  startIndex: number;
  endIndex: number;
  lines: string[];
  cardNumber: string;
  slug: string;
};

function findCardBlocks(
  source: string
): CardBlock[] {
  const lines = source.split("\n");

  const blocks: CardBlock[] = [];

  let startIndex: number | null = null;

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    if (
      startIndex === null &&
      line === "  {"
    ) {
      startIndex = index;
      continue;
    }

    if (
      startIndex !== null &&
      line === "  },"
    ) {
      const blockLines = lines.slice(
        startIndex,
        index + 1
      );

      const blockText =
        blockLines.join("\n");

      const numberMatch =
        blockText.match(
          /cardNumber:\s*"(\d{3})\/\d+"/
        );

      const slugMatch =
        blockText.match(
          /slug:\s*"([^"]+)"/
        );

      if (numberMatch && slugMatch) {
        blocks.push({
          startIndex,
          endIndex: index,
          lines: blockLines,
          cardNumber: numberMatch[1],
          slug: slugMatch[1],
        });
      }

      startIndex = null;
    }
  }

  return blocks;
}

// ============================================================
// Fjern en eksisterende variants-blok
// ============================================================

function removeVariants(
  lines: string[]
): string[] {
  const start = lines.findIndex(
    (line) =>
      line.trimStart().startsWith(
        "variants: ["
      ) &&
      line.startsWith("    ")
  );

  if (start === -1) {
    return [...lines];
  }

  let squareDepth = 0;
  let end = -1;

  for (
    let index = start;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    squareDepth +=
      (line.match(/\[/g) ?? []).length;

    squareDepth -=
      (line.match(/\]/g) ?? []).length;

    if (
      squareDepth === 0 &&
      index > start
    ) {
      end = index;
      break;
    }
  }

  if (end === -1) {
    throw new Error(
      "Kunne ikke læse en eksisterende variants-blok."
    );
  }

  return [
    ...lines.slice(0, start),
    ...lines.slice(end + 1),
  ];
}

// ============================================================
// Opdatér simple felter i en kortblok
// ============================================================

function replacePropertyLine(
  lines: string[],
  property: string,
  replacement: string
): string[] {
  const propertyPattern =
    new RegExp(
      `^    ${property}:`
    );

  const index = lines.findIndex(
    (line) =>
      propertyPattern.test(line)
  );

  const updated = [...lines];

  if (index === -1) {
    const dateAddedIndex = updated.findIndex(
      (line) =>
        /^    dateAdded:/.test(line)
    );

    const insertIndex =
      dateAddedIndex === -1
        ? Math.max(updated.length - 1, 1)
        : dateAddedIndex;

    updated.splice(
      insertIndex,
      0,
      `    ${property}: ${replacement},`
    );

    return updated;
  }

  updated[index] =
    `    ${property}: ${replacement},`;

  return updated;
}

// ============================================================
// Byg variants
// ============================================================

function buildVariantsLines(
  completeFinishes: {
    finish: FinishName;
    pair: Required<ImagePair>;
  }[]
): string[] {
  if (completeFinishes.length <= 1) {
    return [];
  }

  const lines: string[] = [
    "    variants: [",
  ];

  for (
    const item of completeFinishes
  ) {
    lines.push(
      "      {",
      `        finish: ${finishEnum(
        item.finish
      )},`,
      "        price: 0,",
      "        stock: 1,",
      `        imageFront: ${getImageExpression(
        item.pair.front.relativePath
      )},`,
      `        imageBack: ${getImageExpression(
        item.pair.back.relativePath
      )},`,
      "      },"
    );
  }

  lines.push("    ],");

  return lines;
}

// ============================================================
// Vælg hvilket billede der vises som kortets hovedvariant
// ============================================================

function choosePrimaryFinish(
  blockLines: string[],
  availableFinishes: FinishName[]
): FinishName {
  const currentFinishMatch =
    blockLines
      .join("\n")
      .match(
        /finish:\s*CardFinish\.(Normal|ReverseHolo|Holo)/
      );

  const currentFinish =
    currentFinishMatch?.[1] as
      | FinishName
      | undefined;

  if (
    currentFinish &&
    availableFinishes.includes(
      currentFinish
    )
  ) {
    return currentFinish;
  }

  const priority: FinishName[] = [
    "Normal",
    "ReverseHolo",
    "Holo",
  ];

  const selected = priority.find(
    (finish) =>
      availableFinishes.includes(finish)
  );

  if (!selected) {
    throw new Error(
      "Der blev ikke fundet en gyldig finish."
    );
  }

  return selected;
}

// ============================================================
// Læs kortets nuværende finish
// ============================================================

function getCurrentFinish(
  blockLines: string[]
): FinishName | undefined {
  const match = blockLines
    .join("\n")
    .match(
      /finish:\s*CardFinish\.(Normal|ReverseHolo|Holo)/
    );

  return match?.[1] as
    | FinishName
    | undefined;
}

// ============================================================
// Opdatér den valgte datafil
// ============================================================

function updateCardData(
  source: string,
  groupedImages: Map<
    string,
    CardImages
  >
): {
  source: string;
  updatedCards: string[];
  warnings: string[];
} {
  const blocks = findCardBlocks(source);

  const lines = source.split("\n");

  const replacements = new Map<
    number,
    {
      endIndex: number;
      lines: string[];
    }
  >();

  const foundNumbers = new Set<string>();

  const updatedCards: string[] = [];

  const warnings: string[] = [];

  for (const block of blocks) {
    const cardImages =
      groupedImages.get(
        block.cardNumber
      );

    if (!cardImages) {
      continue;
    }

    foundNumbers.add(block.cardNumber);

    /*
     * Nogle Holo-kort, især Pokémon ex, er scannet uden
     * "-holo" i filnavnet. I så fald bliver billedet først
     * læst som Normal. Hvis kortdata allerede siger Holo,
     * bevarer vi Holo-finishen automatisk.
     */
    const currentFinish =
      getCurrentFinish(block.lines);

    if (
      currentFinish === "Holo" &&
      cardImages.Normal?.front &&
      cardImages.Normal?.back &&
      !cardImages.Holo
    ) {
      cardImages.Holo = cardImages.Normal;
      delete cardImages.Normal;
    }

    const completeFinishes: {
      finish: FinishName;
      pair: Required<ImagePair>;
    }[] = [];

    for (
      const finish of [
        "Normal",
        "ReverseHolo",
        "Holo",
      ] as FinishName[]
    ) {
      const pair = cardImages[finish];

      if (
        pair?.front &&
        pair?.back
      ) {
        completeFinishes.push({
          finish,
          pair: {
            front: pair.front,
            back: pair.back,
          },
        });
      }
    }

    if (
      completeFinishes.length === 0
    ) {
      continue;
    }

    const expectedSlug =
      block.slug.replace(
        /-\d{3}$/,
        ""
      );

    for (
      const item of completeFinishes
    ) {
      const actualSlug =
        item.pair.front.imageSlug;

      if (
        actualSlug &&
        actualSlug.toLowerCase() !==
          expectedSlug.toLowerCase()
      ) {
        warnings.push(
          [
            `Kort ${block.cardNumber}:`,
            `data-slug er "${expectedSlug}",`,
            `men billedfilen bruger "${actualSlug}".`,
          ].join(" ")
        );
      }
    }

    const primaryFinish =
      choosePrimaryFinish(
        block.lines,
        completeFinishes.map(
          (item) => item.finish
        )
      );

    const primary =
      completeFinishes.find(
        (item) =>
          item.finish ===
          primaryFinish
      );

    if (!primary) {
      throw new Error(
        `Kunne ikke vælge hovedvariant til kort ${block.cardNumber}.`
      );
    }

    let updatedLines =
      removeVariants(block.lines);

    updatedLines = replacePropertyLine(
      updatedLines,
      "finish",
      finishEnum(primaryFinish)
    );

    updatedLines = replacePropertyLine(
      updatedLines,
      "stock",
      "1"
    );

    updatedLines = replacePropertyLine(
      updatedLines,
      "imageFront",
      getImageExpression(
        primary.pair.front.relativePath
      )
    );

    updatedLines = replacePropertyLine(
      updatedLines,
      "imageBack",
      getImageExpression(
        primary.pair.back.relativePath
      )
    );

    const variantsLines =
      buildVariantsLines(
        completeFinishes
      );

    if (variantsLines.length > 0) {
      updatedLines.splice(
        updatedLines.length - 1,
        0,
        ...variantsLines
      );
    }

    replacements.set(
      block.startIndex,
      {
        endIndex: block.endIndex,
        lines: updatedLines,
      }
    );

    updatedCards.push(
      `${block.cardNumber} ${block.slug}`
    );
  }

  for (
    const cardNumber of
    groupedImages.keys()
  ) {
    if (!foundNumbers.has(cardNumber)) {
      warnings.push(
        `Kortnummer ${cardNumber} findes ikke i ${SET_CONFIG.dataFileName}.`
      );
    }
  }

  const outputLines: string[] = [];

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const replacement =
      replacements.get(index);

    if (!replacement) {
      outputLines.push(lines[index]);
      continue;
    }

    outputLines.push(
      ...replacement.lines
    );

    index = replacement.endIndex;
  }

  return {
    source: outputLines.join("\n"),
    updatedCards,
    warnings,
  };
}

// ============================================================
// Backup
// ============================================================

async function createBackup(
  dataSource: string
): Promise<string> {
  const backupDirectory = path.join(
    PROJECT_ROOT,
    "backups",
    "import-images",
    formatTimestamp(new Date())
  );

  await fs.mkdir(
    backupDirectory,
    {
      recursive: true,
    }
  );

  const backupPath = path.join(
    backupDirectory,
    `${SET_CONFIG.dataFileName}.backup.txt`
  );

  await fs.writeFile(
    backupPath,
    dataSource,
    "utf8"
  );

  return backupPath;
}

// ============================================================
// Skriv datafil atomisk
// ============================================================

async function writeDataFileSafely(
  updatedSource: string
): Promise<void> {
  const temporaryPath =
    `${DATA_FILE}.tmp`;

  await fs.writeFile(
    temporaryPath,
    updatedSource,
    "utf8"
  );

  await fs.rename(
    temporaryPath,
    DATA_FILE
  );
}

// ============================================================
// Import
// ============================================================

async function importImages(): Promise<void> {
  console.log("");
  console.log(
    `PokéDad – import af ${SET_CONFIG.slug}`
  );
  console.log(
    "=================================================="
  );
  console.log("");

  if (
    !(await pathExists(
      UPLOAD_DIRECTORY
    ))
  ) {
    throw new Error(
      [
        "Uploadmappen blev ikke fundet:",
        UPLOAD_DIRECTORY,
      ].join("\n")
    );
  }

  if (
    !(await pathExists(DATA_FILE))
  ) {
    throw new Error(
      [
        "Kortdatafilen blev ikke fundet:",
        DATA_FILE,
      ].join("\n")
    );
  }

  const imageFiles =
    await findImageFiles(
      UPLOAD_DIRECTORY
    );

  if (imageFiles.length === 0) {
    console.log(
      "Der blev ikke fundet nogen billeder."
    );
    console.log("");
    console.log(
      "Ingen filer er blevet ændret."
    );
    console.log("");
    return;
  }

  console.log(
    `Fundne billeder: ${imageFiles.length}`
  );
  console.log("");

  // Alt valideres, før noget ændres.
  const groupedImages =
    validateAndGroupImages(
      imageFiles
    );

  const originalData =
    await fs.readFile(
      DATA_FILE,
      "utf8"
    );

  const updateResult =
    updateCardData(
      originalData,
      groupedImages
    );

  if (
    updateResult.updatedCards.length === 0
  ) {
    throw new Error(
      [
        "Ingen kort kunne opdateres.",
        "",
        "Kontrollér kortnumrene og filnavnene.",
        "Ingen filer er blevet ændret.",
      ].join("\n")
    );
  }

  // Backup laves før kopiering og dataskrivning.
  const backupPath =
    await createBackup(originalData);

  await fs.mkdir(
    DESTINATION_DIRECTORY,
    {
      recursive: true,
    }
  );

  const result: ImportResult = {
    copied: [],
    failed: [],
    updatedCards:
      updateResult.updatedCards,
  };

  for (const image of imageFiles) {
    try {
      await copyImage(image);

      result.copied.push(
        image.relativePath
      );
    } catch (error) {
      result.failed.push({
        file: image.relativePath,
        reason:
          error instanceof Error
            ? error.message
            : "Ukendt kopieringsfejl.",
      });
    }
  }

  if (result.failed.length > 0) {
    throw new Error(
      [
        "Nogle billeder kunne ikke kopieres.",
        "",
        ...result.failed.flatMap(
          (failure) => [
            `- ${failure.file}`,
            `  ${failure.reason}`,
          ]
        ),
        "",
        `${SET_CONFIG.dataFileName} er endnu ikke blevet ændret.`,
        `Backup: ${backupPath}`,
      ].join("\n")
    );
  }

  await writeDataFileSafely(
    updateResult.source
  );

  console.log(
    `Billeder kopieret: ${result.copied.length}`
  );

  console.log(
    `Kort opdateret: ${result.updatedCards.length}`
  );

  console.log("");

  for (
    const card of
    result.updatedCards
  ) {
    console.log(`- ${card}`);
  }

  if (
    updateResult.warnings.length > 0
  ) {
    console.log("");
    console.log("Advarsler:");

    for (
      const warning of
      updateResult.warnings
    ) {
      console.log(`- ${warning}`);
    }
  }

  console.log("");
  console.log(
    `Backup gemt i: ${backupPath}`
  );
  console.log("");

  console.log(
    "✅ Importen blev gennemført."
  );
  console.log("");
}

// ============================================================
// Start
// ============================================================

async function main(): Promise<void> {
  const setConfig =
    await resolveSetConfig();

  initializeSetPaths(setConfig);

  await importImages();
}

main().catch(
  (error: unknown) => {
    console.error("");
    console.error(
      "❌ Importen kunne ikke gennemføres."
    );
    console.error("");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    console.error("");
    process.exitCode = 1;
  }
);