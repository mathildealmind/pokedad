"use client";

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { PokemonCard } from "../data/types";
import { useProgressiveItems } from "../hooks/useProgressiveItems";

type NyeKortClientProps = {
  cards: PokemonCard[];
};

export default function NyeKortClient({ cards }: NyeKortClientProps) {
  const [search, setSearch] = useState("");
  const [series, setSeries] = useState("Alle");
  const [rarity, setRarity] = useState("Alle");
  const [condition, setCondition] = useState("Alle");
  const [price, setPrice] = useState("Alle");
  const [sort, setSort] = useState("Nyeste først");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableSeries = useMemo(() => {
    return Array.from(
      new Set(
        cards
          .map((card) => card.set)
          .filter(
            (value): value is string =>
              typeof value === "string" && value.trim().length > 0
          )
      )
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, [cards]);

  const availableRarities = useMemo(() => {
    return Array.from(
      new Set(cards.map((card) => String(card.rarity)))
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, [cards]);

  const availableConditions = useMemo(() => {
    return Array.from(
      new Set(cards.map((card) => String(card.condition)))
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, [cards]);

  const filteredCards = useMemo(() => {
    return [...cards]
      .filter((card) => {
        return (
          typeof card.imageFront === "string" &&
          card.imageFront.trim().length > 0
        );
      })
      .filter((card) => {
        return card.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      })
      .filter((card) => {
        return series === "Alle" || card.set === series;
      })
      .filter((card) => {
        return rarity === "Alle" || String(card.rarity) === rarity;
      })
      .filter((card) => {
        return condition === "Alle" || String(card.condition) === condition;
      })
      .filter((card) => {
        if (price === "Alle") return true;
        if (price === "0-50") return card.price <= 50;

        if (price === "50-200") {
          return card.price > 50 && card.price <= 200;
        }

        if (price === "200-500") {
          return card.price > 200 && card.price <= 500;
        }

        if (price === "500+") {
          return card.price > 500;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "Pris lav-høj":
            return a.price - b.price;

          case "Pris høj-lav":
            return b.price - a.price;

          case "A-Z":
            return a.name.localeCompare(b.name, "da");

          case "Nyeste først":
          default: {
            const dateA =
              typeof a.dateAdded === "string" && a.dateAdded.trim()
                ? new Date(a.dateAdded).getTime()
                : 0;

            const dateB =
              typeof b.dateAdded === "string" && b.dateAdded.trim()
                ? new Date(b.dateAdded).getTime()
                : 0;

            if (dateA !== dateB) {
              return dateB - dateA;
            }

            return b.id - a.id;
          }
        }
      });
  }, [cards, search, series, rarity, condition, price, sort]);

  const {
    loadMoreRef,
    visibleItems: visibleCards,
    visibleCount,
    resetProgress,
  } = useProgressiveItems(filteredCards);

  function resetFilters() {
    setSearch("");
    setSeries("Alle");
    setRarity("Alle");
    setCondition("Alle");
    setPrice("Alle");
    setSort("Nyeste først");
    resetProgress();
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <span className="inline-block rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-800">
          ✨ Seneste tilføjelser
        </span>

        <h1 className="mt-6 text-5xl font-black">
          Nye kort
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-gray-600">
          Find de nyeste Pokémon-kort, der netop er kommet i shoppen.
        </p>

        {/* Filtre */}
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="new-card-filters"
          onClick={() => setFiltersOpen((open) => !open)}
          className="mt-8 flex w-full max-w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-semibold shadow-sm md:hidden"
        >
          <span>Filtre</span>
          <span aria-hidden="true">
            {filtersOpen ? "−" : "+"}
          </span>
        </button>

        <div
          id="new-card-filters"
          className={`${filtersOpen ? "block" : "hidden"} mt-3 min-w-0 max-w-full rounded-2xl bg-white p-4 shadow-sm md:mt-10 md:block md:rounded-3xl md:p-6`}
        >
          <div className="grid min-w-0 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
            <input
              type="search"
              placeholder="🔍 Søg efter kort..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetProgress();
              }}
              className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <select
              aria-label="Vælg serie"
              value={series}
              onChange={(event) => {
                setSeries(event.target.value);
                resetProgress();
              }}
              className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            >
              <option value="Alle">Alle serier</option>

              {availableSeries.map((setName) => (
                <option key={setName} value={setName}>
                  {setName}
                </option>
              ))}
            </select>

            <select
              aria-label="Vælg sjældenhed"
              value={rarity}
              onChange={(event) => {
                setRarity(event.target.value);
                resetProgress();
              }}
              className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            >
              <option value="Alle">Alle sjældenheder</option>

              {availableRarities.map((rarityName) => (
                <option key={rarityName} value={rarityName}>
                  {rarityName}
                </option>
              ))}
            </select>

            <select
              aria-label="Vælg stand"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
                resetProgress();
              }}
              className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            >
              <option value="Alle">Alle stande</option>

              {availableConditions.map((conditionName) => (
                <option key={conditionName} value={conditionName}>
                  {conditionName}
                </option>
              ))}
            </select>

            <select
              aria-label="Vælg pris"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                resetProgress();
              }}
              className="min-w-0 w-full max-w-full rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            >
              <option value="Alle">Alle priser</option>
              <option value="0-50">0–50 kr.</option>
              <option value="50-200">50–200 kr.</option>
              <option value="200-500">200–500 kr.</option>
              <option value="500+">Over 500 kr.</option>
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
              <option value="Nyeste først">Nyeste først</option>
              <option value="Pris lav-høj">Pris lav-høj</option>
              <option value="Pris høj-lav">Pris høj-lav</option>
              <option value="A-Z">A-Z</option>
            </select>
          </div>
        </div>

        {/* Resultat */}
        <div className="mb-6 mt-8 flex items-center justify-between gap-4">
          <p className="font-semibold text-gray-600">
            {filteredCards.length}{" "}
            {filteredCards.length === 1 ? "kort fundet" : "kort fundet"}
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="font-semibold hover:underline"
          >
            Nulstil filtre
          </button>
        </div>

        {/* Kort */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visibleCards.map((card, index) => (
              <div
                key={`${card.set}-${card.slug}-${card.cardNumber}`}
                className="catalog-card-enter h-full"
                style={{ animationDelay: `${(index % 24) * 15}ms` }}
              >
                <ProductCard
                  id={card.id}
                  slug={card.slug}
                  name={card.name}
                  set={card.set}
                  cardNumber={card.cardNumber}
                  pokemonType={card.pokemonType}
                  price={card.price}
                  originalPrice={card.originalPrice}
                  imageFront={card.imageFront}
                  isNew={card.isNew}
                  onSale={card.onSale}
                  stock={card.stock}
                  finish={card.finish}
                  variants={card.variants}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-4xl" aria-hidden="true">
              🔍
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Ingen kort blev fundet
            </h2>

            <p className="mt-3 text-gray-600">
              Prøv at ændre din søgning eller nulstille filtrene.
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
      </section>
    </main>
  );
}
