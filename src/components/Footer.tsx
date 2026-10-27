import { Link } from "@tanstack/react-router";
import { TabLogga } from "@/components/Brand";
import { adressRad, FORETAG } from "@/lib/foretag";
import { BEHOVER_SAMTYCKE, oppnaInstallningar } from "@/lib/samtycke";

const LANK = "lank";

export function Footer() {
  return (
    <footer className="container-page mt-24 sm:mt-32">
      <div className="grid gap-8 border-t border-line py-10 text-sm text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1">
          <p className="font-display text-xl text-ink">{FORETAG.juridisktNamn}</p>
          <p>Org.nr {FORETAG.orgnr}</p>
          <p>{adressRad()}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1 pt-3">
            <a href={FORETAG.linkedin} target="_blank" rel="noopener noreferrer" className={LANK}>
              LinkedIn
            </a>
            <Link to="/integritetspolicy" className={LANK}>
              Integritetspolicy
            </Link>
            {BEHOVER_SAMTYCKE && (
              <button type="button" onClick={oppnaInstallningar} className={LANK}>
                Cookieinställningar
              </button>
            )}
          </p>
        </div>
        <p className="flex items-center gap-3 text-xs">
          <span>Hemsidan är byggd och administrerad av</span>
          <TabLogga />
        </p>
      </div>
    </footer>
  );
}
