import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-[100vh] md:min-h-screen flex items-center justify-center bg-hero-mesh overflow-hidden pt-24 pb-16"
  >
    <div className="container relative z-10 text-center text-surface-dark-foreground">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-[13px] font-medium border border-white/15">
        <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
        Only 3 Project Slots Open This Month
      </div>

      <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] max-w-4xl mx-auto">
        We Build Websites That Win You More Clients
      </h1>

      <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl mx-auto">
        From local businesses to growing startups, we design and develop websites that attract visitors, build trust, and convert them into paying customers.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" variant="secondary" className="bg-white text-surface-dark hover:bg-white/90 h-12 px-6">
          <a href="#contact">Book a Free Call</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white h-12 px-6">
          <a href="#work">View Our Work</a>
        </Button>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white/90">
        {[
          { num: "50+", label: "Websites Delivered" },
          { num: "98%", label: "Client Satisfaction" },
          { num: "3-7 Days", label: "Avg. Delivery" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{s.num}</div>
              <div className="text-sm text-white/70">{s.label}</div>
            </div>
            {i < 2 && <div className="hidden sm:block h-10 w-px bg-white/20" />}
          </div>
        ))}
      </div>
    </div>

    <a
      href="#proof"
      aria-label="Scroll down"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce-down"
    >
      <ChevronDown className="h-6 w-6" />
    </a>
  </section>
);

export default Hero;
