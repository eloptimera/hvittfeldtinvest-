import type { ReactNode } from "react";
import { useSynlig } from "@/components/Synlig";

/**
 * Text med ett rosa penseldrag under som ritas fram när det scrollas in i bild.
 * Draget är en SVG-bana med pathLength=1, så animationen fungerar oavsett textens bredd.
 */
export function Understruken({ children }: { children: ReactNode }) {
  const [ref, synlig] = useSynlig<HTMLSpanElement>();
  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className={`penseldrag pointer-events-none absolute -bottom-[0.12em] left-[-2%] z-0 h-[0.32em] w-[104%] text-rosa-ljus ${
          synlig ? "penseldrag-in" : ""
        }`}
      >
        <path
          d="M3 13 C 60 6, 120 5, 180 8 S 270 12, 297 7"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Sidhuvud för undersidor: liten spärrad rad, stor rubrik med penseldrag och en kort ingress. */
export function PageHero({
  etikett,
  title,
  intro,
}: {
  etikett: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="container-page pt-32 pb-2 text-center sm:pt-44">
      <p className="caps text-rosa">{etikett}</p>
      <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.25rem)]">
        <Understruken>{title}</Understruken>
      </h1>
      {intro && (
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {intro}
        </p>
      )}
    </section>
  );
}

/** Ett avsnitt med rubrik (penseldrag när den scrollas fram) och innehåll under. */
export function Avsnitt({
  rubrik,
  id,
  children,
  hoger,
}: {
  rubrik: string;
  id?: string;
  children: ReactNode;
  /** Valfri länk eller liknande till höger om rubriken. */
  hoger?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="container-page mt-24 sm:mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id={id} className="text-[clamp(2.1rem,4.5vw,3.25rem)]">
          <Understruken>{rubrik}</Understruken>
        </h2>
        {hoger}
      </div>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}
