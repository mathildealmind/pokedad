import { notFound } from "next/navigation";

import CardCard from "../../components/CardCard";
import { cards } from "../../data/cards";
import { categories } from "../../data/categories";
import { getCardFinishes } from "../../data/card-utils";
import {
  CardFinish,
  CardRarity,
  type PokemonCard,
} from "../../data/types";

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

function isSecretCard(cardNumber: string): boolean {
  const numberMatch = cardNumber.match(/(\d+)\s*\/\s*(\d+)/);

  if (!numberMatch) {
    return false;
  }

  return Number(numberMatch[1]) > Number(numberMatch[2]);
}

function belongsToCategory(
  card: PokemonCard,
  categorySlug: string
): boolean {
  const normalizedName = card.name.toLowerCase();

  switch (categorySlug) {
    case "ultra-double-rares":
      return (
        card.rarity === CardRarity.UltraRare ||
        card.rarity === CardRarity.DoubleRare
      );

    case "vmax-vstar":
      return (
        normalizedName.includes("vmax") ||
        normalizedName.includes("vstar")
      );

    case "illustration-rares":
      return (
        card.rarity === CardRarity.IllustrationRare ||
        card.rarity === CardRarity.SpecialIllustrationRare
      );

    case "secret-rares":
      return (
        isSecretCard(card.cardNumber) ||
        card.rarity === CardRarity.HyperRare ||
        card.rarity === CardRarity.BlackWhiteRare
      );

    case "promos":
      return (
        card.rarity === CardRarity.Promo ||
        card.set.includes("promo")
      );

    case "holo-rares":
      return getCardFinishes(card).some((finish) =>
        [
          CardFinish.Holo,
          CardFinish.CosmosHolo,
          CardFinish.PokeBallHolo,
          CardFinish.MasterBallHolo,
        ].includes(finish)
      );

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
    belongsToCategory(card, slug)
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
