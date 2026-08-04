# PokéDad

PokéDad er en Next.js-webshop til Pokémon-samlekort.

## Kom godt i gang

```bash
npm install
npm run dev
```

Åbn derefter [http://localhost:3000](http://localhost:3000).

## Projektstruktur

- `app/page.tsx` – forsiden
- `app/components/` – genbrugelige UI-komponenter
- `app/context/` – kurv og favoritter
- `app/data/cards.ts` – samler alle kortsæt i ét kortkatalog
- `app/data/sets.ts` – metadata for serier og sæt
- `app/data/<serie>/` – kortdata opdelt efter serie og sæt
- `app/serie/[slug]/` – seriesider
- `app/set/[slug]/` – sætsider
- `app/kort/[slug]/` – produktsider
- `app/kategori/[slug]/` – automatiske kortkategorier
- `public/logo/` – PokéDad-logo
- `public/series/` – serie-, sæt- og kortbilleder
- `public/placeholders/` – billeder til kort uden produktfoto

## Arbejdsgang for kortdata

1. Tilføj eller opdater kortet i den relevante fil under `app/data/<serie>/`.
2. Læg kortbilleder i den tilsvarende mappe under `public/series/<serie>/<sæt>/`.
3. Kontrollér, at sættet er registreret i `app/data/sets.ts`.
4. Importér et nyt dataarkiv i `app/data/cards.ts`.
5. Kør `npm run dev` og kontrollér serie-, sæt-, produkt- og kategorisider.

Genererede backups og midlertidige importfiler ligger kun lokalt og versionsstyres ikke.

## Kontrol

```bash
npm run lint
npm run build
```

## Automatisk klargøring af scanninger

Du behøver ikke længere omdøbe hvert billede manuelt.

### 1. Scan i denne rækkefølge

1. Første korts forside
2. Første korts bagside
3. Andet korts forside
4. Andet korts bagside
5. Fortsæt på samme måde

Gem billederne som PNG, JPG eller WebP i:

```text
scans/<serie>/<sæt>/
```

Eksempel:

```text
scans/scarlet-violet/paldea-evolved/
```

Scannerens egne filnavne må gerne være `Scan 1.png`, `Scan 2.png` osv.

### 2. Se navnene, før noget ændres

Hvis scanningerne starter med kort 84:

```bash
npm run prepare:scans -- scarlet-violet paldea-evolved --start 84
```

Hvis kortene ikke følger efter hinanden:

```bash
npm run prepare:scans -- scarlet-violet paldea-evolved --cards 84,87,91
```

Tilføj finish, når det er nødvendigt:

```bash
npm run prepare:scans -- scarlet-violet paldea-evolved --start 84 --finish holo
npm run prepare:scans -- scarlet-violet paldea-evolved --start 84 --finish reverse-holo
```

Den første kørsel er kun en sikker forhåndsvisning.

### 3. Kopiér og omdøb automatisk

Når listen ser rigtig ud, kør den samme kommando med `--apply`:

```bash
npm run prepare:scans -- scarlet-violet paldea-evolved --start 84 --apply
```

De korrekt navngivne filer bliver lagt i:

```text
uploads/<serie>/<sæt>/
```

Eksisterende filer bliver aldrig overskrevet automatisk.

### 4. Importér billederne på hjemmesiden

```bash
npm run import:images -- scarlet-violet paldea-evolved
```

Importen kobler billederne til de eksisterende kortdata og kopierer dem til den rigtige mappe under `public/series/`.

## Enkel import direkte fra uploads

Den anbefalede arbejdsgang er at gemme billederne direkte i:

```text
uploads/<serie>/<sæt>/
```

Kortnavnet skal ikke skrives i filnavnet. Forsiden bruger kun kortnummeret. Bagsiden får `-back`, og finish skrives kun på Holo og Reverse Holo:

```text
001.png
001-back.png
002-reverse-holo.png
002-reverse-holo-back.png
003-holo.png
003-holo-back.png
```

Normal er standard og skrives derfor ikke i filnavnet. `reverse` betyder Reverse Holo.

Normale, Holo og Reverse Holo må gerne ligge blandet i samme mappe. Importér dem samlet med:

```bash
npm run import:images -- <serie> <sæt>
```

Eksempel:

```bash
npm run import:images -- mega-evolution chaos-rising
```

Importen finder selv kortets navn i datafilen, kontrollerer at hvert kort har både forside og bagside, kopierer billederne og opdaterer lager og varianter.
