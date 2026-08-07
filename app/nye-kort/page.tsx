import NyeKortClient from "./NyeKortClient";
import { cards } from "../data/cards";

const NUMBER_OF_NEW_CARDS = 120;

export default function NyeKortPage() {
  const newestCards = [...cards]
    .filter((card) => {
      return (
        typeof card.imageFront === "string" &&
        card.imageFront.trim().length > 0
      );
    })
    .sort((a, b) => {
      const dateA =
        typeof a.dateAdded === "string" && a.dateAdded.trim()
          ? new Date(a.dateAdded).getTime()
          : 0;

      const dateB =
        typeof b.dateAdded === "string" && b.dateAdded.trim()
          ? new Date(b.dateAdded).getTime()
          : 0;

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      return b.id - a.id;
    })
    .slice(0, NUMBER_OF_NEW_CARDS);

  return <NyeKortClient cards={newestCards} />;
}
