"use client";

import type { PokemonCard } from "@/app/data/types";
import { useProgressiveItems } from "@/app/hooks/useProgressiveItems";
import CardCard from "./CardCard";

type Props = {
  cards: PokemonCard[];
  className?: string;
};

export default function ProgressiveCardGrid({
  cards,
  className = "",
}: Props) {
  const {
    loadMoreRef,
    visibleItems: visibleCards,
    visibleCount,
  } = useProgressiveItems(cards);

  return (
    <>
      <div
        className={`grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      >
        {visibleCards.map((card, index) => (
          <div
            key={`${card.series}-${card.set}-${card.slug}-${card.cardNumber}`}
            className="catalog-card-enter h-full"
            style={{ animationDelay: `${(index % 24) * 15}ms` }}
          >
            <CardCard card={card} />
          </div>
        ))}
      </div>

      {visibleCount < cards.length && (
        <div
          ref={loadMoreRef}
          className="h-px w-full"
          aria-hidden="true"
        />
      )}
    </>
  );
}
