import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-base",
      )}
    >
      <div className="container pt-4 md:pt-5 flex justify-center">
        <div
          className={cn(
            "flex items-center gap-2 md:gap-3 bg-white rounded-pill pl-2 pr-2 h-12 md:h-14 transition-base",
            scrolled ? "shadow-nav" : "shadow-[0_4px_24px_hsl(0_0%_0%/0.06)]"
          )}
        >
          <a
            href="#hero"
            aria-label="DevCraft Studio"
            className="ml-1 inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-md bg-ink"
          />

          <nav className="hidden md:flex items-center gap-1 font-body px-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-[13px] text-body hover:text-ink transition-base"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 justify-center rounded-pill bg-ink text-white px-4 h-10 font-heading font-semibold text-[13px] transition-base hover:bg-primary-hover"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Book a call
          </a>

          <button
            className="md:hidden p-2 text-ink ml-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-[68px] bg-white">
          <nav className="container flex flex-col py-6 gap-1 font-body">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-4 text-lg text-ink border-b border-line"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-pill bg-ink text-white px-6 h-12 font-heading font-semibold"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;