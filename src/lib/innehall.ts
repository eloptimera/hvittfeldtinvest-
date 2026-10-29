// Allt sakinnehåll på sajten: tjänster, kompetenser, uppdrag och meriter.
// Sidorna, den strukturerade datan och llms.txt läser härifrån – ändra här, inte i sidorna.
//
// Presentation, operativ bakgrund, certifiering och uppdragslista är från kunden (oktober 2026).
// TODO(Hvittfeldt): stäm av uppdragslistan när uppdrag tillkommer eller avslutas.

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
    text: "Erfarenhet av ägarledda, medarbetarägda, statligt ägda och noterade bolag – och av ägarskiften.",
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
  "Detaljhandel",
  "Säkerhetsprodukter",
  "Hälsa och ortopedteknik",
] as const;

export const UTBILDNING = [
  {
    titel: "Certifierad styrelseledamot",
    text: "Certifierad genom Västsvenska Handelskammaren.",
  },
  { titel: "Ekonomutbildning", text: "Grunden i ekonomi, före den operativa karriären." },
  {
    titel: "Styrelsekraft, 2009",
    text: "Deltog i det första programmet som Styrelsekraft genomförde – starten på karriären som professionell styrelseledamot.",
  },
] as const;

export const UPPDRAG_I_NARINGSLIVET = [
  "Samtalsledare i Västsvenska Handelskammarens chefs- och vd-nätverk, i Göteborg och Trollhättan",
  "Regionansvarig för Styrelsepoolen Väst",
] as const;

export type Befattning = {
  organisation: string;
  titel: string;
  text: string;
};

/** Operativ bakgrund – ledande befattningar före styrelsearbetet. */
export const OPERATIVT: readonly Befattning[] = [
  {
    organisation: "DFDS Logistics Sweden",
    titel: "Business Development Director",
    text: "Medlem i företagsledningen för DFDS A/S svenska logistikverksamhet. Omsättning 2 miljarder kronor.",
  },
  {
    organisation: "Hemtex AB",
    titel: "IT & Logistics Director",
    text: "Ansvar för IT och logistik i en rikstäckande detaljhandelskedja. Omsättning 1,5 miljarder kronor.",
  },
  {
    organisation: "Volvo Transport AB",
    titel: "Director of Material Sourcing, Traffic & Dispatch",
    text: "Eget kommersiellt ansvar för 1 miljard kronor.",
  },
];

export type Agartyp = "Ägarlett" | "Tillväxtbolag" | "Noterat" | "Statligt ägt";

export type Styrelseuppdrag = {
  bolag: string;
  /** Rollen som visas i boxen, t.ex. "Ordförande", "Ledamot" eller "Samtalsledare". */
  roll: string;
  typ: Agartyp;
  /**
   * "nuvarande" = enligt Bolagsverket (oktober 2026) och kunden. "tidigare" = övriga uppdrag
   * genom åren.
   */
  status: "nuvarande" | "tidigare";
  /** Bolagets hemsida. Utelämnad = loggan går inte att klicka på. */
  url?: string;
  /** Transparent loggfil i public/logos/. Utelämnad = bolagsnamnet visas som ordbild. */
  logo?: string;
  /** Loggans bredd/höjd – används för att ge alla loggor samma visuella tyngd. */
  proportion?: number;
  /** Kort om bolaget eller uppdraget – bara det som går att belägga. */
  not?: string;
};

/** Nuvarande uppdrag först, sedan övriga. Hemsidorna är kontrollerade mot bolagens egna sidor
 * eller register (oktober 2026); bolag utan bekräftad hemsida saknar `url` och går inte att klicka på. Ordningen här är ordningen på sajten. */
