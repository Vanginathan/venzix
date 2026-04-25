import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How long does a website take?", a: "Most Starter sites launch in 3–5 days. Growth plans take 7–14 days. We commit to a hard date in your discovery call." },
  { q: "What is included in every project?", a: "Custom design, mobile-first development, on-page SEO basics, hosting setup, SSL, and a CMS so your team can edit content after launch." },
  { q: "Do you do SEO?", a: "Yes — every site ships with on-page SEO, structured data, and Google Search Console setup. We also offer ongoing technical SEO and content packages." },
  { q: "Can you manage my Google Business Profile?", a: "Absolutely. We optimise your profile, sync services, upload photos, and connect a booking link so leads can contact you directly from Google." },
  { q: "How do I get started?", a: "Book a free discovery call. We’ll discuss your goals, send a fixed quote within 24 hours, and you can start whenever you’re ready." },
  { q: "Do you work with local businesses?", a: "That’s our specialty. We work with cafes, clinics, salons, real-estate agents, and growing service businesses across Chennai." },
  { q: "What technology do you use?", a: "We choose the stack to fit the project — typically React, Next.js, or a headless CMS. Everything is fast, secure, and easy for your team to maintain." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container max-w-3xl">
        <div>
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">FAQ</p>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
            Questions we get asked most.
          </h2>
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-[16px] text-ink">{f.q}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 font-body text-[15px] text-mute leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;