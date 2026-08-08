"use client";

import Image from "next/image";
import Link from "next/link";
import type { PokemonType } from "@/app/data/types";
import FavoriteButton from "./FavoriteButton";
import TiltCard from "./TiltCard";

type CardVariant = {
  finish: string;
  price?: number;
  originalPrice?: number | null;
  stock: number;
  imageFront?: string;
  imageBack?: string;
};

type Card = {
  id: number;
  slug: string;
  name: string;

  set?: string;
  cardNumber?: string;
  pokemonType?: PokemonType;
  subtitle?: string;

  price: number;
  originalPrice?: number | null;

  /*
   * Understøtter begge billedfelter.
   *
   * PokemonCard bruger imageFront.
   * Ældre kortdata kan bruge image.
   */
  imageFront?: string;
  image?: string;

  rarity: string;
  condition: string;

  finish?: string;
  variants?: CardVariant[];

  stock: number;

  isNew?: boolean;
  onSale?: boolean;
};

type Props = {
  card: Card;
};

const SOLD_OUT_IMAGE = "/placeholders/udsolgt.webp";

const FINISH_ORDER = [
  "Normal",
  "Reverse Holo",
  "Holo",
  "Cosmos Holo",
];

function normalizeFinish(finish?: string): string {
  if (!finish) {
    return "";
  }

  const value = String(finish)
    .replace(/^CardFinish\./, "")
    .trim();

  switch (value.toLowerCase()) {
    case "normal":
      return "Normal";

    case "reverseholo":
    case "reverse holo":
    case "reverse-holo":
      return "Reverse Holo";

    case "holo":
      return "Holo";

    case "cosmosholo":
    case "cosmos holo":
    case "cosmos-holo":
      return "Cosmos Holo";

    default:
      return value;
  }
}

function getFinishBadgeClass(finish: string): string {
  switch (finish) {
    case "Reverse Holo":
      return [
        "border-fuchsia-200",
        "bg-gradient-to-r",
        "from-pink-50",
        "via-cyan-50",
        "to-violet-50",
        "text-violet-700",
      ].join(" ");

    case "Holo":
      return [
        "border-orange-200",
        "bg-gradient-to-r",
        "from-orange-50",
        "via-amber-50",
        "to-rose-50",
        "text-orange-700",
      ].join(" ");

    case "Cosmos Holo":
      return [
        "border-indigo-200",
        "bg-gradient-to-r",
        "from-indigo-50",
        "via-sky-50",
        "to-fuchsia-50",
        "text-indigo-700",
      ].join(" ");

    case "Normal":
    default:
      return "border-gray-200 bg-gray-50 text-gray-600";
  }
}

