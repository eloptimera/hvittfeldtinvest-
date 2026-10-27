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
}: {
  uppdrag: Styrelseuppdrag;
  /** "farg" = loggan i egna färger, "dampad" = gråtonad tills man hovrar (loggbandet). */
  variant: "farg" | "dampad";
  className?: string;
  /** Kopia i rullbandet: dold för skärmläsare och tangentbord. */
  dold?: boolean;
  /** false = aldrig en länk (när en omgivande box redan är länken). */
  lank?: boolean;
}) {
  const dampad =
    variant === "dampad"
      ? "opacity-60 grayscale transition-[opacity,filter] duration-300 group-hover/logga:opacity-100 group-hover/logga:grayscale-0"
      : "";
  const innehall = uppdrag.logo ? (
    <img
      src={uppdrag.logo}
      alt={uppdrag.bolag}
      loading="lazy"
      decoding="async"
      className={`max-h-full w-auto max-w-full object-contain ${dampad}`}
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
  if (!uppdrag.url || !lank) return <div className={bas}>{innehall}</div>;
  return (
    <a
      href={uppdrag.url}
      target="_blank"
      rel="noopener"
      tabIndex={dold ? -1 : undefined}
      aria-label={uppdrag.logo ? `${uppdrag.bolag} (öppnas i ny flik)` : undefined}
      className={bas}
    >
      {innehall}
    </a>
  );
}
