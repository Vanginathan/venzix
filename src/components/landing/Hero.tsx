import { useEffect, useState } from "react";

const stats = [
  { num: "60+", label: "Websites delivered" },
  { num: "3–7d", label: "Average launch time" },
  { num: "5+", label: "Years building for SMBs" },
  { num: "98%", label: "Client satisfaction" },
];

const PHONE = "917708201511";
const WA_MSG = encodeURIComponent(
  "Hi, I'd like to get a free quote for my website."
);

const Hero = () => {
  const [flash, setFlash] = useState(false);
  const [progress, setProgress] = useState(0);

  const month = new Date().toLocaleString("en-IN", {
    month: "long",
  });

  useEffect(() => {
    const t1 = setTimeout(() => setFlash(true), 800);
    const t2 = setTimeout(() => setFlash(false), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        const el = document.documentElement;

        const pct =
          (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;

        setProgress(Math.min(pct, 100));
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div
        id="scroll-progress"
        aria-hidden
        style={{
          width: `${progress}%`,
        }}
      />

      <section
        id="hero"
        aria-label="Web design agency Chennai — Venzix"
        className="relative w-full overflow-hidden bg-white"
      >
        {/* Grid Background */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 85%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 85%) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse 70% 75% at 50% 45%,
                rgba(255,255,255,0.97) 0%,
                rgba(255,255,255,0.80) 45%,
                rgba(255,255,255,0.20) 75%,
                rgba(255,255,255,0.00) 100%
              )
            `,
          }}
        />

        {/* Foreground */}
        <div className="relative z-10 px-4 sm:px-6 pt-28 sm:pt-36 md:pt-44 pb-14 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Scarcity Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-amber-200 bg-amber-50 px-4 py-1.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>

              <span
                className={[
                  "font-body text-[12px] font-medium transition-colors duration-300",
                  flash ? "text-amber-700" : "text-amber-600",
                ].join(" ")}
              >
                Only <strong>4 slots left</strong> for {month} —{" "}
                <a
                  href="#contact"
                  className="underline underline-offset-2 hover:text-amber-800"
                >
                  secure yours now
                </a>
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-[clamp(2.4rem,6.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
              The website your
              <br />

              <span className="relative inline-block">
                competitors

                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 300 6"
                  fill="none"
                >
                  <path
                    d="M0 5 Q150 0 300 5"
                    stroke="hsl(38 92% 50%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              wish they had.
            </h1>

            {/* SEO Text */}
            <p className="mx-auto mt-5 max-w-2xl font-body text-[clamp(0.9rem,2.2vw,1.05rem)] leading-relaxed text-body">
              Chinnasalem fastest{" "}
              <strong className="font-semibold text-ink">
                web design &amp; development agency
              </strong>{" "}
              — custom websites and web apps built to rank on Google,
              convert visitors, and launch in{" "}
              <strong className="font-semibold text-ink">
                3–7 days.
              </strong>
            </p>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-1.5"
                >
                  <span className="font-heading text-[1.15rem] font-bold text-ink">
                    {s.num}
                  </span>

                  <span className="font-body text-[12px] text-mute">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-ink px-7 font-heading text-[14px] font-semibold text-white shadow-[0_4px_18px_hsl(0_0%_0%/0.20)] hover:bg-primary-hover hover:shadow-[0_6px_24px_hsl(0_0%_0%/0.28)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Book a free call
              </a>

              <a
                href={`https://wa.me/${PHONE}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-white px-7 font-heading text-[14px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.27-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.36 13.65c-.18.5-.87.92-1.43 1.04-.38.08-.87.14-2.52-.54-2.12-.86-3.49-3.02-3.6-3.16-.1-.14-.84-1.12-.84-2.13 0-1.01.53-1.51.72-1.71.18-.2.4-.25.53-.25h.38c.12 0 .28-.05.44.33.17.4.57 1.39.62 1.49.05.1.08.22.02.35-.07.13-.1.21-.2.33l-.3.35c-.1.1-.2.21-.09.41.12.2.52.86 1.11 1.39.76.68 1.4.89 1.6.99.2.1.31.08.43-.05.12-.13.5-.58.63-.78.13-.2.27-.17.45-.1.18.07 1.16.55 1.36.65.2.1.33.15.38.23.05.09.05.5-.13 1z" />
                </svg>

                WhatsApp us
              </a>
            </div>

            {/* Trust Line */}
            <p className="mt-4 font-body text-[12px] text-mute">
              ✓ Free discovery call · ✓ Fixed quote in 24 hrs · ✓ No
              commitment
            </p>

            {/* Phone */}
            <a
              href="tel:+917708201511"
              className="mt-3 inline-flex items-center gap-1.5 font-body text-[13px] text-mute transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-current"
                aria-hidden
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
              </svg>

              +91 77082 01511
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;