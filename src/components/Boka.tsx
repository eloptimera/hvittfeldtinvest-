import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { bokaKlick } from "@/lib/sparning";

/** Sajtens enda primära nästa steg. Används i sidhuvudet, på alla sidor och i avslutningsrutan. */
export const BOKA_TEXT = "Boka ett förutsättningslöst samtal";

export function BokaKnapp({
  variant = "dark",
  className = "",
  children = BOKA_TEXT,
  tjanst,
  plats = "knapp",
  onClick,
}: {
  variant?: "dark" | "white";
  className?: string;
  children?: ReactNode;
  /** Förvald tjänst i kontaktformuläret (slug). */
  tjanst?: string;
  /** Var knappen sitter – skickas till statistiken. */
  plats?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/kontakt"
      search={tjanst ? { tjanst } : {}}
      onClick={() => {
        bokaKlick(typeof window === "undefined" ? "" : window.location.pathname, plats);
        onClick?.();
      }}
      className={`btn-base ${variant === "white" ? "btn-white" : "btn-dark"} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Marinblå avslutningsruta längst ner på sidorna. */
export function BokaPanel({
  rubrik = (
    <>
      Låt oss ta ett <Mark>första samtal</Mark>
    </>
  ),
  text = "Berätta om bolaget, ägarbilden och vad styrelsen behöver. Samtalet är kostnadsfritt, förutsättningslöst och stannar mellan oss.",
  tjanst,
}: {
  rubrik?: ReactNode;
  text?: string;
  tjanst?: string;
}) {
  return (
    <section className="px-3 pb-3 sm:px-6">
      <Reveal>
        <div className="panel-ink relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-[1.25rem] px-6 py-16 sm:px-14 sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-40 -z-10 hidden size-[32rem] rounded-full border border-gold/40 lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 -z-10 hidden size-[32rem] rounded-full border border-white/10 lg:block"
          />
          <p className="caps text-gold">Kontakt</p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.06] [&_.text-brand]:text-[#e7b8d3]">
            {rubrik}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BokaKnapp variant="white" plats="panel" {...(tjanst ? { tjanst } : {})} />
            <Link to="/erfarenhet" className="btn-base btn-outline-white">
              Se erfarenhet och meriter
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
