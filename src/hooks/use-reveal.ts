// src/hooks/use-reveal.ts
import { useEffect } from "react";

/**
 * Observes elements with the `.reveal` class and adds `.is-visible`
 * when they enter the viewport.
 * - Respects prefers-reduced-motion (shows all instantly)
 * - Applies data-stagger="N" → N*80ms cascade delay
 * - Re-scans at 100ms, 400ms, 1000ms to catch late-rendered elements
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (el: HTMLElement) => {
      const stagger = Number(el.dataset.stagger ?? 0);
      if (stagger) el.style.transitionDelay = `${stagger * 80}ms`;
      el.classList.add("is-visible");
    };

    if (prefersReduced) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        io.observe(el);
      });
    };

    // Scan immediately and at intervals to catch all dynamically rendered elements
    scan();
    const t1 = window.setTimeout(scan, 100);
    const t2 = window.setTimeout(scan, 400);
    const t3 = window.setTimeout(scan, 1000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      io.disconnect();
    };
  }, []);
}