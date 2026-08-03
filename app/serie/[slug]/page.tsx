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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentSeries.sets.map((set) => (
          <Link
            key={set.slug}
            href={`/set/${set.slug}`}
            className="rounded-xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative mb-6 flex h-44 items-center justify-center">
              <Image
                src={set.logo}
                alt={set.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-contain p-2"
              />
            </div>

            <h2 className="text-xl font-semibold">
              {set.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {set.totalCards} kort
            </p>

            <p className="mt-4 font-semibold text-red-600">
              Se kort →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
