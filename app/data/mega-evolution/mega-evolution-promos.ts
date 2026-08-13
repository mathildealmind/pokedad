import {
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonCard,
  PokemonType,
} from "../types";

export const megaEvolutionPromos: PokemonCard[] = [
  {
    id: 2400035,
    slug: "mega-emboar-ex-mep035",
    name: "Mega Emboar ex",
    series: "mega-evolution",
    set: "mega-evolution-promos",
    cardNumber: "MEP035",
    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 1,
    imageFront:
      "/series/mega-evolution/mega-evolution-promos/MEP035-mega-emboar-ex.webp",
    imageBack:
      "/series/mega-evolution/mega-evolution-promos/MEP035-mega-emboar-ex-back.webp",
    dateAdded: "2026-08-13",
  },
  {
    id: 2400080,
    slug: "fennekin-mep080",
    name: "Fennekin",
    series: "mega-evolution",
    set: "mega-evolution-promos",
    cardNumber: "MEP080",
    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fire,
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 1,
    imageFront:
      "/series/mega-evolution/mega-evolution-promos/MEP080-fennekin.webp",
    imageBack:
      "/series/mega-evolution/mega-evolution-promos/MEP080-fennekin-back.webp",
    dateAdded: "2026-08-13",
  },
  {
    id: 2400087,
    slug: "binacle-mep087",
    name: "Binacle",
    series: "mega-evolution",
    set: "mega-evolution-promos",
    cardNumber: "MEP087",
    rarity: CardRarity.Promo,
    finish: CardFinish.Holo,
    pokemonType: PokemonType.Fighting,
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 1,
    imageFront:
      "/series/mega-evolution/mega-evolution-promos/MEP087-binacle.webp",
    imageBack:
      "/series/mega-evolution/mega-evolution-promos/MEP087-binacle-back.webp",
    dateAdded: "2026-08-13",
  },
];

export default megaEvolutionPromos;
