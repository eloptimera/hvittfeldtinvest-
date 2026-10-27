// Allt sakinnehåll på sajten: tjänster, kompetenser, uppdrag, meriter och vanliga frågor.
// Sidorna, den strukturerade datan och llms.txt läser härifrån – ändra här, inte i sidorna.
//
// Källor för meriterna (hämtade 2026-10-27): Västsvenska Handelskammaren (samtalsledare),
// Hippoly (intervju 2018), Nilörngruppens valberedningsförslag (2022) och Everdrones
// pressmeddelande om ny styrelse (januari 2026). LinkedIn går inte att läsa automatiskt.
// TODO(Hvittfeldt): stäm av listan mot LinkedIn – vilka uppdrag är aktuella i dag, årtal,
// befattningar i de operativa rollerna och eventuella utbildningar/certifieringar.

export type Fraga = { fraga: string; svar: string };

export type Tjanst = {
  slug: string;
  titel: string;
  /** En mening – startsidan, sidfoten och strukturerad data. */
  kort: string;
  ingress: string;
  /** Vad uppdraget ger bolaget. */
  varde: readonly string[];
  /** När tjänsten passar. */
  nar: readonly string[];
  /** Hur uppdraget går till, i ordning. */
  sa: readonly { titel: string; text: string }[];
};

export const TJANSTER: readonly Tjanst[] = [
  {
    slug: "styrelseuppdrag",
    titel: "Styrelseuppdrag",
    kort: "Ledamot eller ordförande med fokus på strategi, tillväxt och governance.",
    ingress:
      "En styrelse ska göra skillnad för bolagets utveckling – inte bara godkänna det som redan hänt. Som ledamot eller ordförande bidrar jag med ett oberoende perspektiv, en strukturerad styrelseprocess och erfarenhet från ägarledda, statligt ägda och noterade bolag.",
    varde: [
      "En styrelse där strategin och omvärlden står först på dagordningen – och rapporteringen sist",
      "Tydlig rollfördelning mellan ägare, styrelse och vd",
      "Uppföljning som gör att beslut faktiskt genomförs",
      "Ett stöd och bollplank för vd mellan styrelsemötena",
      "Ordning på formalia: arbetsordning, vd-instruktion, årshjul och protokoll",
    ],
    nar: [
      "Valberedningen söker en oberoende ledamot eller ordförande",
      "Bolaget går in i en tillväxt- eller expansionsfas",
      "Styrelsen behöver förstärkas inom strategi, logistik, transport eller operativ styrning",
      "Ägaren vill gå från en formell styrelse till en arbetande styrelse",
    ],
    sa: [
      {
        titel: "Förutsättningslöst samtal",
        text: "Vi går igenom bolaget, ägarbilden och vad styrelsen behöver.",
      },
      {
        titel: "Möte med ägare och valberedning",
        text: "Vi stämmer av förväntningar, roll, tidsåtgång och oberoende.",
      },
      {
        titel: "Introduktion",
        text: "Genomgång av verksamhet, ekonomi, risker och strategi innan första mötet.",
      },
      {
        titel: "Löpande styrelsearbete",
        text: "Förberedda möten, tydliga beslut och uppföljning genom hela året.",
      },
    ],
  },
  {
    slug: "styrelseutvardering",
    titel: "Styrelseutvärdering",
    kort: "Oberoende analys av styrelsens sammansättning, arbetssätt och effektivitet.",
    ingress:
      "En styrelseutvärdering visar om styrelsen har rätt kompetens, arbetar med rätt frågor och fungerar som ett team. Utvärderingen görs av någon utanför styrelsen, så att svaren blir ärliga och slutsatserna går att använda – av ordföranden, styrelsen och valberedningen.",
    varde: [
      "En kompetensmatris som visar styrkor och luckor i styrelsens sammansättning",
      "En bild av hur möten, dagordning och informationsflöde fungerar i praktiken",
      "Bedömning av samspelet mellan ordförande, ledamöter och vd",
      "Konkreta förbättringsförslag i prioriterad ordning",
      "Ett underlag som valberedningen kan använda inför nästa stämma",
    ],
    nar: [
      "Inför årsstämman, som underlag för valberedningens arbete",
      "När styrelsen har förändrats eller bolagets situation har ändrats",
      "När ordföranden vill utveckla styrelsearbetet men saknar ett oberoende underlag",
      "Som återkommande årlig utvärdering, enligt god bolagsstyrning",
    ],
    sa: [
      {
        titel: "Uppstart med ordföranden",
        text: "Vi bestämmer syfte, omfattning och vem som får resultatet.",
      },
      {
        titel: "Enkät och intervjuer",
        text: "Varje ledamot och vd svarar konfidentiellt. Styrelsedokumenten gås igenom.",
      },
      {
        titel: "Analys och rapport",
        text: "Resultat, kompetensmatris och förbättringsförslag sammanställs.",
      },
      {
        titel: "Återkoppling",
        text: "Genomgång med styrelsen och vid behov med valberedningen.",
      },
    ],
  },
  {
    slug: "radgivning-agarstyrning",
    titel: "Rådgivning & ägarstyrning",
    kort: "Stöd till ägare och ledning vid tillväxt, ägarskiften och strukturering.",
    ingress:
      "Som ägare behöver du en styrelse och en struktur som passar bolagets nästa fas. Jag stöttar ägare och ledning med att formulera ägarens förväntningar, sätta samman rätt styrelse och skapa en styrning som håller genom tillväxt, generationsskifte eller försäljning.",
    varde: [
      "Ägardirektiv som gör förväntningarna på styrelse och ledning tydliga",
      "Rätt sammansatt styrelse – eller en rådgivande styrelse som första steg",
      "Struktur inför ägarskifte, generationsskifte, förvärv eller försäljning",
      "En styrning som håller när bolaget växer från ägarlett till mer professionaliserat",
      "Ett oberoende bollplank i beslut där ägaren står ensam",
    ],
    nar: [
      "Ett ägarlett bolag ska bygga en arbetande styrelse för första gången",
      "Ett generationsskifte eller ägarskifte planeras",
      "Bolaget förbereds för försäljning, förvärv eller extern finansiering",
      "Ägare och ledning behöver en tydligare rollfördelning",
    ],
    sa: [
      {
        titel: "Förutsättningslöst samtal",
        text: "Vi går igenom ägarbilden, bolagets läge och vad som behöver lösas.",
      },
      {
        titel: "Nulägesanalys",
        text: "Genomgång av ägarstruktur, styrelse, dokument och beslutsvägar.",
      },
      {
        titel: "Förslag",
        text: "Konkreta rekommendationer och en plan i den ordning de bör genomföras.",
      },
      {
        titel: "Genomförande",
        text: "Stöd i rekrytering, dokument, ägar- och styrelsemöten så länge det behövs.",
      },
    ],
  },
];

