import { notFound } from "next/navigation";

import CardCard from "../../components/CardCard";
import { cards } from "../../data/cards";
import { categories } from "../../data/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const EEVEE_EVOLUTIONS = [
  "eevee",
  "vaporeon",
  "jolteon",
  "flareon",
  "espeon",
  "umbreon",
  "leafeon",
  "glaceon",
  "sylveon",
];

function belongsToCategory(cardName: string, categorySlug: string): boolean {
  const normalizedName = cardName.toLowerCase();

  switch (categorySlug) {
    case "charizard":
      return normalizedName.includes("charizard");

    case "pikachu":
      return normalizedName.includes("pikachu");

    case "gengar":
      return normalizedName.includes("gengar");

    case "eeveelution":
      return EEVEE_EVOLUTIONS.some((pokemonName) =>
        normalizedName.includes(pokemonName)
      );

    default:
      return false;
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = categories.find(
    (categoryItem) => categoryItem.href === `/kategori/${slug}`
  );

  if (!category) {
    notFound();
  }

  const categoryCards = cards.filter((card) =>
    belongsToCategory(card.name, slug)
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">{category.name}</h1>

      <p className="mt-2 text-gray-600">
        {categoryCards.length}{" "}
        {categoryCards.length === 1 ? "kort fundet" : "kort fundet"}
      </p>

      {categoryCards.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            Der er endnu ingen kort i denne kategori.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryCards.map((card) => (
            <CardCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </main>
  );
}
