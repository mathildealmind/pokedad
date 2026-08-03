import {
  CardFinish,
  type CardVariant,
  type PokemonCard,
} from "./types";

export const FINISH_ORDER: CardFinish[] = [
  CardFinish.Normal,
  CardFinish.ReverseHolo,
  CardFinish.Holo,
  CardFinish.CosmosHolo,
  CardFinish.PokeBallHolo,
  CardFinish.MasterBallHolo,
];

export function getCardVariants(card: PokemonCard): CardVariant[] {
  if (card.variants && card.variants.length > 0) {
    return card.variants;
  }

  return [
    {
      finish: card.finish,
      price: card.price,
      originalPrice: card.originalPrice,
      stock: card.stock,
      imageFront: card.imageFront,
      imageBack: card.imageBack,
    },
  ];
}

export function getCardFinishes(card: PokemonCard): CardFinish[] {
  const finishes = new Set(
    getCardVariants(card).map((variant) => variant.finish)
  );

  return [...finishes].sort((first, second) => {
    const firstIndex = FINISH_ORDER.indexOf(first);
    const secondIndex = FINISH_ORDER.indexOf(second);

    return (
      (firstIndex === -1 ? FINISH_ORDER.length : firstIndex) -
      (secondIndex === -1 ? FINISH_ORDER.length : secondIndex)
    );
  });
}

export function getCardStock(card: PokemonCard): number {
  return getCardVariants(card).reduce(
    (total, variant) => total + Math.max(0, variant.stock),
    0
  );
}

export function isCardSoldOut(card: PokemonCard): boolean {
  return getCardStock(card) === 0;
}
