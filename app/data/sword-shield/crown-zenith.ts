import {
  PokemonCard,
  CardCondition,
  CardFinish,
  CardLanguage,
  CardRarity,
  PokemonType,
} from "../types";

const SOLD_OUT_IMAGE = "/placeholders/udsolgt.webp";
const FIRST_CARD_ID = 2213001;

type SourceRarity = "C" | "UC" | "R" | "H" | "UR" | "S";
type CardSeed = readonly [
  cardNumber: string,
  name: string,
  rarity: SourceRarity,
];

const RARITY_MAP: Record<SourceRarity, CardRarity> = {
  C: CardRarity.Common,
  UC: CardRarity.Uncommon,
  R: CardRarity.Rare,
  H: CardRarity.Rare,
  UR: CardRarity.UltraRare,
  S: CardRarity.HyperRare,
};

const HOLO_RARITIES = new Set<SourceRarity>([
  "H",
  "UR",
  "S",
]);

const GALARIAN_GALLERY_TYPES: ReadonlyArray<
  PokemonType | undefined
> = [
  PokemonType.Grass,
  PokemonType.Grass,
  PokemonType.Fire,
  PokemonType.Fire,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Lightning,
  PokemonType.Lightning,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Fighting,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Metal,
  PokemonType.Colorless,
  PokemonType.Psychic,
  PokemonType.Metal,
  PokemonType.Colorless,
  PokemonType.Colorless,
  PokemonType.Colorless,
  PokemonType.Colorless,
  PokemonType.Fighting,
  PokemonType.Colorless,
  PokemonType.Psychic,
  PokemonType.Colorless,
  PokemonType.Lightning,
  PokemonType.Grass,
  PokemonType.Grass,
  PokemonType.Darkness,
  PokemonType.Lightning,
  PokemonType.Grass,
  PokemonType.Fire,
  PokemonType.Fire,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Water,
  PokemonType.Lightning,
  PokemonType.Lightning,
  PokemonType.Lightning,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Psychic,
  PokemonType.Metal,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Darkness,
  PokemonType.Metal,
  PokemonType.Colorless,
  PokemonType.Colorless,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  PokemonType.Water,
  PokemonType.Metal,
  PokemonType.Dragon,
  PokemonType.Colorless,
];

