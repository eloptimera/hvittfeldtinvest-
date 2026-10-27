import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Linkedin, Lock, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { adressRad, FORETAG, PLATSHALLARE } from "@/lib/foretag";
import { hittaTjanst, TJANSTER } from "@/lib/innehall";
import { ROLLER, skickaKontakt } from "@/lib/kontakt";
import { metaKonvertering } from "@/lib/samtycke";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { kontaktSkickad, mejlKlick } from "@/lib/sparning";

type Sok = { tjanst?: string };

export const Route = createFileRoute("/kontakt")({
  validateSearch: (sok: Record<string, unknown>): Sok =>
    typeof sok["tjanst"] === "string" && hittaTjanst(sok["tjanst"])
      ? { tjanst: sok["tjanst"] }
      : {},
  head: () =>
    sidhuvud({
      titel: "Kontakt – boka ett förutsättningslöst samtal",
      beskrivning:
        "Kontakta Ankie Hvittfeldt om styrelseuppdrag, styrelseutvärdering eller ägarstyrning. Det första samtalet är kostnadsfritt och konfidentiellt.",
      sokvag: "/kontakt",
      schema: [
        brodsmulor([
          { namn: "Startsida", sokvag: "/" },
          { namn: "Kontakt", sokvag: "/kontakt" },
        ]),
      ],
    }),
  component: Kontakt,
});

