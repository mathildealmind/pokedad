import Link from "next/link";
import { notFound } from "next/navigation";

import SetCardGallery from "@/app/components/SetCardGallery";
import { cards } from "@/app/data/cards";
import { sets } from "@/app/data/sets";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatSeriesName(series: string) {
  switch (series) {
    case "scarlet-violet":
      return "Scarlet & Violet";

    case "sword-shield":
      return "Sword & Shield";

    case "sun-moon":
      return "Sun & Moon";

    case "xy":
      return "XY";

    case "black-white":
      return "Black & White";

    case "heartgold-soulsilver":
      return "HeartGold & SoulSilver";

    case "diamond-pearl":
      return "Diamond & Pearl";

    default:
      return series
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
  }
}

export default async function SetPage({ params }: Props) {
  const { slug } = await params;

  const set = sets[slug];

  if (!set) {
    notFound();
  }

  const setCards = cards.filter(
    (card) => card.set === slug
  );

  const seriesName = formatSeriesName(set.series);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <Link
          href={`/serie/${set.series}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-black"
        >
          <span aria-hidden="true">←</span>
          Tilbage til {seriesName}
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {set.name}
        </h1>

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
          <span>
            {set.totalCards} kort i sættet
          </span>

          <span>
            Udgivet{" "}
            {new Date(
              set.releaseDate
            ).toLocaleDateString("da-DK")}
          </span>
        </div>
      </div>

      {setCards.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">
            Ingen kort endnu
          </h2>

          <p className="mt-3 text-gray-500">
            Der er endnu ikke tilføjet kort til dette sæt.
          </p>
        </div>
      ) : (
        <SetCardGallery
          cards={setCards}
        />
      )}
    </main>
  );
}