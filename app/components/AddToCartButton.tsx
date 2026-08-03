"use client";

import { useCart } from "../context/CartContext2";
import type { PokemonType } from "../data/types";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  finish: string;
  stock: number;
  pokemonType?: PokemonType;
};

const BUTTON_COLORS: Record<
  PokemonType,
  {
    background: string;
    hover: string;
    shadow: string;
  }
> = {
  Grass: {
    background: "linear-gradient(135deg,#5a9d62,#3b7a46)",
    hover: "linear-gradient(135deg,#67ab6e,#44854f)",
    shadow: "rgba(74,145,88,.35)",
  },

  Fire: {
    background: "linear-gradient(135deg,#dc6a3f,#b74c2a)",
    hover: "linear-gradient(135deg,#e9784f,#c85d37)",
    shadow: "rgba(220,106,63,.35)",
  },

  Water: {
    background: "linear-gradient(135deg,#4d95d6,#2f6ea7)",
    hover: "linear-gradient(135deg,#5aa4e4,#3b7cba)",
    shadow: "rgba(77,149,214,.35)",
  },

  Lightning: {
    background: "linear-gradient(135deg,#dcb437,#b28d14)",
    hover: "linear-gradient(135deg,#e8c548,#c49d1c)",
    shadow: "rgba(220,180,55,.35)",
  },

  Psychic: {
    background: "linear-gradient(135deg,#b06ab2,#884d8b)",
    hover: "linear-gradient(135deg,#be79c0,#97589a)",
    shadow: "rgba(176,106,178,.35)",
  },

  Fighting: {
    background: "linear-gradient(135deg,#b07b55,#845735)",
    hover: "linear-gradient(135deg,#bd8862,#926341)",
    shadow: "rgba(176,123,85,.35)",
  },

  Darkness: {
    background: "linear-gradient(135deg,#545964,#353944)",
    hover: "linear-gradient(135deg,#646975,#444955)",
    shadow: "rgba(84,89,100,.35)",
  },

  Metal: {
    background: "linear-gradient(135deg,#909ea7,#697780)",
    hover: "linear-gradient(135deg,#9cabb4,#75848d)",
    shadow: "rgba(144,158,167,.35)",
  },

  Dragon: {
    background: "linear-gradient(135deg,#e7b92f,#c89000)",
    hover: "linear-gradient(135deg,#f2c94c,#d6a30c)",
    shadow: "rgba(214,163,12,.35)",
  },

  Fairy: {
    background: "linear-gradient(135deg,#d779aa,#af5b87)",
    hover: "linear-gradient(135deg,#e588b7,#be6995)",
    shadow: "rgba(215,121,170,.35)",
  },

  Colorless: {
    background: "linear-gradient(135deg,#9d9586,#736c61)",
    hover: "linear-gradient(135deg,#aca394,#81796d)",
    shadow: "rgba(157,149,134,.35)",
  },
};

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  finish,
  stock,
  pokemonType,
}: Props) {
  const { addToCart } = useCart();

  const isOutOfStock = stock <= 0;

  const theme = pokemonType
    ? BUTTON_COLORS[pokemonType]
    : null;

  return (
    <button
      type="button"
      data-finish={finish}
      disabled={isOutOfStock}
      onClick={() =>
        addToCart({
          id,
          name,
          price,
          image,
          finish,
        })
      }
      className={[
        "w-full rounded-2xl py-4 font-semibold text-white",
        "transition-all duration-300",
        isOutOfStock
          ? "cursor-not-allowed bg-gray-400"
          : "hover:-translate-y-0.5 active:translate-y-0",
      ].join(" ")}
      style={
        !isOutOfStock
          ? {
              background: theme?.background ?? "#111827",
              boxShadow: `0 12px 24px ${
                theme?.shadow ?? "rgba(0,0,0,.2)"
              }`,
            }
          : undefined
      }
      onMouseEnter={(e) => {
        if (!theme || isOutOfStock) return;

        e.currentTarget.style.background =
          theme.hover;
      }}
      onMouseLeave={(e) => {
        if (!theme || isOutOfStock) return;

        e.currentTarget.style.background =
          theme.background;
      }}
    >
      <span className="relative z-10">
        {isOutOfStock
          ? "Udsolgt"
          : `Læg ${finish} i kurv`}
      </span>
    </button>
  );
}