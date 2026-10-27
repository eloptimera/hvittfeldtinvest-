import { createFileRoute } from "@tanstack/react-router";
import { Avsnitt, PageHero } from "@/components/Heading";
import { type Agartyp, OPERATIVT, STYRELSEUPPDRAG, VARDESKAPANDE } from "@/lib/innehall";
import { brodsmulor, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/erfarenhet")({
  head: () =>
    sidhuvud({
      titel: "Erfarenhet",
      beskrivning:
        "Styrelseuppdrag i bland annat Everdrone, Nilörngruppen, Luftfartsverket och Green Cargo, samt operativ bakgrund från Volvo, Speedcargo och Hemtex.",
      sokvag: "/erfarenhet",
      schema: [
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Erfarenhet", sokvag: "/erfarenhet" },
        ]),
      ],
    }),
  component: Erfarenhet,
});

const GRUPPER: readonly { typ: Agartyp; namn: string }[] = [
  { typ: "Noterat", namn: "Noterade bolag" },
  { typ: "Statligt ägt", namn: "Statligt ägda bolag och affärsverk" },
  { typ: "Tillväxtbolag", namn: "Tillväxtbolag" },
  { typ: "Ägarlett", namn: "Ägarledda bolag" },
];

function Erfarenhet() {
  return (
    <>
      <PageHero
        etikett="Erfarenhet"
        title="Uppdrag och tidigare roller"
        intro="Ett urval av nuvarande och tidigare styrelseuppdrag, och den operativa bakgrunden före styrelsearbetet."
      />

      <Avsnitt etikett="Styrelseuppdrag" id="styrelseuppdrag">
        <div className="space-y-12">
          {GRUPPER.map((g) => {
            const uppdrag = STYRELSEUPPDRAG.filter((u) => u.typ === g.typ);
            return (
              <div key={g.typ}>
                <h3 className="caps !text-[0.7rem] text-muted-foreground">{g.namn}</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {uppdrag.map((u) => (
                    <li
                      key={u.bolag}
                      className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_11rem]"
                    >
                      <div>
                        <span className="font-display text-[1.5rem] leading-tight">{u.bolag}</span>
                        {u.not && <p className="mt-1 text-muted-foreground">{u.not}</p>}
                      </div>
                      <span className="text-sm text-muted-foreground sm:pt-1.5 sm:text-right">
                        {u.roll}
                        {u.tidigare ? ", tidigare" : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Avsnitt>

      <Avsnitt etikett="Exempel" id="exempel">
        <dl className="grid max-w-3xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {VARDESKAPANDE.map((v) => (
            <div key={v.titel}>
              <dt className="font-display text-[1.45rem] leading-tight">{v.titel}</dt>
              <dd className="mt-2 text-muted-foreground">{v.text}</dd>
            </div>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt etikett="Operativ bakgrund" id="operativt">
        <ul className="divide-y divide-line border-b border-line">
          {OPERATIVT.map((o) => (
            <li
              key={o.organisation}
              className="grid gap-x-8 gap-y-1 py-4 first:pt-0 sm:grid-cols-[minmax(0,1fr)_11rem]"
            >
              <div>
                <span className="font-display text-[1.5rem] leading-tight">{o.organisation}</span>
                <p className="mt-1 text-muted-foreground">{o.text}</p>
              </div>
              <span className="text-sm text-muted-foreground sm:pt-1.5 sm:text-right">
                {o.omrade}
              </span>
            </li>
          ))}
        </ul>
      </Avsnitt>
    </>
  );
}
