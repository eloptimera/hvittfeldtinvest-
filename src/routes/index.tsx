import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Linkedin } from "lucide-react";
import { Avsnitt } from "@/components/Heading";
import { Loggband } from "@/components/Loggband";
import { Tona } from "@/components/Synlig";
import { FORETAG } from "@/lib/foretag";
import { TJANSTER } from "@/lib/innehall";
import { PORTRATT, sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    sidhuvud({
      titel: `${FORETAG.person} – styrelseordförande och styrelseledamot`,
      beskrivning:
        "Ankie Hvittfeldt är professionell styrelseledamot och ordförande med mer än 15 års erfarenhet från ägarledda, statligt ägda och noterade bolag.",
      sokvag: "/",
    }),
  component: Start,
});

const ROLLER = [
  "Styrelseordförande",
  "Styrelseledamot",
  "Styrelseutvärdering",
  "Ägarstyrning",
] as const;

function Start() {
  return (
    <>
      {/* Hero: bilden täcker hela bredden och tonas ut nedåt i sidans yta. På mobil används
          originalet (kvadratiskt), på större skärmar en bredare version där väggen förlängts. */}
      <section aria-labelledby="namn" className="relative isolate">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/hero-bred-1600.webp 1600w, /hero-bred.webp 2400w"
            sizes="100vw"
          />
          <img
            src={PORTRATT.src}
            srcSet={`${PORTRATT.litenSrc} 480w, ${PORTRATT.src} 800w`}
            sizes="100vw"
            alt={PORTRATT.alt}
            width={PORTRATT.bredd}
            height={PORTRATT.hojd}
            fetchPriority="high"
            className="block aspect-square w-full object-cover object-top md:aspect-auto md:h-[min(88svh,52rem)]"
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-background/75 to-background"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />
      </section>

      <div className="container-page relative -mt-24 text-center sm:-mt-40">
        <p className="caps text-ink/70">Styrelsearbete</p>
        <h1 id="namn" className="mt-4 text-[clamp(3.1rem,9.5vw,7rem)] leading-[0.95] text-rosa">
          {FORETAG.person}
        </h1>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-[0.7rem] font-medium tracking-[0.22em] text-muted-foreground uppercase sm:gap-x-4 sm:text-xs">
          {ROLLER.map((r, i) => (
            <li key={r} className="flex items-center gap-4">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden size-1 rounded-full bg-rosa-ljus sm:block"
                />
              )}
              {r}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl font-display text-[1.45rem] leading-snug sm:text-[1.8rem]">
          Professionell styrelseledamot och ordförande i ägarledda, statligt ägda och noterade bolag
          – i mer än 15 år.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          På LinkedIn finns min fullständiga profil.
        </p>
        {(FORETAG.epost || FORETAG.telefon) && (
          <p className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm">
            {FORETAG.epost && (
              <span>
                E-post:{" "}
                <a href={`mailto:${FORETAG.epost}`} className="lank">
                  {FORETAG.epost}
                </a>
              </span>
            )}
            {FORETAG.telefon && (
              <span>
                Telefon:{" "}
                <a href={`tel:${FORETAG.telefonLank}`} className="lank">
                  {FORETAG.telefon}
                </a>
              </span>
            )}
          </p>
        )}
        <a
          href={FORETAG.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-dark mt-9"
        >
          <Linkedin className="size-4" aria-hidden="true" />
          LinkedIn
        </a>
      </div>

      <div className="mt-24 sm:mt-28">
        <Loggband />
      </div>

      <Avsnitt rubrik="Om mig" id="om">
        <Tona className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Jag har en ekonomutbildning och en operativ bakgrund i den internationella
              fordonsindustrin, med logistik och transport, och i detaljhandeln. Sedan 2009 är
              styrelsearbete mitt yrke.
            </p>
            <p className="text-muted-foreground">
              I dag är jag ordförande och ledamot i bolag inom bland annat drönarteknik, belysning,
              teknikkonsulting och vård, och driver {FORETAG.juridisktNamn} i Göteborg.
            </p>
            <Link to="/om-mig" className="lank inline-flex items-center gap-2 text-base">
              Mer om mig
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-md bg-line">
            {[
              ["15+", "år i styrelser"],
              ["5", "nuvarande uppdrag"],
              ["9", "år i Luftfartsverket"],
              ["2009", "första styrelseprogrammet"],
            ].map(([v, t]) => (
              <div key={t} className="bg-background p-6">
                <dt className="sr-only">{t}</dt>
                <dd>
                  <span className="block font-display text-4xl text-rosa">{v}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{t}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Tona>
      </Avsnitt>

      <Avsnitt rubrik="Tjänster" id="tjanster">
        <ul className="grid gap-4 md:grid-cols-3">
          {TJANSTER.map((t, i) => (
            <Tona as="li" key={t.slug} fordrojning={i * 80}>
              <Link
                to="/tjanster"
                hash={t.slug}
                className="group flex h-full flex-col border-t-2 border-ink pt-6 transition-colors duration-300 hover:border-rosa"
              >
                <span className="font-display text-sm text-rosa">0{i + 1}</span>
                <h3 className="mt-3 text-[1.9rem] transition-colors duration-300 group-hover:text-rosa">
                  {t.titel}
                </h3>
                <p className="mt-3 flex-1 text-muted-foreground">{t.kort}</p>
                <ArrowRight
                  className="mt-6 size-5 text-rosa transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </Tona>
          ))}
        </ul>
      </Avsnitt>
    </>
  );
}
