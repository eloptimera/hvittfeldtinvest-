// Gemensam SEO/GEO-hjälp: metadata per sida och strukturerad data (schema.org).
// Varje route anropar sidhuvud() i sin head() – då blir titel, beskrivning, canonical,
// delningsbild och strukturerad data likadana överallt.
import { absolut, FORETAG, SAJT_URL } from "@/lib/foretag";
import { KOMPETENSER, TJANSTER, type Tjanst } from "@/lib/innehall";

/** Standardbilden när en länk delas. */
export const DELNINGSBILD = { src: "/og.jpg", bredd: 1200, hojd: 630 } as const;

/** Porträttet – används på sajten och i den strukturerade datan. */
export const PORTRATT = {
  src: "/ankie-hvittfeldt.webp",
  litenSrc: "/ankie-hvittfeldt-480.webp",
  bredd: 800,
  hojd: 800,
  alt: "Ankie Hvittfeldt, professionell styrelseledamot och ordförande, framför en plommonfärgad vägg",
} as const;

const FORETAG_ID = `${SAJT_URL}/#foretag`;
const PERSON_ID = `${SAJT_URL}/#person`;

type Schema = Record<string, unknown>;

/** JSON-LD som går säkert att lägga i en <script>-tagg. */
export function jsonLd(schema: Schema) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

export function sidhuvud({
  titel,
  beskrivning,
  sokvag,
  schema = [],
}: {
  /** Titel utan företagsnamn – det läggs till automatiskt. */
  titel: string;
  beskrivning: string;
  sokvag: string;
  schema?: readonly Schema[];
}) {
  const fullTitel = titel === FORETAG.namn ? titel : `${titel} | ${FORETAG.namn}`;
  const url = absolut(sokvag);
  return {
    meta: [
      { title: fullTitel },
      { name: "description", content: beskrivning },
      { property: "og:title", content: fullTitel },
      { property: "og:description", content: beskrivning },
      { property: "og:url", content: url },
      { property: "og:image", content: absolut(DELNINGSBILD.src) },
      { property: "og:image:width", content: String(DELNINGSBILD.bredd) },
      { property: "og:image:height", content: String(DELNINGSBILD.hojd) },
      {
        property: "og:image:alt",
        content: `${FORETAG.person} – styrelseuppdrag, styrelseutvärdering och ägarstyrning`,
      },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schema.map(jsonLd),
  };
}

/** Bolaget, konsulten och webbplatsen – ligger på alla sidor via roten. */
export function grundSchema(): Schema {
  const foretag: Schema = {
    "@type": "ProfessionalService",
    "@id": FORETAG_ID,
    name: FORETAG.namn,
    legalName: FORETAG.juridisktNamn,
    description: FORETAG.beskrivning,
    url: absolut("/"),
    logo: absolut("/logo.png"),
    image: absolut(DELNINGSBILD.src),
    founder: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: FORETAG.region },
      { "@type": "Country", name: "Sverige" },
    ],
    knowsAbout: TJANSTER.map((t) => t.titel),
    sameAs: [FORETAG.linkedin],
  };
  if (FORETAG.gata) {
    foretag["address"] = {
      "@type": "PostalAddress",
      streetAddress: FORETAG.gata,
      postalCode: FORETAG.postnummer,
      addressLocality: FORETAG.ort,
      addressCountry: "SE",
    };
  }
  if (FORETAG.telefon) foretag["telephone"] = FORETAG.telefonLank;
  if (FORETAG.epost) foretag["email"] = FORETAG.epost;
  if (FORETAG.orgnr) foretag["taxID"] = FORETAG.orgnr;

  const person: Schema = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: FORETAG.person,
    alternateName: FORETAG.personFullstandigt,
    jobTitle: FORETAG.titel,
    image: absolut(PORTRATT.src),
    url: absolut("/om-mig"),
    sameAs: [FORETAG.linkedin],
    worksFor: { "@id": FORETAG_ID },
    knowsAbout: KOMPETENSER.map((k) => k.titel),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      foretag,
      person,
      {
        "@type": "WebSite",
        "@id": `${SAJT_URL}/#webbplats`,
        name: FORETAG.namn,
        url: absolut("/"),
        inLanguage: "sv-SE",
        publisher: { "@id": FORETAG_ID },
      },
    ],
  };
}

/** Tjänsten som strukturerad data. */
export function tjanstSchema(t: Tjanst): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.titel,
    serviceType: t.titel,
    description: t.ingress,
    url: absolut(`/tjanster#${t.slug}`),
    provider: { "@id": FORETAG_ID },
    areaServed: { "@type": "Country", name: "Sverige" },
  };
}

export function brodsmulor(steg: readonly { namn: string; sokvag: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steg.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.namn,
      item: absolut(s.sokvag),
    })),
  };
}

/** Profilsidan som ProfilePage – kopplar sidan till personen. */
export function profilSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absolut("/om-mig"),
    mainEntity: { "@id": PERSON_ID },
  };
}
