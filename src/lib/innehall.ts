// Allt sakinnehåll på sajten: tjänster, kompetenser, uppdrag, meriter och vanliga frågor.
// Sidorna, den strukturerade datan och llms.txt läser härifrån – ändra här, inte i sidorna.
//
// Källor för meriterna (hämtade 2026-10-27): Västsvenska Handelskammaren (samtalsledare),
// Hippoly (intervju 2018), Nilörngruppens valberedningsförslag (2022) och Everdrones
// pressmeddelande om ny styrelse (januari 2026). LinkedIn går inte att läsa automatiskt.
// TODO(Hvittfeldt): stäm av listan mot LinkedIn – vilka uppdrag är aktuella i dag, årtal,
// befattningar i de operativa rollerna och eventuella utbildningar/certifieringar.

export type Tjanst = {
  slug: string;
  titel: string;
  /** En mening – startsidan och strukturerad data. */
  kort: string;
  ingress: string;
  /** Vad uppdraget omfattar. */
  omfattar: readonly string[];
};

export const TJANSTER: readonly Tjanst[] = [
  {
    slug: "styrelseuppdrag",
    titel: "Styrelseuppdrag",
    kort: "Ledamot eller ordförande med fokus på strategi, tillväxt och bolagsstyrning.",
    ingress:
      "Uppdrag som styrelseledamot eller styrelseordförande, med fokus på strategi, tillväxt och god bolagsstyrning. Erfarenheten kommer från ägarledda, statligt ägda och noterade bolag.",
    omfattar: [
      "Strategiarbete och löpande uppföljning av strategin",
      "Ordförandeskap: dagordning, årshjul, arbetsordning och vd-instruktion",
      "Tydlig rollfördelning mellan ägare, styrelse och vd",
      "Stöd till vd mellan styrelsemötena",
    ],
  },
  {
    slug: "styrelseutvardering",
    titel: "Styrelseutvärdering",
    kort: "Oberoende analys av styrelsens sammansättning och arbetssätt.",
    ingress:
      "En oberoende utvärdering av styrelsens sammansättning, arbetssätt och samspel med vd. Resultatet är ett underlag för ordföranden, styrelsen och valberedningen.",
    omfattar: [
      "Enkät och konfidentiella intervjuer med ledamöter och vd",
      "Kompetensmatris över styrelsens sammansättning",
      "Genomgång av möten, dagordning och informationsflöde",
      "Rapport med förbättringsförslag och återkoppling till styrelsen",
    ],
  },
  {
    slug: "radgivning-agarstyrning",
    titel: "Rådgivning och ägarstyrning",
    kort: "Stöd till ägare och ledning vid tillväxt, ägarskiften och strukturering.",
    ingress:
      "Stöd till ägare och ledning när bolaget växer, byter ägare eller behöver en ny struktur för styrningen.",
    omfattar: [
      "Ägardirektiv och förväntningar på styrelse och ledning",
      "Sammansättning av styrelse eller rådgivande styrelse",
      "Struktur inför generationsskifte, ägarskifte, förvärv eller försäljning",
    ],
  },
];

export function hittaTjanst(slug: string): Tjanst | undefined {
  return TJANSTER.find((t) => t.slug === slug);
}

export const KOMPETENSER = [
  {
    titel: "Strategi och affärsutveckling",
    text: "Strategiarbete som utgår från omvärlden och följs upp på varje möte.",
  },
  {
    titel: "Styrelsearbete och governance",
    text: "Arbetsordning, vd-instruktion, årshjul, ordförandeskap och styrelseutvärdering.",
  },
  {
    titel: "Logistik och transport",
    text: "Operativ bakgrund från fordonsindustri, transport och detaljhandelns flöden.",
  },
  {
    titel: "Ägarstyrning",
    text: "Erfarenhet av ägarledda, statligt ägda och noterade bolag – och av ägarskiften.",
  },
  {
    titel: "Ekonomi och uppföljning",
    text: "Ekonomisk utbildning och vana att styra på nyckeltal, risk och kassaflöde.",
  },
] as const;

export const BRANSCHER = [
  "Transport och logistik",
  "Flyg och drönarteknik",
  "Industri och tillverkning",
  "Installation och teknikkonsulting",
  "Detaljhandel och mode",
  "Utbildning",
  "Hälsa och ortopedteknik",
] as const;

export const UTBILDNING = [
  { titel: "Ekonomutbildning", text: "Grunden i ekonomi, före den operativa karriären." },
  {
    titel: "Styrelsekraft, 2009",
    text: "Deltog i det första programmet som Styrelsekraft genomförde – starten på karriären som professionell styrelseledamot.",
  },
  // TODO(Hvittfeldt): lägg till fler utbildningar och certifieringar (t.ex. StyrelseAkademien)
  // när de är bekräftade. Skriv bara in det som stämmer.
] as const;

export const UPPDRAG_I_NARINGSLIVET = [
  "Samtalsledare i Västsvenska Handelskammarens chefs- och vd-nätverk, i Göteborg och Trollhättan",
  "Regionansvarig för Styrelsepoolen Väst",
] as const;

