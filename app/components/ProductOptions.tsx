"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type {
  CardVariant,
  PokemonCard,
  PokemonType,
} from "@/app/data/types";
import { getPokemonType } from "@/app/data/getPokemonType";
import AddToCartButton from "@/app/components/AddToCartButton";
import ImageZoom from "@/app/components/ImageZoom";

type Props = {
  card: PokemonCard;
};

type TypeTheme = {
  normalBackground: string;
  selectedBackground: string;
  border: string;
  selectedBorder: string;
  text: string;
  selectedText: string;
  ring: string;
  glow: string;
};

const DEFAULT_TYPE_THEME: TypeTheme = {
  normalBackground:
    "linear-gradient(135deg, rgba(248, 248, 248, 0.98), rgba(235, 237, 240, 0.96))",
  selectedBackground:
    "linear-gradient(135deg, rgba(64, 71, 87, 0.98), rgba(31, 38, 52, 0.98))",
  border: "rgba(156, 163, 175, 0.42)",
  selectedBorder: "rgba(31, 41, 55, 0.8)",
  text: "#374151",
  selectedText: "#ffffff",
  ring: "rgba(107, 114, 128, 0.18)",
  glow: "rgba(107, 114, 128, 0.2)",
};

const TYPE_THEMES: Record<PokemonType, TypeTheme> = {
  Grass: {
    normalBackground:
      "linear-gradient(135deg, rgba(235, 247, 237, 0.98), rgba(205, 232, 211, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(79, 151, 94, 0.98), rgba(44, 108, 60, 0.98))",
    border: "rgba(76, 139, 90, 0.38)",
    selectedBorder: "rgba(43, 103, 59, 0.85)",
    text: "#2e6b3d",
    selectedText: "#ffffff",
    ring: "rgba(74, 145, 88, 0.2)",
    glow: "rgba(66, 135, 83, 0.24)",
  },

  Fire: {
    normalBackground:
      "linear-gradient(135deg, rgba(253, 239, 231, 0.98), rgba(248, 212, 194, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(213, 102, 61, 0.98), rgba(170, 62, 35, 0.98))",
    border: "rgba(201, 86, 48, 0.38)",
    selectedBorder: "rgba(165, 59, 35, 0.85)",
    text: "#9b422a",
    selectedText: "#ffffff",
    ring: "rgba(207, 91, 53, 0.2)",
    glow: "rgba(203, 87, 54, 0.24)",
  },

  Water: {
    normalBackground:
      "linear-gradient(135deg, rgba(234, 244, 252, 0.98), rgba(203, 226, 243, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(69, 137, 190, 0.98), rgba(40, 94, 142, 0.98))",
    border: "rgba(60, 126, 178, 0.38)",
    selectedBorder: "rgba(42, 92, 137, 0.85)",
    text: "#306b98",
    selectedText: "#ffffff",
    ring: "rgba(65, 126, 174, 0.2)",
    glow: "rgba(65, 126, 174, 0.24)",
  },

  Lightning: {
    normalBackground:
      "linear-gradient(135deg, rgba(255, 250, 226, 0.98), rgba(247, 229, 157, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(219, 181, 47, 0.98), rgba(172, 135, 20, 0.98))",
    border: "rgba(202, 162, 32, 0.4)",
    selectedBorder: "rgba(169, 132, 18, 0.85)",
    text: "#80640f",
    selectedText: "#ffffff",
    ring: "rgba(210, 171, 42, 0.2)",
    glow: "rgba(210, 171, 42, 0.24)",
  },

  Psychic: {
    normalBackground:
      "linear-gradient(135deg, rgba(248, 237, 248, 0.98), rgba(228, 204, 228, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(156, 89, 155, 0.98), rgba(108, 58, 111, 0.98))",
    border: "rgba(147, 80, 146, 0.38)",
    selectedBorder: "rgba(105, 57, 108, 0.85)",
    text: "#78467a",
    selectedText: "#ffffff",
    ring: "rgba(145, 82, 145, 0.2)",
    glow: "rgba(145, 82, 145, 0.24)",
  },

  Fighting: {
    normalBackground:
      "linear-gradient(135deg, rgba(248, 238, 227, 0.98), rgba(226, 199, 169, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(169, 111, 68, 0.98), rgba(116, 74, 43, 0.98))",
    border: "rgba(151, 97, 56, 0.38)",
    selectedBorder: "rgba(112, 72, 43, 0.85)",
    text: "#754d2f",
    selectedText: "#ffffff",
    ring: "rgba(155, 101, 62, 0.2)",
    glow: "rgba(155, 101, 62, 0.24)",
  },

  Darkness: {
    normalBackground:
      "linear-gradient(135deg, rgba(238, 239, 242, 0.98), rgba(208, 211, 218, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(75, 78, 89, 0.98), rgba(37, 39, 46, 0.98))",
    border: "rgba(70, 73, 83, 0.38)",
    selectedBorder: "rgba(37, 39, 46, 0.85)",
    text: "#41444e",
    selectedText: "#ffffff",
    ring: "rgba(69, 72, 82, 0.2)",
    glow: "rgba(69, 72, 82, 0.24)",
  },

  Metal: {
    normalBackground:
      "linear-gradient(135deg, rgba(243, 247, 248, 0.98), rgba(212, 221, 224, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(118, 135, 142, 0.98), rgba(76, 88, 94, 0.98))",
    border: "rgba(107, 124, 131, 0.38)",
    selectedBorder: "rgba(76, 88, 94, 0.85)",
    text: "#55666d",
    selectedText: "#ffffff",
    ring: "rgba(111, 126, 132, 0.2)",
    glow: "rgba(111, 126, 132, 0.24)",
  },

  Dragon: {
    normalBackground:
      "linear-gradient(135deg, rgba(255, 248, 219, 0.98), rgba(247, 222, 143, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, #e7b92f, #c89000)",
    border: "rgba(200, 144, 0, 0.42)",
    selectedBorder: "rgba(168, 118, 0, 0.9)",
    text: "#7a5700",
    selectedText: "#ffffff",
    ring: "rgba(214, 163, 12, 0.22)",
    glow: "rgba(214, 163, 12, 0.32)",
  },

  Fairy: {
    normalBackground:
      "linear-gradient(135deg, rgba(254, 239, 247, 0.98), rgba(244, 210, 228, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(204, 110, 157, 0.98), rgba(154, 72, 114, 0.98))",
    border: "rgba(192, 98, 145, 0.38)",
    selectedBorder: "rgba(151, 70, 111, 0.85)",
    text: "#984870",
    selectedText: "#ffffff",
    ring: "rgba(195, 102, 148, 0.2)",
    glow: "rgba(195, 102, 148, 0.24)",
  },

  Colorless: {
    normalBackground:
      "linear-gradient(135deg, rgba(250, 248, 243, 0.98), rgba(228, 223, 212, 0.96))",
    selectedBackground:
      "linear-gradient(135deg, rgba(145, 138, 123, 0.98), rgba(99, 93, 82, 0.98))",
    border: "rgba(135, 127, 111, 0.38)",
    selectedBorder: "rgba(98, 92, 81, 0.85)",
    text: "#696255",
    selectedText: "#ffffff",
    ring: "rgba(139, 132, 118, 0.2)",
    glow: "rgba(139, 132, 118, 0.24)",
  },
};

