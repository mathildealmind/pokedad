import { cards } from "@/app/data/cards";

const MAX_RESULTS = 6;

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams
    .get("q")
    ?.trim()
    .toLowerCase();

  if (!query || query.length < 2) {
    return Response.json({ results: [] });
  }

  const results = cards
    .filter((card) => {
      const subtitle =
        "subtitle" in card && typeof card.subtitle === "string"
          ? card.subtitle
          : "";

      return (
        card.name.toLowerCase().includes(query) ||
        subtitle.toLowerCase().includes(query) ||
        card.set.toLowerCase().includes(query) ||
        card.cardNumber.toLowerCase().includes(query)
      );
    })
    .slice(0, MAX_RESULTS)
    .map((card) => ({
      id: card.id,
      slug: card.slug,
      name: card.name,
      set: card.set,
      cardNumber: card.cardNumber,
      price: card.price,
      imageFront: card.imageFront,
      subtitle:
        "subtitle" in card && typeof card.subtitle === "string"
          ? card.subtitle
          : undefined,
    }));

  return Response.json({ results });
}
