import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Avsnitt, PageHero } from "@/components/Heading";
import { Logga } from "@/components/Logga";
import { Tona } from "@/components/Synlig";
import { OPERATIVT, STYRELSEUPPDRAG, VARDESKAPANDE, type Styrelseuppdrag } from "@/lib/innehall";
import { brodsmulor, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/erfarenhet")({
  head: () =>
    sidhuvud({
      titel: "Uppdrag",
      beskrivning:
        "Nuvarande och tidigare styrelseuppdrag, bland annat Everdrone, Healsafe, Lightning Group, Luftfartsverket och Green Cargo, samt operativ bakgrund från Volvo och Hemtex.",
      sokvag: "/erfarenhet",
      schema: [
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Uppdrag", sokvag: "/erfarenhet" },
        ]),
      ],
    }),
  component: Erfarenhet,
});

const GRUPPER: readonly { status: Styrelseuppdrag["status"]; rubrik: string; id: string }[] = [
  { status: "nuvarande", rubrik: "Nuvarande uppdrag", id: "nuvarande" },
  { status: "tidigare", rubrik: "Tidigare uppdrag", id: "tidigare" },
  { status: "övrigt", rubrik: "Fler uppdrag genom åren", id: "ovriga" },
];

/** En ruta per bolag: loggan (klickbar om bolaget har en hemsida) och rollen under. */
function Ruta({ u }: { u: Styrelseuppdrag }) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-lg border border-line bg-card transition-[transform,border-color,box-shadow] duration-300 ${
        u.url
          ? "hover:-translate-y-1 hover:border-rosa-ljus hover:shadow-[0_18px_40px_-24px_rgb(181_53_122/0.45)]"
          : ""
      }`}
    >
      {/* Länkens ::after täcker hela rutan, så att hela rutan går att klicka på. */}
      <Logga
        uppdrag={u}
        variant="farg"
        className="h-36 px-6 after:absolute after:inset-0 after:content-['']"
      />
      {u.url && (
        <ArrowUpRight
          aria-hidden="true"
          className="absolute top-3 right-3 size-4 text-rosa opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <div className="border-t border-line px-5 py-3 text-center text-sm text-muted-foreground">
        {u.roll}
      </div>
    </div>
  );
}

function Erfarenhet() {
  return (
    <>
      <PageHero
        etikett="Uppdrag"
        title="Styrelseuppdrag"
        intro="Nuvarande och tidigare uppdrag som ordförande och ledamot."
      />

      {GRUPPER.map((g) => {
        const uppdrag = STYRELSEUPPDRAG.filter((u) => u.status === g.status);
        if (uppdrag.length === 0) return null;
        return (
          <Avsnitt key={g.id} rubrik={g.rubrik} id={g.id}>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {uppdrag.map((u, i) => (
                <Tona as="li" key={u.bolag} fordrojning={(i % 4) * 60}>
                  <Ruta u={u} />
                </Tona>
              ))}
            </ul>
          </Avsnitt>
        );
      })}

      <Avsnitt rubrik="Exempel" id="exempel">
        <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {VARDESKAPANDE.map((v, i) => (
            <Tona
              key={v.titel}
              fordrojning={(i % 2) * 80}
              className="border-l-2 border-rosa-ljus pl-6"
            >
              <dt className="font-display text-[1.6rem] leading-tight">{v.titel}</dt>
              <dd className="mt-2 text-muted-foreground">{v.text}</dd>
            </Tona>
          ))}
        </dl>
      </Avsnitt>

      <Avsnitt rubrik="Operativ bakgrund" id="operativt">
        <ul className="divide-y divide-line border-y border-line">
          {OPERATIVT.map((o) => (
            <li
              key={o.organisation}
              className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[minmax(0,1fr)_12rem]"
            >
              <div>
                <span className="font-display text-[1.6rem] leading-tight">{o.organisation}</span>
                <p className="mt-1 text-muted-foreground">{o.text}</p>
              </div>
              <span className="text-sm text-rosa sm:pt-2 sm:text-right">{o.omrade}</span>
            </li>
          ))}
        </ul>
      </Avsnitt>
    </>
  );
}
