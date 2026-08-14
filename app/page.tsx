import Hero from "./components/Hero";
import NewsletterSignup from "./components/NewsletterSignup";
import ProductCard from "./components/ProductCard";
import { cards } from "./data/cards";

export default function Home() {
  /*
   * Disse kort vises i Hero-slideren.
   * Slug eller set og kortnummer bruges, så priser og øvrige
   * kortdata fortsat hentes direkte fra kortenes egne datafiler.
   */
  const featuredHeroCardSelectors = [
    { slug: "durant-ex-215" },
    { slug: "magnezone-vstar-057" },
    { slug: "entei-promo-34" },
    { set: "chaos-rising", cardNumber: "089/086" },
    { set: "perfect-order", cardNumber: "092/088" },
    { set: "chaos-rising", cardNumber: "091/086" },
  ] as const;

  const featuredHeroCards = cards
    .filter((card) =>
      featuredHeroCardSelectors.some((selector) =>
        "slug" in selector
          ? card.slug === selector.slug
          : card.set === selector.set &&
            card.cardNumber === selector.cardNumber
      )
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
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#F7F7F5] pb-20">
      <Hero
        cards={featuredHeroCards}
        description="Oplev særligt udvalgte Pokémon-kort og eksklusive samleobjekter hos PokéDad."
      />

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-[34px] font-bold sm:text-4xl">
          ✨ Nyeste kort
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {newestCards.map((card) => (
            <ProductCard
              key={`${card.set}-${card.slug}-${card.cardNumber}`}
              id={card.id}
              slug={card.slug}
              name={card.name}
              set={card.set}
              cardNumber={card.cardNumber}
              pokemonType={card.pokemonType}
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

      <NewsletterSignup />
    </main>
  );
}
