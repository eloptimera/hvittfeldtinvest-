import type { ReactNode } from "react";

/** Markerat ord – kursiv Bodoni i plommon. */
export function Mark({ children, nowrap = false }: { children: ReactNode; nowrap?: boolean }) {
  return (
    <span className={`text-brand italic ${nowrap ? "whitespace-nowrap" : ""}`}>{children}</span>
  );
}

/** Sidhuvud för undersidor: elfenbensyta, serif-rubrik och en tunn guldlinje under. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative">
      <div className="container-page pt-14 pb-14 sm:pt-20 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.04]">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {intro}
          </p>
        )}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
      <div className="container-page" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-gold via-line to-transparent" />
      </div>
    </section>
  );
}

/** Sektionsrubrik: liten versal rad och en serif-rubrik. */
export function Sektionsrubrik({
  eyebrow,
  id,
  children,
  intro,
  className = "",
}: {
  eyebrow: string;
  id?: string;
  children: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-5 max-w-3xl text-4xl sm:text-5xl">
        {children}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}
