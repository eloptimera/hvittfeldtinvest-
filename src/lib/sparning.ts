// Händelser till Vercel Analytics (cookiefri, ingen personuppgift skickas).
//
// Klick på e-postadressen skickas som händelsen "mejl_klick". Egna händelser visas i Vercel först på
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

export function mejlKlick(sida: string) {
  skicka("mejl_klick", { sida });
}
