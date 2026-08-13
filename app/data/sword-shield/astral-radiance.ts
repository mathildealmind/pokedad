import {
  PokemonCard,
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonType,
} from "../types";

const SOLD_OUT_IMAGE = "/placeholders/udsolgt.webp";
const FIRST_CARD_ID = 2210001;

const CARD_OVERRIDES: Record<string, Partial<PokemonCard>> = {
  "083/189": {
    stock: 1,
    imageFront:
      "/series/sword-shield/astral-radiance/083-reverse-holo.webp",
    imageBack:
      "/series/sword-shield/astral-radiance/083-reverse-holo-back.webp",
  },
  "113/189": {
    stock: 1,
    imageFront:
      "/series/sword-shield/astral-radiance/113-reverse-holo.webp",
    imageBack:
      "/series/sword-shield/astral-radiance/113-reverse-holo-back.webp",
  },
};

type SourceRarity = "C" | "UC" | "R" | "UR" | "HR";
type CardSeed = readonly [
  cardNumber: string,
  name: string,
  rarity: SourceRarity,
  isHolo: boolean,
];

const RARITY_MAP: Record<SourceRarity, CardRarity> = {
  C: CardRarity.Common,
  UC: CardRarity.Uncommon,
  R: CardRarity.Rare,
  UR: CardRarity.UltraRare,
  HR: CardRarity.HyperRare,
};

const TRAINER_GALLERY_TYPES: ReadonlyArray<
  PokemonType | undefined
> = [
  PokemonType.Grass,
  PokemonType.Grass,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Fighting,
  PokemonType.Fighting,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Metal,
  PokemonType.Colorless,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Fighting,
  PokemonType.Darkness,
  PokemonType.Metal,
  PokemonType.Metal,
  PokemonType.Dragon,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  PokemonType.Water,
  PokemonType.Psychic,
];

