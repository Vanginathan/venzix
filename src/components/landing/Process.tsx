// src/components/landing/Process.tsx
const steps = [
  {
    n: "01",
    title: "Discovery Call",
    desc: "A 30-minute call to understand your business, goals, and audience. We leave with a clear scope and fixed quote.",
  },
  {
    n: "02",
    title: "Design & Prototype",
    desc: "We design every page in Figma and share a clickable prototype before any code is written.",
  },
  {
    n: "03",
    title: "Develop & Test",
    desc: "We build with React, optimise for speed, and test on real devices. You see weekly previews and approve each step.",
  },
  {
    n: "04",
    title: "Launch & Support",
    desc: "We deploy to Vercel, hand over a CMS walkthrough, and stay with you with free post-launch support.",
  },
];

const Process = () => (
  <section id="process" className="py-24 md:py-32 bg-white">
    <div className="container">
      <div className="max-w-2xl reveal">
        <p className="font-body text-[13px] uppercase tracking-[0.18em] text-mute">How we work</p>
        <h2 className="mt-3 font-heading font-bold text-3xl md:text-[42px] text-ink leading-tight">
          A calm, four-step path from idea to launch.
        </h2>
        <p className="mt-3 font-body text-[15px] text-mute">
          Typically live in under 2 weeks — with you approving every step.
        </p>
      </div>

      <div className="mt-16 relative grid gap-12 md:grid-cols-4">
        <div
          aria-hidden
          className="hidden md:block absolute top-[34px] left-[12%] right-[12%] border-t border-dashed border-line"
        />
        {steps.map((s, i) => (
          <div key={s.n} className="reveal relative" data-stagger={i}>
            <div className="font-display text-[64px] leading-none text-line">{s.n}</div>
            <h3 className="mt-4 font-heading font-bold text-xl text-ink">{s.title}</h3>
            <p className="mt-2 font-body text-[15px] text-mute leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA nudge after process */}
      <div className="reveal mt-16 flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg bg-surface border border-line">
        <div className="flex-1">
          <p className="font-heading font-bold text-[17px] text-ink">
            Ready to start? Most sites go live in under 2 weeks.
          </p>
          <p className="mt-1 font-body text-[14px] text-mute">
            Book a free 30-minute discovery call — no commitment, no sales pitch.
          </p>
        </div>
        <a
          href="#contact"
          className="press shrink-0 inline-flex items-center gap-2 justify-center rounded-pill bg-ink text-white px-6 h-11 font-heading font-semibold text-[13px] hover:bg-primary-hover shadow-[0_4px_14px_hsl(0_0%_0%/0.14)]"
        >
          Book my free call →
        </a>
      </div>
    </div>
  </section>
);

export default Process;