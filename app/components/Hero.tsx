"use client";

import Image from "next/image";
import Link from "next/link";
import {
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getPokemonType } from "@/app/data/getPokemonType";
import ProductCard from "./ProductCard";

type HeroCard = {
  id: number;
  name: string;
  slug: string;
  set: string;
  cardNumber: string;
  price: number;
  imageFront: string;
  description?: string;
  pokemonType?: string;
};

type FeaturedCard = {
  id: number;
  slug: string;
  name: string;
  set?: string;
  cardNumber?: string;
  price: number;
  originalPrice?: number | null;
  imageFront?: string;
  isNew?: boolean;
  onSale?: boolean;
  stock?: number;
};

type HeroProps = {
  cards: HeroCard[];
  featuredCards?: FeaturedCard[];
  description?: string;
};

type TypeTheme = {
  button: string;
  dot: string;
  shadowRgb: string;
};

const SLIDE_INTERVAL = 4000;
const FADE_OUT_DURATION = 300;

const DEFAULT_THEME: TypeTheme = {
  button:
    "bg-gradient-to-r from-neutral-800 to-black text-white hover:from-neutral-700 hover:to-neutral-900",
  dot: "bg-neutral-800",
  shadowRgb: "82, 82, 82",
};

const TYPE_THEMES: Record<string, TypeTheme> = {
  Grass: {
    button:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500",
    dot: "bg-green-600",
    shadowRgb: "22, 163, 74",
  },

  Fire: {
    button:
      "bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-500 hover:to-red-400",
    dot: "bg-orange-600",
    shadowRgb: "234, 88, 12",
  },

  Water: {
    button:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400",
    dot: "bg-blue-600",
    shadowRgb: "37, 99, 235",
  },

  Lightning: {
    button:
      "bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 hover:from-amber-400 hover:to-yellow-300",
    dot: "bg-amber-500",
    shadowRgb: "245, 158, 11",
  },

  Psychic: {
    button:
      "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:from-purple-500 hover:to-fuchsia-400",
    dot: "bg-purple-600",
    shadowRgb: "147, 51, 234",
  },

  Fighting: {
    button:
      "bg-gradient-to-r from-amber-700 to-orange-700 text-white hover:from-amber-600 hover:to-orange-600",
    dot: "bg-amber-700",
    shadowRgb: "180, 83, 9",
  },

  Darkness: {
    button:
      "bg-gradient-to-r from-slate-800 to-neutral-950 text-white hover:from-slate-700 hover:to-neutral-800",
    dot: "bg-slate-800",
    shadowRgb: "51, 65, 85",
  },

  Metal: {
    button:
      "bg-gradient-to-r from-slate-500 to-zinc-600 text-white hover:from-slate-400 hover:to-zinc-500",
    dot: "bg-slate-600",
    shadowRgb: "100, 116, 139",
  },

  Dragon: {
    button:
      "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500",
    dot: "bg-indigo-600",
    shadowRgb: "79, 70, 229",
  },

  Fairy: {
    button:
      "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400",
    dot: "bg-pink-500",
    shadowRgb: "236, 72, 153",
  },

  Colorless: {
    button:
      "bg-gradient-to-r from-stone-600 to-neutral-700 text-white hover:from-stone-500 hover:to-neutral-600",
    dot: "bg-stone-600",
    shadowRgb: "87, 83, 78",
  },
};

