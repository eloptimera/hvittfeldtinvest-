import { createFileRoute } from "@tanstack/react-router";
import { Avsnitt, PageHero } from "@/components/Heading";
import { FORETAG } from "@/lib/foretag";
import { BRANSCHER, KOMPETENSER, UPPDRAG_I_NARINGSLIVET, UTBILDNING } from "@/lib/innehall";
import { brodsmulor, profilSchema, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/om-mig")({
  head: () =>
    sidhuvud({
      titel: `Om ${FORETAG.person}`,
      beskrivning:
        "Ankie Hvittfeldt är professionell styrelseledamot och ordförande med bakgrund i ekonomi, logistik, transport och detaljhandel.",
      sokvag: "/om-mig",
      schema: [
        profilSchema(),
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Om mig", sokvag: "/om-mig" },
        ]),
      ],
    }),
  component: OmMig,
});

function OmMig() {
  return (
    <>
      <PageHero etikett="Om mig" title={FORETAG.person} intro={FORETAG.titel} />

      <Avsnitt etikett="Bakgrund" id="bakgrund">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
          <p>
            Jag har arbetat professionellt med styrelsearbete i mer än 15 år – som ordförande och
            ledamot i ägarledda, statligt ägda och noterade bolag, och i ett statligt affärsverk.
            Jag driver {FORETAG.juridisktNamn} i Göteborg.
          </p>
          <p>
            Grunden är en ekonomutbildning och en operativ karriär i den internationella
            fordonsindustrin, med logistik och transport, och därefter i detaljhandeln.
          </p>
          <p>
            2009 gick jag det första programmet som Styrelsekraft genomförde. Sedan dess är
            styrelsearbetet mitt yrke.
          </p>
        </div>
      </Avsnitt>

      <Avsnitt etikett="Kompetensområden" id="kompetens">
        <dl className="grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
          {KOMPETENSER.map((k) => (
            <div key={k.titel}>
              <dt className="font-display text-[1.45rem] leading-tight">{k.titel}</dt>
              <dd className="mt-1 text-muted-foreground">{k.text}</dd>
            </div>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt etikett="Branscher" id="branscher">
        <p className="max-w-2xl text-lg leading-relaxed">{BRANSCHER.join(" · ")}</p>
      </Avsnitt>

      <Avsnitt etikett="Utbildning" id="utbildning">
        <dl className="max-w-2xl space-y-5">
          {UTBILDNING.map((u) => (
            <div key={u.titel}>
              <dt className="font-display text-[1.45rem] leading-tight">{u.titel}</dt>
              <dd className="mt-1 text-muted-foreground">{u.text}</dd>
            </div>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt etikett="Nätverk" id="natverk">
        <ul className="max-w-2xl space-y-3 text-lg leading-relaxed">
          {UPPDRAG_I_NARINGSLIVET.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </Avsnitt>
    </>
  );
}
