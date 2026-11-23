// src/components/landing/FAQ.tsx
// ADDED: FAQPage JSON-LD injection for Google rich results + People Also Ask
// IMPROVED: Answers expanded with more E-E-A-T signals, specificity
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { homeFaqs as faqs } from "@/faqData";

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  // Inject FAQPage JSON-LD for Google rich results
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id   = "faq-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-jsonld");
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container max-w-3xl">
        <div className="reveal">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">FAQ</p>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
            Questions we get asked most.
          </h2>
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal" data-stagger={Math.min(i, 4)}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-[16px] text-ink group-hover:text-ink/70 transition-colors">
                    {f.q}
                  </span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden
                  />
                </button>

                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 font-body text-[15px] text-mute leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline CTA */}
        <div className="reveal mt-12 rounded-lg bg-ink p-8 text-center">
          <p className="font-heading font-bold text-[20px] text-white">
            Still have questions?
          </p>
          <p className="mt-2 font-body text-[15px] text-white/60">
            Book a free 30-minute discovery call — we'll answer everything live.
          </p>
          <a
            href="#contact"
            className="press mt-5 inline-flex items-center gap-2 justify-center rounded-pill bg-white text-ink px-7 h-11 font-heading font-semibold text-[14px] hover:bg-surface transition-colors shadow-[0_4px_18px_hsl(0_0%_0%/0.2)]"
          >
            Book a free discovery call →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;