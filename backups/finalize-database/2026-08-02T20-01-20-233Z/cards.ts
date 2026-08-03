import { baseSet2 } from "./base-series/base-set-2";
import { fossil } from "./base-series/fossil";
import { jungle } from "./base-series/jungle";
import { legendaryCollection } from "./base-series/legendary-collection";
import { teamRocket } from "./base-series/team-rocket";
import { blackWhiteBase } from "./black-white/base";
import { boundariesCrossed } from "./black-white/boundaries-crossed";
import { darkExplorers } from "./black-white/dark-explorers";
import { dragonVault } from "./black-white/dragon-vault";
import { dragonsExalted } from "./black-white/dragons-exalted";
import { emergingPowers } from "./black-white/emerging-powers";
import { legendaryTreasures } from "./black-white/legendary-treasures";
import { nextDestinies } from "./black-white/next-destinies";
import { nobleVictories } from "./black-white/noble-victories";
import { plasmaBlast } from "./black-white/plasma-blast";
import { plasmaFreeze } from "./black-white/plasma-freeze";
import { plasmaStorm } from "./black-white/plasma-storm";
import { diamondPearlBase } from "./diamond-pearl/base";
import { greatEncounters } from "./diamond-pearl/great-encounters";
import { legendsAwakened } from "./diamond-pearl/legends-awakened";
import { majesticDawn } from "./diamond-pearl/majestic-dawn";
import { mysteriousTreasures } from "./diamond-pearl/mysterious-treasures";
import { secretWonders } from "./diamond-pearl/secret-wonders";
import { stormfront } from "./diamond-pearl/stormfront";
import { aquapolis } from "./e-card/aquapolis";
import { expeditionBaseSet } from "./e-card/expedition-base-set";
import { skyridge } from "./e-card/skyridge";
import { crystalGuardians } from "./ex-series/crystal-guardians";
import { deltaSpecies } from "./ex-series/delta-species";
import { deoxys } from "./ex-series/deoxys";
import { dragon } from "./ex-series/dragon";
import { dragonFrontiers } from "./ex-series/dragon-frontiers";
import { emerald } from "./ex-series/emerald";
import { fireRedLeafGreen } from "./ex-series/firered-leafgreen";
import { hiddenLegends } from "./ex-series/hidden-legends";
import { holonPhantoms } from "./ex-series/holon-phantoms";
import { legendMaker } from "./ex-series/legend-maker";
import { magmaVsAqua } from "./ex-series/magma-vs-aqua";
import { powerKeepers } from "./ex-series/power-keepers";
import { rubySapphire } from "./ex-series/ruby-sapphire";
import { sandstorm } from "./ex-series/sandstorm";
import { teamRocketReturns } from "./ex-series/team-rocket-returns";
import { unseenForces } from "./ex-series/unseen-forces";
import { gymChallenge } from "./gym-series/gym-challenge";
import { gymHeroes } from "./gym-series/gym-heroes";
import { neoDestiny } from "./neo-series/neo-destiny";
import { neoDiscovery } from "./neo-series/neo-discovery";
import { neoGenesis } from "./neo-series/neo-genesis";
import { neoRevelation } from "./neo-series/neo-revelation";
import { arceus } from "./platinum/arceus";
import { platinumBase } from "./platinum/base";
import { risingRivals } from "./platinum/rising-rivals";
import { supremeVictors } from "./platinum/supreme-victors";
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
import { sunMoonBase } from "./sun-moon/base";
import { burningShadows } from "./sun-moon/burning-shadows";
import { celestialStorm } from "./sun-moon/celestial-storm";
import { cosmicEclipse } from "./sun-moon/cosmic-eclipse";
import { crimsonInvasion } from "./sun-moon/crimson-invasion";
import { detectivePikachu } from "./sun-moon/detective-pikachu";
import { dragonMajesty } from "./sun-moon/dragon-majesty";
import { forbiddenLight } from "./sun-moon/forbidden-light";
import { guardiansRising } from "./sun-moon/guardians-rising";
import { hiddenFates } from "./sun-moon/hidden-fates";
import { lostThunder } from "./sun-moon/lost-thunder";
import { teamUp } from "./sun-moon/team-up";
import { ultraPrism } from "./sun-moon/ultra-prism";
import { unbrokenBonds } from "./sun-moon/unbroken-bonds";
import { unifiedMinds } from "./sun-moon/unified-minds";
import { swordShieldBase } from "./sword-shield/base";
import { blackStarPromos } from "./sword-shield/black-star-promos";
import { celebrations } from "./sword-shield/celebrations";
import { championsPath } from "./sword-shield/champions-path";
import { pokemonGo } from "./sword-shield/pokemon-go";
import { shiningFates } from "./sword-shield/shining-fates";
import { ancientOrigins } from "./xy/ancient-origins";
import { xyBase } from "./xy/base";
import { breakpoint } from "./xy/breakpoint";
import { breakthrough } from "./xy/breakthrough";
import { evolutions } from "./xy/evolutions";
import { fatesCollide } from "./xy/fates-collide";
import { flashfire } from "./xy/flashfire";
import { furiousFists } from "./xy/furious-fists";
import { generations } from "./xy/generations";
import { phantomForces } from "./xy/phantom-forces";
import { primalClash } from "./xy/primal-clash";
import { roaringSkies } from "./xy/roaring-skies";
import { steamSiege } from "./xy/steam-siege";

