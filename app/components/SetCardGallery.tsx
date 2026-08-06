"use client";

import { useMemo, useState } from "react";
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
  ]);

  function resetFilters() {
    setSearch("");
    setRarity("Alle");
    setFinish("Alle");
    setStock("Alle");
    setSort("Lager først");
  }

  return (
    <>
      {/* Filtre */}
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <input
            type="search"
            placeholder="🔍 Søg i sættet..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
          />

          <select
            aria-label="Vælg sjældenhed"
            value={rarity}
            onChange={(event) =>
              setRarity(event.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
            onChange={(event) =>
              setFinish(event.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
            onChange={(event) =>
              setStock(event.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-gray-500"
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-semibold text-gray-600">
          {filteredCards.length}{" "}
          {filteredCards.length === 1
            ? "kort fundet"
            : "kort fundet"}
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
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCards.map((card, index) => (
            <CardCard
              key={`${card.set}-${card.slug}-${card.cardNumber}-${index}`}
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
