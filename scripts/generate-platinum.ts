import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const DATA_DIRECTORY = path.join(
  PROJECT_ROOT,
  "app",
  "data",
  "platinum"
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
    sourceId: "pl1",
    slug: "base",
    exportName: "platinumBase",
    name: "Platinum",
    totalCards: 133,
    idPrefix: 1330000,
  },
  {
    sourceId: "pl2",
    slug: "rising-rivals",
    exportName: "risingRivals",
    name: "Rising Rivals",
    totalCards: 120,
    idPrefix: 1340000,
  },
  {
    sourceId: "pl3",
    slug: "supreme-victors",
    exportName: "supremeVictors",
    name: "Supreme Victors",
    totalCards: 153,
    idPrefix: 1350000,
  },
  {
    sourceId: "pl4",
    slug: "arceus",
    exportName: "arceus",
    name: "Arceus",
    totalCards: 111,
    idPrefix: 1360000,
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

function normalizeCardNumber(
  value: string
): string {
  const trimmed = value.trim();

  if (/^\d+$/.test(trimmed)) {
    return trimmed.padStart(3, "0");
  }

  const match = trimmed.match(
    /^([a-zA-Z]+)(\d+)$/
  );

  if (match) {
    return (
      match[1].toUpperCase() +
      match[2].padStart(2, "0")
    );
  }

  return trimmed
    .toUpperCase()
    .replace(/\s+/g, "");
}

function numberSlug(value: string): string {
  return normalizeCardNumber(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

  return (await response.json()) as SourceCard[];
}

function buildCardBlock(
  definition: SetDefinition,
  card: SourceCard,
  index: number
): string {
  const normalizedNumber =
    normalizeCardNumber(card.number);

  const typeLine =
    pokemonTypeLine(card);

  const lines = [
    "  {",
    `    id: ${definition.idPrefix + index + 1},`,
    `    slug: ${quote(
      `${slugify(card.name)}-${numberSlug(card.number)}`
    )},`,
    `    name: ${quote(card.name)},`,
    '    series: "platinum",',
    `    set: ${quote(definition.slug)},`,
    `    cardNumber: ${quote(
      `${normalizedNumber}/${definition.totalCards}`
    )},`,
    `    rarity: ${rarityEnum(card.rarity)},`,
    `    finish: ${finishEnum(card.rarity)},`,
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
    (card, index) =>
      buildCardBlock(
        definition,
        card,
        index
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
    "PokéDad – opret komplette Platinum-filer"
  );
  console.log(
    "============================================"
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
    "✅ Alle 4 Platinum-filer er oprettet."
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
      "❌ Platinum-filerne kunne ikke oprettes."
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
