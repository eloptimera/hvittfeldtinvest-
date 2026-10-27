import { createFileRoute } from "@tanstack/react-router";
import { Avsnitt, PageHero } from "@/components/Heading";
import { TJANSTER } from "@/lib/innehall";
import { brodsmulor, sidhuvud, tjanstSchema } from "@/lib/seo";

export const Route = createFileRoute("/tjanster")({
  head: () =>
    sidhuvud({
      titel: "Tjänster",
      beskrivning:
        "Styrelseuppdrag som ledamot eller ordförande, oberoende styrelseutvärdering och rådgivning kring ägarstyrning.",
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
        etikett="Tjänster"
        title="Styrelsearbete och ägarstyrning"
        intro="Som ledamot eller ordförande, som oberoende utvärderare eller som rådgivare till ägare och ledning."
      />
      {TJANSTER.map((t) => (
        <div key={t.slug} id={t.slug} className="scroll-mt-8">
          <Avsnitt rubrik={t.titel} id={`${t.slug}-rubrik`}>
            <p className="max-w-3xl font-display text-[1.55rem] leading-snug">{t.ingress}</p>
            <h3 className="caps mt-8 !text-[0.7rem] text-rosa">Uppdraget omfattar</h3>
            <ul className="mt-3 max-w-2xl divide-y divide-line border-y border-line">
              {t.omfattar.map((o) => (
                <li key={o} className="flex gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-rosa-ljus"
                  />
                  {o}
                </li>
              ))}
            </ul>
          </Avsnitt>
        </div>
      ))}
    </>
  );
}
