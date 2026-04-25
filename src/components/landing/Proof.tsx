const logos = [
  "AROMA CAFE",
  "MADRAS THREADS",
  "LOTUS CLINIC",
  "PIXELFORGE",
  "STILLPOINT",
  "MARINA ESTATES",
];

/**
 * Trust bar — greyscale logo strip beneath the hero.
 * Marquee on mobile, static row on desktop.
 */
const Proof = () => (
  <section id="proof" className="py-10 border-y border-line bg-white">
    <div className="container">
      <p className="font-body text-[12px] tracking-[0.18em] uppercase text-mute text-center">
        Trusted by growing businesses across Chennai
      </p>

      <div className="mt-6 hidden md:flex items-center justify-around gap-10">
        {logos.map((l) => (
          <span
            key={l}
            className="font-heading font-bold text-[14px] tracking-widest text-ink/40 grayscale"
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-6 md:hidden overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((l, i) => (
            <span key={i} className="font-heading font-bold text-[13px] tracking-widest text-ink/40">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Proof;