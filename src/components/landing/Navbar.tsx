// src/components/landing/Navbar.tsx
// IMPROVEMENTS:
//  - Active section tracking with IntersectionObserver
//  - Keyboard-accessible mobile menu (Escape to close)
//  - aria-current on active link
//  - Better mobile menu transition
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services",     label: "Services" },
  { href: "#work",         label: "Work" },
  { href: "#process",      label: "Process" },
  { href: "#pricing",      label: "Pricing" },
  { href: "#faq",          label: "FAQ" },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [open,     setOpen]       = useState(false);
  const [active,   setActive]     = useState<string>("");

  // Scroll → border shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.4 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  // Escape key closes mobile menu
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-white transition-base border-b",
        scrolled ? "border-line shadow-nav" : "border-transparent"
      )}
    >
      <div className="container h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-heading font-bold text-[18px] text-ink tracking-tight focus-visible:outline-ink"
        >
          Venzix
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8 font-body"
          aria-label="Main navigation"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={cn(
                "text-[14px] transition-base relative py-1",
                active === l.href
                  ? "text-ink font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-ink"
                  : "text-body hover:text-ink"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center rounded-pill bg-ink text-white px-5 h-10 font-heading font-semibold text-[13px] press hover:bg-primary-hover"
        >
          Book a Call
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-ink rounded-md focus-visible:outline-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        className={cn(
          "md:hidden fixed inset-0 top-[68px] bg-white transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="container flex flex-col py-6 gap-1 font-body" aria-label="Mobile navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-2 py-4 text-lg text-ink border-b border-line hover:text-mute transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center rounded-pill bg-ink text-white px-6 h-12 font-heading font-semibold hover:bg-primary-hover transition-colors"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;