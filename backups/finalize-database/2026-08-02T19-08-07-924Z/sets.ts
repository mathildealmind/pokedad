export interface PokemonSet {
  slug: string;
  name: string;
  series: string;

  totalCards: number;

  releaseDate: string;

  logo: string;
  symbol: string;
}

export const sets: Record<string, PokemonSet> = {
  // ==========================
  // Gym Series
  // ==========================

  "gym-heroes": {
    slug: "gym-heroes",
    name: "Gym Heroes",
    series: "gym-series",
    totalCards: 132,
    releaseDate: "2000-08-14",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },
  "gym-challenge": {
    slug: "gym-challenge",
    name: "Gym Challenge",
    series: "gym-series",
    totalCards: 132,
    releaseDate: "2000-10-16",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },

  // ==========================
  // Base Series
  // ==========================

  "jungle": {
    slug: "jungle",
    name: "Jungle",
    series: "base-series",
    totalCards: 64,
    releaseDate: "1999-06-16",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },
  "fossil": {
    slug: "fossil",
    name: "Fossil",
    series: "base-series",
    totalCards: 62,
    releaseDate: "1999-10-10",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },
  "base-set-2": {
    slug: "base-set-2",
    name: "Base Set 2",
    series: "base-series",
    totalCards: 130,
    releaseDate: "2000-02-24",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },
  "team-rocket": {
    slug: "team-rocket",
    name: "Team Rocket",
    series: "base-series",
    totalCards: 83,
    releaseDate: "2000-04-24",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },
  "legendary-collection": {
    slug: "legendary-collection",
    name: "Legendary Collection",
    series: "base-series",
    totalCards: 110,
    releaseDate: "2002-05-24",
    logo: "/placeholders/udsolgt.png",
    symbol: "/placeholders/udsolgt.png",
  },

// ==========================
// Scarlet & Violet
// ==========================

"paradox-rift": {
  slug: "paradox-rift",
  name: "Paradox Rift",
  series: "scarlet-violet",

  totalCards: 182,

  releaseDate: "2023-11-03",

  logo: "/series/scarlet-violet/paradox-rift/logo.png",
  symbol: "/series/scarlet-violet/paradox-rift/symbol.png",
},

"pokemon-151": {
  slug: "pokemon-151",
  name: "Pokémon 151",
  series: "scarlet-violet",

  totalCards: 165,

  releaseDate: "2023-09-22",

  logo: "/series/scarlet-violet/pokemon-151/logo.png",
  symbol: "/series/scarlet-violet/pokemon-151/symbol.png",
},

"paldea-evolved": {
  slug: "paldea-evolved",
  name: "Paldea Evolved",
  series: "scarlet-violet",

  totalCards: 193,

  releaseDate: "2023-06-09",

  logo: "/series/scarlet-violet/paldea-evolved/logo.png",
  symbol: "/series/scarlet-violet/paldea-evolved/symbol.png",
},


"base": {
  slug: "base",
  name: "Scarlet & Violet",
  series: "scarlet-violet",

  totalCards: 258,

  releaseDate: "2023-03-31",

  logo: "/placeholders/udsolgt.png",
  symbol: "/placeholders/udsolgt.png",
},

"crimson-haze": {
  slug: "crimson-haze",
  name: "Crimson Haze",
  series: "scarlet-violet",

  totalCards: 96,

  releaseDate: "2024-03-22",

  logo: "/placeholders/udsolgt.png",
  symbol: "/placeholders/udsolgt.png",
},

"obsidian-flames": {
  slug: "obsidian-flames",
  name: "Obsidian Flames",
  series: "scarlet-violet",

  totalCards: 197,

  releaseDate: "2023-08-11",

  logo: "/series/scarlet-violet/obsidian-flames/logo.png",
  symbol: "/series/scarlet-violet/obsidian-flames/symbol.png",
},

"black-bolt": {
  slug: "black-bolt",
  name: "Black Bolt",
  series: "scarlet-violet",

  totalCards: 86,

  releaseDate: "2025-07-18",

  logo: "/series/scarlet-violet/black-bolt/logo.png",
  symbol: "/series/scarlet-violet/black-bolt/symbol.png",
},

"destined-rivals": {
  slug: "destined-rivals",
  name: "Destined Rivals",
  series: "scarlet-violet",

  totalCards: 182,

  releaseDate: "2025-05-30",

  logo: "/series/scarlet-violet/destined-rivals/logo.png",
  symbol: "/series/scarlet-violet/destined-rivals/symbol.png",
},

"journey-together": {
  slug: "journey-together",
  name: "Journey Together",
  series: "scarlet-violet",

  totalCards: 159,

  releaseDate: "2025-03-28",

  logo: "/series/scarlet-violet/journey-together/logo.png",
  symbol: "/series/scarlet-violet/journey-together/symbol.png",
},
  "prismatic-evolutions": {
    slug: "prismatic-evolutions",
    name: "Prismatic Evolutions",
    series: "scarlet-violet",

    totalCards: 131,

    releaseDate: "2025-01-17",

    logo: "/series/scarlet-violet/prismatic-evolutions/logo.png",
    symbol: "/series/scarlet-violet/prismatic-evolutions/symbol.png",
  },
    "stellar-crown": {
    slug: "stellar-crown",
    name: "Stellar Crown",
    series: "scarlet-violet",

    totalCards: 142,

    releaseDate: "2024-09-13",

    logo: "/series/scarlet-violet/stellar-crown/logo.png",
    symbol: "/series/scarlet-violet/stellar-crown/symbol.png",
  },
    "surging-sparks": {
    slug: "surging-sparks",
    name: "Surging Sparks",
    series: "scarlet-violet",

    totalCards: 191,

    releaseDate: "2024-11-08",

    logo: "/series/scarlet-violet/surging-sparks/logo.png",
    symbol: "/series/scarlet-violet/surging-sparks/symbol.png",
  },
  
  // ==========================
  // Sword & Shield
  // ==========================

  "crown-zenith": {
    slug: "crown-zenith",
    name: "Crown Zenith",
    series: "sword-shield",

    totalCards: 229,

    releaseDate: "2023-01-20",

    logo: "/series/sword-shield/crown-zenith/logo.png",
    symbol: "/series/sword-shield/crown-zenith/symbol.png",
  },

  "silver-tempest": {
    slug: "silver-tempest",
    name: "Silver Tempest",
    series: "sword-shield",

    totalCards: 225,

    releaseDate: "2022-11-11",

    logo: "/series/sword-shield/silver-tempest/logo.png",
    symbol: "/series/sword-shield/silver-tempest/symbol.png",
  },

  "lost-origin": {
    slug: "lost-origin",
    name: "Lost Origin",
    series: "sword-shield",

    totalCards: 247,

    releaseDate: "2022-09-09",

    logo: "/series/sword-shield/lost-origin/logo.png",
    symbol: "/series/sword-shield/lost-origin/symbol.png",
  },

  "pokemon-go": {
    slug: "pokemon-go",
    name: "Pokémon GO",
    series: "sword-shield",

    totalCards: 78,

    releaseDate: "2022-07-01",

    logo: "/series/sword-shield/pokemon-go/logo.png",
    symbol: "/series/sword-shield/pokemon-go/symbol.png",
  },

  "astral-radiance": {
    slug: "astral-radiance",
    name: "Astral Radiance",
    series: "sword-shield",

    totalCards: 219,

    releaseDate: "2022-05-28",

    logo: "/series/sword-shield/astral-radiance/logo.png",
    symbol: "/series/sword-shield/astral-radiance/symbol.png",
  },

  "brilliant-stars": {
    slug: "brilliant-stars",
    name: "Brilliant Stars",
    series: "sword-shield",

    totalCards: 215,

    releaseDate: "2022-02-25",

    logo: "/series/sword-shield/brilliant-stars/logo.png",
    symbol: "/series/sword-shield/brilliant-stars/symbol.png",
  },

  "fusion-strike": {
    slug: "fusion-strike",
    name: "Fusion Strike",
    series: "sword-shield",

    totalCards: 284,

    releaseDate: "2021-11-12",

    logo: "/series/sword-shield/fusion-strike/logo.png",
    symbol: "/series/sword-shield/fusion-strike/symbol.png",
  },

  "celebrations": {
    slug: "celebrations",
    name: "Celebrations",
    series: "sword-shield",

    totalCards: 50,

    releaseDate: "2021-10-08",

    logo: "/series/sword-shield/celebrations/logo.png",
    symbol: "/series/sword-shield/celebrations/symbol.png",
  },

  "evolving-skies": {
    slug: "evolving-skies",
    name: "Evolving Skies",
    series: "sword-shield",

    totalCards: 237,

    releaseDate: "2021-08-27",

    logo: "/series/sword-shield/evolving-skies/logo.png",
    symbol: "/series/sword-shield/evolving-skies/symbol.png",
  },

  "chilling-reign": {
    slug: "chilling-reign",
    name: "Chilling Reign",
    series: "sword-shield",

    totalCards: 238,

    releaseDate: "2021-06-18",

    logo: "/series/sword-shield/chilling-reign/logo.png",
    symbol: "/series/sword-shield/chilling-reign/symbol.png",
  },

  "battle-styles": {
    slug: "battle-styles",
    name: "Battle Styles",
    series: "sword-shield",

    totalCards: 183,

    releaseDate: "2021-03-19",

    logo: "/series/sword-shield/battle-styles/logo.png",
    symbol: "/series/sword-shield/battle-styles/symbol.png",
  },

  "shining-fates": {
    slug: "shining-fates",
    name: "Shining Fates",
    series: "sword-shield",

    totalCards: 195,

    releaseDate: "2021-02-19",

    logo: "/series/sword-shield/shining-fates/logo.png",
    symbol: "/series/sword-shield/shining-fates/symbol.png",
  },

  "vivid-voltage": {
    slug: "vivid-voltage",
    name: "Vivid Voltage",
    series: "sword-shield",

    totalCards: 205,

    releaseDate: "2020-11-13",

    logo: "/series/sword-shield/vivid-voltage/logo.png",
    symbol: "/series/sword-shield/vivid-voltage/symbol.png",
  },

  "champions-path": {
    slug: "champions-path",
    name: "Champion's Path",
    series: "sword-shield",

    totalCards: 83,

    releaseDate: "2020-09-25",

    logo: "/series/sword-shield/champions-path/logo.png",
    symbol: "/series/sword-shield/champions-path/symbol.png",
  },

  "darkness-ablaze": {
    slug: "darkness-ablaze",
    name: "Darkness Ablaze",
    series: "sword-shield",

    totalCards: 201,

    releaseDate: "2020-08-14",

    logo: "/series/sword-shield/darkness-ablaze/logo.png",
    symbol: "/series/sword-shield/darkness-ablaze/symbol.png",
  },

  "rebel-clash": {
    slug: "rebel-clash",
    name: "Rebel Clash",
    series: "sword-shield",

    totalCards: 209,

    releaseDate: "2020-05-01",

    logo: "/series/sword-shield/rebel-clash/logo.png",
    symbol: "/series/sword-shield/rebel-clash/symbol.png",
  },

  "sword-shield": {
    slug: "sword-shield",
    name: "Sword & Shield",
    series: "sword-shield",

    totalCards: 216,

    releaseDate: "2020-02-07",

    logo: "/series/sword-shield/sword-shield/logo.png",
    symbol: "/series/sword-shield/sword-shield/symbol.png",
  },

  "black-star-promos": {
    slug: "black-star-promos",
    name: "Sword & Shield Black Star Promos",
    series: "sword-shield",

    totalCards: 307,

    releaseDate: "2019-11-15",

    logo: "/series/sword-shield/black-star-promos/logo.png",
    symbol: "/series/sword-shield/black-star-promos/symbol.png",
  },
  // ==========================
  // Sun & Moon
  // ==========================

  "sun-moon": {
    slug: "sun-moon",
    name: "Sun & Moon",
    series: "sun-moon",
    totalCards: 173,
    releaseDate: "2017-02-03",
    logo: "/series/sun-moon/sun-moon/logo.png",
    symbol: "/series/sun-moon/sun-moon/symbol.png",
  },

  "guardians-rising": {
    slug: "guardians-rising",
    name: "Guardians Rising",
    series: "sun-moon",
    totalCards: 180,
    releaseDate: "2017-05-05",
    logo: "/series/sun-moon/guardians-rising/logo.png",
    symbol: "/series/sun-moon/guardians-rising/symbol.png",
  },

  "burning-shadows": {
    slug: "burning-shadows",
    name: "Burning Shadows",
    series: "sun-moon",
    totalCards: 169,
    releaseDate: "2017-08-04",
    logo: "/series/sun-moon/burning-shadows/logo.png",
    symbol: "/series/sun-moon/burning-shadows/symbol.png",
  },

  "crimson-invasion": {
    slug: "crimson-invasion",
    name: "Crimson Invasion",
    series: "sun-moon",
    totalCards: 126,
    releaseDate: "2017-11-03",
    logo: "/series/sun-moon/crimson-invasion/logo.png",
    symbol: "/series/sun-moon/crimson-invasion/symbol.png",
  },

  "ultra-prism": {
    slug: "ultra-prism",
    name: "Ultra Prism",
    series: "sun-moon",
    totalCards: 173,
    releaseDate: "2018-02-02",
    logo: "/series/sun-moon/ultra-prism/logo.png",
    symbol: "/series/sun-moon/ultra-prism/symbol.png",
  },

  "forbidden-light": {
    slug: "forbidden-light",
    name: "Forbidden Light",
    series: "sun-moon",
    totalCards: 146,
    releaseDate: "2018-05-04",
    logo: "/series/sun-moon/forbidden-light/logo.png",
    symbol: "/series/sun-moon/forbidden-light/symbol.png",
  },

  "celestial-storm": {
    slug: "celestial-storm",
    name: "Celestial Storm",
    series: "sun-moon",
    totalCards: 183,
    releaseDate: "2018-08-03",
    logo: "/series/sun-moon/celestial-storm/logo.png",
    symbol: "/series/sun-moon/celestial-storm/symbol.png",
  },

  "dragon-majesty": {
    slug: "dragon-majesty",
    name: "Dragon Majesty",
    series: "sun-moon",
    totalCards: 78,
    releaseDate: "2018-09-07",
    logo: "/series/sun-moon/dragon-majesty/logo.png",
    symbol: "/series/sun-moon/dragon-majesty/symbol.png",
  },

  "lost-thunder": {
    slug: "lost-thunder",
    name: "Lost Thunder",
    series: "sun-moon",
    totalCards: 240,
    releaseDate: "2018-11-02",
    logo: "/series/sun-moon/lost-thunder/logo.png",
    symbol: "/series/sun-moon/lost-thunder/symbol.png",
  },

  "team-up": {
    slug: "team-up",
    name: "Team Up",
    series: "sun-moon",
    totalCards: 196,
    releaseDate: "2019-02-01",
    logo: "/series/sun-moon/team-up/logo.png",
    symbol: "/series/sun-moon/team-up/symbol.png",
  },

  "detective-pikachu": {
    slug: "detective-pikachu",
    name: "Detective Pikachu",
    series: "sun-moon",
    totalCards: 18,
    releaseDate: "2019-04-05",
    logo: "/series/sun-moon/detective-pikachu/logo.png",
    symbol: "/series/sun-moon/detective-pikachu/symbol.png",
  },

  "unbroken-bonds": {
    slug: "unbroken-bonds",
    name: "Unbroken Bonds",
    series: "sun-moon",
    totalCards: 234,
    releaseDate: "2019-05-03",
    logo: "/series/sun-moon/unbroken-bonds/logo.png",
    symbol: "/series/sun-moon/unbroken-bonds/symbol.png",
  },

  "unified-minds": {
    slug: "unified-minds",
    name: "Unified Minds",
    series: "sun-moon",
    totalCards: 258,
    releaseDate: "2019-08-02",
    logo: "/series/sun-moon/unified-minds/logo.png",
    symbol: "/series/sun-moon/unified-minds/symbol.png",
  },

  "hidden-fates": {
    slug: "hidden-fates",
    name: "Hidden Fates",
    series: "sun-moon",
    totalCards: 69,
    releaseDate: "2019-08-23",
    logo: "/series/sun-moon/hidden-fates/logo.png",
    symbol: "/series/sun-moon/hidden-fates/symbol.png",
  },

   "cosmic-eclipse": {
    slug: "cosmic-eclipse",
    name: "Cosmic Eclipse",
    series: "sun-moon",
    totalCards: 271,
    releaseDate: "2019-11-01",
    logo: "/series/sun-moon/cosmic-eclipse/logo.png",
    symbol: "/series/sun-moon/cosmic-eclipse/symbol.png",
  }
};