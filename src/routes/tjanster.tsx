import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { TJANSTER } from "@/lib/innehall";
import { brodsmulor, sidhuvud, tjanstSchema } from "@/lib/seo";
import { avstava } from "@/lib/text";

export const Route = createFileRoute("/tjanster")({
  head: () =>
    sidhuvud({
      titel: "Tjänster – styrelseuppdrag, styrelseutvärdering och ägarstyrning",
      beskrivning:
        "Styrelseledamot eller ordförande med fokus på strategi och governance, oberoende styrelseutvärdering och rådgivning till ägare vid tillväxt, ägarskiften och strukturering.",
      sokvag: "/tjanster",
      schema: [
        ...TJANSTER.map(tjanstSchema),
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
        ]),
      ],
    }),
  component: Tjanster,
});

function Tjanster() {
  return (
    <>
      <PageHero
        eyebrow="Tjänster och erbjudande"
        title={
          <>
            Styrning som skapar <Mark>värde</Mark> – i varje fas
          </>
        }
        intro="Som ledamot eller ordförande, som oberoende utvärderare eller som rådgivare till ägare och ledning. Uppdraget utformas efter bolagets läge och vad ägarna vill uppnå."
      >
        <nav aria-label="Tjänsterna på sidan" className="flex flex-wrap gap-2">
          {TJANSTER.map((t, i) => (
            <a
              key={t.slug}
              href={`#${t.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-paper px-4 text-sm font-semibold transition-colors duration-200 hover:border-ink"
            >
              <span className="font-display text-gold">{["I", "II", "III"][i]}</span>
              {t.titel}
            </a>
          ))}
        </nav>
      </PageHero>

      {TJANSTER.map((t, i) => (
        <section
          key={t.slug}
          id={t.slug}
          aria-labelledby={`${t.slug}-rubrik`}
          className={`scroll-mt-28 ${i % 2 === 1 ? "bg-fade-tint" : ""}`}
        >
          <div className="container-page grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal>
              <span className="font-display text-3xl text-gold">{["I", "II", "III"][i]}</span>
              <h2 id={`${t.slug}-rubrik`} className="mt-5 text-4xl sm:text-5xl">
                {avstava(t.titel)}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.ingress}</p>

              <h3 className="mt-10 font-sans text-sm font-bold tracking-[0.18em] text-brand uppercase">
                Passar när
              </h3>
              <ul className="mt-4 space-y-3">
                {t.nar.map((n) => (
                  <li key={n} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                    {n}
                  </li>
                ))}
              </ul>
              <BokaKnapp tjanst={t.slug} plats={`tjanst-${t.slug}`} className="mt-10">
                Boka samtal om {t.titel.toLowerCase()}
              </BokaKnapp>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={80}>
                <div className="rounded-[1.25rem] border border-line bg-paper p-7 sm:p-9">
                  <h3 className="text-2xl">Det här får bolaget</h3>
                  <ul className="mt-6 space-y-4">
                    {t.varde.map((v) => (
                      <li key={v} className="flex gap-3 leading-relaxed">
                        <Check
                          className="mt-1 size-4 shrink-0 text-brand"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="panel-ink rounded-[1.25rem] p-7 sm:p-9">
                  <h3 className="text-2xl">Så går det till</h3>
                  <ol className="mt-6 space-y-5">
                    {t.sa.map((s, j) => (
                      <li key={s.titel} className="flex gap-4">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold font-display text-sm text-gold">
                          {j + 1}
                        </span>
                        <span>
                          <span className="block font-semibold">{s.titel}</span>
                          <span className="mt-1 block leading-relaxed text-white/75">{s.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <BokaPanel
        rubrik={
          <>
            Osäker på vilket <Mark>upplägg</Mark> som passar?
          </>
        }
        text="Berätta om bolagets läge så föreslår jag ett upplägg – styrelseuppdrag, utvärdering, rådgivning eller en kombination."
      />
    </>
  );
}
