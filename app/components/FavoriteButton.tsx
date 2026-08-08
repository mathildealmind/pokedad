"use client";

import { MouseEvent } from "react";
import type { CSSProperties } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import type { PokemonType } from "@/app/data/types";
import { getPokemonType } from "@/app/data/getPokemonType";

type Props = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  set: string;
  cardNumber: string;
  pokemonType?: PokemonType;
};

type HeartTheme = {
  color: string;
  background: string;
  activeBackground: string;
  border: string;
  shadow: string;
};

const DEFAULT_THEME: HeartTheme = {
  color: "#6b7280",
  background: "#ffffff",
  activeBackground: "#f3f4f6",
  border: "#e5e7eb",
  shadow: "rgba(0,0,0,.12)",
};

const THEMES: Record<PokemonType, HeartTheme> = {
  Grass: {
    color: "#3d8a4d",
    background: "#edf8ef",
    activeBackground: "#d8efdc",
    border: "#b7dec0",
    shadow: "rgba(61,138,77,.25)",
  },

  Fire: {
    color: "#d46b3b",
    background: "#fff2ea",
    activeBackground: "#ffe2d2",
    border: "#f0c2a8",
    shadow: "rgba(212,107,59,.25)",
  },

  Water: {
    color: "#4389c8",
    background: "#eef7ff",
    activeBackground: "#dbeeff",
    border: "#c0daf1",
    shadow: "rgba(67,137,200,.25)",
  },

  Lightning: {
    color: "#c59d16",
    background: "#fffbe8",
    activeBackground: "#fff2bf",
    border: "#f0dc7f",
    shadow: "rgba(197,157,22,.25)",
  },

  Psychic: {
    color: "#9d63b4",
    background: "#faf1ff",
    activeBackground: "#eddcff",
    border: "#d9baf8",
    shadow: "rgba(157,99,180,.25)",
  },

  Fighting: {
    color: "#a46b45",
    background: "#fbf4ef",
    activeBackground: "#efe1d5",
    border: "#dec7b2",
    shadow: "rgba(164,107,69,.25)",
  },

  Darkness: {
    color: "#535866",
    background: "#f2f3f5",
    activeBackground: "#dde1e7",
    border: "#c8ced8",
    shadow: "rgba(83,88,102,.25)",
  },

  Metal: {
    color: "#73868d",
    background: "#f4f8f9",
    activeBackground: "#dde8eb",
    border: "#c8d6da",
    shadow: "rgba(115,134,141,.25)",
  },

  Dragon: {
    color: "#a16207",
    background: "#fffbeb",
    activeBackground: "#fef3c7",
    border: "#fcd34d",
    shadow: "rgba(161,98,7,.25)",
  },

  Fairy: {
    color: "#d16c9d",
    background: "#fff1f8",
    activeBackground: "#ffdced",
    border: "#f3bfd8",
    shadow: "rgba(209,108,157,.25)",
  },

  Colorless: {
    color: "#6b7280",
    background: "#ffffff",
    activeBackground: "#f3f4f6",
    border: "#d1d5db",
    shadow: "rgba(107,114,128,.25)",
  },
};

export default function FavoriteButton({
  id,
  slug,
  name,
  price,
  image,
  set,
  cardNumber,
  pokemonType,
}: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(id);

  const resolvedPokemonType = getPokemonType(
    set,
    cardNumber,
    pokemonType,
    name
  );

  const theme = resolvedPokemonType
    ? THEMES[resolvedPokemonType]
    : DEFAULT_THEME;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite({
      id,
      slug,
      name,
      price,
      image,
    });
  }

  const style: CSSProperties = {
    background: favorite
      ? theme.activeBackground
      : theme.background,
    borderColor: theme.border,
    color: theme.color,
    boxShadow: `0 8px 18px ${theme.shadow}`,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorite}
      aria-label={
        favorite
          ? "Fjern fra favoritter"
          : "Tilføj til favoritter"
      }
      className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 active:scale-95"
      style={style}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        />
      </svg>
    </button>
  );
}
