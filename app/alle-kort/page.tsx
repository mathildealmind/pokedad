import Link from "next/link";
import Image from "next/image";

import { getSeries } from "@/app/data/helpers";

const allSeries = [
  {
    slug: "mega-evolution",
    name: "Mega Evolution",
    logo: "/series/mega-evolution/mega evolution.png",
  },
  {
    slug: "base-series",
    name: "Base Series",
    logo: "/series/base-series/Pokemon-Base-Set.png",
  },
  {
    slug: "black-white",
    name: "Black & White",
    logo: "/series/black-white/BW1_Logo_EN.png",
  },
  {
    slug: "diamond-pearl",
    name: "Diamond & Pearl",
    logo: "/series/diamond-pearl/DP1_Logo_EN.png",
  },
  {
    slug: "e-card",
    name: "e-Card",
    logo: "/series/e-card/e reader.png",
  },
  {
    slug: "ex-series",
    name: "EX Series",
    logo: "/series/ex-series/ex.jpg",
  },
  {
    slug: "gym-series",
    name: "Gym Series",
    logo: "/series/gym-series/gym_en.png",
  },
  {
    slug: "heartgold-soulsilver",
    name: "HeartGold & SoulSilver",
    logo: "/series/heartgold-soulsilver/HS1_Logo_EN.png",
  },
  {
    slug: "legendary",
    name: "Legendary Collection",
    logo: "/series/legendary/legendaryCollection.png",
  },
  {
    slug: "neo-series",
    name: "Neo Series",
    logo: "/series/neo-series/neo_en.png",
  },
  {
    slug: "platinum",
    name: "Platinum",
    logo: "/series/platinum/PL1_Logo_EN.png",
  },
  {
    slug: "scarlet-violet",
    name: "Scarlet & Violet",
    logo: "/series/scarlet-violet/scarlet and violet.png",
  },
  {
    slug: "sun-moon",
    name: "Sun & Moon",
    logo: "/series/sun-moon/sun and moon.png",
  },
  {
    slug: "sword-shield",
    name: "Sword & Shield",
    logo: "/series/sword-shield/Sword & Shield1.png",
  },
  {
    slug: "xy",
    name: "XY",
    logo: "/series/xy/xy.png",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default function AllCardsPage() {
  const registeredSeries = getSeries();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-4xl font-bold">
        Alle Pokémon TCG Singles
      </h1>

      <p className="mt-2 text-gray-600">
        Vælg en Pokémon-serie for at se alle tilgængelige sæt.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allSeries.map((item) => {
          const matchingSeries = registeredSeries.find(
            (series) => series.slug === item.slug
          );

          const numberOfSets = matchingSeries?.sets.length ?? 0;

          return (
            <Link
              key={item.slug}
              href={`/serie/${item.slug}`}
              className="flex min-h-[320px] flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative mb-6 h-24 w-full">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="mt-4 text-sm text-gray-500">
                {numberOfSets} sæt
              </p>

              <div className="mt-auto pt-6">
                <span className="font-semibold text-red-600">
                  Se serien →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}