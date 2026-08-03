import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const DATA_DIRECTORY = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "gym-series"
);

const CARDS_FILE = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "cards.ts"
);

const SETS_FILE = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "sets.ts"
);

const SOLD_OUT_IMAGE =
  "/placeholders/udsolgt.png";

type SourceCard = {
  name: string;
  number: string;
  rarity?: string;
};

type SetDefinition = {
  sourceId: string;
  slug: string;
  exportName: string;
  name: string;
  totalCards: number;
  releaseDate: string;
  idPrefix: number;
};

const SETS: SetDefinition[] = [
  {
    sourceId: "gym1",
    slug: "gym-heroes",
    exportName: "gymHeroes",
    name: "Gym Heroes",
    totalCards: 132,
    releaseDate: "2000-08-14",
    idPrefix: 960000,
  },
  {
    sourceId: "gym2",
    slug: "gym-challenge",
    exportName: "gymChallenge",
    name: "Gym Challenge",
    totalCards: 132,
    releaseDate: "2000-10-16",
    idPrefix: 970000,
  },
];

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/♀/g, "-female")
    .replace(/♂/g, "-male")
    .replace(/&/g, "and")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function padCardNumber(
  value: string
): string {
  const numericValue = Number.parseInt(
    value,
    10
  );

  if (Number.isNaN(numericValue)) {
    throw new Error(
      `Ugyldigt kortnummer: ${value}`
    );
  }

  return String(numericValue).padStart(
    3,
    "0"
  );
}

function rarityEnum(
  rarity?: string
): string {
  switch (rarity) {
    case "Common":
      return "CardRarity.Common";

    case "Uncommon":
      return "CardRarity.Uncommon";

    case "Rare":
    case "Rare Holo":
    default:
      return "CardRarity.Rare";
  }
}

function finishEnum(
  rarity?: string
): string {
  return rarity === "Rare Holo"
    ? "CardFinish.Holo"
    : "CardFinish.Normal";
}

function quote(value: string): string {
  return JSON.stringify(value);
}

async function fetchSetCards(
  sourceId: string
): Promise<SourceCard[]> {
  const url =
    "https://raw.githubusercontent.com/" +
    "PokemonTCG/pokemon-tcg-data/" +
    `master/cards/en/${sourceId}.json`;

  console.log(`Henter ${sourceId}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Kunne ikke hente ${url}: ` +
        `${response.status} ${response.statusText}`
    );
  }

  const data =
    (await response.json()) as SourceCard[];

  return [...data].sort(
    (first, second) =>
      Number.parseInt(first.number, 10) -
      Number.parseInt(second.number, 10)
  );
}

function buildDataFile(
  definition: SetDefinition,
  cards: SourceCard[]
): string {
  const cardBlocks = cards.map(
    (card) => {
      const paddedNumber =
        padCardNumber(card.number);

      const cardSlug =
        `${slugify(card.name)}-${paddedNumber}`;

      const id =
        definition.idPrefix +
        Number.parseInt(card.number, 10);

      return [
        "  {",
        `    id: ${id},`,
        `    slug: ${quote(cardSlug)},`,
        `    name: ${quote(card.name)},`,
        '    series: "gym-series",',
        `    set: ${quote(definition.slug)},`,
        `    cardNumber: ${quote(
          `${paddedNumber}/${definition.totalCards}`
        )},`,
        `    rarity: ${rarityEnum(
          card.rarity
        )},`,
        `    finish: ${finishEnum(
          card.rarity
        )},`,
        "    language: CardLanguage.English,",
        "    condition: CardCondition.Mint,",
        "    price: 0,",
        "    stock: 0,",
        "    imageFront: SOLD_OUT_IMAGE,",
        "    imageBack: SOLD_OUT_IMAGE,",
        '    dateAdded: "2026-08-02",',
        "  },",
      ].join("\n");
    }
  );

  return [
    "import {",
    "  PokemonCard,",
    "  CardCondition,",
    "  CardFinish,",
    "  CardLanguage,",
    "  CardRarity,",
    '} from "../types";',
    "",
    `const SOLD_OUT_IMAGE = ${quote(
      SOLD_OUT_IMAGE
    )};`,
    "",
    `export const ${definition.exportName}: PokemonCard[] = [`,
    cardBlocks.join("\n"),
    "];",
    "",
    `export default ${definition.exportName};`,
    "",
  ].join("\n");
}

async function writeSetFiles(): Promise<void> {
  await fs.mkdir(DATA_DIRECTORY, {
    recursive: true,
  });

  for (const definition of SETS) {
    const cards =
      await fetchSetCards(
        definition.sourceId
      );

    if (
      cards.length !==
      definition.totalCards
    ) {
      throw new Error(
        [
          `${definition.name} indeholder ${cards.length} kort,`,
          `men generatoren forventede ${definition.totalCards}.`,
          "Ingen øvrige projektfiler er blevet ændret.",
        ].join(" ")
      );
    }

    const source =
      buildDataFile(
        definition,
        cards
      );

    const destination = path.join(
      DATA_DIRECTORY,
      `${definition.slug}.ts`
    );

    await fs.writeFile(
      destination,
      source,
      "utf8"
    );

    console.log(
      `✅ ${definition.name}: ` +
        `${cards.length} kort skrevet`
    );
  }
}

