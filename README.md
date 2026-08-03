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
