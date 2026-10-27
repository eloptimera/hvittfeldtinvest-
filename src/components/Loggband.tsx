import { Logga } from "@/components/Logga";
import { STYRELSEUPPDRAG } from "@/lib/innehall";

/**
 * Smalt band med loggorna för nuvarande uppdrag som rullar i en oändlig slinga.
 * Loggorna är gråtonade och får färg vid hovring. Listan dubbleras så att slingan går ihop;
 * kopian är dold för skärmläsare. Pausar vid hovring och fokus, står still med
 * "minska rörelse".
 */
export function Loggband() {
  const nu = STYRELSEUPPDRAG.filter((u) => u.status === "nuvarande");
  const rad = [...nu, ...nu, ...nu];
  return (
    <section aria-labelledby="nuvarande-rubrik" className="container-page">
      <div className="flex items-center gap-6 border-y border-line">
        <h2
          id="nuvarande-rubrik"
          className="sr-only shrink-0 !font-sans text-[0.68rem] sm:not-sr-only font-medium tracking-[0.22em] text-muted-foreground uppercase sm:block"
        >
          Nuvarande uppdrag
        </h2>
        <div className="rullram min-w-0 flex-1 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="rullband flex w-max items-center">
            {[0, 1].map((halva) =>
              rad.map((u, i) => {
                const dold = halva === 1 || i >= nu.length;
                return (
                  <li key={`${halva}-${i}`} aria-hidden={dold || undefined} className="px-7">
                    <Logga
                      uppdrag={u}
                      variant="dampad"
                      dold={dold}
                      storlek={100}
                      className="h-9"
                      style={{ width: `${Math.round(Math.sqrt(u.proportion ?? 3) * 48)}px` }}
                    />
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
