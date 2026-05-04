// src/components/landing/Testimonials.tsx
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Raman",
    business: "Aroma Cafe",
    initials: "PR",
    quote: "Our bookings jumped within two weeks. The team got us live in just 6 days, and the site looks amazing on phones.",
    outcome: "Booked 12 new clients in 30 days",
  },
  {
    name: "Dr. Karthik S.",
    business: "Lotus Dental Clinic",
    initials: "KS",
    quote: "Finally a developer who understood my patients, not just code. Appointments doubled in the first month.",
    outcome: "2× monthly appointments",
  },
  {
    name: "Neha Iyer",
    business: "Madras Threads",
    initials: "NI",
    quote: "Venzix built our store in 10 days. Conversion is 2× what we had on our old platform. Worth every rupee.",
    outcome: "Shipped in 10 days",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 md:py-32 bg-surface">
    <div className="container">
      <div className="max-w-2xl">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">Testimonials</p>
        <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
          Real outcomes from real local businesses.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="bg-white rounded-lg p-8 border border-line">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 font-body italic text-[15px] text-body leading-relaxed">
              “{r.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-line flex items-center justify-center font-heading font-bold text-[13px] text-ink">
                {r.initials}
              </div>
              <div className="flex-1">
                <div className="font-heading font-bold text-[14px] text-ink">{r.name}</div>
                <div className="font-body text-[13px] text-mute">{r.business}</div>
              </div>
            </div>
            <span className="mt-5 inline-flex rounded-pill bg-ink text-white px-3 py-1 font-body font-medium text-[12px]">
              {r.outcome}
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;