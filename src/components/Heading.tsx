import type { ReactNode } from "react";

/** Sidhuvud för undersidor: liten spärrad rad, stor Cormorant-rubrik och en kort ingress. */
export function PageHero({
  etikett,
  title,
  intro,
}: {
  etikett: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="container-page pt-12 pb-4 text-center sm:pt-20">
      <p className="caps text-muted-foreground">{etikett}</p>
      <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.75rem,7vw,5rem)]">{title}</h1>
      {intro && (
        <p className="mx-auto mt-6 max-w-2xl font-display text-[1.375rem] leading-snug text-muted-foreground sm:text-2xl">
          {intro}
        </p>
      )}
    </section>
  );
}

/**
 * Ett avsnitt: etikett i vänsterspalten, innehåll i högerspalten, en hårfin linje ovanför.
 * Ger sajten samma lugna rytm på alla sidor.
 */
export function Avsnitt({
  etikett,
  id,
  children,
}: {
  etikett: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="container-page mt-20 grid gap-6 sm:mt-28 md:grid-cols-[13rem_1fr] md:gap-12"
    >
      <div className="border-t border-ink pt-5">
        <h2 id={id} className="caps !font-sans !text-[0.72rem] !leading-normal">
          {etikett}
        </h2>
      </div>
      <div className="border-t border-line pt-5 md:pt-4">{children}</div>
    </section>
  );
}
