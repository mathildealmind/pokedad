"use client";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

type FinishVariant = {
  finish?: string;
  stock?: number;
};

type ProductCardProps = {
  id: number;
  slug: string;
  name: string;
  set?: string;
  cardNumber?: string;
  price: number;
  originalPrice?: number | null;

  /*
   * Understøtter begge navne, så komponenten virker,
   * uanset om siden sender "imageFront" eller "image".
   */
  imageFront?: string;
  image?: string;

  isNew?: boolean;
  onSale?: boolean;
  stock?: number;

  /*
   * Bruges til finish-badges.
   */
  finish?: string;
  variants?: FinishVariant[];
};

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

function getFinishClass(finish: string): string {
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

export default function ProductCard({
  id,
  slug,
  name,
  set = "",
  cardNumber = "",
  price,
  originalPrice = null,
  imageFront,
  image,
  isNew = false,
  onSale = false,
  stock = 0,
  finish,
  variants = [],
}: ProductCardProps) {
  const resolvedImage =
    imageFront?.trim() ||
    image?.trim() ||
    "";

  const isSoldOut = stock === 0;

  const savings =
    originalPrice !== null &&
    originalPrice > price
      ? originalPrice - price
      : 0;

  const cardDetails = [
    set,
    cardNumber,
  ]
    .filter(Boolean)
    .join(" • ");

  /*
   * Samler hovedkortets finish og alle varianternes finishes.
   * Set bruges til at fjerne dubletter.
   */
  const availableFinishes = Array.from(
    new Set(
      [
        normalizeFinish(finish),
        ...variants.map((variant) =>
          normalizeFinish(variant.finish)
        ),
      ].filter(Boolean)
    )
  );

  /*
   * Holder badges i en fast og logisk rækkefølge.
   */
  const finishOrder = [
    "Normal",
    "Reverse Holo",
    "Holo",
    "Cosmos Holo",
  ];

  const sortedFinishes = [
    ...availableFinishes,
  ].sort((first, second) => {
    const firstIndex =
      finishOrder.indexOf(first);

    const secondIndex =
      finishOrder.indexOf(second);

    const safeFirstIndex =
      firstIndex === -1
        ? finishOrder.length
        : firstIndex;

    const safeSecondIndex =
      secondIndex === -1
        ? finishOrder.length
        : secondIndex;

    return safeFirstIndex - safeSecondIndex;
  });

  return (
    <Link
      href={`/kort/${slug}`}
      className="block h-full"
    >
      <div
        className={`group relative flex h-full cursor-pointer flex-col rounded-2xl bg-white p-3 sm:rounded-3xl sm:p-6 shadow-sm transition-all duration-300 ${
          isSoldOut
            ? "opacity-55 hover:opacity-70"
            : "hover:shadow-xl"
        }`}
      >
        {/* Favorit */}
        <div className="absolute right-2 top-2 z-20 sm:right-4 sm:top-4">
          <FavoriteButton
            id={id}
            slug={slug}
            name={name}
            price={price}
            image={resolvedImage}
            set={set}
            cardNumber={cardNumber}
          />
        </div>

        {/* Statusbadges */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
              NY
            </span>
          )}

          {onSale && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              TILBUD
            </span>
          )}

          {stock === 1 && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              SIDSTE
            </span>
          )}

          {isSoldOut && (
            <span className="rounded-full bg-gray-500 px-3 py-1 text-xs font-bold text-white">
              UDSOLGT
            </span>
          )}
        </div>

        {/* Kortbillede */}
        <div className="relative aspect-[2.5/3.5] w-full">
          {resolvedImage ? (
            <Image
              src={resolvedImage}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-contain transition duration-300 ${
                isSoldOut
                  ? "grayscale-[35%]"
                  : "group-hover:scale-105"
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 px-4 text-center">
              <div>
                <p
                  className="text-4xl"
                  aria-hidden="true"
                >
                  🎴
                </p>

                <p className="mt-3 text-sm font-semibold text-gray-500">
                  Billede kommer snart
                </p>
              </div>
            </div>
          )}
        </div>

        <h3
          className={`mt-3 text-sm font-bold sm:mt-6 sm:text-xl ${
            isSoldOut
              ? "text-gray-600"
              : ""
          }`}
        >
          {name}
        </h3>

        {cardDetails && (
          <p
            className={`mt-1 text-[11px] sm:mt-2 sm:text-sm ${
              isSoldOut
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {cardDetails}
          </p>
        )}

        {/* Finish-badges */}
        {sortedFinishes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {sortedFinishes.map(
              (finishName) => (
                <span
                  key={finishName}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none shadow-sm ${getFinishClass(
                    finishName
                  )}`}
                >
                  {finishName}
                </span>
              )
            )}
          </div>
        )}

        {/* Pris */}
        <div className="mt-4">
          {originalPrice !== null &&
            originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                {originalPrice.toLocaleString(
                  "da-DK"
                )}{" "}
                kr.
              </p>
            )}

          <p
            className={`text-xl font-bold sm:text-3xl ${
              isSoldOut
                ? "text-gray-500"
                : ""
            }`}
          >
            {price.toLocaleString(
              "da-DK"
            )}{" "}
            kr.
          </p>

          {savings > 0 && (
            <p className="mt-1 text-sm font-semibold text-green-600">
              Spar{" "}
              {savings.toLocaleString(
                "da-DK"
              )}{" "}
              kr.
            </p>
          )}
        </div>

        <p
          className={`mt-3 text-sm font-medium ${
            isSoldOut
              ? "text-gray-500"
              : stock === 1
                ? "text-orange-600"
                : "text-green-600"
          }`}
        >
          {isSoldOut
            ? "Udsolgt"
            : stock === 1
              ? "Kun 1 tilbage"
              : `${stock} på lager`}
        </p>
      </div>
    </Link>
  );
}