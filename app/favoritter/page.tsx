"use client";

import Link from "next/link";
import Image from "next/image";

import { useFavorites } from "@/app/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="text-4xl font-black">
          ❤️ Mine favoritter
        </h1>

        <p className="mt-2 text-gray-500">
          Her finder du alle de Pokémon-kort, du har gemt.
        </p>

        {favorites.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed bg-white p-20 text-center">
            <h2 className="text-2xl font-bold">
              Du har ingen favoritter endnu
            </h2>

            <p className="mt-3 text-gray-500">
              Klik på hjertet på et kort for at gemme det.
            </p>

            <Link
              href="/alle-kort"
              className="mt-8 inline-block rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Se alle kort
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((card) => (
              <div
                key={card.id}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
              >
                <Link href={`/kort/${card.slug}`}>
                  <div className="relative h-72 bg-gray-100">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold">
                      {card.name}
                    </h2>

                    <p className="mt-4 text-2xl font-black">
                      {card.price.toLocaleString("da-DK")} kr.
                    </p>
                  </div>
                </Link>

                <div className="px-5 pb-5">
                  <button
                    onClick={() => removeFavorite(card.id)}
                    className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    Fjern favorit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}