export default function CardCard({ card }: Props) {
  /*
   * Hvis variants findes, indeholder de alle salgbare finishes.
   * Ellers bruger vi hovedkortets egne oplysninger.
   */
  const availableVariants =
    card.variants && card.variants.length > 0
      ? card.variants
      : [
          {
            finish: card.finish ?? "",
            stock: card.stock,
          },
        ];

  const availableFinishes = Array.from(
    new Set(
      availableVariants
        .map((variant) => normalizeFinish(variant.finish))
        .filter(Boolean)
    )
  ).sort((first, second) => {
    const firstIndex = FINISH_ORDER.indexOf(first);
    const secondIndex = FINISH_ORDER.indexOf(second);

    return (
      (firstIndex === -1 ? FINISH_ORDER.length : firstIndex) -
      (secondIndex === -1 ? FINISH_ORDER.length : secondIndex)
    );
  });

  /*
   * Kortet regnes som på lager, hvis mindst én finish er på lager.
   */
  const totalStock = availableVariants.reduce(
    (sum, variant) => sum + Math.max(0, variant.stock ?? 0),
    0
  );

  const isSoldOut = totalStock === 0;

  /*
   * Brug først imageFront.
   * Hvis det ikke findes, prøv image.
   * Hvis ingen af dem findes, brug udsolgt-billedet.
   */
  const resolvedImage =
    card.imageFront?.trim() ||
    card.image?.trim() ||
    SOLD_OUT_IMAGE;

  /*
   * Hvis der allerede findes en subtitle, bruger vi den.
   * Ellers bygger vi den ud fra sæt + kortnummer.
   */
  const resolvedSubtitle =
    card.subtitle?.trim() ||
    [card.set, card.cardNumber].filter(Boolean).join(" • ");

  const discount =
    card.onSale && card.originalPrice
      ? Math.round(
          ((card.originalPrice - card.price) /
            card.originalPrice) *
            100
        )
      : 0;

  return (
    <TiltCard className="h-full">
      <Link
        href={`/kort/${card.slug}`}
        className={`group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 ${
        isSoldOut
          ? "opacity-[0.35] hover:opacity-[0.5]"
          : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      {/* Billede */}
      <div className="relative h-32 bg-gray-100 sm:h-72">
        {/* Favorit */}
        <div className="absolute right-1 top-1 z-20 sm:right-3 sm:top-3">
          <FavoriteButton
            id={card.id}
            slug={card.slug}
            name={card.name}
            price={card.price}
            image={resolvedImage}
            set={card.set ?? ""}
            cardNumber={card.cardNumber ?? ""}
            pokemonType={card.pokemonType}
          />
        </div>

        <Image
          src={resolvedImage}
          alt={card.name}
          fill
          className={`object-contain p-4 transition duration-300 ${
            isSoldOut
              ? "grayscale"
              : "group-hover:scale-105"
          }`}
          sizes="(max-width: 640px) 33vw,
                 (max-width: 1024px) 50vw,
                 (max-width: 1280px) 33vw,
                 25vw"
        />

        {/* Statusbadges */}
        <div className="absolute left-1 top-1 flex flex-col gap-1 sm:left-3 sm:top-3 sm:gap-2">
          {isSoldOut && (
            <span className="rounded-full bg-gray-700 px-1.5 py-0.5 text-[8px] font-bold text-white sm:px-3 sm:py-1 sm:text-xs">
              UDSOLGT
            </span>
          )}

          {!isSoldOut && card.onSale && (
            <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white sm:px-3 sm:py-1 sm:text-xs">
              -{discount}%
            </span>
          )}

          {!isSoldOut && card.isNew && (
            <span className="rounded-full bg-green-600 px-1.5 py-0.5 text-[8px] font-bold text-white sm:px-3 sm:py-1 sm:text-xs">
              NY
            </span>
          )}
        </div>
      </div>

      {/* Information */}
      <div className="p-2 sm:p-5">
        <h2
          className={`line-clamp-1 text-sm font-bold sm:text-lg ${
            isSoldOut ? "text-gray-500" : ""
          }`}
        >
          {card.name}
        </h2>

        {resolvedSubtitle && (
          <p className="mt-1 line-clamp-1 text-[11px] text-gray-500 sm:text-sm">
            {resolvedSubtitle}
          </p>
        )}

        <p className="mt-2 text-[9px] text-gray-500 sm:mt-3 sm:text-sm">
          {card.rarity}
        </p>

        <p className="text-[9px] text-gray-500 sm:text-sm">
          {card.condition}
        </p>

        {/* Finish-badges */}
        {availableFinishes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
            {availableFinishes.map((finishName) => (
              <span
                key={finishName}
                className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-bold leading-none shadow-sm sm:px-2.5 sm:py-1 sm:text-[11px] ${getFinishBadgeClass(
                  finishName
                )}`}
              >
                {finishName}
              </span>
            ))}
          </div>
        )}

        {/* Pris */}
        <div className="mt-3 sm:mt-5">
          <div className="flex items-end gap-2">
            <span
              className={`text-lg font-bold sm:text-2xl ${
                isSoldOut ? "text-gray-500" : ""
              }`}
            >
              {card.price.toLocaleString("da-DK")} kr.
            </span>

            {card.onSale &&
              card.originalPrice !== null &&
              card.originalPrice !== undefined && (
                <span className="text-sm text-gray-400 line-through">
                  {card.originalPrice.toLocaleString("da-DK")} kr.
                </span>
              )}
          </div>
        </div>

        {/* Lager */}
        <div className="mt-2 flex flex-col items-start gap-1 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
          {!isSoldOut ? (
            <span className="text-[9px] font-semibold text-green-600 sm:text-sm">
              {totalStock} på lager
            </span>
          ) : (
            <span className="text-[9px] font-semibold text-gray-500 sm:text-sm">
              Udsolgt
            </span>
          )}

          <span
            className={`text-[9px] font-semibold transition sm:text-base ${
              isSoldOut
                ? "text-gray-400"
                : "text-red-600 group-hover:translate-x-1"
            }`}
          >
            Se kort →
          </span>
        </div>
      </div>
      </Link>
    </TiltCard>
  );
}
