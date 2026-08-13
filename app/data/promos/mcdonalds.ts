import {
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonCard,
  PokemonType,
} from "../types";

const SOLD_OUT_IMAGE = "/placeholders/udsolgt.webp";

type CardSeed = readonly [
  number: number,
  name: string,
  pokemonType: PokemonType,
];

function createSlug(name: string, number: number): string {
  const normalizedName = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${normalizedName}-${String(number).padStart(2, "0")}`;
}

function createCards(
  seeds: readonly CardSeed[],
  set: string,
  denominator: number,
  firstId: number,
): PokemonCard[] {
  return seeds.map(([number, name, pokemonType], index) => ({
    id: firstId + index,
    slug: createSlug(name, number),
    name,
    series: "promos",
    set,
    cardNumber: `${String(number).padStart(2, "0")}/${denominator}`,
    rarity: CardRarity.Promo,
    finish: CardFinish.Normal,
    pokemonType,
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 0,
    imageFront: SOLD_OUT_IMAGE,
    imageBack: SOLD_OUT_IMAGE,
  }));
}

export const mcdonaldsCollection2011 = createCards(
  [
    [1, "Snivy", PokemonType.Grass],
    [2, "Maractus", PokemonType.Grass],
    [3, "Tepig", PokemonType.Fire],
    [4, "Oshawott", PokemonType.Water],
    [5, "Alomomola", PokemonType.Water],
    [6, "Blitzle", PokemonType.Lightning],
    [7, "Munna", PokemonType.Psychic],
    [8, "Sandile", PokemonType.Fighting],
    [9, "Zorua", PokemonType.Darkness],
    [10, "Klink", PokemonType.Metal],
    [11, "Pidove", PokemonType.Colorless],
    [12, "Audino", PokemonType.Colorless],
  ],
  "mcdonalds-collection-2011",
  12,
  2311001,
);

export const mcdonaldsCollection2016 = createCards(
  [
    [1, "Vulpix", PokemonType.Fire],
    [2, "Torchic", PokemonType.Fire],
    [3, "Fennekin", PokemonType.Fire],
    [4, "Magikarp", PokemonType.Water],
    [5, "Totodile", PokemonType.Water],
    [6, "Pikachu", PokemonType.Lightning],
    [7, "Scraggy", PokemonType.Darkness],
    [8, "Jigglypuff", PokemonType.Fairy],
    [9, "Togepi", PokemonType.Fairy],
    [10, "Dedenne", PokemonType.Fairy],
    [11, "Meowth", PokemonType.Colorless],
    [12, "Eevee", PokemonType.Colorless],
  ],
  "mcdonalds-collection-2016",
  12,
  2316001,
);

export const mcdonaldsCollection2017 = createCards(
  [
    [1, "Rowlet", PokemonType.Grass],
    [2, "Grubbin", PokemonType.Grass],
    [3, "Litten", PokemonType.Fire],
    [4, "Popplio", PokemonType.Water],
    [5, "Pikachu", PokemonType.Lightning],
    [6, "Cosmog", PokemonType.Psychic],
    [7, "Crabrawler", PokemonType.Fighting],
    [8, "Alolan Meowth", PokemonType.Darkness],
    [9, "Alolan Diglett", PokemonType.Metal],
    [10, "Cutiefly", PokemonType.Fairy],
    [11, "Pikipek", PokemonType.Colorless],
    [12, "Yungoose", PokemonType.Colorless],
  ],
  "mcdonalds-collection-2017",
  12,
  2317001,
);

export const mcdonaldsCollection2018 = createCards(
  [
    [1, "Growlithe", PokemonType.Fire],
    [2, "Psyduck", PokemonType.Water],
    [3, "Horsea", PokemonType.Water],
    [4, "Pikachu", PokemonType.Lightning],
    [5, "Slowpoke", PokemonType.Psychic],
    [6, "Machop", PokemonType.Fighting],
    [7, "Cubone", PokemonType.Fighting],
    [8, "Magnemite", PokemonType.Lightning],
    [9, "Dratini", PokemonType.Dragon],
    [10, "Chansey", PokemonType.Colorless],
    [11, "Eevee", PokemonType.Colorless],
    [12, "Porygon", PokemonType.Colorless],
  ],
  "mcdonalds-collection-2018",
  12,
  2318001,
);

export const mcdonaldsCollection2019 = createCards(
  [
    [1, "Caterpie", PokemonType.Grass],
    [2, "Alolan Exeggutor", PokemonType.Dragon],
    [3, "Magmar", PokemonType.Fire],
    [4, "Alolan Sandshrew", PokemonType.Water],
    [5, "Lapras", PokemonType.Water],
    [6, "Pikachu", PokemonType.Lightning],
    [7, "Gastly", PokemonType.Psychic],
    [8, "Mankey", PokemonType.Fighting],
    [9, "Onix", PokemonType.Fighting],
    [10, "Alolan Meowth", PokemonType.Darkness],
    [11, "Alolan Dugtrio", PokemonType.Metal],
    [12, "Eevee", PokemonType.Colorless],
  ],
  "mcdonalds-collection-2019",
  12,
  2319001,
);

export const mcdonaldsCollection2021 = createCards(
  [
    [1, "Bulbasaur", PokemonType.Grass],
    [2, "Chikorita", PokemonType.Grass],
    [3, "Treecko", PokemonType.Grass],
    [4, "Turtwig", PokemonType.Grass],
    [5, "Snivy", PokemonType.Grass],
    [6, "Chespin", PokemonType.Grass],
    [7, "Rowlet", PokemonType.Grass],
    [8, "Grookey", PokemonType.Grass],
    [9, "Charmander", PokemonType.Fire],
    [10, "Cyndaquil", PokemonType.Fire],
    [11, "Torchic", PokemonType.Fire],
    [12, "Chimchar", PokemonType.Fire],
    [13, "Tepig", PokemonType.Fire],
    [14, "Fennekin", PokemonType.Fire],
    [15, "Litten", PokemonType.Fire],
    [16, "Scorbunny", PokemonType.Fire],
    [17, "Squirtle", PokemonType.Water],
    [18, "Totodile", PokemonType.Water],
    [19, "Mudkip", PokemonType.Water],
    [20, "Piplup", PokemonType.Water],
    [21, "Oshawott", PokemonType.Water],
    [22, "Froakie", PokemonType.Water],
    [23, "Popplio", PokemonType.Water],
    [24, "Sobble", PokemonType.Water],
    [25, "Pikachu", PokemonType.Lightning],
  ],
  "mcdonalds-collection-2021",
  25,
  2321001,
);

export const mcdonaldsMatchBattle2022 = createCards(
  [
    [1, "Ledyba", PokemonType.Grass],
    [2, "Rowlet", PokemonType.Grass],
    [3, "Gossifleur", PokemonType.Grass],
    [4, "Growlithe", PokemonType.Fire],
    [5, "Victini", PokemonType.Fire],
    [6, "Lapras", PokemonType.Water],
    [7, "Pikachu", PokemonType.Lightning],
    [8, "Chinchou", PokemonType.Lightning],
    [9, "Flaaffy", PokemonType.Lightning],
    [10, "Tynamo", PokemonType.Lightning],
    [11, "Cutiefly", PokemonType.Psychic],
    [12, "Bewear", PokemonType.Colorless],
    [13, "Pangoro", PokemonType.Darkness],
    [14, "Drampa", PokemonType.Dragon],
    [15, "Smeargle", PokemonType.Colorless],
  ],
  "mcdonalds-match-battle-2022",
  15,
  2322001,
);

export const mcdonaldsMatchBattle2023 = createCards(
  [
    [1, "Sprigatito", PokemonType.Grass],
    [2, "Fuecoco", PokemonType.Fire],
    [3, "Quaxly", PokemonType.Water],
    [4, "Cetoddle", PokemonType.Water],
    [5, "Cetitan", PokemonType.Water],
    [6, "Pikachu", PokemonType.Lightning],
    [7, "Pawmi", PokemonType.Lightning],
    [8, "Kilowattrel", PokemonType.Lightning],
    [9, "Flittle", PokemonType.Psychic],
    [10, "Sandaconda", PokemonType.Fighting],
    [11, "Klawf", PokemonType.Fighting],
    [12, "Blissey", PokemonType.Colorless],
    [13, "Tandemaus", PokemonType.Colorless],
    [14, "Cyclizar", PokemonType.Colorless],
    [15, "Kirlia", PokemonType.Psychic],
  ],
  "mcdonalds-match-battle-2023",
  15,
  2323001,
);

export const mcdonaldsDragonDiscovery2025 = createCards(
  [
    [1, "Charizard", PokemonType.Fire],
    [2, "Pikachu", PokemonType.Lightning],
    [3, "Miraidon", PokemonType.Lightning],
    [4, "Jigglypuff", PokemonType.Psychic],
    [5, "Hatenna", PokemonType.Psychic],
    [6, "Dragapult", PokemonType.Psychic],
    [7, "Quagsire", PokemonType.Water],
    [8, "Koraidon", PokemonType.Fighting],
    [9, "Umbreon", PokemonType.Darkness],
    [10, "Hydreigon", PokemonType.Darkness],
    [11, "Roaring Moon", PokemonType.Darkness],
    [12, "Dragonite", PokemonType.Dragon],
    [13, "Eevee", PokemonType.Colorless],
    [14, "Rayquaza", PokemonType.Dragon],
    [15, "Drampa", PokemonType.Dragon],
  ],
  "mcdonalds-dragon-discovery-2025",
  15,
  2325001,
);
