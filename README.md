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
"vanliga frågor". Designen är monokrom (elfenben och kol) med Cormorant Garamond och DM Sans.

## Var saker finns

| Fil                          | Innehåll                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| `src/lib/foretag.ts`         | Namn, org.nr, adress, kontaktuppgifter, LinkedIn och TAB:s länk |
| `src/lib/innehall.ts`        | Tjänster, kompetenser, styrelseuppdrag och meriter              |
| `src/lib/seo.ts`             | Metadata, porträttet och strukturerad data (schema.org)         |
| `src/components/Heading.tsx` | `PageHero` och `Avsnitt` – sidhuvud och den tvåspaltiga rytmen  |
| `src/styles.css`             | Färger och typsnitt                                             |

Sök efter `TODO(Hvittfeldt)` för det som ska fyllas i eller stämmas av: telefon och e-post,
vilka styrelseuppdrag som är aktuella, titlar och årtal i de operativa rollerna och
utbildningar/certifieringar. Tomma e-post- och telefonfält visas som platshållare på `/kontakt`.

## Bilder

- `public/ankie-hvittfeldt.webp` (800 px) och `-480.webp` – porträttet på startsidan och profilen.
- `public/og.jpg` – delningsbild (1200 × 630).
- `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `icon-*.png`, `logo.png` – monogrammet "H".
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
