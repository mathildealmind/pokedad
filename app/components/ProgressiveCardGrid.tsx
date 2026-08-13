"use client";

import { useMemo, useState } from "react";
import type { PokemonCard } from "@/app/data/types";
import { useProgressiveItems } from "@/app/hooks/useProgressiveItems";
import CardCard from "./CardCard";

type Props = {
  cards: PokemonCard[];
  className?: string;
};

function getCardStock(card: PokemonCard): number {
  if (card.variants && card.variants.length > 0) {
    return card.variants.reduce(
      (sum, variant) =>
        sum + Math.max(0, variant.stock ?? 0),
      0
    );
  }

  return Math.max(0, card.stock);
}

export default function ProgressiveCardGrid({
  cards,
  className = "",
}: Props) {
  const [showSoldOut, setShowSoldOut] = useState(false);

  const filteredCards = useMemo(() => {
    if (showSoldOut) {
      return cards;
    }

    return cards.filter((card) => getCardStock(card) > 0);
  }, [cards, showSoldOut]);

  const {
    loadMoreRef,
    visibleItems: visibleCards,
    visibleCount,
    resetProgress,
  } = useProgressiveItems(filteredCards);

  function toggleSoldOut() {
    setShowSoldOut((currentValue) => !currentValue);
    resetProgress();
  }

  return (
    <div className={className}>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          aria-pressed={showSoldOut}
          onClick={toggleSoldOut}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold transition hover:border-gray-500 hover:bg-gray-50"
        >
          {showSoldOut
            ? "Skjul udsolgte"
            : "Vis udsolgte"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCards.map((card) => (
          <CardCard
            key={`${card.series}-${card.set}-${card.slug}-${card.cardNumber}`}
            card={card}
          />
        ))}
      </div>

      {visibleCount < filteredCards.length && (
        <div
          ref={loadMoreRef}
          className="h-px w-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
