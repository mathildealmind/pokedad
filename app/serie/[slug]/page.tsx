import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BackButton from "@/app/components/BackButton";
import { getSeriesBySlug } from "@/app/data/helpers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;

  const currentSeries = getSeriesBySlug(slug);

  if (!currentSeries) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <BackButton href="/alle-kort">
          Tilbage til alle serier
        </BackButton>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {currentSeries.name}
        </h1>

        <p className="mt-2 text-gray-500">
          {currentSeries.sets.length} sæt
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {currentSeries.sets.map((set) => (
          <Link
            key={set.slug}
            href={`/set/${set.slug}`}
            className="rounded-lg border bg-white p-2 transition hover:-translate-y-1 hover:shadow-lg sm:rounded-xl sm:p-6"
          >
            <div className="relative mb-2 flex h-16 items-center justify-center sm:mb-6 sm:h-44">
              <Image
                src={set.logo}
                alt={set.name}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-contain p-2"
              />
            </div>

            <h2 className="text-xs font-semibold sm:text-xl">
              {set.name}
            </h2>

            <p className="mt-1 text-[10px] text-gray-500 sm:mt-2 sm:text-sm">
              {set.totalCards} kort
            </p>

            <p className="mt-1 text-[10px] text-gray-500 sm:text-sm">
              Udgivet {new Date(
                set.releaseDate.replaceAll("/", "-")
              ).toLocaleDateString("da-DK")}
            </p>

            <p className="mt-2 text-[10px] font-semibold text-red-600 sm:mt-4 sm:text-base">
              Se kort →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
