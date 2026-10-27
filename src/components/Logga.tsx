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
}: {
  uppdrag: Styrelseuppdrag;
  /** "farg" = loggan i egna färger på ljus yta, "vit" = vit loggan på rosa bandet. */
  variant: "farg" | "vit";
  className?: string;
  /** Kopia i rullbandet: dold för skärmläsare och tangentbord. */
  dold?: boolean;
}) {
  const innehall = uppdrag.logo ? (
    <img
      src={uppdrag.logo}
      alt={uppdrag.bolag}
      loading="lazy"
      decoding="async"
      className={`max-h-full w-auto max-w-full object-contain ${
        variant === "vit" ? "brightness-0 invert" : ""
      }`}
    />
  ) : (
    <span
      className={`font-display text-center text-[1.35rem] leading-tight tracking-[-0.01em] ${
        variant === "vit" ? "text-white" : "text-ink"
      }`}
    >
      {uppdrag.bolag.replace(/ AB$/, "")}
    </span>
  );

  const bas = `flex items-center justify-center ${className}`;
  if (!uppdrag.url) return <div className={bas}>{innehall}</div>;
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
