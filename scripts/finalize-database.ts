import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_ROOT = path.join(ROOT, "app", "data");
const CARDS_FILE = path.join(DATA_ROOT, "cards.ts");
const SETS_FILE = path.join(DATA_ROOT, "sets.ts");
const MANUAL_SETS_FILE = path.join(
  DATA_ROOT,
  "sets.manual.ts"
);

const PLACEHOLDER =
  "/placeholders/udsolgt.png";

type SourceSet = {
  id: string;
  name: string;
  releaseDate: string;
  printedTotal: number;
  total: number;
};

type SetConfig = {
  sourceId: string;
  folder: string;
  file: string;
  routeSlug?: string;
};

const GENERATED_SETS: SetConfig[] = [
  // Base Series
  { sourceId: "base2", folder: "base-series", file: "jungle" },
  { sourceId: "base3", folder: "base-series", file: "fossil" },
  { sourceId: "base4", folder: "base-series", file: "base-set-2" },
  { sourceId: "base5", folder: "base-series", file: "team-rocket" },
  { sourceId: "base6", folder: "base-series", file: "legendary-collection" },

  // Gym Series
  { sourceId: "gym1", folder: "gym-series", file: "gym-heroes" },
  { sourceId: "gym2", folder: "gym-series", file: "gym-challenge" },

  // Neo Series
  { sourceId: "neo1", folder: "neo-series", file: "neo-genesis" },
  { sourceId: "neo2", folder: "neo-series", file: "neo-discovery" },
  { sourceId: "neo3", folder: "neo-series", file: "neo-revelation" },
  { sourceId: "neo4", folder: "neo-series", file: "neo-destiny" },

  // E-Card
  { sourceId: "ecard1", folder: "e-card", file: "expedition-base-set" },
  { sourceId: "ecard2", folder: "e-card", file: "aquapolis" },
  { sourceId: "ecard3", folder: "e-card", file: "skyridge" },

  // EX Series
  { sourceId: "ex1", folder: "ex-series", file: "ruby-sapphire" },
  { sourceId: "ex2", folder: "ex-series", file: "sandstorm" },
  { sourceId: "ex3", folder: "ex-series", file: "dragon" },
  { sourceId: "ex4", folder: "ex-series", file: "magma-vs-aqua" },
  { sourceId: "ex5", folder: "ex-series", file: "hidden-legends" },
  { sourceId: "ex6", folder: "ex-series", file: "firered-leafgreen" },
  { sourceId: "ex7", folder: "ex-series", file: "team-rocket-returns" },
  { sourceId: "ex8", folder: "ex-series", file: "deoxys" },
  { sourceId: "ex9", folder: "ex-series", file: "emerald" },
  { sourceId: "ex10", folder: "ex-series", file: "unseen-forces" },
  { sourceId: "ex11", folder: "ex-series", file: "delta-species" },
  { sourceId: "ex12", folder: "ex-series", file: "legend-maker" },
  { sourceId: "ex13", folder: "ex-series", file: "holon-phantoms" },
  { sourceId: "ex14", folder: "ex-series", file: "crystal-guardians" },
  { sourceId: "ex15", folder: "ex-series", file: "dragon-frontiers" },
  { sourceId: "ex16", folder: "ex-series", file: "power-keepers" },

  // Diamond & Pearl
  {
    sourceId: "dp1",
    folder: "diamond-pearl",
    file: "base",
    routeSlug: "diamond-pearl-base",
  },
  { sourceId: "dp2", folder: "diamond-pearl", file: "mysterious-treasures" },
  { sourceId: "dp3", folder: "diamond-pearl", file: "secret-wonders" },
  { sourceId: "dp4", folder: "diamond-pearl", file: "great-encounters" },
  { sourceId: "dp5", folder: "diamond-pearl", file: "majestic-dawn" },
  { sourceId: "dp6", folder: "diamond-pearl", file: "legends-awakened" },
  { sourceId: "dp7", folder: "diamond-pearl", file: "stormfront" },

  // Platinum
  {
    sourceId: "pl1",
    folder: "platinum",
    file: "base",
    routeSlug: "platinum-base",
  },
  { sourceId: "pl2", folder: "platinum", file: "rising-rivals" },
  { sourceId: "pl3", folder: "platinum", file: "supreme-victors" },
  { sourceId: "pl4", folder: "platinum", file: "arceus" },

  // HeartGold & SoulSilver
  {
    sourceId: "hgss1",
    folder: "heartgold-soulsilver",
    file: "base",
    routeSlug: "heartgold-soulsilver-base",
  },
  { sourceId: "hgss2", folder: "heartgold-soulsilver", file: "unleashed" },
  { sourceId: "hgss3", folder: "heartgold-soulsilver", file: "undaunted" },
  { sourceId: "hgss4", folder: "heartgold-soulsilver", file: "triumphant" },
  { sourceId: "col1", folder: "heartgold-soulsilver", file: "call-of-legends" },

  // Black & White
  {
    sourceId: "bw1",
    folder: "black-white",
    file: "base",
    routeSlug: "black-white-base",
  },
  { sourceId: "bw2", folder: "black-white", file: "emerging-powers" },
  { sourceId: "bw3", folder: "black-white", file: "noble-victories" },
  { sourceId: "bw4", folder: "black-white", file: "next-destinies" },
  { sourceId: "bw5", folder: "black-white", file: "dark-explorers" },
  { sourceId: "bw6", folder: "black-white", file: "dragons-exalted" },
  { sourceId: "dv1", folder: "black-white", file: "dragon-vault" },
  { sourceId: "bw7", folder: "black-white", file: "boundaries-crossed" },
  { sourceId: "bw8", folder: "black-white", file: "plasma-storm" },
  { sourceId: "bw9", folder: "black-white", file: "plasma-freeze" },
  { sourceId: "bw10", folder: "black-white", file: "plasma-blast" },
  { sourceId: "bw11", folder: "black-white", file: "legendary-treasures" },

  // XY
  {
    sourceId: "xy1",
    folder: "xy",
    file: "base",
    routeSlug: "xy-base",
  },
  { sourceId: "xy2", folder: "xy", file: "flashfire" },
  { sourceId: "xy3", folder: "xy", file: "furious-fists" },
  { sourceId: "xy4", folder: "xy", file: "phantom-forces" },
  { sourceId: "xy5", folder: "xy", file: "primal-clash" },
  { sourceId: "xy6", folder: "xy", file: "roaring-skies" },
  { sourceId: "xy7", folder: "xy", file: "ancient-origins" },
  { sourceId: "xy8", folder: "xy", file: "breakthrough" },
  { sourceId: "xy9", folder: "xy", file: "breakpoint" },
  { sourceId: "g1", folder: "xy", file: "generations" },
  { sourceId: "xy10", folder: "xy", file: "fates-collide" },
  { sourceId: "xy11", folder: "xy", file: "steam-siege" },
  { sourceId: "xy12", folder: "xy", file: "evolutions" },

  // Sun & Moon
  {
    sourceId: "sm1",
    folder: "sun-moon",
    file: "base",
    routeSlug: "sun-moon-base",
  },
  { sourceId: "sm2", folder: "sun-moon", file: "guardians-rising" },
  { sourceId: "sm3", folder: "sun-moon", file: "burning-shadows" },
  { sourceId: "sm4", folder: "sun-moon", file: "crimson-invasion" },
  { sourceId: "sm5", folder: "sun-moon", file: "ultra-prism" },
  { sourceId: "sm6", folder: "sun-moon", file: "forbidden-light" },
  { sourceId: "sm7", folder: "sun-moon", file: "celestial-storm" },
  { sourceId: "sm75", folder: "sun-moon", file: "dragon-majesty" },
  { sourceId: "sm8", folder: "sun-moon", file: "lost-thunder" },
  { sourceId: "sm9", folder: "sun-moon", file: "team-up" },
  { sourceId: "det1", folder: "sun-moon", file: "detective-pikachu" },
  { sourceId: "sm10", folder: "sun-moon", file: "unbroken-bonds" },
  { sourceId: "sm11", folder: "sun-moon", file: "unified-minds" },
  { sourceId: "sm115", folder: "sun-moon", file: "hidden-fates" },
  { sourceId: "sm12", folder: "sun-moon", file: "cosmic-eclipse" },

  // Sword & Shield
  {
    sourceId: "swsh1",
    folder: "sword-shield",
    file: "base",
    routeSlug: "sword-shield-base",
  },
  { sourceId: "swsh2", folder: "sword-shield", file: "rebel-clash" },
  { sourceId: "swsh3", folder: "sword-shield", file: "darkness-ablaze" },
  { sourceId: "swsh35", folder: "sword-shield", file: "champions-path" },
  { sourceId: "swsh4", folder: "sword-shield", file: "vivid-voltage" },
  { sourceId: "swsh45", folder: "sword-shield", file: "shining-fates" },
  { sourceId: "swsh5", folder: "sword-shield", file: "battle-styles" },
  { sourceId: "swsh6", folder: "sword-shield", file: "chilling-reign" },
  { sourceId: "swsh7", folder: "sword-shield", file: "evolving-skies" },
  { sourceId: "cel25", folder: "sword-shield", file: "celebrations" },
  { sourceId: "swsh8", folder: "sword-shield", file: "fusion-strike" },
  { sourceId: "swsh9", folder: "sword-shield", file: "brilliant-stars" },
  { sourceId: "swsh10", folder: "sword-shield", file: "astral-radiance" },
  { sourceId: "pgo", folder: "sword-shield", file: "pokemon-go" },
  { sourceId: "swsh11", folder: "sword-shield", file: "lost-origin" },
  { sourceId: "swsh12", folder: "sword-shield", file: "silver-tempest" },
  { sourceId: "swsh12pt5", folder: "sword-shield", file: "crown-zenith" },
];