export type Befattning = { organisation: string; omrade: string; text: string };

/** Operativ bakgrund. TODO(Hvittfeldt): lägg till titel och årtal per roll. */
export const OPERATIVT: readonly Befattning[] = [
  {
    organisation: "Volvo",
    omrade: "Internationell fordonsindustri",
    text: "Logistik och transport i en global tillverkningsverksamhet.",
  },
  {
    organisation: "Speedcargo AB",
    omrade: "Transport och logistik",
    text: "Operativt ansvar i en transport- och logistikverksamhet.",
  },
  {
    organisation: "Hemtex",
    omrade: "Detaljhandel",
    text: "Operativ verksamhet i en rikstäckande detaljhandelskedja.",
  },
];

export type Agartyp = "Ägarlett" | "Tillväxtbolag" | "Noterat" | "Statligt ägt";

export type Styrelseuppdrag = {
  bolag: string;
  roll: "Ordförande" | "Ledamot" | "Ordförande och ledamot";
  typ: Agartyp;
  /** Kort om bolaget eller uppdraget – bara det som går att belägga. */
  not?: string;
  tidigare?: boolean;
};

/** Urval av nuvarande och tidigare uppdrag. Ordning: noterat/statligt/tillväxt först. */
export const STYRELSEUPPDRAG: readonly Styrelseuppdrag[] = [
  {
    bolag: "Everdrone AB",
    roll: "Ordförande",
    typ: "Tillväxtbolag",
    not: "Drönarleveranser för sjukvården. Ordförande sedan januari 2026, inför en accelererad expansion i Europa.",
  },
  {
    bolag: "Nilörngruppen AB",
    roll: "Ledamot",
    typ: "Noterat",
    not: "Etiketter och varumärkesprofilering för modebranschen. Invald 2022.",
  },
  {
    bolag: "Luftfartsverket",
    roll: "Ledamot",
    typ: "Statligt ägt",
    not: "Statligt affärsverk för flygtrafiktjänst. Nio år i styrelsen.",
  },
  {
    bolag: "Green Cargo AB",
    roll: "Ledamot",
    typ: "Statligt ägt",
    not: "Statligt ägt godstransportbolag på järnväg.",
    tidigare: true,
  },
  { bolag: "Mymo AB", roll: "Ordförande", typ: "Tillväxtbolag" },
  { bolag: "Brålanda Industri AB", roll: "Ordförande", typ: "Ägarlett" },
  { bolag: "Berlex AB", roll: "Ordförande", typ: "Ägarlett" },
  { bolag: "Netgroup Engineering AB", roll: "Ordförande", typ: "Ägarlett" },
  { bolag: "VFG Utbildning AB", roll: "Ordförande", typ: "Ägarlett" },
  { bolag: "Wikström Installationskonsult AB", roll: "Ordförande", typ: "Ägarlett" },
  { bolag: "Intereast Transport AB", roll: "Ordförande och ledamot", typ: "Ägarlett" },
  { bolag: "Vadsbo SwitchTech Group AB", roll: "Ledamot", typ: "Ägarlett" },
  { bolag: "Skaraborgs Ortopedservice AB", roll: "Ledamot", typ: "Ägarlett" },
  { bolag: "Modern Ekonomi AB", roll: "Ledamot", typ: "Ägarlett" },
  { bolag: "AA Bolagen AB", roll: "Ledamot", typ: "Ägarlett" },
  {
    bolag: "Integra Engineering AB",
    roll: "Ledamot",
    typ: "Ägarlett",
    not: "Uppdraget avslutades när bolaget förvärvades av Projektengagemang 2018.",
    tidigare: true,
  },
];

/** Områden där förändring drivits – beskrivna utifrån belagda uppdrag, inga påhittade siffror.
 * TODO(Hvittfeldt): komplettera med mätbara resultat som Ankie godkänt (tillväxt, lönsamhet,
 * genomförda förvärv eller ägarskiften) – de väger tyngst för en valberedning. */
export const VARDESKAPANDE = [
  {
    titel: "Tillväxt och expansion",
    text: "Ordförande i Everdrone, som efter nyval av styrelsen i januari 2026 tar nästa steg i Europa. Fokus på strategi, finansiering och en styrning som håller i högre tempo.",
  },
  {
    titel: "Ägarskifte och försäljning",
    text: "Styrelseledamot i Integra Engineering fram till förvärvet av Projektengagemang 2018 – ett exempel på styrelsearbete genom en strukturaffär.",
  },
  {
    titel: "Samhällsviktig infrastruktur",
    text: "Nio år i Luftfartsverkets styrelse och tidigare uppdrag i Green Cargo – styrning där säkerhet, ägarens uppdrag och lönsamhet ska balanseras.",
  },
  {
    titel: "Från ägarlett till professionell styrelse",
    text: "Ordförandeskap i ägarledda bolag i Västsverige, med strategi och omvärld först på dagordningen och tydlig uppföljning av besluten.",
  },
] as const;
