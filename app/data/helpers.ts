import { cards } from "./cards";
import { sets, PokemonSet } from "./sets";

type Series = {
  slug: string;
  name: string;
  image: string;
  sets: PokemonSet[];
};

export function getSeries(): Series[] {
  const grouped: Record<string, PokemonSet[]> = {};

  Object.values(sets).forEach((set) => {
    if (!grouped[set.series]) {
      grouped[set.series] = [];
    }

    grouped[set.series].push(set);
  });

  return Object.entries(grouped).map(([slug, setList]) => ({
    slug,
    name: formatSeriesName(slug),
    image: getSeriesImage(slug),
    sets: setList.sort((a, b) =>
      a.name.localeCompare(b.name, "da")
    ),
  }));
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return getSeries().find((series) => series.slug === slug);
}

export function getSetsBySeries(seriesSlug: string): PokemonSet[] {
  return Object.values(sets)
    .filter((set) => set.series === seriesSlug)
    .sort((a, b) => a.name.localeCompare(b.name, "da"));
}

export function getSet(slug: string): PokemonSet | undefined {
  return sets[slug];
}

export function getCardsBySet(setSlug: string) {
  return cards.filter((card) => card.set === setSlug);
}

function getSeriesImage(series: string): string {
  switch (series) {
    case "mega-evolution":
      return "/series/mega-evolution/mega evolution.png";

    case "scarlet-violet":
      return "/series/scarlet-violet/logo.png";

    case "sword-shield":
      return "/series/sword-shield/logo.png";

    case "sun-moon":
      return "/series/sun-moon/logo.png";

    case "xy":
      return "/series/xy/logo.png";

    case "black-white":
      return "/series/black-white/logo.png";

    case "heartgold-soulsilver":
      return "/series/heartgold-soulsilver/logo.png";

    case "diamond-pearl":
      return "/series/diamond-pearl/logo.png";

    case "ex-series":
      return "/series/ex-series/ex.jpg";

    case "e-card":
      return "/series/e-card/logo.png";

    case "neo-series":
      return "/series/neo-series/neo_en.png";

    case "gym-series":
      return "/series/gym-series/gym_en.png";

    case "base-series":
      return "/series/base-series/Pokemon-Base-Set.png";

    case "legendary":
      return "/series/legendary/legendaryCollection.png";

    default:
      return "/series/pokemon.png";
  }
}

function formatSeriesName(slug: string): string {
  switch (slug) {
    case "mega-evolution":
      return "Mega Evolution";

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

    case "ex-series":
      return "EX Series";

    case "e-card":
      return "e-Card";

    case "neo-series":
      return "Neo Series";

    case "gym-series":
      return "Gym Series";

    case "base-series":
      return "Base Series";

    case "legendary":
      return "Legendary Collection";

    default:
      return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }
}