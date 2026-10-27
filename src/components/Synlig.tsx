import { useEffect, useRef, useState, type ReactNode } from "react";

/** Blir sann (och förblir sann) första gången elementet kommer in i bild. */
export function useSynlig<T extends HTMLElement>(marginal = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [synlig, setSynlig] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (poster) => {
        if (poster.some((p) => p.isIntersecting)) {
          setSynlig(true);
          obs.disconnect();
        }
      },
      { rootMargin: marginal, threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [marginal]);
  return [ref, synlig] as const;
}

/** Tonar in innehållet underifrån när det kommer i bild. `as="li"` inne i listor. */
export function Tona({
  children,
  className = "",
  as: Tag = "div",
  fordrojning = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  fordrojning?: number;
}) {
  const [ref, synlig] = useSynlig<HTMLDivElement & HTMLLIElement>();
  return (
    <Tag
      ref={ref}
      className={`tona ${synlig ? "tona-in" : ""} ${className}`}
      style={{ transitionDelay: `${fordrojning}ms` }}
    >
      {children}
    </Tag>
  );
}
