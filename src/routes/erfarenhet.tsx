import { createFileRoute } from "@tanstack/react-router";
import { BokaPanel } from "@/components/Boka";
import { Mark, PageHero, Sektionsrubrik } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import {
  type Agartyp,
  BOLAGSTYPER,
  OPERATIVT,
  STYRELSEUPPDRAG,
  VARDESKAPANDE,
  type Styrelseuppdrag,
} from "@/lib/innehall";
import { brodsmulor, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/erfarenhet")({
  head: () =>
    sidhuvud({
      titel: "Erfarenhet och meriter",
      beskrivning:
        "Styrelseuppdrag som ordförande och ledamot i bland annat Everdrone, Nilörngruppen, Luftfartsverket och Green Cargo, samt operativ bakgrund från Volvo, Speedcargo och Hemtex.",
      sokvag: "/erfarenhet",
      schema: [
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Erfarenhet och meriter", sokvag: "/erfarenhet" },
        ]),
      ],
    }),
  component: Erfarenhet,
});

const ORDNING: readonly Styrelseuppdrag["typ"][] = [
  "Noterat",
  "Statligt ägt",
  "Tillväxtbolag",
  "Ägarlett",
];

const GRUPPNAMN: Record<Agartyp, string> = {
  Noterat: "Noterade bolag",
  "Statligt ägt": "Statligt ägda bolag och affärsverk",
  Tillväxtbolag: "Tillväxtbolag",
  Ägarlett: "Ägarledda bolag",
};

function Erfarenhet() {
  return (
    <>
      <PageHero
        eyebrow="Erfarenhet och meriter"
        title={
          <>
            Från operativ ledning till <Mark>styrelserummet</Mark>
          </>
        }
        intro="En överblick över operativa roller, styrelseuppdrag och de områden där jag bidragit till förändring – i bolag med vitt skilda ägare, storlekar och branscher."
      />

      {/* Operativ bakgrund */}
      <section aria-labelledby="operativt-rubrik" className="container-page py-20 sm:py-24">
        <Reveal>
          <Sektionsrubrik
            eyebrow="Operativ bakgrund"
            id="operativt-rubrik"
            intro="Ledande och operativa roller före karriären som professionell styrelseledamot."
          >
            Erfarenhet från <Mark>verksamheten</Mark>
          </Sektionsrubrik>
        </Reveal>
        <ol className="mt-12 border-l border-gold">
          {OPERATIVT.map((o, i) => (
            <Reveal
              as="li"
              key={o.organisation}
              delay={i * 60}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-gold"
              />
              <span className="caps !text-[0.66rem] text-brand">{o.omrade}</span>
              <h3 className="mt-2 text-3xl">{o.organisation}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{o.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Styrelseuppdrag */}
      <section aria-labelledby="uppdrag-rubrik" className="bg-fade-tint py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <Sektionsrubrik
              eyebrow="Styrelseengagemang"
              id="uppdrag-rubrik"
              intro="Ett urval av nuvarande och tidigare uppdrag som ordförande och ledamot."
            >
              Styrelseuppdrag i <Mark>urval</Mark>
            </Sektionsrubrik>
          </Reveal>

          <div className="mt-14 grid gap-12">
            {ORDNING.map((typ) => {
              const uppdrag = STYRELSEUPPDRAG.filter((u) => u.typ === typ);
              if (uppdrag.length === 0) return null;
              return (
                <Reveal key={typ}>
                  <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-brand uppercase">
                    {GRUPPNAMN[typ]}
                  </h3>
                  <ul className="mt-5 divide-y divide-line border-y border-line">
                    {uppdrag.map((u) => (
                      <li
                        key={u.bolag}
                        className="grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_12rem] sm:gap-8"
                      >
                        <div>
                          <span className="font-display text-2xl">{u.bolag}</span>
                          {u.not && (
                            <p className="mt-1 max-w-2xl leading-relaxed text-muted-foreground">
                              {u.not}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold sm:pt-2 sm:text-right">
                          {u.roll}
                          {u.tidigare && (
                            <span className="font-normal text-muted-foreground"> · tidigare</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Typer av bolag */}
      <section aria-labelledby="bolagstyper-rubrik" className="container-page py-20 sm:py-24">
        <Reveal>
          <Sektionsrubrik eyebrow="Typer av bolag" id="bolagstyper-rubrik">
            Bolag jag <Mark>stöttat</Mark>
          </Sektionsrubrik>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BOLAGSTYPER.map((b, i) => (
            <Reveal
              as="li"
              key={b.titel}
              delay={i * 60}
              className="rounded-[1.25rem] border border-line bg-paper p-7"
            >
              <h3 className="text-2xl">{GRUPPNAMN[b.titel].replace(" och affärsverk", "")}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Värdeskapande */}
      <section aria-labelledby="varde-rubrik" className="panel-ink">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <p className="caps text-gold">Förändring och värdeskapande</p>
            <h2 id="varde-rubrik" className="mt-5 max-w-3xl text-4xl sm:text-5xl">
              Där styrelsearbetet har gjort skillnad
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/15 md:grid-cols-2">
            {VARDESKAPANDE.map((v, i) => (
              <Reveal as="li" key={v.titel} delay={(i % 2) * 60} className="bg-ink p-8 sm:p-10">
                <span className="font-display text-xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-3xl">{v.titel}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-3 sm:h-6" aria-hidden="true" />
      <BokaPanel />
    </>
  );
}
