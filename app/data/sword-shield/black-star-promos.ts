import {
  PokemonCard,
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonType,
} from "../types";

export const blackStarPromos: PokemonCard[] = [
  {
    id: 1,
    slug: "charizard-v-swsh050",

    name: "Charizard V",

    series: "sword-shield",
    set: "black-star-promos",

    cardNumber: "SWSH050",

    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.NearMint,

    price: 300,
    originalPrice: null,
    stock: 1,

    imageFront: "/cards/IMG_7339.png",
    imageBack: "/series/2142.jpg",

    isNew: true,
    onSale: false,
    featured: true,
  },

  {
    id: 2,
    slug: "entei-promo-34",

    name: "Entei",

    series: "sword-shield",
    set: "black-star-promos",

    cardNumber: "PROMO-34",

    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.NearMint,

    price:45,
    originalPrice: null,
    stock: 0,

    imageFront:
      "/series/sword-shield/black-star-promos/entei-promo-34.png",
    imageBack:
      "/series/sword-shield/black-star-promos/entei-promo-34 back.png",

    dateAdded: "2026-07-29",

    isNew: true,
    onSale: false,
    featured: true,
  },
];