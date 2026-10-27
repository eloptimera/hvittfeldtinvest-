import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Avsnitt, PageHero } from "@/components/Heading";
import { adressRad, FORETAG } from "@/lib/foretag";
import { AKTIVA_VERKTYG, BEHOVER_SAMTYCKE, KATEGORIER, oppnaInstallningar } from "@/lib/samtycke";
import { sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/integritetspolicy")({
  head: () =>
    sidhuvud({
      titel: "Integritetspolicy",
      beskrivning: `Så behandlar ${FORETAG.juridisktNamn} personuppgifter i samband med webbplatsen.`,
      sokvag: "/integritetspolicy",
    }),
  component: Integritetspolicy,
});

function Text({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl space-y-4 leading-relaxed">{children}</div>;
}

function Integritetspolicy() {
  return (
    <>
      <PageHero etikett="Integritetspolicy" title="Personuppgifter" />

      <Avsnitt rubrik="Ansvarig" id="ansvarig">
        <Text>
          <p>
            {FORETAG.juridisktNamn}, org.nr {FORETAG.orgnr}, {adressRad()}, är
            personuppgiftsansvarig för behandlingen av personuppgifter i samband med den här
            webbplatsen.
          </p>
        </Text>
      </Avsnitt>

      <Avsnitt rubrik="Uppgifter" id="uppgifter">
        <Text>
          <p>
            Webbplatsen har inget formulär och samlar inte in några personuppgifter. Kontaktar du
            mig via e-post eller telefon används uppgifterna du lämnar bara för att svara dig, och
            de sparas så länge det behövs för det. Rättslig grund är berättigat intresse eller, om
            det leder till ett uppdrag, att fullgöra avtalet.
          </p>
          <p>
            Webbplatsen driftas hos en hostingleverantör som kan se teknisk trafikdata som
            IP-adress. Uppgifter lämnas inte ut till andra om inte lag kräver det.
          </p>
        </Text>
      </Avsnitt>

      <Avsnitt rubrik="Cookies" id="cookies">
        <Text>
          <p>
            Besöksstatistiken (Vercel Web Analytics) sätter inga cookies och sparar inga uppgifter
            som kan identifiera dig. Den visar bara sammanställda siffror, till exempel hur många
            som besökt en sida.
          </p>
          {BEHOVER_SAMTYCKE && (
            <>
              <p>Om du godkänner det i cookierutan används också:</p>
              <ul className="list-disc space-y-2 pl-6">
                {AKTIVA_VERKTYG.map((v) => (
                  <li key={v.id}>
                    {v.namn} ({KATEGORIER[v.kategori].namn.toLowerCase()}, {v.leverantor}):{" "}
                    {v.syfte}
                  </li>
                ))}
              </ul>
              <p>
                Du kan ändra ditt val när som helst under{" "}
                <button type="button" onClick={oppnaInstallningar} className="lank">
                  Cookieinställningar
                </button>
                .
              </p>
            </>
          )}
        </Text>
      </Avsnitt>

      <Avsnitt rubrik="Dina rättigheter" id="rattigheter">
        <Text>
          <p>
            Du har rätt att få veta vilka uppgifter som finns om dig, få dem rättade eller raderade
            och att invända mot behandlingen. Du kan också klaga hos{" "}
            <a className="lank" href="https://www.imy.se" target="_blank" rel="noopener noreferrer">
              Integritetsskyddsmyndigheten (IMY)
            </a>
            .
          </p>
        </Text>
      </Avsnitt>
    </>
  );
}