function ensureValidCardsArray(
  source: string
): RegExpMatchArray {
  const declarationMatch =
    source.match(
      /export const cards\s*:\s*PokemonCard\[\]\s*=\s*\[/
    );

  if (
    !declarationMatch ||
    declarationMatch.index === undefined
  ) {
    throw new Error(
      [
        "app/data/cards.ts har ikke en gyldig cards-deklaration.",
        "",
        'Den skal indeholde: export const cards: PokemonCard[] = [',
        "",
        "Generatoren har ikke ændret cards.ts.",
      ].join("\n")
    );
  }

  return declarationMatch;
}

async function updateCardsFile(): Promise<void> {
  let source =
    await fs.readFile(
      CARDS_FILE,
      "utf8"
    );

  const declarationMatch =
    ensureValidCardsArray(source);

  const imports = SETS.map(
    (definition) =>
      `import { ${definition.exportName} } ` +
      `from "./gym-series/${definition.slug}";`
  );

  const missingImports =
    imports.filter(
      (line) => !source.includes(line)
    );

  if (missingImports.length > 0) {
    const typeImportPattern =
      /import type \{ PokemonCard \} from "\.\/types";/;

    const typeImportMatch =
      source.match(typeImportPattern);

    if (
      !typeImportMatch ||
      typeImportMatch.index === undefined
    ) {
      throw new Error(
        'Kunne ikke finde importen af PokemonCard i app/data/cards.ts.'
      );
    }

    const insertionPoint =
      typeImportMatch.index;

    source =
      source.slice(0, insertionPoint) +
      missingImports.join("\n") +
      "\n\n" +
      source.slice(insertionPoint);
  }

  const freshDeclaration =
    ensureValidCardsArray(source);

  const declarationStart =
    freshDeclaration.index as number;

  const openingBracket =
    declarationStart +
    freshDeclaration[0].lastIndexOf("[");

  const spreads = SETS.map(
    (definition) =>
      `  ...${definition.exportName},`
  );

  const missingSpreads =
    spreads.filter(
      (line) => !source.includes(line)
    );

  if (missingSpreads.length > 0) {
    source =
      source.slice(
        0,
        openingBracket + 1
      ) +
      "\n" +
      missingSpreads.join("\n") +
      source.slice(
        openingBracket + 1
      );
  }

  await fs.writeFile(
    CARDS_FILE,
    source,
    "utf8"
  );

  console.log(
    "✅ app/data/cards.ts opdateret"
  );
}

function buildSetEntry(
  definition: SetDefinition
): string {
  return [
    `  ${quote(definition.slug)}: {`,
    `    slug: ${quote(
      definition.slug
    )},`,
    `    name: ${quote(
      definition.name
    )},`,
    '    series: "gym-series",',
    `    totalCards: ${definition.totalCards},`,
    `    releaseDate: ${quote(
      definition.releaseDate
    )},`,
    `    logo: ${quote(
      SOLD_OUT_IMAGE
    )},`,
    `    symbol: ${quote(
      SOLD_OUT_IMAGE
    )},`,
    "  },",
  ].join("\n");
}

async function updateSetsFile(): Promise<void> {
  let source =
    await fs.readFile(
      SETS_FILE,
      "utf8"
    );

  const missingDefinitions =
    SETS.filter(
      (definition) =>
        !new RegExp(
          `["']${definition.slug}["']\\s*:`
        ).test(source)
    );

  if (
    missingDefinitions.length === 0
  ) {
    console.log(
      "✅ Begge Gym Series-sæt findes allerede i sets.ts"
    );

    return;
  }

  const objectStart =
    source.indexOf(
      "export const sets"
    );

  if (objectStart === -1) {
    throw new Error(
      'Kunne ikke finde "export const sets" i app/data/sets.ts.'
    );
  }

  const openingBrace =
    source.indexOf("{", objectStart);

  if (openingBrace === -1) {
    throw new Error(
      "Kunne ikke finde starten på sets-objektet."
    );
  }

  const section = [
    "",
    "  // ==========================",
    "  // Gym Series",
    "  // ==========================",
    "",
    ...missingDefinitions.map(
      buildSetEntry
    ),
    "",
  ].join("\n");

  source =
    source.slice(
      0,
      openingBrace + 1
    ) +
    section +
    source.slice(
      openingBrace + 1
    );

  await fs.writeFile(
    SETS_FILE,
    source,
    "utf8"
  );

  console.log(
    "✅ app/data/sets.ts opdateret"
  );
}

async function createBackups(): Promise<void> {
  const backupDirectory = path.join(
    PROJECT_ROOT,
    "backups",
    "generate-gym-series",
    new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
  );

  await fs.mkdir(
    backupDirectory,
    {
      recursive: true,
    }
  );

  await fs.copyFile(
    CARDS_FILE,
    path.join(
      backupDirectory,
      "cards.ts"
    )
  );

  await fs.copyFile(
    SETS_FILE,
    path.join(
      backupDirectory,
      "sets.ts"
    )
  );

  console.log(
    `✅ Backup gemt i: ${backupDirectory}`
  );
}

async function main(): Promise<void> {
  console.log("");
  console.log(
    "PokéDad – opret Gym Series"
  );
  console.log(
    "================================"
  );
  console.log("");

  /*
   * Hent og skriv sætfilerne først.
   * cards.ts og sets.ts ændres først bagefter.
   */
  await writeSetFiles();

  await createBackups();
  await updateCardsFile();
  await updateSetsFile();

  console.log("");
  console.log(
    "✅ Gym Series-pakken er færdig."
  );
  console.log("");
  console.log(
    "Kør nu: npm run build"
  );
  console.log("");
}

main().catch(
  (error: unknown) => {
    console.error("");
    console.error(
      "❌ Gym Series kunne ikke oprettes."
    );
    console.error("");

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    console.error("");
    process.exitCode = 1;
  }
);
