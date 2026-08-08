import {
  PokemonCard,
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonType,
} from "../types";

export const promos: PokemonCard[] = [
  {
    id: 2,
    slug: "entei-promo-34",
    name: "Entei",
    series: "promos",
    set: "promos",
    cardNumber: "PROMO-34",
    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.NearMint,
    price: 45,
    originalPrice: null,
    stock: 0,
    imageFront: "/series/promos/034-entei-promo.webp",
    imageBack: "/series/promos/034-entei-promo-back.webp",
    dateAdded: "2026-07-29",
    isNew: true,
    onSale: false,
    featured: true,
  },
];

export default promos;