const CARD_SEEDS = [
  ["001/189", "Beedrill V", "R", true],
  ["002/189", "Hisuian Voltorb", "C", false],
  ["003/189", "Hisuian Electrode", "UC", false],
  ["004/189", "Scyther", "C", false],
  ["005/189", "Scyther", "C", false],
  ["006/189", "Yanma", "C", false],
  ["007/189", "Yanmega", "UC", false],
  ["008/189", "Heracross", "C", false],
  ["009/189", "Kricketot", "C", false],
  ["010/189", "Kricketune", "UC", false],
  ["011/189", "Combee", "C", false],
  ["012/189", "Vespiquen", "R", false],
  ["013/189", "Leafeon", "R", false],
  ["014/189", "Shaymin", "R", false],
  ["015/189", "Petilil", "C", false],
  ["016/189", "Hisuian Lilligant", "R", true],
  ["017/189", "Hisuian Lilligant V", "R", true],
  ["018/189", "Hisuian Lilligant VSTAR", "R", true],
  ["019/189", "Rowlet", "C", false],
  ["020/189", "Dartrix", "UC", false],
  ["021/189", "Ponyta", "C", false],
  ["022/189", "Rapidash", "R", false],
  ["023/189", "Cyndaquil", "C", false],
  ["024/189", "Quilava", "UC", false],
  ["025/189", "Heatran V", "R", true],
  ["026/189", "Heatran VMAX", "R", true],
  ["027/189", "Radiant Heatran", "R", true],
  ["028/189", "Psyduck", "C", false],
  ["029/189", "Golduck", "UC", false],
  ["030/189", "Starmie V", "R", true],
  ["031/189", "Swinub", "C", false],
  ["032/189", "Piloswine", "UC", false],
  ["033/189", "Mamoswine", "R", false],
  ["034/189", "Mantine", "C", false],
  ["035/189", "Barboach", "C", false],
  ["036/189", "Whiscash", "UC", false],
  ["037/189", "Regice", "R", false],
  ["038/189", "Glaceon", "R", false],
  ["039/189", "Hisuian Basculin", "R", false],
  ["040/189", "Origin Forme Palkia VSTAR", "R", true],
  ["041/189", "Oshawott", "C", false],
  ["042/189", "Dewott", "UC", false],
  ["043/189", "Hisuian Basculin", "C", false],
  ["044/189", "Hisuian Basculegion", "R", false],
  ["045/189", "Keldeo", "R", true],
  ["046/189", "Radiant Greninja", "R", true],
  ["047/189", "Bergmite", "C", false],
  ["048/189", "Hisuian Avalugg", "R", false],
  ["049/189", "Galarian Mr. Rime V", "R", true],
  ["050/189", "Luxray V", "R", true],
  ["051/189", "Regieleki", "R", false],
  ["052/189", "Hisuian Typhlosion", "R", true],
  ["053/189", "Hisuian Typhlosion V", "R", true],
  ["054/189", "Hisuian Typhlosion VSTAR", "R", true],
  ["055/189", "Togepi", "C", false],
  ["056/189", "Togetic", "UC", false],
  ["057/189", "Togekiss", "R", true],
  ["058/189", "Misdreavus", "C", false],
  ["059/189", "Mismagius", "R", false],
  ["060/189", "Ralts", "C", false],
  ["061/189", "Kirlia", "UC", false],
  ["062/189", "Gallade", "R", true],
  ["063/189", "Drifloon", "C", false],
  ["064/189", "Drifblim", "UC", false],
  ["065/189", "Uxie", "UC", false],
  ["066/189", "Mesprit", "R", true],
  ["067/189", "Azelf", "UC", false],
  ["068/189", "Diancie", "R", true],
  ["069/189", "Wyrdeer", "R", true],
  ["070/189", "Hisuian Growlithe", "C", false],
  ["071/189", "Hisuian Arcanine", "R", false],
  ["072/189", "Machamp V", "R", true],
  ["073/189", "Machamp VMAX", "R", true],
  ["074/189", "Sudowoodo", "C", false],
  ["075/189", "Regirock", "R", false],
  ["076/189", "Cranidos", "UC", false],
  ["077/189", "Rampardos", "R", true],
  ["078/189", "Lucario V", "R", true],
  ["079/189", "Hippopotas", "C", false],
  ["080/189", "Hippowdon", "UC", false],
  ["081/189", "Radiant Hawlucha", "R", true],
  ["082/189", "Hisuian Decidueye", "R", true],
  ["083/189", "Hisuian Decidueye V", "R", true],
  ["084/189", "Hisuian Decidueye VSTAR", "R", true],
  ["085/189", "Kleavor", "R", false],
  ["086/189", "Kleavor", "R", true],
  ["087/189", "Kleavor V", "R", true],
  ["088/189", "Hisuian Qwilfish", "C", false],
  ["089/189", "Hisuian Qwilfish", "C", false],
  ["090/189", "Hisuian Overqwil", "UC", false],
  ["091/189", "Hisuian Overqwil", "R", false],
  ["092/189", "Hisuian Sneasel", "C", false],
  ["093/189", "Absol", "R", true],
  ["094/189", "Hisuian Sneasler V", "R", true],
  ["095/189", "Poochyena", "C", false],
  ["096/189", "Mightyena", "R", false],
  ["097/189", "Absol", "R", true],
  ["098/189", "Darkrai V", "R", true],
  ["099/189", "Darkrai VSTAR", "R", true],
  ["100/189", "Hisuian Samurott", "R", true],
  ["101/189", "Hisuian Samurott V", "R", true],
  ["102/189", "Hisuian Samurott VSTAR", "R", true],
  ["103/189", "Nickit", "C", false],
  ["104/189", "Thievul", "R", false],
  ["105/189", "Magnemite", "C", false],
  ["106/189", "Magneton", "UC", false],
  ["107/189", "Magnezone", "R", true],
  ["108/189", "Registeel", "R", false],
  ["109/189", "Shieldon", "UC", false],
  ["110/189", "Bastiodon", "R", true],
  ["111/189", "Bronzor", "C", false],
  ["112/189", "Bronzong", "UC", false],
  ["113/189", "Origin Forme Dialga V", "R", true],
  ["114/189", "Origin Forme Dialga VSTAR", "R", true],
  ["115/189", "Pawniard", "C", false],
  ["116/189", "Bisharp", "UC", false],
  ["117/189", "Garchomp V", "R", true],
  ["118/189", "Regidrago", "R", false],
  ["119/189", "Eevee", "C", false],
  ["120/189", "Hoothoot", "C", false],
  ["121/189", "Noctowl", "UC", false],
  ["122/189", "Teddiursa", "C", false],
  ["123/189", "Ursaring", "UC", false],
  ["124/189", "Ursaluna", "R", false],
  ["125/189", "Stantler", "C", false],
  ["126/189", "Miltank", "R", true],
  ["127/189", "Glameow", "C", false],
  ["128/189", "Purugly", "UC", false],
  ["129/189", "Chatot", "C", false],
  ["130/189", "Regigigas", "R", true],
  ["131/189", "Rufflet", "C", false],
  ["132/189", "Hisuian Braviary", "R", false],
  ["133/189", "Oranguru V", "R", true],
  ["134/189", "Wyrdeer V", "R", true],
  ["135/189", "Adaman", "R", true],
  ["136/189", "Canceling Cologne", "UC", false],
  ["137/189", "Choy", "UC", false],
  ["138/189", "Cyllene", "UC", false],
  ["139/189", "Dark Patch", "UC", false],
  ["140/189", "Energy Loto", "UC", false],
  ["141/189", "Feather Ball", "UC", false],
  ["142/189", "Gapejaw Bog", "UC", false],
  ["143/189", "Gardenia's Vigor", "UC", false],
  ["144/189", "Grant", "UC", false],
  ["145/189", "Gutsy Pickaxe", "UC", false],
  ["146/189", "Hisuian Heavy Ball", "UC", false],
  ["147/189", "Spicy Seasoned Curry", "R", true],
  ["148/189", "Jubilife Village", "UC", false],
  ["149/189", "Kamado", "UC", false],
  ["150/189", "Roxanne", "UC", false],
  ["151/189", "Spicy Seasoned Curry", "UC", false],
  ["152/189", "Supereffective Glasses", "UC", false],
  ["153/189", "Sweet Honey", "UC", false],
  ["154/189", "Switch Cart", "UC", false],
  ["155/189", "Temple of Sinnoh", "UC", false],
  ["156/189", "Trekking Shoes", "UC", false],
  ["157/189", "Unidentified Fossil", "UC", false],
  ["158/189", "Wait and See Turbo", "UC", false],
  ["159/189", "Zisu", "UC", false],
  ["160/189", "Beedrill V", "UR", true],
  ["161/189", "Beedrill V", "UR", true],
  ["162/189", "Hisuian Lilligant V", "UR", true],
  ["163/189", "Hisuian Lilligant V", "UR", true],
  ["164/189", "Virizion V", "UR", true],
  ["165/189", "Heatran V", "UR", true],
  ["166/189", "Starmie V", "UR", true],
  ["167/189", "Origin Forme Palkia V", "UR", true],
  ["168/189", "Luxray V", "UR", true],
  ["169/189", "Hisuian Typhlosion V", "UR", true],
  ["170/189", "Jirachi V", "UR", true],
  ["171/189", "Machamp V", "UR", true],
  ["172/189", "Machamp V", "UR", true],
  ["173/189", "Hisuian Decidueye V", "UR", true],
  ["174/189", "Hisuian Sneasler V", "UR", true],
  ["175/189", "Hisuian Sneasler V", "UR", true],
  ["176/189", "Hisuian Samurott V", "UR", true],
  ["177/189", "Origin Forme Dialga V", "UR", true],
  ["178/189", "Garchomp V", "UR", true],
  ["179/189", "Oranguru V", "UR", true],
  ["180/189", "Wyrdeer V", "UR", true],
  ["181/189", "Adaman", "UR", true],
  ["182/189", "Choy", "UR", true],
  ["183/189", "Cyllene", "UR", true],
  ["184/189", "Gardenia's Vigor", "UR", true],
  ["185/189", "Grant", "UR", true],
  ["186/189", "Irida", "UR", true],
  ["187/189", "Kamado", "UR", true],
  ["188/189", "Roxanne", "UR", true],
  ["189/189", "Zisu", "UR", true],
  ["190/189", "Hisuian Lilligant VSTAR", "HR", true],
  ["191/189", "Heatran VMAX", "HR", true],
  ["192/189", "Origin Forme Palkia VSTAR", "HR", true],
  ["193/189", "Hisuian Typhlosion VSTAR", "HR", true],
  ["194/189", "Machamp VMAX", "HR", true],
  ["195/189", "Hisuian Decidueye VSTAR", "HR", true],
  ["196/189", "Kleavor VSTAR", "HR", true],
  ["197/189", "Hisuian Samurott VSTAR", "HR", true],
  ["198/189", "Origin Forme Dialga VSTAR", "HR", true],
  ["199/189", "Adaman", "HR", true],
  ["200/189", "Choy", "HR", true],
  ["201/189", "Kamado", "HR", true],
  ["202/189", "Gardenia’s Vigor", "HR", true],
  ["203/189", "Grant", "HR", true],
  ["204/189", "Irida", "HR", true],
  ["205/189", "Kamado", "HR", true],
  ["206/189", "Roxanne", "HR", true],
  ["207/189", "Zisu", "HR", true],
  ["208/189", "Origin Form Palkia VSTAR", "HR", true],
  ["209/189", "Hisuian Samurott VSTAR", "HR", true],
  ["210/189", "Origin Form Dialga VSTAR", "HR", true],
  ["211/189", "Choice Belt", "HR", true],
  ["212/189", "Jubilife Village", "HR", true],
  ["213/189", "Path to the Peak", "HR", true],
  ["214/189", "Temple of Sinnoh", "HR", true],
  ["215/189", "Trekking Boots", "HR", true],
  ["216/189", "Double Turbo Energy", "HR", true],
  ["TG01/TG30", "Abomasnow", "R", true],
  ["TG02/TG30", "Flapple", "R", true],
  ["TG03/TG30", "Kingdra", "R", true],
  ["TG04/TG30", "Frosmoth", "R", true],
  ["TG05/TG30", "Gardevoir", "R", true],
  ["TG06/TG30", "Wyrdeer", "R", true],
  ["TG07/TG30", "Falinks", "R", true],
  ["TG08/TG30", "Kleavor", "R", true],
  ["TG09/TG30", "Mightyena", "R", true],
  ["TG10/TG30", "Galarian Obstagoon", "R", true],
  ["TG11/TG30", "Bronzong", "R", true],
  ["TG12/TG30", "Hoothoot", "R", true],
  ["TG13/TG30", "Starmie V", "UR", true],
  ["TG14/TG30", "Ice Rider Calyrex V", "UR", true],
  ["TG15/TG30", "Ice Rider Calyrex VMAX", "UR", true],
  ["TG16/TG30", "Galarian Articuno V", "UR", true],
  ["TG17/TG30", "Shadow Rider Calyrex V", "UR", true],
  ["TG18/TG30", "Shadow Rider Calyrex VMAX", "UR", true],
  ["TG19/TG30", "Galarian Zapdos V", "UR", true],
  ["TG20/TG30", "Galarian Moltres V", "UR", true],
  ["TG21/TG30", "Zacian V", "UR", true],
  ["TG22/TG30", "Zamazenta V", "UR", true],
  ["TG23/TG30", "Garchomp V", "UR", true],
  ["TG24/TG30", "Allister", "UR", true],
  ["TG25/TG30", "Bea", "UR", true],
  ["TG26/TG30", "Melony", "UR", true],
  ["TG27/TG30", "Milo", "UR", true],
  ["TG28/TG30", "Piers", "UR", true],
  ["TG29/TG30", "Ice Rider Calyrex VMAX", "HR", true],
  ["TG30/TG30", "Shadow Rider Calyrex VMAX", "HR", true],
] satisfies readonly CardSeed[];

