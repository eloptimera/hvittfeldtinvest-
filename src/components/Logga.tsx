import type { CSSProperties } from "react";
import type { Styrelseuppdrag } from "@/lib/innehall";

/**
 * Ett bolags logga. Finns en loggfil (`logo`, i public/logos/) visas den, annars bolagsnamnet
 * som ordbild. Har bolaget en hemsida (`url`) blir loggan en länk dit i ny flik – annars
 * händer ingenting när man klickar.
 */
export function Logga({
  uppdrag,
  variant,
  className = "",
  dold = false,
  lank = true,
  storlek = 40,
  style,
}: {
  uppdrag: Styrelseuppdrag;
  /** "farg" = loggan i egna färger, "dampad" = gråtonad tills man hovrar (loggbandet). */
  variant: "farg" | "dampad";
  className?: string;
  /** Kopia i rullbandet: dold för skärmläsare och tangentbord. */
  dold?: boolean;
  /** false = aldrig en länk (när en omgivande box redan är länken). */
  lank?: boolean;
  /** Bredd i procent för en kvadratisk logga; övriga skalas efter roten ur proportionen. */
  storlek?: number;
  /** Stil på ytterelementet (t.ex. fast bredd i loggbandet). */
  style?: CSSProperties;
}) {
  const dampad =
    variant === "dampad"
      ? "opacity-60 grayscale transition-[opacity,filter] duration-300 group-hover/logga:opacity-100 group-hover/logga:grayscale-0"
      : "";
  // Samma yta för alla loggor: bredden växer med roten ur proportionen, så att breda
  // ordbilder inte dominerar och höga symboler inte blir för stora.
  const r = uppdrag.proportion ?? 3;
  const bredd = `${Math.round(Math.min(100, Math.sqrt(r) * storlek))}%`;
  const innehall = uppdrag.logo ? (
    <img
      src={uppdrag.logo}
      alt={uppdrag.bolag}
      // Ingen lat laddning: Safari skjuter annars upp bilder i 3D-transformerade och
      // intonade element. Filerna är små (cirka 8 kB var).
      decoding="async"
      style={{ width: bredd }}
      className={`h-auto max-h-full object-contain ${dampad} ${
        // Mymos logga är ljusgrå och försvinner annars mot vit botten.
        uppdrag.logo.includes("mymo") ? "[filter:drop-shadow(0_0_0.6px_rgb(0_0_0/0.55))]" : ""
      }`}
    />
  ) : (
    <span
      className={`font-display text-center leading-tight tracking-[-0.01em] text-ink ${
        variant === "dampad"
          ? "text-[1.05rem] text-ink/55 transition-colors duration-300 group-hover/logga:text-rosa"
          : "text-[1.3rem]"
      }`}
    >
      {uppdrag.bolag.replace(/ AB$/, "")}
    </span>
  );

  const bas = `group/logga flex items-center justify-center ${className}`;
  if (!uppdrag.url || !lank)
    return (
      <div className={bas} style={style}>
        {innehall}
      </div>
    );
  return (
    <a
      href={uppdrag.url}
      target="_blank"
      rel="noopener"
      tabIndex={dold ? -1 : undefined}
      aria-label={uppdrag.logo ? `${uppdrag.bolag} (öppnas i ny flik)` : undefined}
      className={bas}
      style={style}
    >
      {innehall}
    </a>
  );
}
