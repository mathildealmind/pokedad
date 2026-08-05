import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { cards } from "./data/cards";

export default function Home() {
  /*
   * Disse kort vises i Hero-slideren.
   * Slugs bruges, så priser og øvrige kortdata fortsat
   * hentes direkte fra kortenes egne datafiler.
   */
  const featuredHeroCardSlugs = [
    "durant-ex-215",
    "magnezone-vstar-057",
    "entei-promo-34",
  ];

  const featuredHeroCards = cards
    .filter((card) =>
      featuredHeroCardSlugs.includes(card.slug)
    )
    .map((card) => ({
      id: card.id,
      slug: card.slug,
      name: card.name,
      set: card.set,
      cardNumber: card.cardNumber,
      price: card.price,
      imageFront: card.imageFront,
      pokemonType: card.pokemonType,
      description:
        "Et særligt udvalgt Pokémon-kort fra PokéDad. Kortet er nøje udvalgt til samlere, der ønsker flotte og unikke kort til deres samling.",
    }));

  /*
   * Nyeste kort sorteres efter dato.
   * Kort uden dato placeres efter kort med dato.
   */
  const newestCards = [...cards]
    .sort((a, b) => {
      const dateA = a.dateAdded
        ? new Date(a.dateAdded).getTime()
        : 0;

      const dateB = b.dateAdded
        ? new Date(b.dateAdded).getTime()
        : 0;

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      return b.id - a.id;
    })
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F7F7F5] pb-20">
      <Hero
        cards={featuredHeroCards}
        description="Oplev særligt udvalgte Pokémon-kort og eksklusive samleobjekter hos PokéDad."
      />

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-4xl font-bold">
          ✨ Nyeste kort
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {newestCards.map((card) => (
            <ProductCard
              key={card.id}
              id={card.id}
              slug={card.slug}
              name={card.name}
              set={card.set}
              cardNumber={card.cardNumber}
              price={card.price}
              originalPrice={card.originalPrice}
              imageFront={card.imageFront}
              isNew={card.isNew}
              onSale={card.onSale}
              stock={card.stock}
              finish={card.finish}
              variants={card.variants}
            />
          ))}
        </div>
      </section>
    </main>
  );
}