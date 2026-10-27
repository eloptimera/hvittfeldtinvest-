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
| `/`                  | Startsida: värdeerbjudande, porträtt, tjänster, kompetenser |
| `/tjanster`          | De tre tjänsterna med ankare (`#styrelseuppdrag` m.fl.)     |
| `/om-mig`            | Profil, expertis, branscher, utbildning och nätverk         |
| `/erfarenhet`        | Operativ bakgrund, styrelseuppdrag, bolagstyper, resultat   |
| `/kontakt`           | Kontaktuppgifter och kontaktformulär                        |
| `/integritetspolicy` | GDPR-information                                            |
| `/tack`              | Visas efter skickat formulär (noindex)                      |

## Var saker finns

| Fil                   | Innehåll                                                                  |
| --------------------- | ------------------------------------------------------------------------- |
| `src/lib/foretag.ts`  | Namn, kontaktuppgifter, LinkedIn – och TAB Marketings länk i sidfoten     |
| `src/lib/innehall.ts` | Tjänster, kompetenser, styrelseuppdrag, meriter och vanliga frågor        |
| `src/lib/seo.ts`      | Metadata, porträttet och strukturerad data (schema.org)                   |
| `src/lib/sidor.ts`    | Sidlistan för `sitemap.xml` och `llms.txt`                                |
| `src/styles.css`      | Färger och typsnitt (marinblått, plommon, guld – hämtade från porträttet) |

Sök efter `TODO(Hvittfeldt)` för det som ska fyllas i eller stämmas av: kontaktuppgifter,
org.nr, vilka styrelseuppdrag som är aktuella, titlar och årtal i de operativa rollerna,
utbildningar/certifieringar och mätbara resultat.

Tomma kontaktuppgifter visas som platshållare på `/kontakt` och utelämnas i sidfoten och i den
strukturerade datan tills de fylls i.

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

## Kontaktformuläret

Formuläret på `/kontakt` skickar mejl via [Resend](https://resend.com). Sätt i Vercel
(Settings → Environment Variables):

- `RESEND_API_KEY` – API-nyckel från Resend
- `KONTAKT_TILL` – adressen som tar emot förfrågningarna
- `KONTAKT_FRAN` (valfri) – avsändare när domänen är verifierad i Resend

Utan nyckeln visar formuläret ett felmeddelande i stället för att låtsas att det skickats.

## Statistik och cookies

- **Vercel Web Analytics** räknar besök utan cookies – slå på under Analytics i Vercel.
- Klickhändelser (`src/lib/sparning.ts`): `boka_klick`, `kontakt_skickad`, `mejl_klick`.
- `META_PIXEL_ID` och `CLARITY_ID` slår på verktyg som kräver samtycke; då visas cookiebannern.
  Är ingen satt finns ingen banner.
