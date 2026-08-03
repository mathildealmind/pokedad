import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const DATA_DIRECTORY = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "base-series"
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
    sourceId: "base2",
    slug: "jungle",
    exportName: "jungle",
    name: "Jungle",
    totalCards: 64,
    releaseDate: "1999-06-16",
    idPrefix: 910000,
  },
  {
    sourceId: "base3",
    slug: "fossil",
    exportName: "fossil",
    name: "Fossil",
    totalCards: 62,
    releaseDate: "1999-10-10",
    idPrefix: 920000,
  },
  {
    sourceId: "base4",
    slug: "base-set-2",
    exportName: "baseSet2",
    name: "Base Set 2",
    totalCards: 130,
    releaseDate: "2000-02-24",
    idPrefix: 930000,
  },
  {
    sourceId: "base5",
    slug: "team-rocket",
    exportName: "teamRocket",
    name: "Team Rocket",
    totalCards: 83,
    releaseDate: "2000-04-24",
    idPrefix: 940000,
  },
  {
    sourceId: "base6",
    slug: "legendary-collection",
    exportName: "legendaryCollection",
    name: "Legendary Collection",
    totalCards: 110,
    releaseDate: "2002-05-24",
    idPrefix: 950000,
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
        '    series: "base-series",',
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

async function updateCardsFile(): Promise<void> {
  let source =
    await fs.readFile(
      CARDS_FILE,
      "utf8"
    );

  if (
    !/export const cards\s*:\s*PokemonCard\[\]\s*=\s*\[/.test(
      source
    )
  ) {
    throw new Error(
      [
        "app/data/cards.ts har ikke en gyldig cards-deklaration.",
        "",
        'Den skal indeholde: export const cards: PokemonCard[] = [',
        "",
        "Generatoren har ikke ændret filen.",
      ].join("\n")
    );
  }

  const imports = SETS.map(
    (definition) =>
      `import { ${definition.exportName} } ` +
      `from "./base-series/${definition.slug}";`
  );

  const missingImports =
    imports.filter(
      (line) => !source.includes(line)
    );

  if (missingImports.length > 0) {
    source =
      `${missingImports.join("\n")}\n` +
      source;
  }

  const arrayStart =
    source.search(
      /export const cards\s*:\s*PokemonCard\[\]\s*=\s*\[/
    );

  if (arrayStart === -1) {
    throw new Error(
      'Kunne ikke finde "export const cards: PokemonCard[] = [" i app/data/cards.ts.'
    );
  }

  const declarationMatch =
    source
      .slice(arrayStart)
      .match(
        /export const cards\s*:\s*PokemonCard\[\]\s*=\s*\[/
      );

  if (!declarationMatch) {
    throw new Error(
      "Kunne ikke læse starten på cards-arrayet."
    );
  }

  const openingBracket =
    arrayStart +
    declarationMatch[0].lastIndexOf("[");

  if (openingBracket < arrayStart) {
    throw new Error(
      "Kunne ikke finde åbningstegnet til cards-arrayet."
    );
  }

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
    '    series: "base-series",',
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
          `["']?${definition.slug}["']?\\s*:`
        ).test(source)
    );

  if (
    missingDefinitions.length === 0
  ) {
    console.log(
      "✅ Alle Base Series-sæt findes allerede i sets.ts"
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
    "  // Base Series",
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

async function main(): Promise<void> {
  console.log("");
  console.log(
    "PokéDad – opret Base Series"
  );
  console.log(
    "================================"
  );
  console.log("");

  await writeSetFiles();
  await updateCardsFile();
  await updateSetsFile();

  console.log("");
  console.log(
    "✅ Base Series-pakken er færdig."
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
      "❌ Base Series kunne ikke oprettes."
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
