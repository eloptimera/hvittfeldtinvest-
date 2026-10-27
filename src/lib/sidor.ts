// Alla indexerbara sidor – används av sitemap.xml och llms.txt.

/** `andrad` (ÅÅÅÅ-MM-DD) anges bara där vi vet när innehållet senast ändrades. */
export const SIDOR: readonly { sokvag: string; namn: string; andrad?: string }[] = [
  { sokvag: "/", namn: "Startsida" },
  { sokvag: "/tjanster", namn: "Tjänster" },
  { sokvag: "/om-mig", namn: "Om mig" },
  { sokvag: "/erfarenhet", namn: "Erfarenhet och meriter" },
  { sokvag: "/kontakt", namn: "Kontakt" },
  { sokvag: "/integritetspolicy", namn: "Integritetspolicy" },
];

export function textSvar(text: string, typ: string): Response {
  return new Response(text, {
    headers: {
      "Content-Type": `${typ}; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