const CARD_SEEDS = [
  ["001/159", "Oddish", "C"],
  ["002/159", "Gloom", "UC"],
  ["003/159", "Bellossom", "R"],
  ["004/159", "Tangela", "C"],
  ["005/159", "Tangrowth", "R"],
  ["006/159", "Scyther", "C"],
  ["007/159", "Sunkern", "C"],
  ["008/159", "Yanma", "C"],
  ["009/159", "Yanmega", "R"],
  ["010/159", "Kricketot", "C"],
  ["011/159", "Cherubi", "C"],
  ["012/159", "Carnivine", "UC"],
  ["013/159", "Leafeon V", "UR"],
  ["014/159", "Leafeon VSTAR", "UR"],
  ["015/159", "Grubbin", "C"],
  ["016/159", "Zarude", "H"],
  ["017/159", "Calyrex", "H"],
  ["018/159", "Charizard V", "UR"],
  ["019/159", "Charizard VSTAR", "UR"],
  ["020/159", "Radiant Charizard", "UR"],
  ["021/159", "Entei", "H"],
  ["022/159", "Simisear V", "UR"],
  ["023/159", "Simisear VSTAR", "UR"],
  ["024/159", "Larvesta", "C"],
  ["025/159", "Volcarona", "R"],
  ["026/159", "Volcanion", "H"],
  ["027/159", "Salandit", "C"],
  ["028/159", "Salazzle", "UC"],
  ["029/159", "Seel", "C"],
  ["030/159", "Galarian Mr. Mime", "C"],
  ["031/159", "Wailmer", "C"],
  ["032/159", "Wailord", "R"],
  ["033/159", "Corphish", "C"],
  ["034/159", "Snorunt", "C"],
  ["035/159", "Luvdisc", "C"],
  ["036/159", "Kyogre", "H"],
  ["037/159", "Kyogre V", "UR"],
  ["038/159", "Glaceon V", "UR"],
  ["039/159", "Shinx", "C"],
  ["040/159", "Shinx", "C"],
  ["041/159", "Luxio", "UC"],
  ["042/159", "Luxio", "UC"],
  ["043/159", "Luxray", "R"],
  ["044/159", "Luxray", "R"],
  ["045/159", "Rotom V", "UR"],
  ["046/159", "Rotom VSTAR", "UR"],
  ["047/159", "Emolga", "C"],
  ["048/159", "Eelektrik", "UC"],
  ["049/159", "Helioptile", "C"],
  ["050/159", "Heliolisk", "R"],
  ["051/159", "Radiant Charjabug", "UR"],
  ["052/159", "Zeraora", "R"],
  ["053/159", "Zeraora V", "UR"],
  ["054/159", "Zeraora VMAX", "UR"],
  ["055/159", "Zeraora VSTAR", "UR"],
  ["056/159", "Pincurchin", "UC"],
  ["057/159", "Exeggcute", "C"],
  ["058/159", "Exeggutor", "R"],
  ["059/159", "Mewtwo", "H"],
  ["060/159", "Mew V", "UR"],
  ["061/159", "Girafarig", "UC"],
  ["062/159", "Lunatone", "UC"],
  ["063/159", "Dusclops", "UC"],
  ["064/159", "Tapu Lele", "H"],
  ["065/159", "Hatterene V", "UR"],
  ["066/159", "Hatterene VMAX", "UR"],
  ["067/159", "Enamorus", "R"],
  ["068/159", "Graveler", "UC"],
  ["069/159", "Solrock", "UC"],
  ["070/159", "Baltoy", "C"],
  ["071/159", "Riolu", "C"],
  ["072/159", "Pancham", "C"],
  ["073/159", "Rockruff", "C"],
  ["074/159", "Lycanroc", "R"],
  ["075/159", "Koffing", "C"],
  ["076/159", "Absol", "H"],
  ["077/159", "Purrloin", "C"],
  ["078/159", "Liepard", "R"],
  ["079/159", "Krokorok", "UC"],
  ["080/159", "Pangoro", "R"],
  ["081/159", "Skrelp", "C"],
  ["082/159", "Dragalge", "R"],
  ["083/159", "Hoopa", "H"],
  ["084/159", "Galarian Meowth", "C"],
  ["085/159", "Galarian Perrserker", "R"],
  ["086/159", "Scizor", "R"],
  ["087/159", "Aron", "C"],
  ["088/159", "Lairon", "UC"],
  ["089/159", "Aggron", "H"],
  ["090/159", "Metang", "UC"],
  ["091/159", "Pawniard", "C"],
  ["092/159", "Pawniard", "C"],
  ["093/159", "Bisharp", "UC"],
  ["094/159", "Zacian", "H"],
  ["095/159", "Zacian V", "UR"],
  ["096/159", "Zacian VSTAR", "UR"],
  ["097/159", "Zamazenta", "H"],
  ["098/159", "Zamazenta V", "UR"],
  ["099/159", "Zamazenta VSTAR", "UR"],
  ["100/159", "Rayquaza V", "UR"],
  ["101/159", "Rayquaza VMAX", "UR"],
  ["102/159", "Rayquaza VMAX", "UR"],
  ["103/159", "Duraludon V", "UR"],
  ["104/159", "Duraludon VMAX", "UR"],
  ["105/159", "Radiant Eternatus", "UR"],
  ["106/159", "Tauros", "R"],
  ["107/159", "Ditto", "H"],
  ["108/159", "Eevee V", "UR"],
  ["109/159", "Snorlax", "R"],
  ["110/159", "Starly", "C"],
  ["111/159", "Bidoof", "C"],
  ["112/159", "Chatot", "C"],
  ["113/159", "Regigigas V", "UR"],
  ["114/159", "Regigigas VSTAR", "UR"],
  ["115/159", "Shaymin", "UC"],
  ["116/159", "Stoutland V", "UR"],
  ["117/159", "Yungoos", "C"],
  ["118/159", "Gumshoos", "R"],
  ["119/159", "Oranguru", "R"],
  ["120/159", "Greedent V", "UR"],
  ["121/159", "Wooloo", "C"],
  ["122/159", "Dubwool", "R"],
  ["123/159", "Bea", "H"],
  ["124/159", "Bede", "H"],
  ["125/159", "Crushing Hammer", "UC"],
  ["126/159", "Digging Duo", "UC"],
  ["127/159", "Energy Retrieval", "C"],
  ["128/159", "Energy Search", "C"],
  ["129/159", "Energy Switch", "UC"],
  ["130/159", "Friends in Hisui", "UC"],
  ["131/159", "Friends in Sinnoh", "UC"],
  ["132/159", "Great Ball", "UC"],
  ["133/159", "Hop", "H"],
  ["134/159", "Leon", "H"],
  ["135/159", "Lost Vacuum", "UC"],
  ["136/159", "Nessa", "H"],
  ["137/159", "Poké Ball", "C"],
  ["138/159", "Pokémon Catcher", "UC"],
  ["139/159", "Potion", "C"],
  ["140/159", "Raihan", "H"],
  ["141/159", "Rare Candy", "UC"],
  ["142/159", "Rescue Carrier", "UC"],
  ["143/159", "Sky Seal Stone", "H"],
  ["144/159", "Switch", "C"],
  ["145/159", "Trekking Shoes", "UC"],
  ["146/159", "Ultra Ball", "UC"],
  ["147/159", "Elesa's Sparkle", "UR"],
  ["148/159", "Friends in Hisui", "UR"],
  ["149/159", "Friends in Sinnoh", "UR"],
  ["150/159", "Professor's Research", "UR"],
  ["151/159", "Volo", "UR"],
  ["152/159", "Grass Energy", "UR"],
  ["153/159", "Fire Energy", "UR"],
  ["154/159", "Water Energy", "UR"],
  ["155/159", "Lightning Energy", "UR"],
  ["156/159", "Psychic Energy", "UR"],
  ["157/159", "Fighting Energy", "UR"],
  ["158/159", "Darkness Energy", "UR"],
  ["159/159", "Metal Energy", "UR"],
  ["160/159", "Pikachu", "S"],
  ["GG01/GG70", "Hisuian Voltorb", "H"],
  ["GG02/GG70", "Kricketune", "H"],
  ["GG03/GG70", "Magmortar", "H"],
  ["GG04/GG70", "Oricorio", "H"],
  ["GG05/GG70", "Lapras", "H"],
  ["GG06/GG70", "Manaphy", "H"],
  ["GG07/GG70", "Keldeo", "H"],
  ["GG08/GG70", "Electivire", "H"],
  ["GG09/GG70", "Toxtricity", "H"],
  ["GG10/GG70", "Mew", "H"],
  ["GG11/GG70", "Lunatone", "H"],
  ["GG12/GG70", "Deoxys", "H"],
  ["GG13/GG70", "Diancie", "H"],
  ["GG14/GG70", "Comfey", "H"],
  ["GG15/GG70", "Solrock", "H"],
  ["GG16/GG70", "Absol", "H"],
  ["GG17/GG70", "Thievul", "H"],
  ["GG18/GG70", "Magnezone", "H"],
  ["GG19/GG70", "Altaria", "H"],
  ["GG20/GG70", "Latias", "H"],
  ["GG21/GG70", "Hisuian Goodra", "H"],
  ["GG22/GG70", "Ditto", "H"],
  ["GG23/GG70", "Dunsparce", "H"],
  ["GG24/GG70", "Miltank", "H"],
  ["GG25/GG70", "Bibarel", "H"],
  ["GG26/GG70", "Riolu", "H"],
  ["GG27/GG70", "Swablu", "H"],
  ["GG28/GG70", "Duskull", "H"],
  ["GG29/GG70", "Bidoof", "H"],
  ["GG30/GG70", "Pikachu", "H"],
  ["GG31/GG70", "Turtwig", "H"],
  ["GG32/GG70", "Paras", "H"],
  ["GG33/GG70", "Poochyena", "H"],
  ["GG34/GG70", "Mareep", "H"],
  ["GG35/GG70", "Leafeon VSTAR", "UR"],
  ["GG36/GG70", "Entei V", "UR"],
  ["GG37/GG70", "Simisear VSTAR", "UR"],
  ["GG38/GG70", "Suicune V", "UR"],
  ["GG39/GG70", "Lumineon V", "UR"],
  ["GG40/GG70", "Glaceon VSTAR", "UR"],
  ["GG41/GG70", "Raikou V", "UR"],
  ["GG42/GG70", "Zeraora VMAX", "UR"],
  ["GG43/GG70", "Zeraora VSTAR", "UR"],
  ["GG44/GG70", "Mewtwo VSTAR", "UR"],
  ["GG45/GG70", "Deoxys VMAX", "UR"],
  ["GG46/GG70", "Deoxys VSTAR", "UR"],
  ["GG47/GG70", "Hatterene VMAX", "UR"],
  ["GG48/GG70", "Zacian V", "UR"],
  ["GG49/GG70", "Drapion V", "UR"],
  ["GG50/GG70", "Darkrai VSTAR", "UR"],
  ["GG51/GG70", "Hisuian Samurott V", "UR"],
  ["GG52/GG70", "Hisuian Samurott VSTAR", "UR"],
  ["GG53/GG70", "Hoopa V", "UR"],
  ["GG54/GG70", "Zamazenta V", "UR"],
  ["GG55/GG70", "Regigigas VSTAR", "UR"],
  ["GG56/GG70", "Hisuian Zoroark VSTAR", "UR"],
  ["GG57/GG70", "Adaman", "UR"],
  ["GG58/GG70", "Cheren's Care", "UR"],
  ["GG59/GG70", "Colress's Experiment", "UR"],
  ["GG60/GG70", "Cynthia's Ambition", "UR"],
  ["GG61/GG70", "Gardenia's Vigor", "UR"],
  ["GG62/GG70", "Grant", "UR"],
  ["GG63/GG70", "Irida", "UR"],
  ["GG64/GG70", "Melony", "UR"],
  ["GG65/GG70", "Raihan", "UR"],
  ["GG66/GG70", "Roxanne", "UR"],
  ["GG67/GG70", "Origin Forme Palkia VSTAR", "S"],
  ["GG68/GG70", "Origin Forme Dialga VSTAR", "S"],
  ["GG69/GG70", "Giratina VSTAR", "S"],
  ["GG70/GG70", "Arceus VSTAR", "S"],
] satisfies readonly CardSeed[];

