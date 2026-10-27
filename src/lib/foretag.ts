// Enda källan till företagsuppgifter. Allt på sajten (sidhuvud, sidfot, kontakt,
// integritetspolicy, metadata, strukturerad data och llms.txt) läser härifrån.
//
// Fält med tomt värde visas som en platshållare på kontaktsidan och utelämnas i metadata och
// strukturerad data tills de fylls i. Sök efter TODO(Hvittfeldt) för det som ska fyllas i.
export const FORETAG: {
  /** Varumärket som syns på sajten. */
  namn: string;
  /** Konsulten – används i rubriker, profil och strukturerad data (Person). */
  person: string;
  /** Det officiella förnamnet, för strukturerad data. */
  personFullstandigt: string;
  titel: string;
  /** Bolaget som driver verksamheten (personuppgiftsansvarig, fakturerar). */
  juridisktNamn: string;
  /** En mening om vad bolaget gör – används i metadata, strukturerad data och llms.txt. */
  beskrivning: string;
  /** Region där uppdragen oftast finns. Används i texter och strukturerad data. */
  region: string;
  ort: string;
  orgnr: string;
  gata: string;
  postnummer: string;
  telefon: string;
  telefonLank: string;
  epost: string;
  linkedin: string;
} = {
  namn: "Hvittfeldt Invest",
  person: "Ankie Hvittfeldt",
  personFullstandigt: "Ann-Christine Hvittfeldt",
  titel: "Professionell styrelseledamot och styrelseordförande",
  juridisktNamn: "Hvittfeldt Invest AB",
  beskrivning:
    "Styrelseuppdrag, styrelseutvärdering och rådgivning kring ägarstyrning för ägarledda, statligt ägda och noterade bolag – med Ankie Hvittfeldt, professionell styrelseledamot och ordförande med mer än 15 års erfarenhet.",
  region: "Västsverige",
  // TODO(Hvittfeldt): fyll i ort, gatuadress, postnummer, org.nr, telefon och e-post.
  ort: "",
  orgnr: "",
  gata: "",
  postnummer: "",
  telefon: "",
  telefonLank: "",
  epost: "",
  linkedin: "https://www.linkedin.com/in/ankiehvittfeldt/",
};

/** Det som visas när ett fält ovan inte är ifyllt ännu. */
export const PLATSHALLARE = {
  epost: "[E-postadress]",
  telefon: "[Telefonnummer]",
  adress: "[Gatuadress, postnummer och ort]",
} as const;

/** Webbyrån som byggt och förvaltar sajten – loggan längst ner på varje sida länkar hit. */
export const BYRA = {
  namn: "TAB Marketing",
  url: "https://www.treatlymarketing.se",
} as const;

declare const __SAJT_URL__: string;
declare const __VERIFIERING__: { google: string; bing: string };

/** Verifieringskoder för Search Console och Bing Webmaster Tools (tomma om de inte är satta). */
export const VERIFIERING = __VERIFIERING__;

/** Sajtens publika adress utan avslutande snedstreck, t.ex. https://exempel.se */
export const SAJT_URL: string = __SAJT_URL__;

/** Gör en sökväg (/tjanster) till en absolut adress (https://…/tjanster). */
export function absolut(sokvag: string): string {
  return `${SAJT_URL}${sokvag === "/" ? "/" : sokvag}`;
}

/** Hel adress på en rad, eller tom sträng om något saknas. */
export function adressRad(): string {
  if (!FORETAG.gata) return "";
  return `${FORETAG.gata}, ${[FORETAG.postnummer, FORETAG.ort].filter(Boolean).join(" ")}`;
}