export default function Hero({
  cards,
  featuredCards = [],
  description = "Find sjældne Pokémon-kort til samlingen. Vi udvælger nøje hvert kort, så du altid får kvalitet og flotte samleobjekter.",
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [slideDirection, setSlideDirection] = useState<
    "next" | "previous"
  >("next");

  const touchStartX = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);

  const cardCount = cards.length;

  const changeSlide = useCallback(
    (
      nextIndex: number,
      direction: "next" | "previous" = "next",
    ) => {
      if (
        cardCount <= 1 ||
        nextIndex === activeIndex ||
        isTransitioning
      ) {
        return;
      }

      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }

      setSlideDirection(direction);
      setIsTransitioning(true);
      setIsVisible(false);

      transitionTimer.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);

        window.requestAnimationFrame(() => {
          setIsVisible(true);
          setIsTransitioning(false);
        });
      }, FADE_OUT_DURATION);
    },
    [activeIndex, cardCount, isTransitioning],
  );

  useEffect(() => {
    if (cardCount <= 1 || isTransitioning) {
      return;
    }

    const autoSlideTimer = window.setTimeout(() => {
      const nextIndex =
        activeIndex === cardCount - 1
          ? 0
          : activeIndex + 1;

      changeSlide(nextIndex, "next");
    }, SLIDE_INTERVAL);

    return () => {
      window.clearTimeout(autoSlideTimer);
    };
  }, [
    activeIndex,
    cardCount,
    changeSlide,
    isTransitioning,
  ]);

  useEffect(() => {
    if (activeIndex >= cardCount && cardCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, cardCount]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  if (cardCount === 0) {
    return null;
  }

  const activeCard = cards[activeIndex];

  const detectedPokemonType = getPokemonType(
    activeCard.set,
    activeCard.cardNumber,
  );

  const pokemonType =
    activeCard.pokemonType ?? detectedPokemonType;

  const theme = pokemonType
    ? TYPE_THEMES[pokemonType] ?? DEFAULT_THEME
    : DEFAULT_THEME;

  const heroShadow = [
    `0 24px 65px -28px rgba(${theme.shadowRgb}, 0.34)`,
    `0 0 55px -30px rgba(${theme.shadowRgb}, 0.42)`,
    "0 18px 45px -28px rgba(0, 0, 0, 0.22)",
  ].join(", ");

  function showPreviousCard() {
    const previousIndex =
      activeIndex === 0
        ? cardCount - 1
        : activeIndex - 1;

    changeSlide(previousIndex, "previous");
  }

  function showNextCard() {
    const nextIndex =
      activeIndex === cardCount - 1
        ? 0
        : activeIndex + 1;

    changeSlide(nextIndex, "next");
  }

  function handleTouchStart(
    event: TouchEvent<HTMLElement>,
  ) {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(
    event: TouchEvent<HTMLElement>,
  ) {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX =
      event.changedTouches[0]?.clientX ??
      touchStartX.current;

    const distance =
      touchStartX.current - touchEndX;

    if (Math.abs(distance) >= 50) {
      if (distance > 0) {
        showNextCard();
      } else {
        showPreviousCard();
      }
    }

    touchStartX.current = null;
  }

  return (
    <section
      className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:mt-12 lg:px-8"
      aria-label="Fremhævede Pokémon-kort"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={[
          "relative overflow-hidden rounded-3xl",
          "bg-gradient-to-br from-neutral-50 via-white to-neutral-100",
          "transition-[box-shadow] duration-700 ease-in-out",
        ].join(" ")}
        style={{
          boxShadow: heroShadow,
        }}
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-all duration-700"
            style={{
              background: [
                `radial-gradient(circle at 18% 45%, rgba(${theme.shadowRgb}, 0.28), transparent 42%)`,
                `radial-gradient(circle at 82% 55%, rgba(${theme.shadowRgb}, 0.14), transparent 38%)`,
              ].join(", "),
            }}
          />

          {cardCount > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousCard}
                disabled={isTransitioning}
                aria-label="Vis forrige fremhævede kort"
                className={[
  "absolute left-3 top-1/2 z-20 hidden",
  "sm:left-5 lg:left-8",
                  "h-12 w-12 -translate-y-1/2 items-center justify-center",
                  "rounded-full border border-black/5",
                  "bg-white/90 text-2xl text-neutral-700",
                  "shadow-lg backdrop-blur",
                  "transition-all duration-300",
                  "hover:scale-110 hover:bg-white",
                  "disabled:cursor-default disabled:opacity-60",
                  "sm:flex lg:left-6",
                ].join(" ")}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={showNextCard}
                disabled={isTransitioning}
                aria-label="Vis næste fremhævede kort"
                className={[
                  "absolute right-3 top-1/2 z-20 hidden",
                  "h-12 w-12 -translate-y-1/2 items-center justify-center",
                  "rounded-full border border-black/5",
                  "bg-white/90 text-2xl text-neutral-700",
                  "shadow-lg backdrop-blur",
                  "transition-all duration-300",
                  "hover:scale-110 hover:bg-white",
                  "disabled:cursor-default disabled:opacity-60",
                  "sm:flex lg:right-6",
                ].join(" ")}
              >
                ›
              </button>
            </>
          )}

          <div
            className={[
              "relative z-10 grid grid-cols-[112px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8",
              "px-4 py-5 sm:px-10 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-8",
              "transition-all duration-500",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
              isVisible
                ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                : slideDirection === "next"
                  ? "translate-x-8 scale-[0.985] opacity-0 lg:translate-x-16"
                  : "-translate-x-8 scale-[0.985] opacity-0 lg:-translate-x-16",
            ].join(" ")}
          >
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative h-[170px] w-[112px] sm:h-[320px] sm:w-[220px] lg:h-[460px] lg:w-[332px]">
                <Image
                  key={activeCard.imageFront}
                  src={activeCard.imageFront}
                  alt={activeCard.name}
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 220px, 332px"
                  className={[
                    "object-contain drop-shadow-xl lg:scale-110 lg:drop-shadow-2xl",
                    "transition-transform duration-700 ease-out",
                    "lg:hover:scale-[1.15]",
                  ].join(" ")}
                  priority
                />
              </div>
            </div>

            <div className="order-2 min-w-0 text-left lg:order-1 lg:pl-12">
              <span className="inline-flex items-center rounded-full bg-white/75 px-2 py-1 text-[10px] font-semibold text-neutral-800 shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-base">
                ⭐ Fremhævet kort
              </span>

              <h1 className="mt-3 line-clamp-2 text-xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-6xl">
                {activeCard.name}
              </h1>

              <p className="mt-2 line-clamp-2 text-xs text-gray-500 sm:mt-4 sm:text-lg lg:text-xl">
                {activeCard.set} • {activeCard.cardNumber}
              </p>

              <p className="mt-6 hidden max-w-xl text-base leading-relaxed text-gray-600 sm:block sm:text-lg">
                {activeCard.description ?? description}
              </p>

              <p className="mt-3 text-lg font-bold sm:mt-8 sm:text-3xl lg:mt-10 lg:text-4xl">
                {activeCard.price.toLocaleString("da-DK")} kr.
              </p>

              <Link
                href={`/kort/${activeCard.slug}`}
                className={[
                  "mt-3 inline-flex items-center justify-center sm:mt-8",
                  "rounded-lg px-3 py-2 text-xs font-semibold shadow-lg sm:rounded-xl sm:px-8 sm:py-4 sm:text-base",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 hover:shadow-xl",
                  "active:translate-y-0",
                  theme.button,
                ].join(" ")}
              >
                Se kortet

                <span
                  aria-hidden="true"
                  className="ml-1 text-base sm:ml-2 sm:text-xl"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {cardCount > 1 && (
            <div className="relative z-20 flex items-center justify-center gap-2 pb-4 sm:pb-9">
              {cards.map((card, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${card.set}-${card.slug}-${card.cardNumber}`}
                    type="button"
                    onClick={() => changeSlide(index)}
                    disabled={
                      isActive || isTransitioning
                    }
                    aria-label={`Vis ${card.name}`}
                    aria-current={
                      isActive ? "true" : undefined
                    }
                    className={[
                      "h-2.5 rounded-full",
                      "transition-all duration-500 ease-out",
                      "disabled:cursor-default",
                      isActive
                        ? `w-8 ${theme.dot}`
                        : "w-2.5 bg-neutral-300 hover:bg-neutral-400",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>

        {featuredCards.length > 0 && (
          <div className="border-t border-neutral-200/80 bg-white/60 px-3 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <h2 className="mb-4 text-xl font-black sm:mb-8 sm:text-4xl">
              ⭐ Fremhævede kort
            </h2>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {featuredCards.map((card) => (
                <ProductCard
                  key={`${card.set}-${card.slug}-${card.cardNumber}`}
                  id={card.id}
                  slug={card.slug}
                  name={card.name}
                  set={card.set}
                  cardNumber={card.cardNumber}
                  price={card.price}
                  originalPrice={card.originalPrice}
                  imageFront={card.imageFront}
                  isNew={card.isNew}
                  onSale={card.onSale}
                  stock={card.stock}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}