"use client";

import { type ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  revealKey: string;
};

const revealedCards = new Set<string>();
const STAGGER_DELAY_MS = 55;

export default function CatalogCardReveal({
  children,
  revealKey,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wasRevealed = revealedCards.has(revealKey);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    if (
      revealedCards.has(revealKey) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      card.dataset.revealed = "true";
      return;
    }

    let animationFrame: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const parent = card.parentElement;
        const rowCards = parent
          ? Array.from(parent.children).filter(
              (sibling) =>
                sibling instanceof HTMLElement &&
                Math.abs(sibling.offsetTop - card.offsetTop) < 2
            )
          : [];
        const columnIndex = Math.max(0, rowCards.indexOf(card));

        card.style.setProperty(
          "--catalog-reveal-delay",
          `${columnIndex * STAGGER_DELAY_MS}ms`
        );

        revealedCards.add(revealKey);
        observer.disconnect();

        animationFrame = requestAnimationFrame(() => {
          card.dataset.revealed = "true";
        });
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.12,
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [revealKey]);

  return (
    <div
      ref={cardRef}
      className="catalog-card-reveal h-full"
      data-revealed={wasRevealed ? "true" : undefined}
    >
      {children}
    </div>
  );
}
