import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Mark, Sektionsrubrik } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { BRANSCHER, KOMPETENSER, UPPDRAG_I_NARINGSLIVET, UTBILDNING } from "@/lib/innehall";
import { brodsmulor, PORTRATT, profilSchema, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/om-mig")({
  head: () =>
    sidhuvud({
      titel: `Om ${FORETAG.person}`,
      beskrivning:
        "Ankie Hvittfeldt är professionell styrelseledamot och ordförande med bakgrund i ekonomi, logistik, transport och detaljhandel. Mer än 15 år i styrelser för ägarledda, statligt ägda och noterade bolag.",
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

const PRINCIPER = [
  {
    titel: "Oberoende",
    text: "Jag företräder bolaget och alla ägare – inte en enskild intressent. Det gör det möjligt att säga det som behöver sägas.",
  },
  {
    titel: "Förberedelse",
    text: "Bra beslut fattas av väl pålästa ledamöter. Underlag, dagordning och årshjul ska göra mötestiden värdefull.",
  },
  {
    titel: "Uppföljning",
    text: "Ett beslut är inte klart när det fattas, utan när det är genomfört. Varje möte följer upp strategin.",
  },
  {
    titel: "Förtroende",
    text: "Ett öppet klimat där ledamöter och vd delar erfarenheter och utmaningar – grunden för en styrelse som fungerar som ett team.",
  },
] as const;

function OmMig() {
  return (
    <>
      <section aria-labelledby="om-rubrik">
        <div className="container-page grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:pb-24">
          <div>
            <p className="eyebrow">Om mig</p>
            <h1 id="om-rubrik" className="mt-6 text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.04]">
              {FORETAG.person}
            </h1>
            <p className="mt-4 font-display text-2xl text-brand italic sm:text-3xl">
              {FORETAG.titel}
            </p>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Jag har arbetat professionellt med styrelsearbete i mer än 15 år – som ordförande
                och ledamot i ägarledda, statligt ägda och noterade bolag, och i ett statligt
                affärsverk. I dag driver jag {FORETAG.juridisktNamn} och tar uppdrag inom
                styrelsearbete, styrelseutvärdering och ägarstyrning.
              </p>
              <p>
                Grunden är en ekonomutbildning och en operativ karriär i den internationella
                fordonsindustrin, med logistik och transport, och därefter i detaljhandeln. Det
                operativa perspektivet följer med in i styrelserummet: jag vet hur strategi ser ut
                när den ska genomföras i en verksamhet.
              </p>
              <p>
                Vändpunkten kom 2009, när jag gick det första programmet som Styrelsekraft
                genomförde. Sedan dess är styrelsearbetet mitt yrke, i branscher från flyg och
                drönarteknik till industri, utbildning och mode.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <BokaKnapp plats="om-mig" />
              <a
                href={FORETAG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-outline"
              >
                LinkedIn
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <Reveal className="mx-auto w-full max-w-[24rem] lg:max-w-none">
            <img
              src={PORTRATT.src}
              srcSet={`${PORTRATT.litenSrc} 480w, ${PORTRATT.src} 800w`}
              sizes="(min-width: 1024px) 30vw, 24rem"
              alt={PORTRATT.alt}
              width={PORTRATT.bredd}
              height={PORTRATT.hojd}
              loading="lazy"
              className="kortskugga aspect-[4/5] w-full rounded-[1.25rem] object-cover object-[62%_center]"
            />
          </Reveal>
        </div>
      </section>

      {/* Expertis */}
      <section aria-labelledby="expertis-rubrik" className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <Sektionsrubrik eyebrow="Expertisområden" id="expertis-rubrik">
              Kärnkompetenser i <Mark>styrelserummet</Mark>
            </Sektionsrubrik>
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KOMPETENSER.map((k, i) => (
              <Reveal
                as="li"
                key={k.titel}
                delay={(i % 3) * 60}
                className="rounded-[1.25rem] border border-line bg-paper p-7"
              >
                <span className="font-display text-xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-normal">{k.titel}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{k.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16">
            <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-brand uppercase">
              Branscher
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {BRANSCHER.map((b) => (
                <li
                  key={b}
                  className="rounded-md border border-ink/25 bg-paper px-4 py-2 text-sm font-medium"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Principer */}
      <section aria-labelledby="principer-rubrik" className="container-page py-20 sm:py-28">
        <Reveal>
          <Sektionsrubrik eyebrow="Utgångspunkter" id="principer-rubrik">
            Så arbetar jag som <Mark>ledamot och ordförande</Mark>
          </Sektionsrubrik>
        </Reveal>
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPER.map((p, i) => (
            <Reveal as="li" key={p.titel} delay={(i % 2) * 60} className="border-t border-ink pt-6">
              <h3 className="text-3xl">{p.titel}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Utbildning och uppdrag */}
      <section aria-labelledby="utbildning-rubrik" className="panel-ink">
        <div className="container-page grid gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="caps text-gold">Utbildning och certifieringar</p>
            <h2 id="utbildning-rubrik" className="mt-5 text-4xl">
              Utbildning
            </h2>
            <ul className="mt-8 space-y-6">
              {UTBILDNING.map((u) => (
                <li key={u.titel} className="border-l border-gold pl-5">
                  <span className="block text-lg font-semibold">{u.titel}</span>
                  <span className="mt-1 block leading-relaxed text-white/75">{u.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <p className="caps text-gold">I näringslivet</p>
            <h2 className="mt-5 text-4xl">Nätverk och uppdrag</h2>
            <ul className="mt-8 space-y-6">
              {UPPDRAG_I_NARINGSLIVET.map((u) => (
                <li key={u} className="border-l border-gold pl-5 leading-relaxed text-white/85">
                  {u}
                </li>
              ))}
            </ul>
            <Link to="/erfarenhet" className="btn-base btn-outline-white mt-10">
              Se alla styrelseuppdrag
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="h-3 sm:h-6" aria-hidden="true" />
      <BokaPanel />
    </>
  );
}
