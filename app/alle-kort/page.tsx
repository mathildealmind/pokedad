import Link from "next/link";
import Image from "next/image";

import { getSeries } from "@/app/data/helpers";

const allSeries = [
  {
    slug: "base-series",
    name: "Base Series",
    logo: "/series/base-series/Pokemon-Base-Set.webp",
  },
  {
    slug: "neo-series",
    name: "Neo Series",
    logo: "/series/neo-series/neo_en.webp",
  },
  {
    slug: "e-card",
    name: "E Series",
    logo: "/series/e-card/e reader.webp",
  },
  {
    slug: "ex-series",
    name: "EX Series",
    logo: "/series/ex-series/ex.jpg",
  },
  {
    slug: "diamond-pearl",
    name: "Diamond & Pearl",
    logo: "/series/diamond-pearl/DP1_Logo_EN.webp",
  },
  {
    slug: "platinum",
    name: "Platinum",
    logo: "/series/platinum/PL1_Logo_EN.webp",
  },
  {
    slug: "heartgold-soulsilver",
    name: "HeartGold & SoulSilver",
    logo: "/series/heartgold-soulsilver/HS1_Logo_EN.webp",
  },
  {
    slug: "black-white",
    name: "Black & White",
    logo: "/series/black-white/BW1_Logo_EN.webp",
  },
  {
    slug: "xy",
    name: "XY",
    logo: "/series/xy/xy.webp",
  },
  {
    slug: "sun-moon",
    name: "Sun & Moon",
    logo: "/series/sun-moon/sun and moon.webp",
  },
  {
    slug: "sword-shield",
    name: "Sword & Shield",
    logo: "/series/sword-shield/Sword & Shield1.webp",
  },
  {
    slug: "scarlet-violet",
    name: "Scarlet & Violet",
    logo: "/series/scarlet-violet/scarlet and violet.webp",
  },
  {
    slug: "mega-evolution",
    name: "Mega Evolution",
    logo: "/series/mega-evolution/mega evolution.webp",
  },
  {
    slug: "promos",
    name: "Promos",
    logo: "/logo/pokedad-logo.webp",
  },
];

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

      <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {[...allSeries].reverse().map((item) => {
          const matchingSeries = registeredSeries.find(
            (series) => series.slug === item.slug
          );

          const numberOfSets = matchingSeries?.sets.length ?? 0;

          return (
            <Link
              key={item.slug}
              href={`/serie/${item.slug}`}
              className="flex min-h-[190px] flex-col rounded-xl border bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:min-h-[320px] sm:rounded-2xl sm:p-6"
            >
              <div className="relative mb-2 h-14 w-full sm:mb-6 sm:h-24">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-xs font-bold sm:text-2xl">
                {item.name}
              </h2>

              <p className="mt-2 text-[10px] text-gray-500 sm:mt-4 sm:text-sm">
                {numberOfSets} sæt
              </p>

              <div className="mt-auto pt-2 sm:pt-6">
                <span className="text-[10px] font-semibold text-red-600 sm:text-base">
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