function Kontakt() {
  const sok = Route.useSearch();
  const navigate = useNavigate();
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState(false);
  const adress = adressRad();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(false);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    const text = (namn: string) => String(fd.get(namn) ?? "");
    try {
      await skickaKontakt({
        data: {
          namn: text("namn"),
          organisation: text("organisation"),
          roll: text("roll"),
          epost: text("epost"),
          telefon: text("telefon"),
          arende: text("arende"),
          meddelande: text("meddelande"),
          falla: text("falla"),
        },
      });
      kontaktSkickad(text("arende"));
      metaKonvertering("Lead");
      // Egen tacksida: varje besök där räknas som en förfrågan i statistiken.
      await navigate({ to: "/tack" });
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Välkommen att <Mark>höra av dig</Mark>
          </>
        }
        intro="Oavsett om du sitter i en valberedning, är huvudägare, vd eller styrelseordförande börjar det med ett samtal. Det är kostnadsfritt, förutsättningslöst och allt du berättar behandlas konfidentiellt."
      />

      <section className="container-page grid gap-14 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Kontaktuppgifter</h2>
          <ul className="mt-8 space-y-5">
            <Uppgift ikon={<Mail className="size-5" aria-hidden="true" />} etikett="E-post">
              {FORETAG.epost ? (
                <a
                  href={`mailto:${FORETAG.epost}`}
                  onClick={() => mejlKlick("/kontakt")}
                  className="font-semibold text-ink underline underline-offset-4"
                >
                  {FORETAG.epost}
                </a>
              ) : (
                <span className="text-muted-foreground">{PLATSHALLARE.epost}</span>
              )}
            </Uppgift>
            <Uppgift ikon={<Phone className="size-5" aria-hidden="true" />} etikett="Telefon">
              {FORETAG.telefon ? (
                <a
                  href={`tel:${FORETAG.telefonLank}`}
                  className="font-semibold text-ink underline underline-offset-4"
                >
                  {FORETAG.telefon}
                </a>
              ) : (
                <span className="text-muted-foreground">{PLATSHALLARE.telefon}</span>
              )}
            </Uppgift>
            <Uppgift ikon={<MapPin className="size-5" aria-hidden="true" />} etikett="Adress">
              {adress ? (
                <address className="not-italic">{adress}</address>
              ) : (
                <span className="text-muted-foreground">{PLATSHALLARE.adress}</span>
              )}
            </Uppgift>
            <Uppgift ikon={<Linkedin className="size-5" aria-hidden="true" />} etikett="LinkedIn">
              <a
                href={FORETAG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline underline-offset-4"
              >
                linkedin.com/in/ankiehvittfeldt
              </a>
            </Uppgift>
          </ul>

          <div className="mt-10 flex gap-4 rounded-[1.25rem] bg-tint p-6">
            <Lock className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
            <p className="leading-relaxed text-muted-foreground">
              <span className="font-semibold text-ink">Konfidentiellt.</span> Frågor om
              styrelsetillsättning, ägarskiften och utvärderingar är ofta känsliga. Det du skriver
              går direkt till mig och används bara för att svara dig.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            // Clarity spelar aldrig in det som skrivs här, oavsett inställningar.
            data-clarity-mask="true"
            className="grid gap-6 rounded-[1.25rem] border border-line bg-paper p-7 sm:p-10"
          >
            <div>
              <h2 className="text-3xl">Skicka ett meddelande</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Fyll i dina uppgifter och berätta kort vad det gäller, så återkommer jag för att
                boka en tid. Fält märkta med * måste fyllas i.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Falt id="namn" etikett="Namn *" autoComplete="name" kravs />
              <Falt
                id="organisation"
                etikett="Bolag eller organisation"
                autoComplete="organization"
              />
              <Falt id="epost" etikett="E-post *" typ="email" autoComplete="email" kravs />
              <Falt id="telefon" etikett="Telefon" typ="tel" autoComplete="tel" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="roll" className="text-sm font-semibold">
                  Jag kontaktar dig som
                </label>
                <select id="roll" name="roll" defaultValue="" className="field mt-2">
                  <option value="">Välj (valfritt)</option>
                  {ROLLER.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="arende" className="text-sm font-semibold">
                  Det gäller
                </label>
                <select
                  id="arende"
                  name="arende"
                  defaultValue={hittaTjanst(sok.tjanst ?? "")?.titel ?? ""}
                  className="field mt-2"
                >
                  <option value="">Vet inte än</option>
                  {TJANSTER.map((t) => (
                    <option key={t.slug} value={t.titel}>
                      {t.titel}
                    </option>
                  ))}
                  <option value="Annat">Annat</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="meddelande" className="text-sm font-semibold">
                Meddelande *
              </label>
              <textarea
                id="meddelande"
                name="meddelande"
                rows={5}
                required
                placeholder="Berätta kort om bolaget och vad du vill ha hjälp med."
                className="field mt-2"
              />
            </div>

            {/* Dolt fält mot skräppost – riktiga besökare ser det aldrig. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
              <label htmlFor="falla">Lämna tomt</label>
              <input id="falla" name="falla" tabIndex={-1} autoComplete="off" />
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand" />
              <span>
                Jag har läst hur mina uppgifter hanteras i{" "}
                <Link to="/integritetspolicy" className="font-semibold text-brand underline">
                  integritetspolicyn
                </Link>
                . *
              </span>
            </label>

            {fel && (
              <p role="alert" className="text-sm font-semibold text-destructive">
                Meddelandet kunde inte skickas. Försök igen om en stund
                {FORETAG.epost ? ` eller mejla ${FORETAG.epost}` : ""}.
              </p>
            )}

            <div>
              <button type="submit" disabled={skickar} className="btn-base btn-dark">
                {skickar ? "Skickar …" : "Skicka meddelande"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Uppgift({
  ikon,
  etikett,
  children,
}: {
  ikon: ReactNode;
  etikett: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-brand">
        {ikon}
      </span>
      <span className="min-w-0">
        <span className="caps block !text-[0.66rem] text-muted-foreground">{etikett}</span>
        <span className="mt-1 block break-words">{children}</span>
      </span>
    </li>
  );
}

function Falt({
  id,
  etikett,
  typ = "text",
  autoComplete,
  kravs = false,
}: {
  id: string;
  etikett: string;
  typ?: "text" | "email" | "tel";
  autoComplete: string;
  kravs?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {etikett}
      </label>
      <input
        id={id}
        name={id}
        type={typ}
        autoComplete={autoComplete}
        required={kravs}
        className="field mt-2"
      />
    </div>
  );
}
