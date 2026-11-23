// src/pages/NotFound.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/config/site";

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Our work" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Page not found | Venzix";

    // Keep 404 URLs out of search indexes.
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <a href="/" className="font-heading font-bold text-xl text-ink">
          {SITE.name}
        </a>

        <p className="mt-10 font-heading font-bold text-7xl text-ink/15" aria-hidden>
          404
        </p>
        <h1 className="mt-2 font-heading font-bold text-3xl text-ink">
          This page doesn't exist
        </h1>
        <p className="mt-3 font-body text-[15px] text-mute">
          We couldn't find <code className="text-ink break-all">{pathname}</code>. It may have
          moved, or the link may be mistyped.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-ink px-7 font-heading text-[14px] font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Home
        </a>

        <nav aria-label="Helpful links" className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-[14px]">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink underline underline-offset-4 hover:opacity-70">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={waLink(`Hi, I couldn't find a page on your website (${pathname}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-body text-[14px] text-mute hover:text-ink"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> Need help? Message us on WhatsApp
        </a>
      </div>
    </main>
  );
};

export default NotFound;