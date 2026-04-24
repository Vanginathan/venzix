import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Priya Raman", role: "Owner, Aroma Cafe", quote: "Our bookings jumped within two weeks. The team got us live in just 6 days, and the site looks amazing on phones." },
  { name: "Dr. Karthik S.", role: "Lotus Dental Clinic", quote: "Finally a developer who understood my patients, not just code. Appointments doubled in the first month." },
  { name: "Neha Iyer", role: "Founder, Madras Threads", quote: "DevCraft built our store in 10 days. Conversion is 2x what we had on our old platform. Worth every rupee." },
  { name: "Arun Mehta", role: "CEO, PixelForge", quote: "Shipped our launch site in under a week. Clear communication, zero drama, beautiful execution." },
  { name: "Lakshmi V.", role: "Marina Estates", quote: "Our agents love the new CMS. Listings go up in minutes and the design finally reflects our brand." },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  const r = reviews[i];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-surface-dark text-surface-dark-foreground">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-white/70 uppercase tracking-wider">Testimonials</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
            What our clients say
          </h2>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div key={i} className="bg-surface-mid rounded-2xl p-8 md:p-12 shadow-card-hover animate-fade-in-up">
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 text-lg md:text-xl leading-relaxed text-white/90">
              "{r.quote}"
            </blockquote>
            <div className="mt-6">
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-white/60">{r.role}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Go to review ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-2 rounded-full transition-base ${k === i ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => setI((p) => (p - 1 + reviews.length) % reviews.length)} aria-label="Previous review">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => setI((p) => (p + 1) % reviews.length)} aria-label="Next review">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
