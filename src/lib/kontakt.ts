// Kontaktformuläret skickas hit och vidare som mejl via Resend (https://resend.com).
//
// Kräver två miljövariabler i Vercel (Settings → Environment Variables):
//   RESEND_API_KEY  – API-nyckel från Resend
//   KONTAKT_TILL    – adressen som ska ta emot förfrågningarna (flera separeras med komma)
// Valfritt:
//   KONTAKT_FRAN    – avsändare, t.ex. "Hvittfeldt Invest <webb@hvittfeldtinvest.se>" när
//                     domänen är verifierad i Resend. Utan den används Resends testavsändare,
//                     som bara kan skicka till adressen Resend-kontot är registrerat på.
import { createServerFn } from "@tanstack/react-start";

/** Vem som hör av sig – hjälper att förbereda samtalet. */
export const ROLLER = [
  "Valberedning",
  "Huvudägare",
  "Vd",
  "Styrelseordförande eller ledamot",
  "Annan",
] as const;

export type Kontakt = {
  namn: string;
  organisation: string;
  roll: string;
  epost: string;
  telefon: string;
  /** Tjänstens titel, eller tomt. */
  arende: string;
  meddelande: string;
  /** Dolt fält som bara robotar fyller i. */
  falla: string;
};

export const skickaKontakt = createServerFn({ method: "POST" })
  .validator((data: Kontakt) => data)
  .handler(async ({ data }) => {
    // Dynamisk import: koden laddas bara på servern och följer aldrig med till webbläsaren.
    const { hanteraKontakt } = await import("@/lib/kontakt.server");
    return hanteraKontakt(data);
  });
