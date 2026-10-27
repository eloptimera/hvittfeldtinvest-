import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Ordmarke, TabLogga } from "@/components/Brand";
import { adressRad, FORETAG } from "@/lib/foretag";
import { TJANSTER } from "@/lib/innehall";
import { BEHOVER_SAMTYCKE, oppnaInstallningar } from "@/lib/samtycke";
import { mejlKlick } from "@/lib/sparning";

const LANK =
  "rounded-sm underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-gold";
const RUBRIK = "caps !text-[0.7rem] text-gold";

export function Footer() {
  const adress = adressRad();
  return (
    <footer className="p-3 pt-0 sm:px-6">
      <div className="mx-auto max-w-[84rem] overflow-hidden rounded-[1.25rem] bg-ink text-white">
        <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr]">
          <div>
            <Ordmarke ljus />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/75">
              {FORETAG.person} – {FORETAG.titel.toLowerCase()} för ägarledda, statligt ägda och
              noterade bolag.
            </p>
          </div>

          <div>
            <p className={RUBRIK}>Tjänster</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              {TJANSTER.map((t) => (
                <li key={t.slug}>
                  <Link to="/tjanster" hash={t.slug} className={LANK}>
                    {t.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={RUBRIK}>Sidor</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              <li>
                <Link to="/om-mig" className={LANK}>
                  Om mig
                </Link>
              </li>
              <li>
                <Link to="/erfarenhet" className={LANK}>
                  Erfarenhet
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={LANK}>
                  Kontakt
                </Link>
              </li>
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
          </div>

          <div>
            <p className={RUBRIK}>Kontakt</p>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {FORETAG.telefon && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`tel:${FORETAG.telefonLank}`} className={LANK}>
                    {FORETAG.telefon}
                  </a>
                </li>
              )}
              {FORETAG.epost && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a
                    href={`mailto:${FORETAG.epost}`}
                    onClick={() => mejlKlick(window.location.pathname)}
                    className={LANK}
                  >
                    {FORETAG.epost}
                  </a>
                </li>
              )}
              {adress && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <address className="not-italic">{adress}</address>
                </li>
              )}
              <li className="flex gap-3">
                <Linkedin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={FORETAG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LANK}
                >
                  LinkedIn
                </a>
              </li>
              {!FORETAG.epost && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <Link to="/kontakt" className={LANK}>
                    Skicka ett meddelande
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="container-page flex flex-col gap-5 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {FORETAG.juridisktNamn}
              {FORETAG.orgnr && ` · Org.nr ${FORETAG.orgnr}`}
            </span>
            <span className="flex items-center gap-3">
              <span>Hemsidan är byggd och administrerad av</span>
              <TabLogga />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
