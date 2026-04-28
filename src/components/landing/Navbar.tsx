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
        "fixed top-0 inset-x-0 z-50 bg-white transition-base border-b",
        scrolled ? "border-line shadow-nav" : "border-transparent"
      )}
    >
      <div className="container h-[68px] flex items-center justify-between">
        <a href="#hero" className="font-heading font-bold text-[18px] text-ink tracking-tight">
          DevCraft<span className="text-mute">/studio</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-body">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-body hover:text-ink transition-base"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center rounded-pill bg-ink text-white px-5 h-10 font-heading font-semibold text-[13px] transition-base hover:bg-primary-hover"
        >
          Book a Call
        </a>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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