type CardModule = {
  folder: string;
  file: string;
  importPath: string;
  exportName: string;
};

function quote(value: string): string {
  return JSON.stringify(value);
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function backupFile(
  filePath: string,
  backupFolder: string
): Promise<void> {
  if (!(await exists(filePath))) {
    return;
  }

  await fs.copyFile(
    filePath,
    path.join(
      backupFolder,
      path.basename(filePath)
    )
  );
}

async function fetchSetMetadata(): Promise<
  Map<string, SourceSet>
> {
  const url =
    "https://raw.githubusercontent.com/" +
    "PokemonTCG/pokemon-tcg-data/" +
    "refs/heads/master/sets/en.json";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Kunne ikke hente sætoplysninger: ${response.status}`
    );
  }

  const data =
    (await response.json()) as SourceSet[];

  return new Map(
    data.map((item) => [item.id, item])
  );
}

async function patchUniqueBaseSlugs(): Promise<void> {
  for (const config of GENERATED_SETS) {
    if (!config.routeSlug) {
      continue;
    }

    const filePath = path.join(
      DATA_ROOT,
      config.folder,
      `${config.file}.ts`
    );

    if (!(await exists(filePath))) {
      continue;
    }

    const source =
      await fs.readFile(filePath, "utf8");

    const updated = source.replace(
      /(\s+set:\s*)"base"(,)/g,
      `$1${quote(config.routeSlug)}$2`
    );

    if (updated !== source) {
      await fs.writeFile(
        filePath,
        updated,
        "utf8"
      );

      console.log(
        `✅ Unik set-slug: ${config.routeSlug}`
      );
    }
  }
}

async function discoverCardModules(): Promise<CardModule[]> {
  const ignoredRootFiles = new Set([
    "cards.ts",
    "sets.ts",
    "sets.manual.ts",
    "types.ts",
    "categories.ts",
    "helpers.ts",
    "index.ts",
    "getPokemonType.ts",
  ]);

  const modules: CardModule[] = [];
  const folders = await fs.readdir(
    DATA_ROOT,
    { withFileTypes: true }
  );

  for (const folderEntry of folders) {
    if (!folderEntry.isDirectory()) {
      continue;
    }

    const folder = folderEntry.name;
    const folderPath = path.join(
      DATA_ROOT,
      folder
    );

    const files = await fs.readdir(
      folderPath,
      { withFileTypes: true }
    );

    for (const fileEntry of files) {
      if (
        !fileEntry.isFile() ||
        !fileEntry.name.endsWith(".ts")
      ) {
        continue;
      }

      const file = fileEntry.name.slice(0, -3);
      const filePath = path.join(
        folderPath,
        fileEntry.name
      );

      const source =
        await fs.readFile(filePath, "utf8");

      const match = source.match(
        /export const\s+([A-Za-z_$][\w$]*)\s*:\s*PokemonCard\[\]\s*=/
      );

      if (!match) {
        continue;
      }

      modules.push({
        folder,
        file,
        importPath: `./${folder}/${file}`,
        exportName: match[1],
      });
    }
  }

  return modules.sort((a, b) =>
    `${a.folder}/${a.file}`.localeCompare(
      `${b.folder}/${b.file}`,
      "en"
    )
  );
}

async function writeCardsFile(
  modules: CardModule[]
): Promise<void> {
  const imports = modules.map(
    (module) =>
      `import { ${module.exportName} } from ${quote(
        module.importPath
      )};`
  );

  const spreads = modules.map(
    (module) =>
      `  ...${module.exportName},`
  );

  const source = [
    ...imports,
    "",
    'import type { PokemonCard } from "./types";',
    "",
    "export const cards: PokemonCard[] = [",
    ...spreads,
    "];",
    "",
    "export default cards;",
    "",
  ].join("\n");

  await fs.writeFile(
    CARDS_FILE,
    source,
    "utf8"
  );

  console.log(
    `✅ cards.ts opdateret med ${modules.length} sætfiler`
  );
}

function buildGeneratedSetEntry(
  config: SetConfig,
  metadata: SourceSet
): string {
  const slug =
    config.routeSlug ?? config.file;

  return [
    `  ${quote(slug)}: {`,
    `    slug: ${quote(slug)},`,
    `    name: ${quote(metadata.name)},`,
    `    series: ${quote(config.folder)},`,
    `    totalCards: ${metadata.total},`,
    `    releaseDate: ${quote(metadata.releaseDate)},`,
    `    logo: ${quote(PLACEHOLDER)},`,
    `    symbol: ${quote(PLACEHOLDER)},`,
    "  },",
  ].join("\n");
}

async function ensureManualSetsFile(): Promise<void> {
  if (await exists(MANUAL_SETS_FILE)) {
    return;
  }

  if (!(await exists(SETS_FILE))) {
    throw new Error(
      "app/data/sets.ts blev ikke fundet."
    );
  }

  await fs.copyFile(
    SETS_FILE,
    MANUAL_SETS_FILE
  );

  console.log(
    "✅ Din nuværende sets.ts er gemt som sets.manual.ts"
  );
}

async function writeSetsFile(
  metadataById: Map<string, SourceSet>
): Promise<void> {
  const entries: string[] = [];
  const missing: string[] = [];

  for (const config of GENERATED_SETS) {
    const localFile = path.join(
      DATA_ROOT,
      config.folder,
      `${config.file}.ts`
    );

    if (!(await exists(localFile))) {
      continue;
    }

    const metadata =
      metadataById.get(config.sourceId);

    if (!metadata) {
      missing.push(config.sourceId);
      continue;
    }

    entries.push(
      buildGeneratedSetEntry(
        config,
        metadata
      )
    );
  }

  if (missing.length > 0) {
    throw new Error(
      `Sætmetadata mangler for: ${missing.join(", ")}`
    );
  }

  const source = [
    'import { sets as manualSets } from "./sets.manual";',
    "",
    "export interface PokemonSet {",
    "  slug: string;",
    "  name: string;",
    "  series: string;",
    "  totalCards: number;",
    "  releaseDate: string;",
    "  logo: string;",
    "  symbol: string;",
    "}",
    "",
    "const generatedSets: Record<string, PokemonSet> = {",
    ...entries,
    "};",
    "",
    "export const sets: Record<string, PokemonSet> = {",
    "  ...manualSets,",
    "  ...generatedSets,",
    "};",
    "",
    "export default sets;",
    "",
  ].join("\n");

  await fs.writeFile(
    SETS_FILE,
    source,
    "utf8"
  );

  console.log(
    `✅ sets.ts opdateret med ${entries.length} genererede sæt`
  );
}

async function main(): Promise<void> {
  console.log("");
  console.log(
    "PokéDad – færdiggør cards.ts og sets.ts"
  );
  console.log(
    "================================================"
  );
  console.log("");

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  const backupFolder = path.join(
    ROOT,
    "backups",
    "finalize-database",
    timestamp
  );

  await fs.mkdir(
    backupFolder,
    { recursive: true }
  );

  await backupFile(
    CARDS_FILE,
    backupFolder
  );

  await backupFile(
    SETS_FILE,
    backupFolder
  );

  console.log(
    `✅ Backup gemt i ${backupFolder}`
  );

  await ensureManualSetsFile();
  await patchUniqueBaseSlugs();

  const modules =
    await discoverCardModules();

  if (modules.length === 0) {
    throw new Error(
      "Der blev ikke fundet nogen PokemonCard-sætfiler."
    );
  }

  const metadataById =
    await fetchSetMetadata();

  await writeCardsFile(modules);
  await writeSetsFile(metadataById);

  console.log("");
  console.log(
    "✅ Databasen er færdigkoblet."
  );
  console.log("");
  console.log(
    "Kør nu: npm run build"
  );
  console.log("");
}

main().catch((error: unknown) => {
  console.error("");
  console.error(
    "❌ Databasen kunne ikke færdiggøres."
  );
  console.error("");

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  console.error("");
  process.exitCode = 1;
});
