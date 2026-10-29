# Hvittfeldt Invest – webbplats

Webbplats för Ankie Hvittfeldt / Hvittfeldt Invest AB: styrelseuppdrag, styrelseutvärdering och
rådgivning kring ägarstyrning. Byggd och administrerad av
[TAB Marketing](https://www.treatlymarketing.se) med TanStack Start, React och Tailwind. Körs på Vercel.

```sh
bun install
bun run dev
```

## Sidor

| Sökväg               | Innehåll                                                    |
| -------------------- | ----------------------------------------------------------- |
| `/`                  | Porträtt, namn, roller, kort om, tjänster, urval av uppdrag |
| `/tjanster`          | De tre tjänsterna med ankare (`#styrelseuppdrag` m.fl.)     |
| `/om-mig`            | Bakgrund, kompetensområden, branscher, utbildning, nätverk  |
| `/erfarenhet`        | Styrelseuppdrag per ägarform, exempel, operativ bakgrund    |
| `/kontakt`           | Kontakt- och bolagsuppgifter (inget formulär)               |
| `/integritetspolicy` | GDPR-information                                            |

Sajten är informativ, inte säljande: inga bokningsknappar, inget formulär och inga
"vanliga frågor". Rosa från porträttets vägg, Fraunces för rubriker och DM Sans för brödtext.
Rubrikerna får ett rosa penseldrag som ritas fram när de scrollas in i bild.

## Loggor

Loggorna ligger som transparenta WebP-filer (max 400 px, cirka 8 kB var) i `public/logos/` och kopplas till bolaget med
`logo` och `proportion` (bredd/höjd) i `src/lib/innehall.ts`. Proportionen används för att ge
alla loggor samma visuella tyngd. Utan loggfil visas bolagsnamnet som ordbild. Loggan blir
klickbar bara om bolaget har `url`. I loggbandet är de gråtonade tills man hovrar, på
uppdragssidan visas de i färg.

## Var saker finns

| Fil                          | Innehåll                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| `src/lib/foretag.ts`         | Namn, org.nr, adress, kontaktuppgifter, LinkedIn och TAB:s länk |
| `src/lib/innehall.ts`        | Tjänster, kompetenser, styrelseuppdrag och meriter              |
| `src/lib/seo.ts`             | Metadata, porträttet och strukturerad data (schema.org)         |
| `src/components/Heading.tsx` | `PageHero` och `Avsnitt` – sidhuvud och den tvåspaltiga rytmen  |
| `src/styles.css`             | Färger och typsnitt                                             |

Sök efter `TODO(Hvittfeldt)` för det som ska stämmas av: vilka styrelseuppdrag som är aktuella.

## Bilder

- `public/ankie-hvittfeldt.webp` (800 px) och `-480.webp` – porträttet på startsidan och profilen.
- `public/hero-bred.webp` och `-1600.webp` – startsidans hero i full bredd (väggen förlängd åt sidorna).
- `public/og.jpg` – delningsbild (1200 × 630).
- `logo/hvittfeldt.png` – loggan (stående, marinblå, transparent). `logo/hvittfeldt-liggande.webp` – liggande variant i sidhuvudet, används som mask så att den tar textfärgen.
- `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `icon-*.png` – H:et ur loggan på elfenben. `logo.png` – hela loggan för strukturerad data.
- `public/logo/tab-chip.svg` – TAB Marketings logga i sidfoten, länkar till treatlymarketing.se.

## Domän

Sajtens adress (canonical, sitemap, schema) är projektets produktionsdomän i Vercel och följer
med när en egen domän kopplas. Vill ni låsa den, sätt `SAJT_URL` i Vercel, t.ex.
`https://www.hvittfeldtinvest.se`. Lägg sedan till domänen i Google Search Console och skicka in
`/sitemap.xml`.

## Statistik och cookies

- **Vercel Web Analytics** räknar besök utan cookies – slå på under Analytics i Vercel.
- Klickhändelse (`src/lib/sparning.ts`): `mejl_klick`.
- `META_PIXEL_ID` och `CLARITY_ID` slår på verktyg som kräver samtycke; då visas cookiebannern.
  Är ingen satt finns ingen banner.
