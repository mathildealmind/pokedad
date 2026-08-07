"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cards } from "../data/cards";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);

  const results = useMemo(() => {
    if (!search.trim()) {
      return [];
    }

    const value = search.trim().toLowerCase();

    return cards
      .filter((card) => {
        const subtitle =
          "subtitle" in card &&
          typeof card.subtitle === "string"
            ? card.subtitle
            : "";

        const cardNumber =
          "cardNumber" in card &&
          typeof card.cardNumber === "string"
            ? card.cardNumber
            : "";

        const set =
          typeof card.set === "string"
            ? card.set
            : "";

        return (
          card.name.toLowerCase().includes(value) ||
          subtitle.toLowerCase().includes(value) ||
          set.toLowerCase().includes(value) ||
          cardNumber.toLowerCase().includes(value)
        );
      })
      .slice(0, 6);
  }, [search]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (!results.length) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        setSelected(
          (prev) => (prev + 1) % results.length
        );

        break;

      case "ArrowUp":
        e.preventDefault();

        setSelected((prev) =>
          prev === 0
            ? results.length - 1
            : prev - 1
        );

        break;

      case "Enter":
        e.preventDefault();

        router.push(
          `/kort/${results[selected].slug}`
        );

        setSearch("");

        break;

      case "Escape":
        setSearch("");

        break;
    }
  }

  return (
    <div className="relative w-80">
      {/* Søgeikon */}
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

      {/* Input */}
      <input
        type="text"
        placeholder="Søg efter Pokémon..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(0);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Ryd-knap */}
      {search && (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setSelected(0);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
          aria-label="Ryd søgning"
        >
          ×
        </button>
      )}

      {/* Resultater */}
      {results.length > 0 && (
        <div className="absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {results.map((card, index) => {
            const imageFront =
              "imageFront" in card &&
              typeof card.imageFront === "string"
                ? card.imageFront.trim()
                : "";

            const image =
              "image" in card &&
              typeof card.image === "string"
                ? card.image.trim()
                : "";

            const resolvedImage =
              imageFront ||
              image ||
              "/placeholders/udsolgt.webp";

            const subtitle =
              "subtitle" in card &&
              typeof card.subtitle === "string"
                ? card.subtitle.trim()
                : "";

            const cardNumber =
              "cardNumber" in card &&
              typeof card.cardNumber === "string"
                ? card.cardNumber
                : "";

            const resolvedSubtitle =
              subtitle ||
              [card.set, cardNumber]
                .filter(Boolean)
                .join(" • ");

            return (
              <Link
                key={card.id}
                href={`/kort/${card.slug}`}
                onClick={() => {
                  setSearch("");
                  setSelected(0);
                }}
                className={`flex items-center gap-4 p-3 transition ${
                  selected === index
                    ? "bg-red-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <Image
                  src={resolvedImage}
                  alt={card.name}
                  width={45}
                  height={60}
                  className="rounded object-contain"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {card.name}
                  </p>

                  {resolvedSubtitle && (
                    <p className="truncate text-sm text-gray-500">
                      {resolvedSubtitle}
                    </p>
                  )}
                </div>

                <p className="whitespace-nowrap font-bold">
                  {card.price.toLocaleString(
                    "da-DK"
                  )}{" "}
                  kr.
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}