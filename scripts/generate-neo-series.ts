import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const DATA_DIRECTORY = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "neo-series"
);

const SOLD_OUT_IMAGE =
  "/placeholders/udsolgt.png";

type SourceCard = {
  name: string;
  number: string;
  rarity?: string;
  supertype?: string;
  types?: string[];
};

type SetDefinition = {
  sourceId: string;
  slug: string;
  exportName: string;
  name: string;
  totalCards: number;
  idPrefix: number;
};

const SETS: SetDefinition[] = [
  {
    sourceId: "neo1",
    slug: "neo-genesis",
    exportName: "neoGenesis",
    name: "Neo Genesis",
    totalCards: 111,
    idPrefix: 980000,
  },
  {
    sourceId: "neo2",
    slug: "neo-discovery",
    exportName: "neoDiscovery",
    name: "Neo Discovery",
    totalCards: 75,
    idPrefix: 990000,
  },
  {
    sourceId: "neo3",
    slug: "neo-revelation",
    exportName: "neoRevelation",
    name: "Neo Revelation",
    totalCards: 66,
    idPrefix: 1000000,
  },
  {
    sourceId: "neo4",
    slug: "neo-destiny",
    exportName: "neoDestiny",
    name: "Neo Destiny",
    totalCards: 113,
    idPrefix: 1010000,
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

function numericCardNumber(value: string): number {
  const match = value.match(/\d+/);

  if (!match) {
    throw new Error(
      `Kortnummeret "${value}" kunne ikke læses.`
    );
  }

  return Number.parseInt(match[0], 10);
}

function paddedCardNumber(value: string): string {
  return String(
    numericCardNumber(value)
  ).padStart(3, "0");
}

function quote(value: string): string {
  return JSON.stringify(value);
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

function pokemonTypeLine(
  card: SourceCard
): string | null {
  if (
    card.supertype !== "Pokémon" ||
    !card.types ||
    card.types.length === 0
  ) {
    return null;
  }

  const supportedTypes = new Set([
    "Grass",
    "Fire",
    "Water",
    "Lightning",
    "Psychic",
    "Fighting",
    "Darkness",
    "Metal",
    "Dragon",
    "Fairy",
    "Colorless",
  ]);

  const type = card.types[0];

  if (!supportedTypes.has(type)) {
    return null;
  }

  return `    pokemonType: PokemonType.${type},`;
}

async function fetchSetCards(
  sourceId: string
): Promise<SourceCard[]> {
  const url =
    "https://raw.githubusercontent.com/" +
    "PokemonTCG/pokemon-tcg-data/" +
    `refs/heads/master/cards/en/${sourceId}.json`;

  console.log(`Henter ${sourceId}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      [
        `Kunne ikke hente ${sourceId}.`,
        `${response.status} ${response.statusText}`,
        "",
        "Kontrollér internetforbindelsen og prøv igen.",
      ].join("\n")
    );
  }

  const cards =
    (await response.json()) as SourceCard[];

  return [...cards].sort(
    (first, second) =>
      numericCardNumber(first.number) -
      numericCardNumber(second.number)
  );
}

function buildCardBlock(
  definition: SetDefinition,
  card: SourceCard
): string {
  const number =
    numericCardNumber(card.number);

  const paddedNumber =
    paddedCardNumber(card.number);

  const typeLine =
    pokemonTypeLine(card);

  const lines = [
    "  {",
    `    id: ${definition.idPrefix + number},`,
    `    slug: ${quote(
      `${slugify(card.name)}-${paddedNumber}`
    )},`,
    `    name: ${quote(card.name)},`,
    '    series: "neo-series",',
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
  ];

  if (typeLine) {
    lines.push(typeLine);
  }

  lines.push(
    "    language: CardLanguage.English,",
    "    condition: CardCondition.Mint,",
    "    price: 0,",
    "    stock: 0,",
    "    imageFront: SOLD_OUT_IMAGE,",
    "    imageBack: SOLD_OUT_IMAGE,",
    '    dateAdded: "2026-08-02",',
    "  },"
  );

  return lines.join("\n");
}

function buildDataFile(
  definition: SetDefinition,
  cards: SourceCard[]
): string {
  const blocks = cards.map(
    (card) =>
      buildCardBlock(
        definition,
        card
      )
  );

  return [
    "import {",
    "  PokemonCard,",
    "  CardCondition,",
    "  CardFinish,",
    "  CardLanguage,",
    "  CardRarity,",
    "  PokemonType,",
    '} from "../types";',
    "",
    `const SOLD_OUT_IMAGE = ${quote(
      SOLD_OUT_IMAGE
    )};`,
    "",
    `export const ${definition.exportName}: PokemonCard[] = [`,
    blocks.join("\n"),
    "];",
    "",
    `export default ${definition.exportName};`,
    "",
  ].join("\n");
}

async function writeSet(
  definition: SetDefinition
): Promise<void> {
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
        `${definition.name} gav ${cards.length} kort.`,
        `Der blev forventet ${definition.totalCards}.`,
        "",
        "Filen blev ikke skrevet, fordi kortlisten ikke var komplet.",
      ].join("\n")
    );
  }

  const destination = path.join(
    DATA_DIRECTORY,
    `${definition.slug}.ts`
  );

  const temporaryDestination =
    `${destination}.tmp`;

  await fs.writeFile(
    temporaryDestination,
    buildDataFile(
      definition,
      cards
    ),
    "utf8"
  );

  await fs.rename(
    temporaryDestination,
    destination
  );

  console.log(
    `✅ ${definition.name}: ` +
      `${cards.length} kort skrevet`
  );
}

async function main(): Promise<void> {
  console.log("");
  console.log(
    "PokéDad – opret komplette Neo Series-filer"
  );
  console.log(
    "================================================"
  );
  console.log("");

  await fs.mkdir(
    DATA_DIRECTORY,
    {
      recursive: true,
    }
  );

  for (const definition of SETS) {
    await writeSet(definition);
  }

  console.log("");
  console.log(
    "✅ Alle fire Neo Series-filer er oprettet."
  );
  console.log("");
  console.log(
    "Der er ikke ændret noget i cards.ts eller sets.ts."
  );
  console.log("");
}

main().catch(
  (error: unknown) => {
    console.error("");
    console.error(
      "❌ Neo Series-filerne kunne ikke oprettes."
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
