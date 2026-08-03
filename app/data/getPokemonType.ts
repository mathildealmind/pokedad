import { PokemonType } from "@/app/data/types";

type PokemonTypeRange = {
  from: number;
  to: number;
  type: PokemonType;
};

const SET_TYPE_RANGES: Record<string, PokemonTypeRange[]> = {
  "paradox-rift": [
    {
      from: 1,
      to: 18,
      type: PokemonType.Grass,
    },
    {
      from: 19,
      to: 29,
      type: PokemonType.Fire,
    },
    {
      from: 30,
      to: 57,
      type: PokemonType.Water,
    },
    {
      from: 58,
      to: 58,
      type: PokemonType.Psychic,
    },
    {
      from: 59,
      to: 70,
      type: PokemonType.Lightning,
    },
    {
      from: 71,
      to: 89,
      type: PokemonType.Psychic,
    },
    {
      from: 90,
      to: 109,
      type: PokemonType.Fighting,
    },
    {
      from: 110,
      to: 124,
      type: PokemonType.Darkness,
    },
    {
      from: 125,
      to: 139,
      type: PokemonType.Metal,
    },
    {
      from: 140,
      to: 141,
      type: PokemonType.Dragon,
    },
    {
      from: 142,
      to: 158,
      type: PokemonType.Colorless,
    },
  ],
};

function normalizeSetName(set?: string): string | null {
  if (typeof set !== "string") {
    return null;
  }

  const normalizedSet = set.trim().toLowerCase();

  return normalizedSet.length > 0
    ? normalizedSet
    : null;
}

function getCardNumber(
  cardNumber?: string
): number | null {
  if (typeof cardNumber !== "string") {
    return null;
  }

  const normalizedCardNumber =
    cardNumber.trim();

  if (!normalizedCardNumber) {
    return null;
  }

  const numberBeforeSlash =
    normalizedCardNumber
      .split("/")[0]
      ?.trim();

  if (!numberBeforeSlash) {
    return null;
  }

  const parsedNumber = Number.parseInt(
    numberBeforeSlash,
    10
  );

  if (Number.isNaN(parsedNumber)) {
    return null;
  }

  return parsedNumber;
}

export function getPokemonType(
  set?: string,
  cardNumber?: string,
  fallbackType?: PokemonType
): PokemonType | undefined {
  if (fallbackType) {
    return fallbackType;
  }

  const normalizedSet =
    normalizeSetName(set);

  const numericCardNumber =
    getCardNumber(cardNumber);

  if (
    !normalizedSet ||
    numericCardNumber === null
  ) {
    return undefined;
  }

  const typeRanges =
    SET_TYPE_RANGES[normalizedSet];

  if (!typeRanges) {
    return undefined;
  }

  const matchingRange =
    typeRanges.find(
      (range) =>
        numericCardNumber >= range.from &&
        numericCardNumber <= range.to
    );

  return matchingRange?.type;
}