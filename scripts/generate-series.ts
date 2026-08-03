import { promises as fs } from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const DATA_ROOT = path.join(
  PROJECT_ROOT,
  "app",
  "data"
);

const SOLD_OUT_IMAGE =
  "/placeholders/udsolgt.png";

type SourceSet = {
  id: string;
  name: string;
  printedTotal: number;
  total: number;
};

type SourceCard = {
  name: string;
  number: string;
  rarity?: string;
  supertype?: string;
  types?: string[];
};

type SetConfig = {
  sourceId: string;
  slug: string;
  exportName: string;
};

type SeriesConfig = {
  folder: string;
  idBase: number;
  sets: SetConfig[];
};

const SERIES: Record<string, SeriesConfig> = {
  "black-white": {
    folder: "black-white",
    idBase: 1400000,
    sets: [
      { sourceId: "bw1", slug: "base", exportName: "blackWhiteBase" },
      { sourceId: "bw2", slug: "emerging-powers", exportName: "emergingPowers" },
      { sourceId: "bw3", slug: "noble-victories", exportName: "nobleVictories" },
      { sourceId: "bw4", slug: "next-destinies", exportName: "nextDestinies" },
      { sourceId: "bw5", slug: "dark-explorers", exportName: "darkExplorers" },
      { sourceId: "bw6", slug: "dragons-exalted", exportName: "dragonsExalted" },
      { sourceId: "dv1", slug: "dragon-vault", exportName: "dragonVault" },
      { sourceId: "bw7", slug: "boundaries-crossed", exportName: "boundariesCrossed" },
      { sourceId: "bw8", slug: "plasma-storm", exportName: "plasmaStorm" },
      { sourceId: "bw9", slug: "plasma-freeze", exportName: "plasmaFreeze" },
      { sourceId: "bw10", slug: "plasma-blast", exportName: "plasmaBlast" },
      { sourceId: "bw11", slug: "legendary-treasures", exportName: "legendaryTreasures" },
    ],
  },

  xy: {
    folder: "xy",
    idBase: 1600000,
    sets: [
      { sourceId: "xy1", slug: "base", exportName: "xyBase" },
      { sourceId: "xy2", slug: "flashfire", exportName: "flashfire" },
      { sourceId: "xy3", slug: "furious-fists", exportName: "furiousFists" },
      { sourceId: "xy4", slug: "phantom-forces", exportName: "phantomForces" },
      { sourceId: "xy5", slug: "primal-clash", exportName: "primalClash" },
      { sourceId: "xy6", slug: "roaring-skies", exportName: "roaringSkies" },
      { sourceId: "xy7", slug: "ancient-origins", exportName: "ancientOrigins" },
      { sourceId: "xy8", slug: "breakthrough", exportName: "breakthrough" },
      { sourceId: "xy9", slug: "breakpoint", exportName: "breakpoint" },
      { sourceId: "g1", slug: "generations", exportName: "generations" },
      { sourceId: "xy10", slug: "fates-collide", exportName: "fatesCollide" },
      { sourceId: "xy11", slug: "steam-siege", exportName: "steamSiege" },
      { sourceId: "xy12", slug: "evolutions", exportName: "evolutions" },
    ],
  },

  "sun-moon": {
    folder: "sun-moon",
    idBase: 1800000,
    sets: [
      { sourceId: "sm1", slug: "base", exportName: "sunMoonBase" },
      { sourceId: "sm2", slug: "guardians-rising", exportName: "guardiansRising" },
      { sourceId: "sm3", slug: "burning-shadows", exportName: "burningShadows" },
      { sourceId: "sm4", slug: "crimson-invasion", exportName: "crimsonInvasion" },
      { sourceId: "sm5", slug: "ultra-prism", exportName: "ultraPrism" },
      { sourceId: "sm6", slug: "forbidden-light", exportName: "forbiddenLight" },
      { sourceId: "sm7", slug: "celestial-storm", exportName: "celestialStorm" },
      { sourceId: "sm75", slug: "dragon-majesty", exportName: "dragonMajesty" },
      { sourceId: "sm8", slug: "lost-thunder", exportName: "lostThunder" },
      { sourceId: "sm9", slug: "team-up", exportName: "teamUp" },
      { sourceId: "det1", slug: "detective-pikachu", exportName: "detectivePikachu" },
      { sourceId: "sm10", slug: "unbroken-bonds", exportName: "unbrokenBonds" },
      { sourceId: "sm11", slug: "unified-minds", exportName: "unifiedMinds" },
      { sourceId: "sm115", slug: "hidden-fates", exportName: "hiddenFates" },
      { sourceId: "sm12", slug: "cosmic-eclipse", exportName: "cosmicEclipse" },
    ],
  },

  "sword-shield": {
    folder: "sword-shield",
    idBase: 2100000,
    sets: [
      { sourceId: "swsh1", slug: "base", exportName: "swordShieldBase" },
      { sourceId: "swsh2", slug: "rebel-clash", exportName: "rebelClash" },
      { sourceId: "swsh3", slug: "darkness-ablaze", exportName: "darknessAblaze" },
      { sourceId: "swsh35", slug: "champions-path", exportName: "championsPath" },
      { sourceId: "swsh4", slug: "vivid-voltage", exportName: "vividVoltage" },
      { sourceId: "swsh45", slug: "shining-fates", exportName: "shiningFates" },
      { sourceId: "swsh5", slug: "battle-styles", exportName: "battleStyles" },
      { sourceId: "swsh6", slug: "chilling-reign", exportName: "chillingReign" },
      { sourceId: "swsh7", slug: "evolving-skies", exportName: "evolvingSkies" },
      { sourceId: "cel25", slug: "celebrations", exportName: "celebrations" },
      { sourceId: "swsh8", slug: "fusion-strike", exportName: "fusionStrike" },
      { sourceId: "swsh9", slug: "brilliant-stars", exportName: "brilliantStars" },
      { sourceId: "swsh10", slug: "astral-radiance", exportName: "astralRadiance" },
      { sourceId: "pgo", slug: "pokemon-go", exportName: "pokemonGo" },
      { sourceId: "swsh11", slug: "lost-origin", exportName: "lostOrigin" },
      { sourceId: "swsh12", slug: "silver-tempest", exportName: "silverTempest" },
      { sourceId: "swsh12pt5", slug: "crown-zenith", exportName: "crownZenith" },
    ],
  },
};

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
  const normalized =
    rarity?.toLowerCase() ?? "";

  if (normalized === "common") {
    return "CardRarity.Common";
  }

  if (normalized === "uncommon") {
    return "CardRarity.Uncommon";
  }

  if (
    normalized.includes("illustration rare") &&
    normalized.includes("special")
  ) {
    return "CardRarity.SpecialIllustrationRare";
  }

  if (normalized.includes("illustration rare")) {
    return "CardRarity.IllustrationRare";
  }

  if (
    normalized.includes("hyper rare") ||
    normalized.includes("secret rare")
  ) {
    return "CardRarity.HyperRare";
  }

  if (
    normalized.includes("ultra rare") ||
    normalized.includes("rare ultra")
  ) {
    return "CardRarity.UltraRare";
  }

  if (
    normalized.includes("double rare")
  ) {
    return "CardRarity.DoubleRare";
  }

  if (
    normalized.includes("ace spec")
  ) {
    return "CardRarity.ACESPEC";
  }

  if (
    normalized.includes("promo")
  ) {
    return "CardRarity.Promo";
  }

  return "CardRarity.Rare";
}

