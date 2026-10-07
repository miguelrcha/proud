"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades in every [data-reveal] element as it enters the viewport.
// The attribute value is an optional delay in ms, used to stagger items.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Number(el.dataset.reveal) || 0}ms`;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
