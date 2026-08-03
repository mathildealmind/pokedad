import { jungle } from "./base-series/jungle";
import { fossil } from "./base-series/fossil";
import { baseSet2 } from "./base-series/base-set-2";
import { teamRocket } from "./base-series/team-rocket";
import { legendaryCollection } from "./base-series/legendary-collection";

import { gymHeroes } from "./gym-series/gym-heroes";
import { gymChallenge } from "./gym-series/gym-challenge";

import type { PokemonCard } from "./types";

import { scarletVioletBase } from "./scarlet-violet/base";
import { blackBolt } from "./scarlet-violet/black-bolt";
import { crimsonHaze } from "./scarlet-violet/crimson-haze";
import { destinedRivals } from "./scarlet-violet/destined-rivals";
import { journeyTogether } from "./scarlet-violet/journey-together";
import { obsidianFlames } from "./scarlet-violet/obsidian-flames";
import { paldeaEvolved } from "./scarlet-violet/paldea-evolved";
import { paradoxRift } from "./scarlet-violet/paradox-rift";
import { pokemon151 } from "./scarlet-violet/pokemon-151";
import { prismaticEvolutions } from "./scarlet-violet/prismatic-evolutions";
import { stellarCrown } from "./scarlet-violet/stellar-crown";
import { surgingSparks } from "./scarlet-violet/surging-sparks";
import { temporalForces } from "./scarlet-violet/temporal-forces";
import { twilightMasquerade } from "./scarlet-violet/twilight-masquerade";
import { whiteFlare } from "./scarlet-violet/white-flare";

import { blackStarPromos } from "./sword-shield/black-star-promos";

export const cards: PokemonCard[] = [
  ...gymHeroes,
  ...gymChallenge,
  ...jungle,
  ...fossil,
  ...baseSet2,
  ...teamRocket,
  ...legendaryCollection,

  ...scarletVioletBase,
  ...blackBolt,
  ...crimsonHaze,
  ...destinedRivals,
  ...journeyTogether,
  ...obsidianFlames,
  ...paldeaEvolved,
  ...paradoxRift,
  ...pokemon151,
  ...prismaticEvolutions,
  ...stellarCrown,
  ...surgingSparks,
  ...temporalForces,
  ...twilightMasquerade,
  ...whiteFlare,

  ...blackStarPromos,
];

export default cards;
