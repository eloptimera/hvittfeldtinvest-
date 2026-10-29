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
        "Ankie Hvittfeldt är styrelseordförande och styrelseledamot med erfarenhet från över 30 styrelseuppdrag och ledande befattningar inom logistik, internationellt och i Sverige.",
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
      <PageHero
        etikett="Om mig"
        title={FORETAG.person}
        intro="Söker ni en kraft i styrelsen som bidrar till att hålla fokus på de långsiktiga frågorna och tillväxtagendan?"
      />

      <Avsnitt rubrik="Bakgrund" id="bakgrund">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
          <p className="font-display text-[1.6rem] leading-snug">
            Jag är en trygg, modig och inspirerande ledare med ett tydligt fokus på möjligheter och
            affärsmässighet.
          </p>
          <p>
            Jag skapar värde genom min förmåga och erfarenhet av att utveckla strukturer och
            strategier som gör det möjligt för organisationer och företag att ta tillvara sin fulla
            potential. Att arbeta tillsammans med mig ger energi, engagemang och många kreativa
            tankar. Jag är en offensiv, prestigelös och möjliggörande ledare.
          </p>
          <p>
            Jag har haft ledande befattningar, både internationellt och i Sverige, med särskilt
            fokus på logistik. Under de senaste 15 åren har jag varit verksam i styrelser, både som
            ordförande och ledamot.
          </p>
          <p>
            Jag har ett starkt engagemang för företagande och entreprenörskap. Med mig får ni en
            engagerad styrelseordförande eller styrelseledamot med erfarenhet från över 30
            styrelseuppdrag. Jag har arbetat med allt från mindre företag och medarbetarägda
            verksamheter till börsnoterade och statligt ägda bolag.
          </p>
          <p>
            Att ha bott och arbetat utomlands har gett mig värdefull erfarenhet av internationellt
            affärsarbete och en god förståelse för hur man bygger affärsrelationer över såväl
            landsgränser som kulturella skillnader.
          </p>
          <p>Jag är certifierad styrelseledamot genom Västsvenska Handelskammaren.</p>
        </div>
      </Avsnitt>

      <Avsnitt rubrik="Kompetensområden" id="kompetens">
        <dl className="grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
          {KOMPETENSER.map((k) => (
            <div key={k.titel}>
              <dt className="font-display text-[1.45rem] leading-tight">{k.titel}</dt>
              <dd className="mt-1 text-muted-foreground">{k.text}</dd>
            </div>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt rubrik="Branscher" id="branscher">
        <p className="max-w-2xl text-lg leading-relaxed">{BRANSCHER.join(" · ")}</p>
      </Avsnitt>

      <Avsnitt rubrik="Utbildning och certifiering" id="utbildning">
        <dl className="max-w-2xl space-y-5">
          {UTBILDNING.map((u) => (
            <div key={u.titel}>
              <dt className="font-display text-[1.45rem] leading-tight">{u.titel}</dt>
              <dd className="mt-1 text-muted-foreground">{u.text}</dd>
            </div>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt rubrik="Nätverk" id="natverk">
        <ul className="max-w-2xl space-y-3 text-lg leading-relaxed">
          {UPPDRAG_I_NARINGSLIVET.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </Avsnitt>
    </>
  );
}