export function hittaTjanst(slug: string): Tjanst | undefined {
  return TJANSTER.find((t) => t.slug === slug);
}

/** Startsidans korta siffror. Håll dem till sådant som går att belägga. */
export const NYCKELTAL = [
  { varde: "15+", text: "års erfarenhet som styrelseledamot och ordförande" },
  { varde: "9", text: "år i styrelsen för Luftfartsverket, ett statligt affärsverk" },
  { varde: "4", text: "ägarformer: ägarledda, tillväxtbolag, noterade och statligt ägda" },
] as const;

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
  {
    titel: "Ledarskap och samtal",
    text: "Samtalsledare i Västsvenska Handelskammarens chefsnätverk.",
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

export const BOLAGSTYPER: readonly { titel: Agartyp; text: string }[] = [
  {
    titel: "Ägarlett",
    text: "Familje- och entreprenörsägda bolag inom industri, installation, utbildning och transport – där styrelsen ofta är ägarens viktigaste stöd.",
  },
  {
    titel: "Tillväxtbolag",
    text: "Teknik- och tjänstebolag i expansion, där styrelsen behöver balansera tempo, finansiering och kontroll.",
  },
  {
    titel: "Noterat",
    text: "Börsnoterade bolag med krav på bolagsstyrningskod, informationsgivning och oberoende.",
  },
  {
    titel: "Statligt ägt",
    text: "Statliga bolag och affärsverk där ägarens uppdrag, samhällsansvar och affär ska gå ihop.",
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

/** Vanliga frågor – startsidan och FAQPage-schema. */
export const FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad är skillnaden mellan styrelseuppdrag och rådgivning?",
    svar: "I ett styrelseuppdrag är jag vald ledamot eller ordförande och tar fullt ansvar enligt aktiebolagslagen. Som rådgivare stöttar jag ägare och ledning utan att sitta i styrelsen, till exempel inför ett ägarskifte eller när en styrelse ska byggas.",
  },
  {
    fraga: "Vilka bolag arbetar du med?",
    svar: "Ägarledda bolag, tillväxtbolag, noterade bolag och statligt ägda bolag. De flesta uppdragen finns i Västsverige, men geografin är inget hinder.",
  },
  {
    fraga: "Hur går en styrelseutvärdering till?",
    svar: "Ledamöter och vd svarar konfidentiellt på en enkät och intervjuas. Resultatet sammanställs i en rapport med kompetensmatris och förbättringsförslag, som gås igenom med styrelsen och vid behov med valberedningen.",
  },
  {
    fraga: "Är samtalet förpliktigande?",
    svar: "Nej. Det första samtalet är förutsättningslöst och kostnadsfritt. Allt vi pratar om stannar mellan oss.",
  },
];
