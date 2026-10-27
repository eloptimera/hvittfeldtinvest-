import { createFileRoute } from "@tanstack/react-router";
import { absolut, FORETAG } from "@/lib/foretag";
import {
  FRAGOR,
  KOMPETENSER,
  OPERATIVT,
  STYRELSEUPPDRAG,
  TJANSTER,
  UTBILDNING,
} from "@/lib/innehall";
import { SIDOR, textSvar } from "@/lib/sidor";

// llms.txt (https://llmstxt.org): en kort sammanfattning av sajten för AI-assistenter.
// Byggs från samma data som sidorna, så den är alltid uppdaterad.

function llmsText(): string {
  return [
    `# ${FORETAG.namn}`,
    "",
    `> ${FORETAG.beskrivning}`,
    "",
    `${FORETAG.namn} drivs av ${FORETAG.juridisktNamn}. ${FORETAG.person} (${FORETAG.personFullstandigt}) är ${FORETAG.titel.toLowerCase()}. LinkedIn: ${FORETAG.linkedin}. Det första samtalet är kostnadsfritt och bokas på ${absolut("/kontakt")}.`,
    "",
    "## Tjänster",
    "",
    ...TJANSTER.map((t) => `- [${t.titel}](${absolut(`/tjanster#${t.slug}`)}): ${t.kort}`),
    "",
    "## Kompetenser",
    "",
    ...KOMPETENSER.map((k) => `- ${k.titel}: ${k.text}`),
    "",
    "## Styrelseuppdrag (urval, nuvarande och tidigare)",
    "",
    ...STYRELSEUPPDRAG.map(
      (u) =>
        `- ${u.bolag} – ${u.roll.toLowerCase()} (${u.typ.toLowerCase()}${u.tidigare ? ", tidigare" : ""})${u.not ? `. ${u.not}` : ""}`,
    ),
    "",
    "## Operativ bakgrund",
    "",
    ...OPERATIVT.map((o) => `- ${o.organisation} (${o.omrade}): ${o.text}`),
    "",
    "## Utbildning",
    "",
    ...UTBILDNING.map((u) => `- ${u.titel}: ${u.text}`),
    "",
    "## Vanliga frågor",
    "",
    ...FRAGOR.map((f) => `- ${f.fraga} ${f.svar}`),
    "",
    "## Sidor",
    "",
    ...SIDOR.map((s) => `- [${s.namn}](${absolut(s.sokvag)})`),
    "",
  ].join("\n");
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => textSvar(llmsText(), "text/plain"),
    },
  },
});
