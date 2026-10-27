import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Avsnitt, PageHero } from "@/components/Heading";
import { FORETAG, PLATSHALLARE } from "@/lib/foretag";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { mejlKlick } from "@/lib/sparning";

export const Route = createFileRoute("/kontakt")({
  head: () =>
    sidhuvud({
      titel: "Kontakt",
      beskrivning: `Kontaktuppgifter till ${FORETAG.person} och ${FORETAG.juridisktNamn}, org.nr ${FORETAG.orgnr}, ${FORETAG.ort}.`,
      sokvag: "/kontakt",
      schema: [
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Kontakt", sokvag: "/kontakt" },
        ]),
      ],
    }),
  component: Kontakt,
});

function Rad({ etikett, children }: { etikett: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <dt className="caps !text-[0.7rem] text-muted-foreground sm:pt-1.5">{etikett}</dt>
      <dd className="text-lg break-words">{children}</dd>
    </div>
  );
}

function Kontakt() {
  return (
    <>
      <PageHero
        etikett={FORETAG.person}
        title="Kontakt"
        intro="Du når mig på e-post eller telefon. Min fullständiga profil finns på LinkedIn."
      />

      <Avsnitt rubrik="Kontaktuppgifter" id="kontaktuppgifter">
        <dl className="max-w-2xl divide-y divide-line border-b border-line">
          <Rad etikett="E-post">
            {FORETAG.epost ? (
              <a
                href={`mailto:${FORETAG.epost}`}
                onClick={() => mejlKlick("/kontakt")}
                className="lank"
              >
                {FORETAG.epost}
              </a>
            ) : (
              <span className="text-muted-foreground">{PLATSHALLARE.epost}</span>
            )}
          </Rad>
          <Rad etikett="Telefon">
            {FORETAG.telefon ? (
              <a href={`tel:${FORETAG.telefonLank}`} className="lank">
                {FORETAG.telefon}
              </a>
            ) : (
              <span className="text-muted-foreground">{PLATSHALLARE.telefon}</span>
            )}
          </Rad>
          <Rad etikett="LinkedIn">
            <a href={FORETAG.linkedin} target="_blank" rel="noopener noreferrer" className="lank">
              linkedin.com/in/ankiehvittfeldt
            </a>
          </Rad>
        </dl>
      </Avsnitt>

      <Avsnitt rubrik="Bolagsuppgifter" id="bolagsuppgifter">
        <dl className="max-w-2xl divide-y divide-line border-b border-line">
          <Rad etikett="Bolag">{FORETAG.juridisktNamn}</Rad>
          <Rad etikett="Org.nr">{FORETAG.orgnr}</Rad>
          <Rad etikett="Adress">
            <address className="not-italic">
              {FORETAG.gata}
              <br />
              {FORETAG.postnummer} {FORETAG.ort}
            </address>
          </Rad>
        </dl>
      </Avsnitt>
    </>
  );
}
