const steps = [
  { n: "01", title: "Discovery Call", desc: "A 30-minute call to understand your business, goals, and audience. We leave with a clear scope and timeline." },
  { n: "02", title: "Design & Prototype", desc: "We design every page in Figma and walk you through a clickable prototype before a single line of code is written." },
  { n: "03", title: "Build & Test", desc: "We build the site, optimise for speed, and test on real devices. You see weekly previews and approve every step." },
  { n: "04", title: "Launch & Optimise", desc: "We deploy, hand over a CMS training video, and stay with you for 30 days of free post-launch support." },
];

/**
 * Process — editorial 4-step flow.
 * Large serif numbers, dashed connector line on desktop.
 */
const Process = () => (
  <section id="process" className="py-24 md:py-32 bg-white">
    <div className="container">
      <div className="max-w-2xl">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">How we work</p>
        <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
          A calm, four-step path from idea to launch.
        </h2>
      </div>

      <div className="mt-16 relative grid gap-12 md:grid-cols-4">
        <div
          aria-hidden
          className="hidden md:block absolute top-[34px] left-[12%] right-[12%] border-t border-dashed border-line"
        />
        {steps.map((s) => (
          <div key={s.n} className="relative">
            <div className="font-display text-[64px] leading-none text-line">{s.n}</div>
            <h3 className="mt-4 font-heading font-bold text-xl text-ink">{s.title}</h3>
            <p className="mt-2 font-body text-[15px] text-mute leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;