function getPokemonType(
  cardNumber: string
): PokemonType | undefined {
  if (cardNumber.startsWith("TG")) {
    const galleryNumber = Number(
      cardNumber.slice(2).split("/")[0]
    );

    return TRAINER_GALLERY_TYPES[galleryNumber - 1];
  }

  const number = Number(cardNumber.split("/")[0]);

  if (number >= 1 && number <= 20) {
    return PokemonType.Grass;
  }

  if (number >= 21 && number <= 27) {
    return PokemonType.Fire;
  }

  if (number >= 28 && number <= 49) {
    return PokemonType.Water;
  }

  if (number >= 50 && number <= 51) {
    return PokemonType.Lightning;
  }

  if (number >= 52 && number <= 69) {
    return PokemonType.Psychic;
  }

  if (number >= 70 && number <= 87) {
    return PokemonType.Fighting;
  }

  if (number >= 88 && number <= 104) {
    return PokemonType.Darkness;
  }

  if (number >= 105 && number <= 116) {
    return PokemonType.Metal;
  }

  if (number >= 117 && number <= 118) {
    return PokemonType.Dragon;
  }

  if (number >= 119 && number <= 134) {
    return PokemonType.Colorless;
  }

  if (number >= 160 && number <= 164) {
    return PokemonType.Grass;
  }

  if (number === 165 || number === 191) {
    return PokemonType.Fire;
  }

  if (
    (number >= 166 && number <= 167) ||
    number === 192
  ) {
    return PokemonType.Water;
  }

  if (number === 168) {
    return PokemonType.Lightning;
  }

  if (
    (number >= 169 && number <= 170) ||
    number === 193
  ) {
    return PokemonType.Psychic;
  }

  if (
    (number >= 171 && number <= 173) ||
    (number >= 194 && number <= 196)
  ) {
    return PokemonType.Fighting;
  }

  if (
    (number >= 174 && number <= 176) ||
    number === 197
  ) {
    return PokemonType.Darkness;
  }

  if (number === 177 || number === 198) {
    return PokemonType.Metal;
  }

  if (number === 178) {
    return PokemonType.Dragon;
  }

  if (number >= 179 && number <= 180) {
    return PokemonType.Colorless;
  }

  if (number === 190) {
    return PokemonType.Grass;
  }

  return undefined;
}

function createSlug(name: string, cardNumber: string): string {
  const normalizedName = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const number = cardNumber
    .split("/")[0]
    .toLowerCase();

  return `${normalizedName}-${number}`;
}

export const astralRadiance: PokemonCard[] = CARD_SEEDS.map(
  ([cardNumber, name, sourceRarity, isHolo], index) => ({
    id: FIRST_CARD_ID + index,
    slug: createSlug(name, cardNumber),
    name,
    series: "sword-shield",
    set: "astral-radiance",
    cardNumber,
    rarity: RARITY_MAP[sourceRarity],
    finish: isHolo
      ? CardFinish.Holo
      : CardFinish.Normal,
    pokemonType: getPokemonType(cardNumber),
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 0,
    imageFront: SOLD_OUT_IMAGE,
    imageBack: SOLD_OUT_IMAGE,
    ...CARD_OVERRIDES[cardNumber],
  })
);

export default astralRadiance;
