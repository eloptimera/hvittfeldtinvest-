import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Avsnitt, PageHero } from "@/components/Heading";
import { Logga } from "@/components/Logga";
import { Lutning } from "@/components/Lutning";
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

/**
 * En box per bolag i samma svarta stil som sidfoten: loggan på en ljus platta som lyfter i
 * djupled när boxen lutar, rollen under. Hela boxen är klickbar om bolaget har en hemsida.
 */
function Ruta({ u }: { u: Styrelseuppdrag }) {
  const innehall = (
    <>
      <Logga
        uppdrag={u}
        variant="farg"
        lank={false}
        className="h-32 rounded-xl bg-white px-5 shadow-[0_10px_24px_-14px_rgb(0_0_0/0.5)] [transform:translateZ(28px)]"
      />
      <span className="flex items-center justify-between gap-2 px-2 pt-3 pb-1 [transform:translateZ(16px)]">
        <span className="text-sm text-white/75">{u.roll}</span>
        {u.url && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-rosa-ljus" />}
      </span>
    </>
  );
  return (
    <Lutning className="rounded-[1.25rem] bg-ink-svart text-white shadow-[0_24px_48px_-28px_rgb(0_0_0/0.6)]">
      {u.url ? (
        <a
          href={u.url}
          target="_blank"
          rel="noopener"
          aria-label={`${u.bolag}, ${u.roll.toLowerCase()} – bolagets hemsida (öppnas i ny flik)`}
          className="flex h-full flex-col rounded-[1.25rem] p-3 [transform-style:preserve-3d]"
        >
          {innehall}
        </a>
      ) : (
        <div className="flex h-full flex-col p-3 [transform-style:preserve-3d]">{innehall}</div>
      )}
    </Lutning>
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
