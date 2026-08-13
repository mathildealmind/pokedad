"use client";

import { useMemo, useState } from "react";
import type { PokemonType } from "@/app/data/types";
import { useProgressiveItems } from "@/app/hooks/useProgressiveItems";
import CardCard from "./CardCard";

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

  price: number;
  originalPrice?: number | null;

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
  cards: Card[];
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

function getCardFinishes(card: Card): string[] {
  const rawFinishes =
    card.variants && card.variants.length > 0
      ? card.variants.map((variant) => variant.finish)
      : [card.finish];

  return Array.from(
    new Set(
      rawFinishes
        .map((finish) => normalizeFinish(finish))
        .filter(Boolean)
    )
  );
}

function getCardStock(card: Card): number {
  if (card.variants && card.variants.length > 0) {
    return card.variants.reduce(
      (sum, variant) =>
        sum + Math.max(0, variant.stock ?? 0),
      0
    );
  }

  return Math.max(0, card.stock);
}

export default function SetCardGallery({
  cards,
}: Props) {
  const [search, setSearch] = useState("");
  const [rarity, setRarity] = useState("Alle");
  const [finish, setFinish] = useState("Alle");
  const [stock, setStock] = useState("Alle");
  const [sort, setSort] = useState("Lager først");
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableRarities = useMemo(() => {
    return Array.from(
      new Set(
        cards
          .map((card) => String(card.rarity))
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, [cards]);

  /*
   * Henter finishes fra både hovedkortet og variants.
   * Derfor kommer f.eks. Reverse Holo med i filteret,
   * selv om hovedkortets finish er Holo.
   */
  const availableFinishes = useMemo(() => {
    return Array.from(
      new Set(
        cards.flatMap((card) =>
          getCardFinishes(card)
        )
      )
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, [cards]);

  const filteredCards = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return [...cards]
      .filter((card) => {
        if (!searchValue) {
          return true;
        }

        const searchableText = [
          card.name,
          card.set ?? "",
          card.cardNumber ?? "",
          String(card.rarity),
          ...getCardFinishes(card),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchValue);
      })
      .filter((card) => {
        return (
          rarity === "Alle" ||
          String(card.rarity) === rarity
        );
      })
      .filter((card) => {
        return (
          finish === "Alle" ||
          getCardFinishes(card).includes(finish)
        );
      })
      .filter((card) => {
        return showSoldOut || getCardStock(card) > 0;
      })
      .filter((card) => {
        const totalStock = getCardStock(card);

        if (stock === "På lager") {
          return totalStock > 0;
        }

        if (stock === "Udsolgt") {
          return totalStock === 0;
        }

        return true;
      })
      .sort((a, b) => {
        if (sort === "Lager først") {
          const aInStock = getCardStock(a) > 0;
          const bInStock = getCardStock(b) > 0;

          if (aInStock && !bInStock) {
            return -1;
          }

          if (!aInStock && bInStock) {
            return 1;
          }

          return compareCardNumbers(
            a.cardNumber,
            b.cardNumber
          );
        }

        if (sort === "Kortnummer") {
          return compareCardNumbers(
            a.cardNumber,
            b.cardNumber
          );
        }

        if (sort === "Pris lav-høj") {
          return a.price - b.price;
        }

        if (sort === "Pris høj-lav") {
          return b.price - a.price;
        }

        if (sort === "A-Z") {
          return a.name.localeCompare(
            b.name,
            "da"
          );
        }

        return 0;
      });
  }, [
    cards,
    search,
    rarity,
    finish,
    stock,
    sort,
    showSoldOut,
  ]);

  const {
    loadMoreRef,
    visibleItems: visibleCards,
    visibleCount,
    resetProgress,
  } = useProgressiveItems(filteredCards);

  function resetFilters() {
    setSearch("");
    setRarity("Alle");
    setFinish("Alle");
    setStock("Alle");
    setSort("Lager først");
    setShowSoldOut(false);
    resetProgress();
  }

  function toggleSoldOut() {
    const nextShowSoldOut = !showSoldOut;

    setShowSoldOut(nextShowSoldOut);

    if (!nextShowSoldOut && stock === "Udsolgt") {
      setStock("Alle");
    }

    resetProgress();
  }

  return (
    <>
      {/* Filtre */}
      <button
        type="button"
        aria-expanded={filtersOpen}
        aria-controls="set-card-filters"
        onClick={() => setFiltersOpen((open) => !open)}
        className="mb-3 flex w-full max-w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-semibold shadow-sm md:hidden"
      >
        <span>Filtre</span>
        <span aria-hidden="true">
          {filtersOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id="set-card-filters"
        className={`${filtersOpen ? "block" : "hidden"} mb-8 min-w-0 max-w-full rounded-2xl bg-white p-4 shadow-sm md:block md:rounded-3xl md:p-6`}
      >
        <div className="grid min-w-0 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-5">
          <input
            type="search"
            placeholder="🔍 Søg i sættet..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetProgress();
            }}
            className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          />

          <select
            aria-label="Vælg sjældenhed"
            value={rarity}
            onChange={(event) => {
              setRarity(event.target.value);
              resetProgress();
            }}
            className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          >
            <option value="Alle">
              Alle sjældenheder
            </option>

            {availableRarities.map(
              (rarityName) => (
                <option
                  key={rarityName}
                  value={rarityName}
                >
                  {rarityName}
                </option>
              )
            )}
          </select>

          <select
            aria-label="Vælg finish"
            value={finish}
            onChange={(event) => {
              setFinish(event.target.value);
              resetProgress();
            }}
            className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          >
            <option value="Alle">
              Alle finishes
            </option>

            {availableFinishes.map(
              (finishName) => (
                <option
                  key={finishName}
                  value={finishName}
                >
                  {finishName}
                </option>
              )
            )}
          </select>

          <select
            aria-label="Vælg lagerstatus"
            value={stock}
            onChange={(event) => {
              const nextStock = event.target.value;

              setStock(nextStock);

              if (nextStock === "Udsolgt") {
                setShowSoldOut(true);
              }

              resetProgress();
            }}
            className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          >
            <option value="Alle">
              Alle kort
            </option>
            <option value="På lager">
              På lager
            </option>
            <option value="Udsolgt">
              Udsolgt
            </option>
          </select>

          <select
            aria-label="Sortér kort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              resetProgress();
            }}
            className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          >
            <option value="Lager først">
              På lager først
            </option>
            <option value="Kortnummer">
              Kortnummer
            </option>
            <option value="Pris lav-høj">
              Pris lav-høj
            </option>
            <option value="Pris høj-lav">
              Pris høj-lav
            </option>
            <option value="A-Z">
              A-Z
            </option>
          </select>
        </div>
      </div>

      {/* Resultat */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-semibold text-gray-600">
          {filteredCards.length}{" "}
          {filteredCards.length === 1
            ? "kort fundet"
            : "kort fundet"}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={showSoldOut}
            onClick={toggleSoldOut}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold transition hover:border-gray-500 hover:bg-gray-50"
          >
            {showSoldOut
              ? "Skjul udsolgte"
              : "Vis udsolgte"}
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="font-semibold hover:underline"
          >
            Nulstil filtre
          </button>
        </div>
      </div>

      {/* Kort */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {visibleCards.map((card) => (
            <CardCard
              key={`${card.id}-${card.set}-${card.slug}-${card.cardNumber}`}
              card={card}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <p
            className="text-4xl"
            aria-hidden="true"
          >
            🔍
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            Ingen kort blev fundet
          </h2>

          <p className="mt-3 text-gray-600">
            Prøv at ændre din søgning eller
            nulstille filtrene.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Nulstil filtre
          </button>
        </div>
      )}

      {visibleCount < filteredCards.length && (
        <div
          ref={loadMoreRef}
          className="h-px w-full"
          aria-hidden="true"
        />
      )}
    </>
  );
}

function compareCardNumbers(
  a?: string,
  b?: string
) {
  const numberA = Number(
    a?.split("/")[0] ?? 0
  );

  const numberB = Number(
    b?.split("/")[0] ?? 0
  );

  return numberA - numberB;
}
