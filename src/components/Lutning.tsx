import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Ger innehållet en 3D-lutning som följer muspekaren, med ett ljusskimmer där pekaren är.
 * Bara med mus – på pekskärm och med "minska rörelse" står kortet still.
 * Värdena skrivs som CSS-variabler direkt på elementet, så ingen omritning sker i React.
 */
export function Lutning({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  /** Största lutning i grader. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function flytta(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--glans", "1");
  }

  function lamna() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glans", "0");
  }

  return (
    <div className="h-full [perspective:900px]">
      <div
        ref={ref}
        onPointerMove={flytta}
        onPointerLeave={lamna}
        className={`lutning relative h-full ${className}`}
      >
        {children}
        <span aria-hidden="true" className="lutning-glans" />
      </div>
    </div>
  );
}