export const STYRELSEUPPDRAG: readonly Styrelseuppdrag[] = [
  {
    bolag: "Everdrone AB",
    logo: "/logos/everdrone.webp",
    proportion: 6.98,
    url: "https://everdrone.com",
    roll: "Ordförande",
    typ: "Tillväxtbolag",
    status: "nuvarande",
    not: "Drönarleveranser för sjukvården. Ordförande sedan januari 2026.",
  },
  {
    bolag: "Healsafe Interiör AB",
    logo: "/logos/healsafe.webp",
    proportion: 3.92,
    url: "https://healsafeinterior.com",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Inredning som minskar risker inom psykiatri och kriminalvård.",
  },
  {
    bolag: "Lightning Group AB",
    logo: "/logos/lightning-group.webp",
    proportion: 2.93,
    url: "https://www.lightninggroup.se",
    roll: "Ledamot",
    typ: "Noterat",
    status: "nuvarande",
    not: "Belysningskoncern, noterad på Spotlight Stock Market (tidigare Vadsbo SwitchTech Group).",
  },
  {
    bolag: "NetGroup Engineering AB",
    logo: "/logos/netgroup.webp",
    proportion: 4.14,
    url: "https://netgroupengineering.com",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Teknikkonsulter i Göteborg.",
  },
  {
    bolag: "Skaraborgs Ortopedservice AB",
    logo: "/logos/ortopedservice.webp",
    proportion: 2.46,
    url: "https://ortopedservice.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Ortopedteknisk verksamhet i Skövde.",
  },
  {
    bolag: "VTI",
    logo: "/logos/vti.webp",
    proportion: 1.46,
    url: "https://www.vti.se",
    roll: "Ledamot",
    typ: "Statligt ägt",
    status: "nuvarande",
    not: "Statens väg- och transportforskningsinstitut.",
  },
  {
    bolag: "GLC",
    url: "https://glc.se",
    logo: "/logos/glc.webp",
    proportion: 3.25,
    roll: "Ledamot",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Göteborgs Lastbilcentral, ekonomisk förening.",
  },
  {
    bolag: "Styrelsepoolen",
    url: "https://www.styrelsepoolen.se",
    logo: "/logos/styrelsepoolen.webp",
    proportion: 1.99,
    roll: "Ansvarig Styrelsepoolen Väst och ledamot",
    typ: "Ägarlett",
    status: "nuvarande",
  },
  {
    bolag: "Västsvenska Handelskammaren",
    url: "https://www.vastsvenskahandelskammaren.se/chefsnatverk-samtalsledare/ankie-hvittfeldt/",
    logo: "/logos/vastsvenska-handelskammaren.webp",
    proportion: 0.99,
    roll: "Samtalsledare",
    typ: "Ägarlett",
    status: "nuvarande",
    not: "Samtalsledare i chefs- och vd-nätverken i Göteborg och Trollhättan.",
  },
  {
    bolag: "Nilörngruppen AB",
    logo: "/logos/nilorn.webp",
    proportion: 3.17,
    url: "https://www.nilorn.com",
    roll: "Ledamot",
    typ: "Noterat",
    status: "tidigare",
    not: "Etiketter och varumärkesprofilering för modebranschen.",
  },
  {
    bolag: "Luftfartsverket",
    logo: "/logos/lfv.webp",
    proportion: 2.07,
    url: "https://www.lfv.se",
    roll: "Ledamot",
    typ: "Statligt ägt",
    status: "tidigare",
    not: "Statligt affärsverk för flygtrafiktjänst. Nio år i styrelsen.",
  },
  {
    bolag: "Green Cargo AB",
    logo: "/logos/green-cargo.webp",
    proportion: 2.59,
    url: "https://www.greencargo.com",
    roll: "Ledamot",
    typ: "Statligt ägt",
    status: "tidigare",
    not: "Statligt ägt godstransportbolag på järnväg. Åtta år i styrelsen.",
  },
  {
    bolag: "Integra Engineering AB",
    logo: "/logos/integra.webp",
    proportion: 3.52,
    roll: "Ordförande och ledamot",
    typ: "Ägarlett",
    status: "tidigare",
    not: "Förvärvades av Projektengagemang 2018.",
  },
  {
    bolag: "Mymo AB",
    logo: "/logos/mymo.webp",
    proportion: 2.61,
    url: "https://mymo.se",
    roll: "Ordförande",
    typ: "Tillväxtbolag",
    status: "tidigare",
  },
  {
    bolag: "VFG Utbildning AB",
    logo: "/logos/vfg.webp",
    proportion: 2.58,
    url: "https://www.vfg.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "Brålanda Industri AB",
    logo: "/logos/bralanda.webp",
    proportion: 3.12,
    url: "https://bralandaindustri.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "Berlex AB",
    logo: "/logos/berlex.webp",
    proportion: 4.69,
    url: "https://www.berlex.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "Wikström Installationskonsult AB",
    logo: "/logos/wikstrom.webp",
    proportion: 1.59,
    url: "https://www.wikstromab.se",
    roll: "Ordförande",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "Intereast Transport AB",
    logo: "/logos/intereast.webp",
    proportion: 1.46,
    url: "https://www.intereastgroup.com/sv/",
    roll: "Ordförande och ledamot",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "Modern Ekonomi AB",
    logo: "/logos/modern-ekonomi.webp",
    proportion: 1.32,
    roll: "Ledamot",
    typ: "Noterat",
    status: "tidigare",
  },
  {
    bolag: "AA Bolagen AB",
    logo: "/logos/aa-bolagen.webp",
    proportion: 1.0,
    url: "https://www.aabolagen.se",
    roll: "Ledamot",
    typ: "Ägarlett",
    status: "tidigare",
  },
  {
    bolag: "GOKAP Invest",
    url: "https://www.gokap.se",
    logo: "/logos/gokap.webp",
    proportion: 5.8,
    roll: "Medgrundare",
    typ: "Ägarlett",
    status: "tidigare",
  },
];

