import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-base",
        scrolled
          ? "h-[60px] bg-background/95 backdrop-blur shadow-nav"
          : "h-[72px] bg-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 font-bold text-xl">
          <span className="h-3 w-3 rounded-sm bg-primary" />
          <span className={cn(scrolled ? "text-surface-dark" : "text-surface-dark-foreground")}>
            DevCraft<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-base hover:text-primary",
                active === l.href.slice(1)
                  ? "text-primary"
                  : scrolled
                  ? "text-foreground"
                  : "text-surface-dark-foreground/90"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="default" size="sm">
            <a href="#contact">Book a Free Call</a>
          </Button>
        </div>

        <button
          className={cn(
            "md:hidden p-2 rounded-md",
            scrolled ? "text-surface-dark" : "text-surface-dark-foreground"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-background border-b shadow-nav">
          <nav className="container flex flex-col py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-md"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="#contact" onClick={() => setOpen(false)}>Book a Free Call</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
