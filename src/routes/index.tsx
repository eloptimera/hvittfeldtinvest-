import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Mark, Sektionsrubrik } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { FRAGOR, KOMPETENSER, NYCKELTAL, STYRELSEUPPDRAG, TJANSTER } from "@/lib/innehall";
import { faqSchema, PORTRATT, sidhuvud } from "@/lib/seo";
import { avstava } from "@/lib/text";

export const Route = createFileRoute("/")({
  head: () =>
    sidhuvud({
      titel: "Styrelseuppdrag, styrelseutvärdering och ägarstyrning",
      beskrivning:
        "Ankie Hvittfeldt är professionell styrelseledamot och ordförande med mer än 15 års erfarenhet från ägarledda, statligt ägda och noterade bolag. Boka ett förutsättningslöst samtal.",
      sokvag: "/",
      schema: [faqSchema(FRAGOR)],
    }),
  component: Start,
});

const ROMERSKA = ["I", "II", "III"] as const;

/** Vem sajten vänder sig till – och vad var och en får ut av ett samtal. */
const MALGRUPPER = [
  {
    titel: "Valberedningar",
    text: "En oberoende ledamot eller ordförande med dokumenterad erfarenhet – och styrelseutvärderingar som underlag inför stämman.",
  },
  {
    titel: "Huvudägare",
    text: "En styrelse som förvaltar ägarens intressen, och stöd vid tillväxt, generationsskifte eller försäljning.",
  },
  {
    titel: "Vd:ar",
    text: "En ordförande som är ett riktigt bollplank: tydliga förväntningar, raka besked och stöd mellan mötena.",
  },
  {
    titel: "Bolagsstyrelser",
    text: "En utvärdering av hur styrelsen arbetar i dag och konkreta förslag på hur den kan bli bättre.",
  },
] as const;

/** Fyra uppdrag som visar bredden – noterat, statligt och tillväxt. */
const URVAL = ["Everdrone AB", "Nilörngruppen AB", "Luftfartsverket", "Green Cargo AB"] as const;

