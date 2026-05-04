// src/hooks/use-reveal.ts
import { useEffect } from "react";

/**
 * Observes elements with the `.reveal` class and adds `.is-visible`
 * when they enter the viewport. Runs once globally on mount.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Re-scan shortly after mount in case content renders late.
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    }, 250);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);
}