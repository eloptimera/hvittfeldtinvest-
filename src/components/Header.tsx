import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Ordmarke } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";

const LANKAR = [
  { to: "/om-mig", label: "Om mig" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/erfarenhet", label: "Uppdrag" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [oppen, setOppen] = useState(false);
  const [scrollad, setScrollad] = useState(false);
  const pa = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const kolla = () => setScrollad(window.scrollY > 40);
    kolla();
    window.addEventListener("scroll", kolla, { passive: true });
    return () => window.removeEventListener("scroll", kolla);
  }, []);

  useEffect(() => {
    if (!oppen) return;
    const stang = (e: KeyboardEvent) => e.key === "Escape" && setOppen(false);
    window.addEventListener("keydown", stang);
    return () => window.removeEventListener("keydown", stang);
  }, [oppen]);

  // På startsidan ligger sidhuvudet vitt ovanpå bilden tills man scrollar.
  const overBild = pa === "/" && !scrollad && !oppen;
  const farg = overBild ? "text-white" : "text-ink";
  const lank = `group relative inline-flex min-h-11 items-center px-3 text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
    overBild ? "text-white/85 hover:text-white" : "text-muted-foreground hover:text-ink"
  }`;

  return (
    <header
      className={`sticky top-0 z-30 -mb-20 transition-[background-color,box-shadow] duration-300 ${
        overBild
          ? "bg-transparent"
          : "bg-background/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md"
      }`}
    >
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Hoppa till innehållet
      </a>
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          to="/"
          aria-label={`${FORETAG.namn} – startsida`}
          onClick={() => setOppen(false)}
          className={`transition-colors duration-300 ${farg}`}
        >
          <Ordmarke />
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Huvudmeny">
          {LANKAR.map((l) => (
            <Link key={l.to} to={l.to} className={lank} activeProps={{ "aria-current": "page" }}>
              {l.label}
              {/* Rosa streck som glider fram vid hovring och på aktuell sida. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-2 h-0.5 origin-left scale-x-0 rounded-full bg-rosa-ljus transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={oppen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={oppen}
          aria-controls="mobilmeny"
          onClick={() => setOppen((o) => !o)}
          className={`-mr-2 grid size-11 place-items-center md:hidden ${farg}`}
        >
          {oppen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {oppen && (
        <nav
          id="mobilmeny"
          aria-label="Mobilmeny"
          className="container-page flex flex-col pb-4 md:hidden"
        >
          {LANKAR.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOppen(false)}
              className="inline-flex min-h-12 items-center border-t border-line text-sm tracking-[0.18em] text-ink uppercase"
              activeProps={{ className: "!text-rosa", "aria-current": "page" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
