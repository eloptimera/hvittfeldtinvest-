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
  const [forbi, setForbi] = useState(false);
  const pa = useRouterState({ select: (s) => s.location.pathname });

  // Genomskinligt tills man börjar scrolla in över sidans huvudrubrik (på startsidan namnet) –
  // sedan en svart, flytande box. Marginalen gör att vit text aldrig hamnar på ljus botten.
  useEffect(() => {
    const kolla = () => {
      const h1 = document.querySelector("main h1");
      const topp = h1 ? h1.getBoundingClientRect().top : 200;
      setForbi(topp < 170);
    };
    kolla();
    window.addEventListener("scroll", kolla, { passive: true });
    window.addEventListener("resize", kolla);
    return () => {
      window.removeEventListener("scroll", kolla);
      window.removeEventListener("resize", kolla);
    };
  }, [pa]);

  useEffect(() => {
    if (!oppen) return;
    const stang = (e: KeyboardEvent) => e.key === "Escape" && setOppen(false);
    window.addEventListener("keydown", stang);
    return () => window.removeEventListener("keydown", stang);
  }, [oppen]);

  // Ljus text när listen är svart, eller när den ligger över bilden på startsidan.
  const morkt = forbi || oppen;
  const ljus = morkt || pa === "/";
  const farg = ljus ? "text-white" : "text-ink";
  const lank = `group relative inline-flex min-h-11 items-center px-3 text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
    ljus ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-ink"
  }`;

  return (
    <header className="sticky top-0 z-30 -mb-[6.5rem] px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-[84rem] rounded-[1.25rem] transition-[background-color,box-shadow] duration-300 ${
          morkt
            ? "bg-ink-svart/92 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.55)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Hoppa till innehållet
        </a>
        <div className="flex h-20 items-center justify-between px-5 sm:px-8">
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
                className="inline-flex min-h-12 items-center border-t border-white/10 text-sm tracking-[0.18em] text-white/85 uppercase"
                activeProps={{ className: "!text-rosa-ljus", "aria-current": "page" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