/** Exempel på områden där styrelsearbetet har gjort skillnad. Varje text kan ha flera stycken. */
export const VARDESKAPANDE: readonly { titel: string; stycken: readonly string[] }[] = [
  {
    titel: "Tillväxt och expansion",
    stycken: [
      "Ordförande i Everdrone sedan januari 2026, när en ny styrelse valdes inför bolagets fortsatta expansion i Europa.",
    ],
  },
  {
    titel: "Ägarskifte och försäljning",
    stycken: [
      "Jag har erfarenhet av ägarskiften och företagsförsäljningar i bolag, där jag bidragit med strategiskt perspektiv, affärsmässighet och förmågan att driva processer framåt med fokus på värdeskapande.",
    ],
  },
  {
    titel: "Från ägarlett till professionell styrelse",
    stycken: [
      "Ordförandeskap i ägarledda bolag, med strategi och omvärld först på dagordningen och tydlig uppföljning av besluten.",
    ],
  },
  {
    titel: "Samhällsviktig infrastruktur och transportsektorns utveckling",
    stycken: [
      "Nio år i Luftfartsverkets styrelse, åtta år i Green Cargo och i dag verksam i statliga VTI – styrning där säkerhet, ägarens uppdrag och lönsamhet ska balanseras.",
      "Erfarenheten av att leda och styra inom samhällsviktig infrastruktur är en av mina styrkor. Mitt fokus har alltid legat på den komplexa styrning som krävs där högsta säkerhet, ägarens samhällsuppdrag och kommersiell lönsamhet måste balanseras i perfekt harmoni.",
      "Genom mitt engagemang i Statens väg- och transportforskningsinstitut (VTI) fördjupas denna expertis ytterligare. VTI spelar en helt avgörande roll för framtidens mobilitet genom att bidra med forskning och kunskap i världsklass. Att verka i gränssnittet mellan tillämpad forskning, statlig styrning och transportsektorns praktiska behov ger en solid grund för att driva hållbar utveckling och strategisk förnyelse inom svensk infrastruktur.",
    ],
  },
];
