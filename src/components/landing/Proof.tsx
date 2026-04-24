const logos = ["Aroma Cafe", "Lotus Clinic", "Madras Threads", "GreenLeaf NGO", "PixelForge"];

const Proof = () => (
  <section id="proof" className="bg-surface-soft py-8 border-y">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <p className="text-sm text-muted-foreground font-medium md:min-w-fit">
          Trusted by businesses in Chennai
        </p>

        <div className="md:hidden overflow-hidden flex-1">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="text-[15px] font-semibold text-muted-foreground/60">{l}</span>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-around flex-1 gap-8">
          {logos.map((l) => (
            <span key={l} className="text-[15px] font-semibold text-muted-foreground/60">{l}</span>
          ))}
        </div>
      </div>

      <a
        href="https://g.page/devcraftstudio"
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-center gap-2 text-sm hover:text-primary transition-base"
      >
        <span className="font-bold text-primary">G</span>
        <span className="text-yellow-500 tracking-tighter">★★★★★</span>
        <span className="text-muted-foreground">4.9 / 5 from 47 Google Reviews</span>
      </a>
    </div>
  </section>
);

export default Proof;
