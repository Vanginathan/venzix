import { Button } from "@/components/ui/button";

const steps = [
  { n: "01", title: "Consultation", desc: "A free 30-minute call to understand your business, goals, and audience." },
  { n: "02", title: "Design & Build", desc: "We craft, refine, and develop your site with weekly previews and your feedback." },
  { n: "03", title: "Launch & Support", desc: "We deploy, train you, and stay with you for 30 days of free post-launch support." },
];

const Process = () => (
  <section id="process" className="py-20 md:py-28 bg-surface-soft">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
          A simple three-step path to launch
        </h2>
      </div>

      <div className="mt-14 relative grid gap-10 md:grid-cols-3">
        <div className="hidden md:block absolute top-7 left-[16%] right-[16%] border-t-2 border-dashed border-border" aria-hidden />
        {steps.map((s) => (
          <div key={s.n} className="relative text-center">
            <div className="relative z-10 mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-card-hover">
              {s.n}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-surface-dark">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Button asChild size="lg" className="h-12 px-7">
          <a href="#contact">Start Your Project</a>
        </Button>
      </div>
    </div>
  </section>
);

export default Process;
