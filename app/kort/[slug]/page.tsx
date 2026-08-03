import { notFound } from "next/navigation";
import { cards } from "@/app/data/cards";
import ProductOptions from "@/app/components/ProductOptions";
import BackButton from "@/app/components/BackButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const card = cards.find(
    (currentCard) => currentCard.slug === slug
  );

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <BackButton />

        <div className="mt-8 rounded-3xl bg-white p-12 shadow-sm">
          <ProductOptions card={card} />
        </div>

      </div>
    </main>
  );
}