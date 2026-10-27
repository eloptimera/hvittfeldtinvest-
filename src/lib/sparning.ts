// Händelser till Vercel Analytics (cookiefri, ingen personuppgift skickas).
//
// Själva konverteringen – ett skickat kontaktformulär – räknas som besök på /tack. Klick på
// knapparna för att boka samtal skickas som händelsen "boka_klick" med vilken sida och vilken knapp, så
// att vi ser vilka knappar som leder till kontakt. Egna händelser visas i Vercel först på
// Pro-planen; på Hobby ignoreras de utan att något går sönder.
//
// Skicka aldrig namn, e-post, telefon eller fritext från formulär hit.
import { track } from "@vercel/analytics";

type Data = Record<string, string | number>;

// Max två egenskaper per händelse – det är vad Pro-planen sparar.
function skicka(namn: string, data: Data) {
  try {
    track(namn, data);
  } catch {
    // Statistik får aldrig stoppa ett klick.
  }
}

export function bokaKlick(sida: string, plats: string) {
  skicka("boka_klick", { sida, plats });
}

/** Ett skickat kontaktformulär och vilken tjänst det gällde – aldrig vad besökaren skrev. */
export function kontaktSkickad(arende: string) {
  skicka("kontakt_skickad", { arende: arende || "ej angivet" });
}

export function mejlKlick(sida: string) {
  skicka("mejl_klick", { sida });
}