function getPokemonType(
  cardNumber: string
): PokemonType | undefined {
  if (cardNumber.startsWith("GG")) {
    const galleryNumber = Number(
      cardNumber.slice(2).split("/")[0]
    );

    return GALARIAN_GALLERY_TYPES[galleryNumber - 1];
  }

  const mainNumber = Number(cardNumber.split("/")[0]);

  if (mainNumber >= 1 && mainNumber <= 17) {
    return PokemonType.Grass;
  }

  if (mainNumber >= 18 && mainNumber <= 28) {
    return PokemonType.Fire;
  }

  if (mainNumber >= 29 && mainNumber <= 38) {
    return PokemonType.Water;
  }

  if (mainNumber >= 39 && mainNumber <= 56) {
    return PokemonType.Lightning;
  }

  if (mainNumber >= 57 && mainNumber <= 67) {
    return PokemonType.Psychic;
  }

  if (mainNumber >= 68 && mainNumber <= 74) {
    return PokemonType.Fighting;
  }

  if (mainNumber >= 75 && mainNumber <= 83) {
    return PokemonType.Darkness;
  }

  if (mainNumber >= 84 && mainNumber <= 99) {
    return PokemonType.Metal;
  }

  if (mainNumber >= 100 && mainNumber <= 105) {
    return PokemonType.Dragon;
  }

  if (mainNumber >= 106 && mainNumber <= 122) {
    return PokemonType.Colorless;
  }

  const energyTypes: Partial<Record<number, PokemonType>> = {
    152: PokemonType.Grass,
    153: PokemonType.Fire,
    154: PokemonType.Water,
    155: PokemonType.Lightning,
    156: PokemonType.Psychic,
    157: PokemonType.Fighting,
    158: PokemonType.Darkness,
    159: PokemonType.Metal,
    160: PokemonType.Lightning,
  };

  return energyTypes[mainNumber];
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

export const crownZenith: PokemonCard[] = CARD_SEEDS.map(
  ([cardNumber, name, sourceRarity], index) => ({
    id: FIRST_CARD_ID + index,
    slug: createSlug(name, cardNumber),
    name,
    series: "sword-shield",
    set: "crown-zenith",
    cardNumber,
    rarity: RARITY_MAP[sourceRarity],
    finish: HOLO_RARITIES.has(sourceRarity)
      ? CardFinish.Holo
      : CardFinish.Normal,
    pokemonType: getPokemonType(cardNumber),
    language: CardLanguage.English,
    condition: CardCondition.Mint,
    price: 0,
    stock: 0,
    imageFront: SOLD_OUT_IMAGE,
    imageBack: SOLD_OUT_IMAGE,
  })
);

export default crownZenith;
