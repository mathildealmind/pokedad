import {
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonCard,
  PokemonType,
} from "../types";

export const baseSet: PokemonCard[] = [
  {
    id: 900012,
    slug: "ninetales-012",
    name: "Ninetales",
    series: "base-series",
    set: "base-set",
    cardNumber: "012/102",
    rarity: CardRarity.Rare,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.Poor,
    price: 0,
    stock: 1,
    imageFront: "/series/base-series/base-set/012-ninetales-holo.webp",
    imageBack: "/series/base-series/base-set/012-ninetales-holo-back.webp",
    dateAdded: "2026-08-13",
  },
];

export default baseSet;