function finishEnum(
  rarity?: string
): string {
  const normalized =
    rarity?.toLowerCase() ?? "";

  if (
    normalized.includes("holo") ||
    normalized.includes("ultra") ||
    normalized.includes("secret") ||
    normalized.includes("illustration") ||
    normalized.includes("hyper") ||
    normalized.includes("double rare") ||
    normalized.includes("ace spec")
  ) {
    return "CardFinish.Holo";
  }

  return "CardFinish.Normal";
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

async function fetchJson<T>(
  url: string
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${url}`
    );
  }

  return (await response.json()) as T;
}

async function getSetMetadata(): Promise<
  Map<string, SourceSet>
> {
  const url =
    "https://raw.githubusercontent.com/" +
    "PokemonTCG/pokemon-tcg-data/" +
    "refs/heads/master/sets/en.json";

  const sets =
    await fetchJson<SourceSet[]>(url);

  return new Map(
    sets.map((set) => [set.id, set])
  );
}

async function fetchCards(
  sourceId: string
): Promise<SourceCard[]> {
  const url =
    "https://raw.githubusercontent.com/" +
    "PokemonTCG/pokemon-tcg-data/" +
    `refs/heads/master/cards/en/${sourceId}.json`;

  return fetchJson<SourceCard[]>(url);
}

function buildCardBlock(
  series: SeriesConfig,
  setConfig: SetConfig,
  printedTotal: number,
  card: SourceCard,
  id: number
): string {
  const typeLine =
    pokemonTypeLine(card);

  const lines = [
    "  {",
    `    id: ${id},`,
    `    slug: ${quote(
      `${slugify(card.name)}-${numberSlug(card.number)}`
    )},`,
    `    name: ${quote(card.name)},`,
    `    series: ${quote(series.folder)},`,
    `    set: ${quote(setConfig.slug)},`,
    `    cardNumber: ${quote(
      `${normalizeCardNumber(card.number)}/${printedTotal}`
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
  series: SeriesConfig,
  setConfig: SetConfig,
  metadata: SourceSet,
  cards: SourceCard[],
  setIndex: number
): string {
  const blocks = cards.map(
    (card, cardIndex) =>
      buildCardBlock(
        series,
        setConfig,
        metadata.printedTotal,
        card,
        series.idBase +
          setIndex * 1000 +
          cardIndex +
          1
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
    `export const ${setConfig.exportName}: PokemonCard[] = [`,
    blocks.join("\n"),
    "];",
    "",
    `export default ${setConfig.exportName};`,
    "",
  ].join("\n");
}

async function generateSeries(
  key: string,
  overwrite: boolean,
  metadataById: Map<string, SourceSet>
): Promise<void> {
  const series = SERIES[key];

  if (!series) {
    throw new Error(
      [
        `Ukendt serie: ${key}`,
        "",
        "Gyldige serier:",
        ...Object.keys(SERIES).map(
          (name) => `- ${name}`
        ),
      ].join("\n")
    );
  }

  const outputDirectory = path.join(
    DATA_ROOT,
    series.folder
  );

  await fs.mkdir(
    outputDirectory,
    {
      recursive: true,
    }
  );

  console.log("");
  console.log(`Serie: ${key}`);
  console.log("-".repeat(48));

  for (
    let setIndex = 0;
    setIndex < series.sets.length;
    setIndex += 1
  ) {
    const setConfig =
      series.sets[setIndex];

    const destination = path.join(
      outputDirectory,
      `${setConfig.slug}.ts`
    );

    try {
      await fs.access(destination);

      if (!overwrite) {
        console.log(
          `⏭️ ${setConfig.slug}: findes allerede`
        );
        continue;
      }
    } catch {
      // Filen findes ikke endnu.
    }

    const metadata =
      metadataById.get(
        setConfig.sourceId
      );

    if (!metadata) {
      throw new Error(
        `Sætmetadata mangler for ${setConfig.sourceId}.`
      );
    }

    console.log(
      `Henter ${metadata.name}...`
    );

    const cards =
      await fetchCards(
        setConfig.sourceId
      );

    if (cards.length < metadata.printedTotal) {
      throw new Error(
        [
          `${metadata.name} gav kun ${cards.length} kort,`,
          `men det trykte sæt indeholder ${metadata.printedTotal}.`,
          "",
          "Filen blev ikke skrevet, fordi kortlisten ser ufuldstændig ud.",
        ].join(" ")
      );
    }

    if (cards.length !== metadata.total) {
      console.warn(
        `⚠️ ${metadata.name}: metadata siger ${metadata.total} kort, ` +
          `men kortfilen indeholder ${cards.length}. Alle kort medtages.`
      );
    }

    const temporaryDestination =
      `${destination}.tmp`;

    await fs.writeFile(
      temporaryDestination,
      buildDataFile(
        series,
        setConfig,
        metadata,
        cards,
        setIndex
      ),
      "utf8"
    );

    await fs.rename(
      temporaryDestination,
      destination
    );

    console.log(
      `✅ ${setConfig.slug}: ${cards.length} kort`
    );
  }
}

async function main(): Promise<void> {
  const requested =
    process.argv[2];

  const overwrite =
    process.argv.includes("--overwrite");

  if (!requested) {
    throw new Error(
      [
        "Du skal angive en serie.",
        "",
        "Eksempel:",
        "npx tsx scripts/generate-series.ts black-white",
        "",
        "Alle understøttede serier:",
        ...Object.keys(SERIES).map(
          (name) => `- ${name}`
        ),
        "",
        "Brug 'all' for alle serier.",
      ].join("\n")
    );
  }

  console.log("");
  console.log(
    "PokéDad – universel sætfils-generator"
  );
  console.log(
    "================================================"
  );

  const metadataById =
    await getSetMetadata();

  const keys =
    requested === "all"
      ? Object.keys(SERIES)
      : [requested];

  for (const key of keys) {
    await generateSeries(
      key,
      overwrite,
      metadataById
    );
  }

  console.log("");
  console.log(
    "✅ Genereringen er færdig."
  );
  console.log("");
  console.log(
    "cards.ts og sets.ts er ikke blevet ændret."
  );
  console.log("");
}

main().catch(
  (error: unknown) => {
    console.error("");
    console.error(
      "❌ Genereringen kunne ikke gennemføres."
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