function Start() {
  const urval = URVAL.map((b) => STYRELSEUPPDRAG.find((u) => u.bolag === b)).filter(
    (u) => u !== undefined,
  );

  return (
    <>
      {/* Hero: värdeerbjudandet till vänster, porträttet som första bild till höger. */}
      <section aria-labelledby="hero-rubrik" className="relative isolate overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-8 pb-16 sm:pt-12 lg:min-h-[min(48rem,calc(100svh-4.5rem))] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Styrelsearbete · Ordförandeskap · Ägarstyrning</p>
            <h1 id="hero-rubrik" className="mt-7 text-[clamp(2.5rem,5.8vw,5rem)] leading-[1.03]">
              Styrelsearbete som gör <Mark>skillnad</Mark> för ägare och bolag
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Jag är {FORETAG.person}, professionell styrelseledamot och ordförande. Jag hjälper
              valberedningar, huvudägare och vd:ar med styrelseuppdrag, styrelseutvärdering och
              rådgivning kring ägarstyrning – i ägarledda, statligt ägda och noterade bolag.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BokaKnapp plats="hero" />
              <Link to="/tjanster" className="btn-base btn-outline">
                Se erbjudandet
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Kostnadsfritt, förutsättningslöst och konfidentiellt.
            </p>
          </div>

          <div className="order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-none">
            <figure className="relative">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.25rem] border border-gold sm:translate-x-5 sm:translate-y-5"
                />
                <img
                  src={PORTRATT.src}
                  srcSet={`${PORTRATT.litenSrc} 480w, ${PORTRATT.src} 800w`}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 26rem, 90vw"
                  alt={PORTRATT.alt}
                  width={PORTRATT.bredd}
                  height={PORTRATT.hojd}
                  fetchPriority="high"
                  className="kortskugga relative aspect-square w-full rounded-[1.25rem] object-cover"
                />
              </div>
              <figcaption className="mt-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:mt-10">
                <span className="font-display text-xl">{FORETAG.person}</span>
                <span className="caps !text-[0.66rem] text-muted-foreground">
                  Ordförande och ledamot
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Nyckeltal */}
      <section aria-label="I korthet" className="container-page">
        <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {NYCKELTAL.map((n) => (
            <div
              key={n.text}
              className="flex items-baseline gap-5 px-2 py-6 sm:block sm:px-8 sm:py-8 sm:first:pl-0"
            >
              <dt className="sr-only">{n.text}</dt>
              <dd className="contents sm:block">
                <span className="block w-16 shrink-0 font-display text-5xl text-brand sm:w-auto">
                  {n.varde}
                </span>
                <span className="block max-w-[16rem] sm:mt-3 text-sm leading-relaxed text-muted-foreground">
                  {n.text}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Erbjudande */}
      <section aria-labelledby="erbjudande-rubrik" className="container-page py-20 sm:py-28">
        <Reveal>
          <Sektionsrubrik eyebrow="Erbjudande" id="erbjudande-rubrik">
            Tre sätt att <Mark>stärka</Mark> styrningen av ert bolag
          </Sektionsrubrik>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TJANSTER.map((t, i) => (
            <Reveal key={t.slug} delay={i * 80}>
              <Link
                to="/tjanster"
                hash={t.slug}
                className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-paper p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-ink/40 sm:p-10"
              >
                <span className="font-display text-2xl text-gold">{ROMERSKA[i]}</span>
                <h3 className="mt-8 text-3xl">{avstava(t.titel)}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{t.kort}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Läs mer
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* För vem */}
      <section aria-labelledby="malgrupp-rubrik" className="panel-ink">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="caps text-gold">För vem</p>
            <h2 id="malgrupp-rubrik" className="mt-5 text-4xl sm:text-5xl">
              För dem som bär ansvaret för bolagets styrning
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              Samtalet kan börja med en valberedning som söker en ledamot, en ägare inför nästa fas
              eller en vd och ordförande som vill utveckla styrelsearbetet.
            </p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[1.25rem] bg-white/15 sm:grid-cols-2">
            {MALGRUPPER.map((m, i) => (
              <Reveal as="li" key={m.titel} delay={i * 60} className="bg-ink p-7 sm:p-8">
                <h3 className="text-2xl">{m.titel}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{m.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Nyckelkompetenser */}
      <section aria-labelledby="kompetens-rubrik" className="container-page py-20 sm:py-28">
        <Reveal>
          <Sektionsrubrik
            eyebrow="Nyckelkompetenser"
            id="kompetens-rubrik"
            intro="Operativ erfarenhet från fordonsindustri, transport och detaljhandel – och mer än 15 år i styrelserummet."
          >
            Det jag tar med mig <Mark>in i styrelsen</Mark>
          </Sektionsrubrik>
        </Reveal>
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {KOMPETENSER.map((k, i) => (
            <Reveal as="li" key={k.titel} delay={(i % 3) * 60} className="border-t border-ink pt-6">
              <h3 className="font-sans text-lg font-semibold tracking-normal">{k.titel}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{k.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Arbetssätt */}
      <section aria-labelledby="arbetssatt-rubrik" className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow">Arbetssätt</p>
            <h2 id="arbetssatt-rubrik" className="mt-5 text-[clamp(2.2rem,4.4vw,3.75rem)]">
              Strategi och omvärld först. <Mark>Rapporteringen sist.</Mark>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                En styrelse som ägnar mötena åt att gå igenom det som redan hänt hinner sällan med
                det som avgör bolagets framtid. Därför vänder jag på dagordningen: strategin och
                omvärlden kommer först, rapporteringen sist.
              </p>
              <p>
                Det kräver väl förberedda möten, ett tydligt årshjul och en vd som vet vad styrelsen
                förväntar sig. Då blir styrelsen det den ska vara – en tillgång för ägarna och för
                ledningen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Urval av uppdrag */}
      <section aria-labelledby="uppdrag-rubrik" className="container-page py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Sektionsrubrik eyebrow="Urval av styrelseuppdrag" id="uppdrag-rubrik">
              Noterat, statligt och <Mark>i tillväxt</Mark>
            </Sektionsrubrik>
          </Reveal>
          <Link to="/erfarenhet" className="btn-base btn-outline">
            Alla uppdrag och meriter
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {urval.map((u, i) => (
            <Reveal
              as="li"
              key={u.bolag}
              delay={(i % 2) * 60}
              className="flex h-full flex-col rounded-[1.25rem] border border-line bg-paper p-7"
            >
              <span className="caps !text-[0.66rem] text-brand">
                {u.typ} · {u.roll}
                {u.tidigare ? " (tidigare)" : ""}
              </span>
              <h3 className="mt-4 text-2xl">{u.bolag}</h3>
              {u.not && <p className="mt-2 leading-relaxed text-muted-foreground">{u.not}</p>}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor-rubrik" className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Sektionsrubrik eyebrow="Vanliga frågor" id="fragor-rubrik">
              Innan vi <Mark>hörs</Mark>
            </Sektionsrubrik>
            <a
              href={FORETAG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
            >
              {FORETAG.person} på LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={80}>
            <VanligaFragor fragor={FRAGOR} />
          </Reveal>
        </div>
      </section>

      <BokaPanel />
    </>
  );
}
