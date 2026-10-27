import { createFileRoute, Link } from "@tanstack/react-router";
import { Mark, PageHero } from "@/components/Heading";
import { sidhuvud } from "@/lib/seo";

// Visas efter att kontaktformuläret skickats. Besök här = en förfrågan i statistiken.
// Sidan ska inte synas i sökresultat och står inte i sitemap.xml.
export const Route = createFileRoute("/tack")({
  head: () => {
    const h = sidhuvud({
      titel: "Tack för ditt meddelande",
      beskrivning: "Meddelandet har kommit fram. Jag återkommer för att boka en tid.",
      sokvag: "/tack",
    });
    return { ...h, meta: [...h.meta, { name: "robots", content: "noindex" }] };
  },
  component: Tack,
});

function Tack() {
  return (
    <PageHero
      eyebrow="Tack"
      title={
        <>
          Tack – jag <Mark>återkommer</Mark>
        </>
      }
      intro="Ditt meddelande har kommit fram. Jag läser det och hör av mig för att boka en tid för ett första samtal."
    >
      <Link to="/" className="btn-base btn-dark">
        Till startsidan
      </Link>
      <Link to="/erfarenhet" className="btn-base btn-outline">
        Erfarenhet och meriter
      </Link>
    </PageHero>
  );
}
