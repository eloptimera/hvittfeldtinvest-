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
  /**
   * "nuvarande" = registrerat hos Bolagsverket i oktober 2026 (via allabolag.se).
   * "tidigare" = belagt avslutat. "övrigt" = uppdrag genom åren där dagens status inte är belagd.
   */
  status: "nuvarande" | "tidigare" | "övrigt";
  /** Bolagets hemsida. Utelämnad = loggan går inte att klicka på. */
  url?: string;
  /** Loggfil i public/logos/ (svg eller png). Utelämnad = bolagsnamnet visas som ordbild. */
  logo?: string;
  /** Kort om bolaget eller uppdraget – bara det som går att belägga. */
  not?: string;
};

/** Nuvarande uppdrag först, sedan övriga. Hemsidorna är kontrollerade mot bolagens egna sidor
 * eller register (oktober 2026); bolag utan bekräftad hemsida saknar `url` och går inte att klicka på. TODO(Hvittfeldt): stäm av listan med Ankie och lägg
 * loggfilerna i public/logos/ – Bolagsverket visar 12 befattningar men bara 5 publikt. */
export const STYRELSEUPPDRAG: readonly Styrelseuppdrag[] = [
  {
    bolag: "Everdrone AB",
    url: "https://everdrone.com",
    roll: "Ordförande",
    typ: "Tillväxtbolag",
    status: "nuvarande",
    not: "Drönarleveranser för sjukvården. Ordförande sedan januari 2026.",
  },
  {
    bolag: "Healsafe Interiör AB",
    url: "https://healsafeinterior.com",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Inredning som minskar risker inom psykiatri och kriminalvård.",
  },
  {
    bolag: "Lightning Group AB",
    url: "https://www.lightninggroup.se",
    roll: "Ledamot",
    typ: "Noterat",
    status: "nuvarande",
    not: "Belysningskoncern, noterad på Spotlight Stock Market (tidigare Vadsbo SwitchTech Group).",
  },
  {
    bolag: "NetGroup Engineering AB",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Teknikkonsulter i Göteborg.",
  },
  {
    bolag: "Skaraborgs Ortopedservice AB",
    url: "https://ortopedservice.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Ortopedteknisk verksamhet i Skövde.",
  },
  {
    bolag: "Nilörngruppen AB",
    url: "https://www.nilorn.com",
    roll: "Ledamot",
    typ: "Noterat",
    status: "tidigare",
    not: "Etiketter och varumärkesprofilering för modebranschen.",
  },
  {
    bolag: "Luftfartsverket",
    url: "https://www.lfv.se",
    roll: "Ledamot",
    typ: "Statligt ägt",
    status: "tidigare",
    not: "Statligt affärsverk för flygtrafiktjänst. Nio år i styrelsen.",
  },
  {
    bolag: "Green Cargo AB",
    url: "https://www.greencargo.com",
    roll: "Ledamot",
    typ: "Statligt ägt",
    status: "tidigare",
    not: "Statligt ägt godstransportbolag på järnväg.",
  },
  {
    bolag: "Integra Engineering AB",
    roll: "Ordförande och ledamot",
    typ: "Ägarlett",
    status: "tidigare",
    not: "Förvärvades av Projektengagemang 2018.",
  },
  {
    bolag: "Mymo AB",
    url: "https://mymo.se",
    roll: "Ordförande",
    typ: "Tillväxtbolag",
    status: "övrigt",
  },
  {
    bolag: "VFG Utbildning AB",
    url: "https://www.vfg.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "övrigt",
  },
  { bolag: "Brålanda Industri AB", roll: "Ordförande", typ: "Ägarlett", status: "övrigt" },
  {
    bolag: "Berlex AB",
    url: "https://www.berlex.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "övrigt",
  },
  {
    bolag: "Wikström Installationskonsult AB",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "övrigt",
  },
  {
    bolag: "Intereast Transport AB",
    roll: "Ordförande och ledamot",
    typ: "Ägarlett",
    status: "övrigt",
  },
  { bolag: "Modern Ekonomi AB", roll: "Ledamot", typ: "Noterat", status: "övrigt" },
  { bolag: "AA Bolagen AB", roll: "Ledamot", typ: "Ägarlett", status: "övrigt" },
];

/** Områden där förändring drivits – beskrivna utifrån belagda uppdrag, inga påhittade siffror.
 * TODO(Hvittfeldt): komplettera med mätbara resultat som Ankie godkänt (tillväxt, lönsamhet,
 * genomförda förvärv eller ägarskiften) – de väger tyngst för en valberedning. */
export const VARDESKAPANDE = [
  {
    titel: "Tillväxt och expansion",
    text: "Ordförande i Everdrone sedan januari 2026, när en ny styrelse valdes inför bolagets fortsatta expansion i Europa.",
  },
  {
    titel: "Ägarskifte och försäljning",
    text: "Styrelsearbete i teknikkonsultbolaget Integra Engineering, som förvärvades av Projektengagemang 2018.",
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
