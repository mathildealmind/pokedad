import {
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonCard,
  PokemonType,
} from "../types";

const SOLD_OUT_IMAGE = "/placeholders/udsolgt.webp";
const FIRST_CARD_ID = 2360001;

type CardSeed = readonly [
  cardNumber: string,
  name: string,
  pokemonType: PokemonType | undefined,
];

const CARD_SEEDS = [
  ["NPR01", "Kyogre ex", PokemonType.Water],
  ["NPR02", "Groudon ex", PokemonType.Fighting],
  ["NPR03", "Treecko", PokemonType.Grass],
  ["NPR04", "Grovyle", PokemonType.Grass],
  ["NPR05", "Mudkip", PokemonType.Water],
  ["NPR06", "Torchic", PokemonType.Fire],
  ["NPR07", "Treecko", PokemonType.Grass],
  ["NPR08", "Torchic", PokemonType.Fire],
  ["NPR09", "Combusken", PokemonType.Fire],
  ["NPR10", "Mudkip", PokemonType.Water],
  ["NPR11", "Marshtomp", PokemonType.Water],
  ["NPR12", "Pikachu", PokemonType.Lightning],
  ["NPR13", "Meowth", PokemonType.Colorless],
  ["NPR14", "Latias", PokemonType.Dragon],
  ["NPR15", "Latios", PokemonType.Dragon],
  ["NPR16", "Treecko", PokemonType.Grass],
  ["NPR17", "Torchic", PokemonType.Fire],
  ["NPR18", "Mudkip", PokemonType.Water],
  ["NPR19", "Whismur", PokemonType.Colorless],
  ["NPR20", "Ludicolo", PokemonType.Water],
  ["NPR21", "Jirachi", PokemonType.Metal],
  ["NPR22", "Beldum", PokemonType.Metal],
  ["NPR23", "Metang", PokemonType.Metal],
  ["NPR24", "Chimecho", PokemonType.Psychic],
  ["NPR25", "Flygon", PokemonType.Dragon],
  ["NPR26", "Tropical Wind", undefined],
  ["NPR27", "Tropical Tidal Wave", undefined],
  ["NPR28", "Championship Arena", undefined],
  ["NPR29", "Celebi", PokemonType.Grass],
  ["NPR30", "Suicune", PokemonType.Water],
  ["NPR31", "Moltres ex", PokemonType.Fire],
  ["NPR32", "Articuno ex", PokemonType.Water],
  ["NPR33", "Zapdos ex", PokemonType.Lightning],
  ["NPR34", "Typhlosion", PokemonType.Fire],
  ["NPR35", "Pikachu δ", PokemonType.Metal],
  ["NPR36", "Tropical Tidal Wave", undefined],
  ["NPR37", "Kyogre ex", PokemonType.Water],
  ["NPR38", "Groudon ex", PokemonType.Fighting],
  ["NPR39", "Rayquaza ex", PokemonType.Colorless],
  ["NPR40", "Mew", PokemonType.Psychic],
] satisfies readonly CardSeed[];

function createSlug(name: string, cardNumber: string): string {
  const normalizedName = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${normalizedName}-${cardNumber.toLowerCase()}`;
}

export const nintendoPromos: PokemonCard[] = CARD_SEEDS.map(
  ([cardNumber, name, pokemonType], index) => ({
    id: FIRST_CARD_ID + index,
    slug: createSlug(name, cardNumber),
    name,
    series: "promos",
    set: "nintendo-promos",
    cardNumber,
    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType,
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 0,
    imageFront: SOLD_OUT_IMAGE,
    imageBack: SOLD_OUT_IMAGE,
  }),
);

export default nintendoPromos;
