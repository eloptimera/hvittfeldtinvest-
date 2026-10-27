import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { TabLogga } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";
import { BEHOVER_SAMTYCKE, oppnaInstallningar } from "@/lib/samtycke";

const RUBRIK = "text-[0.68rem] font-medium tracking-[0.24em] text-rosa-ljus uppercase";
const LANK =
  "rounded-sm text-white/80 underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-rosa-ljus";

const SIDOR = [
  { to: "/om-mig", label: "Om mig" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/erfarenhet", label: "Uppdrag" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

/** Svart, rundad sidfotsbox med ett mjukt rosa sken i hörnet. */
export function Footer() {
  return (
    <footer className="mt-28 px-3 pb-3 sm:mt-36 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-[1.75rem] bg-ink-svart text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[30rem] rounded-full bg-rosa/45 blur-[110px]"
        />
        <div className="container-page grid gap-12 pt-16 pb-12 sm:pt-20 md:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none">
              {FORETAG.person}
            </p>
            <p className="mt-4 max-w-sm text-white/65">
              Styrelseordförande och styrelseledamot i ägarledda, statligt ägda och noterade bolag.
            </p>
            <a
              href={FORETAG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm transition-colors duration-200 hover:border-rosa-ljus hover:bg-rosa"
            >
              LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Sidfot">
            <p className={RUBRIK}>Sidor</p>
            <ul className="mt-5 space-y-3">
              {SIDOR.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className={LANK}>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/integritetspolicy" className={LANK}>
                  Integritetspolicy
                </Link>
              </li>
              {BEHOVER_SAMTYCKE && (
                <li>
                  <button type="button" onClick={oppnaInstallningar} className={LANK}>
                    Cookieinställningar
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <p className={RUBRIK}>Bolag</p>
            <p className="mt-5 font-display text-xl">{FORETAG.juridisktNamn}</p>
            <p className="mt-2 text-white/70">Org.nr {FORETAG.orgnr}</p>
            <p className="mt-4 flex gap-3 text-white/70">
              <MapPin className="mt-1 size-4 shrink-0 text-rosa-ljus" aria-hidden="true" />
              <span>
                {FORETAG.gata}
                <br />
                {FORETAG.postnummer} {FORETAG.ort}
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {FORETAG.juridisktNamn}
            </span>
            <span className="flex items-center gap-3">
              <span>Hemsidan är byggd och administrerad av</span>
              <TabLogga className="!text-white" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
