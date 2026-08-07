"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SearchResult = {
  id: number;
  slug: string;
  name: string;
  set: string;
  cardNumber: string;
  price: number;
  imageFront: string;
  subtitle?: string;
};

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function clearSearch() {
    setSearch("");
    setResults([]);
    setSelected(0);
    setIsLoading(false);
  }

  useEffect(() => {
    const value = search.trim();

    if (value.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(value)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Søgningen kunne ikke hentes");
        }

        const data = (await response.json()) as {
          results: SearchResult[];
        };

        setResults(data.results);
        setSelected(0);
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 200);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
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

        clearSearch();

        break;

      case "Escape":
        clearSearch();

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
          setResults([]);
          setSelected(0);
          setIsLoading(false);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Ryd-knap */}
      {search && (
        <button
          type="button"
          onClick={() => {
            clearSearch();
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
                  clearSearch();
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

      {isLoading &&
        search.trim().length >= 2 &&
        results.length === 0 && (
          <div className="absolute left-0 z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-500 shadow-xl">
            Søger…
          </div>
        )}
    </div>
  );
}
