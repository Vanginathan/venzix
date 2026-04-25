import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "About us" },
  { href: "#services", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our projects" },
  { href: "#contact", label: "Contact us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-5 inset-x-0 z-50 px-4">
      <div
        className={cn(
          "mx-auto max-w-3xl flex items-center gap-2 rounded-pill bg-white/95 backdrop-blur",
          "border border-line shadow-nav pl-3 pr-2 py-2"
        )}
      >
        <a href="#hero" aria-label="Home" className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-md">
          <span className="h-3.5 w-3.5 rounded-[3px] bg-ink" />
        </a>

        <nav className="hidden md:flex items-center gap-7 font-body mx-auto">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              className="text-[13px] text-body hover:text-ink transition-base"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-pill bg-ink text-white pl-4 pr-5 h-9 font-heading font-semibold text-[13px] transition-base hover:bg-primary-hover ml-auto"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Book a call
        </a>

        <button
          className="md:hidden ml-auto p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40">
          <nav className="container flex flex-col py-6 gap-1 font-body">
            {links.map((l, i) => (
              <a
                key={i}
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
              Book a call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;