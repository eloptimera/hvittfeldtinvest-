import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Ordmarke } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";

const LANKAR = [
  { to: "/om-mig", label: "Om mig" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/erfarenhet", label: "Erfarenhet" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

const LANK =
  "caps !text-[0.7rem] inline-flex min-h-11 items-center px-3 text-muted-foreground transition-colors duration-200 hover:text-ink";

export function Header() {
  const [oppen, setOppen] = useState(false);

  useEffect(() => {
    if (!oppen) return;
    const stang = (e: KeyboardEvent) => e.key === "Escape" && setOppen(false);
    window.addEventListener("keydown", stang);
    return () => window.removeEventListener("keydown", stang);
  }, [oppen]);

  return (
    <header className="relative z-20">
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
          className="text-ink"
        >
          <Ordmarke />
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Huvudmeny">
          {LANKAR.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={LANK}
              activeProps={{ className: `${LANK} !text-ink`, "aria-current": "page" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={oppen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={oppen}
          aria-controls="mobilmeny"
          onClick={() => setOppen((o) => !o)}
          className="-mr-2 grid size-11 place-items-center text-ink md:hidden"
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
          className="container-page flex flex-col border-b border-line pb-4 md:hidden"
        >
          {LANKAR.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOppen(false)}
              className={`${LANK} !px-0`}
              activeProps={{ className: `${LANK} !px-0 !text-ink`, "aria-current": "page" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
