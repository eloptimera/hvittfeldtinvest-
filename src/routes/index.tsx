import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { Avsnitt } from "@/components/Heading";
import { FORETAG } from "@/lib/foretag";
import { STYRELSEUPPDRAG, TJANSTER } from "@/lib/innehall";
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

/** Porträttet tonas ut åt alla håll och dämpas något i färg, så att det smälter in i den ljusa
 * ytan i stället för att bli en färgad ruta. */
const TONING = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 45%, transparent 96%), linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 45%, transparent 96%), linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%)",
  WebkitMaskComposite: "source-in",
} as const;

const URVAL = STYRELSEUPPDRAG.filter((u) => u.typ !== "Ägarlett").slice(0, 5);

function Start() {
  return (
    <>
      <section aria-labelledby="namn" className="container-page text-center">
        <img
          src={PORTRATT.src}
          srcSet={`${PORTRATT.litenSrc} 480w, ${PORTRATT.src} 800w`}
          sizes="(min-width: 640px) 34rem, 100vw"
          alt={PORTRATT.alt}
          width={PORTRATT.bredd}
          height={PORTRATT.hojd}
          fetchPriority="high"
          style={TONING}
          className="mx-auto aspect-square w-full max-w-[34rem] object-cover saturate-[0.78]"
        />
        <div className="relative -mt-[18%] sm:-mt-28">
          <p className="caps text-muted-foreground">Styrelsearbete</p>
          <h1 id="namn" className="mt-4 text-[clamp(3rem,9vw,6.25rem)] leading-none">
            {FORETAG.person}
          </h1>
          <ul className="caps mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 !text-[0.7rem] sm:gap-x-4 text-muted-foreground sm:!text-xs">
            {ROLLER.map((r, i) => (
              <li key={r} className="flex items-center gap-4">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-3 w-px bg-muted-foreground/60 sm:block"
                  />
                )}
                {r}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl font-display text-[1.45rem] leading-snug sm:text-[1.75rem]">
            Professionell styrelseledamot och ordförande i ägarledda, statligt ägda och noterade
            bolag – i mer än 15 år.
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-display text-[1.3rem] leading-snug text-muted-foreground sm:text-2xl">
            På LinkedIn finns min fullständiga profil.
          </p>
          {(FORETAG.epost || FORETAG.telefon) && (
            <p className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm">
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
      </section>

      <Avsnitt etikett="Om" id="om">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
          <p>
            Jag har en ekonomutbildning och en operativ bakgrund i den internationella
            fordonsindustrin, med logistik och transport, och i detaljhandeln. Sedan 2009 är
            styrelsearbete mitt yrke.
          </p>
          <p className="text-muted-foreground">
            I dag arbetar jag som ordförande och ledamot i bolag inom bland annat flyg och
            drönarteknik, transport, industri och mode, och driver {FORETAG.juridisktNamn} i
            Göteborg.
          </p>
        </div>
        <Link to="/om-mig" className="lank mt-6 inline-block text-sm">
          Mer om mig
        </Link>
      </Avsnitt>

      <Avsnitt etikett="Tjänster" id="tjanster">
        <ul className="divide-y divide-line">
          {TJANSTER.map((t) => (
            <li key={t.slug} className="py-6 first:pt-0">
              <h3 className="text-[1.75rem]">
                <Link to="/tjanster" hash={t.slug} className="hover:underline">
                  {t.titel}
                </Link>
              </h3>
              <p className="mt-1 text-muted-foreground">{t.kort}</p>
            </li>
          ))}
        </ul>
      </Avsnitt>

      <Avsnitt etikett="Styrelseuppdrag i urval" id="uppdrag">
        <ul className="divide-y divide-line">
          {URVAL.map((u) => (
            <li
              key={u.bolag}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 first:pt-0"
            >
              <span className="font-display text-[1.6rem] leading-tight">{u.bolag}</span>
              <span className="text-sm text-muted-foreground">
                {u.roll}
                {u.tidigare ? ", tidigare" : ""}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/erfarenhet" className="lank mt-6 inline-block text-sm">
          Samtliga uppdrag och tidigare roller
        </Link>
      </Avsnitt>
    </>
  );
}
