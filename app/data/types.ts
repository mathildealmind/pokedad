// ==========================
// Enums
// ==========================

export enum CardLanguage {
  Danish = "Danish",
  English = "English",
  Japanese = "Japanese",
  German = "German",
  French = "French",
  Spanish = "Spanish",
  Italian = "Italian",
  Korean = "Korean",
  Chinese = "Chinese",
}

export enum CardCondition {
  Mint = "Mint",
  NearMint = "Near Mint",
  Excellent = "Excellent",
  Good = "Good",
  LightPlayed = "Light Played",
  Played = "Played",
  Poor = "Poor",
}

export enum CardFinish {
  Normal = "Normal",
  ReverseHolo = "Reverse Holo",
  Holo = "Holo",
  CosmosHolo = "Cosmos Holo",
  PokeBallHolo = "Poké Ball Holo",
  MasterBallHolo = "Master Ball Holo",
}

export enum CardRarity {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  DoubleRare = "Double Rare",
  IllustrationRare = "Illustration Rare",
  UltraRare = "Ultra Rare",
  SpecialIllustrationRare = "Special Illustration Rare",
  HyperRare = "Hyper Rare",
  BlackWhiteRare = "Black White Rare",
  ACESPEC = "ACE SPEC",
  Promo = "Promo",
  AceSpecRare = "ACE SPEC Rare",
}

export enum GradeCompany {
  PSA = "PSA",
  BGS = "BGS",
  CGC = "CGC",
}

export enum PokemonType {
  Grass = "Grass",
  Fire = "Fire",
  Water = "Water",
  Lightning = "Lightning",
  Psychic = "Psychic",
  Fighting = "Fighting",
  Darkness = "Darkness",
  Metal = "Metal",
  Dragon = "Dragon",
  Fairy = "Fairy",
  Colorless = "Colorless",
}

// ==========================
// Kortvariant
// ==========================

export interface CardVariant {
  finish: CardFinish;

  price: number;

  originalPrice?: number | null;

  stock: number;

  imageFront: string;

  imageBack: string;
}

// ==========================
// Pokemon Card
// ==========================

export interface PokemonCard {
  id: number;

  slug: string;

  name: string;

  series: string;

  set: string;

  cardNumber: string;

  rarity: CardRarity;

  finish: CardFinish;

  pokemonType?: PokemonType;

  language: CardLanguage;

  condition: CardCondition;

  gradingCompany?: GradeCompany;

  grade?: number;

  price: number;

  originalPrice?: number | null;

  stock: number;

  imageFront: string;

  imageBack: string;

  dateAdded?: string;

  variants?: CardVariant[];

  isNew?: boolean;

  onSale?: boolean;

  featured?: boolean;
}