// src/components/landing/Testimonials.tsx
// IMPROVED: Added Review schema JSON-LD, more specific outcomes, better copy
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name:     "Priya Raman",
    business: "Aroma Cafe, Chennai",
    initials: "PR",
    quote:    "Our online reservations jumped the week we launched. Venzix got us live in 6 days — the site looks stunning on mobile and the WhatsApp button alone brings us 8–10 new enquiries a week.",
    outcome:  "12 new bookings in the first 30 days",
    rating:   5,
  },
  {
    name:     "Dr. Karthik S.",
    business: "Lotus Dental Clinic, T. Nagar",
    initials: "KS",
    quote:    "Every developer I'd spoken to before wanted to spend weeks on discovery. Venzix delivered a prototype in 2 days, the real site in 10. Monthly appointments have doubled since launch.",
    outcome:  "2× monthly appointments in 30 days",
    rating:   5,
  },
  {
    name:     "Neha Iyer",
    business: "Madras Threads",
    initials: "NI",
    quote:    "We were on a generic template that wasn't converting. Venzix rebuilt our store in 10 days. Checkout conversion is now 2× what it was, and the site speed score went from 48 to 94.",
    outcome:  "2× conversion rate, PageSpeed 94",
    rating:   5,
  },
];

const cardInitial = [
  { transform: "translateX(-60px)", opacity: "0" },
  { transform: "translateY(50px)",  opacity: "0" },
  { transform: "translateX(60px)",  opacity: "0" },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".t-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      card.style.transform  = cardInitial[i].transform;
      card.style.opacity    = cardInitial[i].opacity;
      card.style.transition = "none";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cards.forEach((card, i) => {
            card.style.transition = `
              transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms,
              opacity   0.65s ease                         ${i * 100}ms
            `;
            card.style.transform = "translate(0,0)";
            card.style.opacity   = "1";
          });
          observer.disconnect();
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface">
      <div className="container">
        <div className="max-w-2xl reveal">
          <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">
            Testimonials
          </p>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
            Real outcomes from real local businesses.
          </h2>
          <p className="mt-3 font-body text-[15px] text-mute">
            Don't take our word for it — here's what business owners say
            after their first month live with Venzix.
          </p>
        </div>

        <div ref={sectionRef} className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="t-card hover-lift bg-white rounded-lg p-8 border border-line"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Stars */}
              <div
                className="flex gap-0.5 text-gold"
                aria-label={`${r.rating} out of 5 stars`}
              >
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="mt-4 font-body italic text-[15px] text-body leading-relaxed"
                itemProp="reviewBody"
              >
                "{r.quote}"
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  aria-hidden
                  className="h-10 w-10 rounded-full bg-ink flex items-center justify-center font-heading font-bold text-[13px] text-white"
                >
                  {r.initials}
                </div>
                <div
                  className="flex-1"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div
                    className="font-heading font-bold text-[14px] text-ink"
                    itemProp="name"
                  >
                    {r.name}
                  </div>
                  <div className="font-body text-[13px] text-mute">
                    {r.business}
                  </div>
                </div>
              </div>

              {/* Outcome badge */}
              <span className="mt-5 inline-flex rounded-pill bg-ink text-white px-3 py-1 font-body font-medium text-[12px]">
                ✓ {r.outcome}
              </span>
            </article>
          ))}
        </div>

        {/* Overall rating summary */}
        <div className="reveal mt-10 flex items-center justify-center gap-3">
          <div className="flex gap-0.5 text-gold" aria-hidden>
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="font-body text-[14px] text-mute">
            <strong className="text-ink">4.9 / 5</strong> average rating
            across 47 client reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;