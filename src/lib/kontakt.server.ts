// Serverdelen av kontaktformuläret: kontroll av indata och utskick via Resend.
// Laddas bara på servern (se kontakt.ts), så zod och nycklar når aldrig webbläsaren.
import { z } from "zod";

const KontaktSchema = z.object({
  namn: z.string().trim().min(1).max(120),
  organisation: z.string().trim().max(160),
  roll: z.string().trim().max(60),
  epost: z.string().trim().email().max(200),
  telefon: z.string().trim().max(40),
  arende: z.string().trim().max(60),
  meddelande: z.string().trim().min(1).max(4000),
  /** Dolt fält som bara robotar fyller i. */
  falla: z.string().max(500),
});

export async function hanteraKontakt(indata: unknown): Promise<{ ok: true }> {
  const data = KontaktSchema.parse(indata);
  // Robot: låtsas att allt gick bra men skicka ingenting.
  if (data.falla) return { ok: true as const };

  const nyckel = process.env["RESEND_API_KEY"];
  const till = process.env["KONTAKT_TILL"];
  if (!nyckel || !till) {
    console.error("Kontakt: RESEND_API_KEY eller KONTAKT_TILL saknas – inget mejl skickades.");
    throw new Error("Formuläret är inte kopplat till någon mottagare ännu.");
  }

  const rader = [
    `Namn: ${data.namn}`,
    data.organisation && `Bolag/organisation: ${data.organisation}`,
    data.roll && `Roll: ${data.roll}`,
    `E-post: ${data.epost}`,
    data.telefon && `Telefon: ${data.telefon}`,
    data.arende && `Gäller: ${data.arende}`,
    `\nMeddelande:\n${data.meddelande}`,
  ].filter(Boolean);

  const svar = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${nyckel}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["KONTAKT_FRAN"] ?? "Webbplatsen <onboarding@resend.dev>",
      to: till.split(",").map((a) => a.trim()),
      reply_to: data.epost,
      subject: `Ny förfrågan via webbplatsen – ${data.organisation || data.namn}`,
      text: rader.join("\n"),
    }),
  });

  if (!svar.ok) {
    console.error("Kontakt: Resend svarade", svar.status, await svar.text());
    throw new Error("Mejlet kunde inte skickas.");
  }
  return { ok: true as const };
}