export default function ProductOptions({ card }: Props) {
  const availableVariants = useMemo<CardVariant[]>(() => {
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
  }, [card]);

  const [selectedVariantIndex, setSelectedVariantIndex] =
    useState(0);

  const selectedVariant =
    availableVariants[selectedVariantIndex] ??
    availableVariants[0];

  const resolvedPokemonType = getPokemonType(
    card.set,
    card.cardNumber,
    card.pokemonType
  );

  const typeTheme = resolvedPokemonType
    ? TYPE_THEMES[resolvedPokemonType]
    : DEFAULT_TYPE_THEME;

  return (
    <div className="grid gap-16 lg:grid-cols-2">
      {/* Kortbilleder */}
      <div className="flex justify-center">
        <ImageZoom
          frontImage={selectedVariant.imageFront}
          backImage={selectedVariant.imageBack}
          alt={`${card.name} – ${selectedVariant.finish}`}
        />
      </div>

      {/* Produktinformation */}
      <div>
        <h1 className="text-5xl font-black">
          {card.name}
        </h1>

        <p className="mt-3 text-2xl text-gray-500">
          {card.set} • {card.cardNumber}
        </p>

        {/* Variantknapper */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
            Vælg finish
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {availableVariants.map((variant, index) => {
              const isSelected =
                index === selectedVariantIndex;

              const isOutOfStock =
                variant.stock <= 0;

              const buttonStyle = {
                background: isSelected
                  ? typeTheme.selectedBackground
                  : typeTheme.normalBackground,

                borderColor: isSelected
                  ? typeTheme.selectedBorder
                  : typeTheme.border,

                color: isSelected
                  ? typeTheme.selectedText
                  : typeTheme.text,

                boxShadow: isSelected
                  ? `0 12px 28px ${typeTheme.glow}, 0 0 0 4px ${typeTheme.ring}`
                  : undefined,

                "--tw-ring-color":
                  typeTheme.ring,
              } as CSSProperties;

              return (
                <button
                  key={`${variant.finish}-${index}`}
                  type="button"
                  data-finish={variant.finish}
                  onClick={() =>
                    setSelectedVariantIndex(index)
                  }
                  aria-pressed={isSelected}
                  className={[
                    "group relative min-h-14 overflow-hidden rounded-2xl border px-5 py-3.5 text-left",
                    "transition-all duration-300 ease-out",
                    "focus-visible:outline-none focus-visible:ring-4",

                    isSelected
                      ? "-translate-y-0.5 shadow-lg"
                      : "shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.985]",

                    isOutOfStock
                      ? "opacity-55"
                      : "",
                  ].join(" ")}
                  style={buttonStyle}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45"
                  />

                  <span className="relative z-10 block">
                    <span className="block text-base font-semibold tracking-[-0.01em]">
                      {variant.finish}
                    </span>

                    {isOutOfStock && (
                      <span
                        className={[
                          "mt-0.5 block text-xs font-medium",

                          isSelected
                            ? "text-white/70"
                            : "opacity-65",
                        ].join(" ")}
                      >
                        Udsolgt
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pris */}
        <div className="mt-8">
          {selectedVariant.originalPrice &&
          selectedVariant.originalPrice >
            selectedVariant.price ? (
            <div className="flex flex-wrap items-end gap-4">
              <p className="text-5xl font-bold">
                {selectedVariant.price.toLocaleString(
                  "da-DK"
                )}{" "}
                kr.
              </p>

              <p className="pb-1 text-2xl text-gray-400 line-through">
                {selectedVariant.originalPrice.toLocaleString(
                  "da-DK"
                )}{" "}
                kr.
              </p>
            </div>
          ) : (
            <p className="text-5xl font-bold">
              {selectedVariant.price.toLocaleString(
                "da-DK"
              )}{" "}
              kr.
            </p>
          )}
        </div>

        {/* Læg i kurv */}
        <div className="mt-8">
          <AddToCartButton
            id={card.id}
            name={card.name}
            price={selectedVariant.price}
            image={selectedVariant.imageFront}
            finish={selectedVariant.finish}
            stock={selectedVariant.stock}
            pokemonType={resolvedPokemonType}
          />
        </div>

        {/* Kortinformation */}
        <div className="mt-12 border-t pt-8">
          <h2 className="mb-6 text-2xl font-bold">
            Kortinformation
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Serie
              </span>

              <span className="text-right">
                {card.series}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Sæt
              </span>

              <span className="text-right">
                {card.set}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Kortnummer
              </span>

              <span className="text-right">
                {card.cardNumber}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Sjældenhed
              </span>

              <span className="text-right">
                {card.rarity}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Finish
              </span>

              <span className="text-right font-semibold">
                {selectedVariant.finish}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Sprog
              </span>

              <span className="text-right">
                {card.language}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Stand
              </span>

              <span className="text-right">
                {card.condition}
              </span>
            </div>

            <div className="flex justify-between gap-6">
              <span className="text-gray-500">
                Lager
              </span>

              <span
                className={
                  selectedVariant.stock > 0
                    ? "font-semibold text-green-700"
                    : "font-semibold text-red-600"
                }
              >
                {selectedVariant.stock > 0
                  ? `${selectedVariant.stock} stk.`
                  : "Udsolgt"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}