import type { PokemonCard } from "./types";

export const cards: PokemonCard[] = [
  ...baseSet2,
  ...fossil,
  ...jungle,
  ...legendaryCollection,
  ...teamRocket,
  ...blackWhiteBase,
  ...boundariesCrossed,
  ...darkExplorers,
  ...dragonVault,
  ...dragonsExalted,
  ...emergingPowers,
  ...legendaryTreasures,
  ...nextDestinies,
  ...nobleVictories,
  ...plasmaBlast,
  ...plasmaFreeze,
  ...plasmaStorm,
  ...diamondPearlBase,
  ...greatEncounters,
  ...legendsAwakened,
  ...majesticDawn,
  ...mysteriousTreasures,
  ...secretWonders,
  ...stormfront,
  ...aquapolis,
  ...expeditionBaseSet,
  ...skyridge,
  ...crystalGuardians,
  ...deltaSpecies,
  ...deoxys,
  ...dragon,
  ...dragonFrontiers,
  ...emerald,
  ...fireRedLeafGreen,
  ...hiddenLegends,
  ...holonPhantoms,
  ...legendMaker,
  ...magmaVsAqua,
  ...powerKeepers,
  ...rubySapphire,
  ...sandstorm,
  ...teamRocketReturns,
  ...unseenForces,
  ...gymChallenge,
  ...gymHeroes,
  ...neoDestiny,
  ...neoDiscovery,
  ...neoGenesis,
  ...neoRevelation,
  ...arceus,
  ...platinumBase,
  ...risingRivals,
  ...supremeVictors,
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
  ...sunMoonBase,
  ...burningShadows,
  ...celestialStorm,
  ...cosmicEclipse,
  ...crimsonInvasion,
  ...detectivePikachu,
  ...dragonMajesty,
  ...forbiddenLight,
  ...guardiansRising,
  ...hiddenFates,
  ...lostThunder,
  ...teamUp,
  ...ultraPrism,
  ...unbrokenBonds,
  ...unifiedMinds,
  ...swordShieldBase,
  ...blackStarPromos,
  ...celebrations,
  ...championsPath,
  ...pokemonGo,
  ...shiningFates,
  ...ancientOrigins,
  ...xyBase,
  ...breakpoint,
  ...breakthrough,
  ...evolutions,
  ...fatesCollide,
  ...flashfire,
  ...furiousFists,
  ...generations,
  ...phantomForces,
  ...primalClash,
  ...roaringSkies,
  ...steamSiege,
];

export default cards;
