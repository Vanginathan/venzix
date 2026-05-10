// src/components/landing/FAQ.tsx
// ADDED: FAQPage JSON-LD injection for Google rich results + People Also Ask
// IMPROVED: Answers expanded with more E-E-A-T signals, specificity
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does a website take to build?",
    a: "Most Starter sites go live in 3–5 working days. Growth plans take 7–12 days. We commit to a hard launch date on your discovery call — no vague timelines.",
  },
  {
    q: "What is included in every project?",
    a: "Every site includes custom design, mobile-first development, on-page SEO basics (meta titles, descriptions, structured data), SSL setup, Vercel hosting, and a CMS so you or your team can edit content without needing a developer.",
  },
  {
    q: "Do you handle SEO?",
    a: "Yes — every site ships with on-page SEO, schema markup, and Google Search Console submission. We also offer standalone technical SEO audits and monthly content packages for businesses that want to rank competitively.",
  },
  {
    q: "Can you manage my Google Business Profile?",
    a: "Absolutely. We optimise your listing, sync services and business hours, upload professional photos, respond to reviews, and add a direct booking link so new customers can contact you straight from Google Maps.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call. We'll discuss your goals, review your current site (if any), and send a fixed quote within 24 hours. No commitment needed to get the quote.",
  },
  {
    q: "Do you only work with businesses in Chennai?",
    a: "Our expertise is built around Chennai and Tamil Nadu businesses, but we work with clients across India. We've launched sites for businesses in Bangalore, Coimbatore, and Mumbai too.",
  },
  {
    q: "What technology stack do you use?",
    a: "We choose the stack to fit the project — typically React + Next.js for fast, SEO-friendly sites, or a headless CMS (Sanity/Contentful) for content-heavy businesses. Everything is fast, secure, and handover-ready.",
  },
  {
    q: "Do you offer payment in instalments?",
    a: "Yes. We typically work on a 50% upfront and 50% on-launch basis. For larger projects (₹50k+), we can split into three milestones. We accept UPI, bank transfer, and Razorpay.",
  },
];

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