"use client";

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { cards } from "../data/cards";

export default function NyeKortPage() {
  const [search, setSearch] = useState("");
  const [series, setSeries] = useState("Alle");
  const [rarity, setRarity] = useState("Alle");
  const [condition, setCondition] = useState("Alle");
  const [price, setPrice] = useState("Alle");
  const [sort, setSort] = useState("Nyeste først");

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
  }, []);

  const availableRarities = useMemo(() => {
    return Array.from(
      new Set(cards.map((card) => String(card.rarity)))
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, []);

  const availableConditions = useMemo(() => {
    return Array.from(
      new Set(cards.map((card) => String(card.condition)))
    ).sort((a, b) => a.localeCompare(b, "da"));
  }, []);

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
  }, [search, series, rarity, condition, price, sort]);

  function resetFilters() {
    setSearch("");
    setSeries("Alle");
    setRarity("Alle");
    setCondition("Alle");
    setPrice("Alle");
    setSort("Nyeste først");
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
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <input
              type="search"
              placeholder="🔍 Søg efter kort..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <select
              aria-label="Vælg serie"
              value={series}
              onChange={(event) => setSeries(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
              onChange={(event) => setRarity(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
              onChange={(event) => setCondition(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
              onChange={(event) => setPrice(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
              onChange={(event) => setSort(event.target.value)}
              className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredCards.map((card) => (
              <ProductCard
                key={card.id}
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
              finish={card.finish}
              variants={card.variants}
              />
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
      </section>
    </main>
  );
}