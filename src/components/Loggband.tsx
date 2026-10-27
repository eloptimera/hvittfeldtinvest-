import { Logga } from "@/components/Logga";
import { STYRELSEUPPDRAG } from "@/lib/innehall";

/**
 * Rosa band med loggorna för nuvarande uppdrag som rullar i en oändlig slinga.
 * Listan dubbleras så att slingan går ihop; kopian är dold för skärmläsare.
 * Pausar vid hovring och fokus, och står still med "minska rörelse".
 */
export function Loggband() {
  const nu = STYRELSEUPPDRAG.filter((u) => u.status === "nuvarande");
  // Fyll på så att en halva alltid är bredare än skärmen, även med få bolag.
  const rad = [...nu, ...nu, ...nu];
  return (
    <section aria-labelledby="nuvarande-rubrik" className="bg-rosa text-white">
      <div className="container-page pt-9">
        <h2 id="nuvarande-rubrik" className="caps !font-sans !text-[0.72rem] !tracking-[0.24em]">
          Nuvarande styrelseuppdrag
        </h2>
      </div>
      <div className="rullram overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="rullband flex w-max items-center">
          {[0, 1].map((halva) =>
            rad.map((u, i) => (
              <li
                key={`${halva}-${i}`}
                aria-hidden={halva === 1 || i >= nu.length ? true : undefined}
                className="px-10 sm:px-14"
              >
                <Logga
                  uppdrag={u}
                  variant="vit"
                  dold={halva === 1 || i >= nu.length}
                  className="h-12 min-w-36 opacity-90 transition-opacity duration-200 hover:opacity-100"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
