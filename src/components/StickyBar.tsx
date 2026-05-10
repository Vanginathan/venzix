import { useEffect, useState } from "react";
import { X } from "lucide-react";

const MONTH = new Date().toLocaleString("en-IN", { month: "long" });

const StickyBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sticky-bar-dismissed") === "1") {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("sticky-bar-dismissed", "1");
  };

  if (dismissed || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Limited availability notice"
      className="fixed bottom-0 inset-x-0 z-40 md:bottom-6 md:left-1/2 md:-translate-x-1/2"
    >
      <div className="md:rounded-pill bg-ink text-white flex items-center justify-between gap-4 px-5 py-3.5 md:px-6 shadow-xl">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
        </span>

        <p className="font-body text-[13px] text-white/90 whitespace-nowrap">
          <strong className="text-white">4 slots left</strong> for {MONTH} —
          book yours before they're gone
        </p>

        <a
          href="#contact"
          className="shrink-0 rounded-pill bg-white text-ink px-4 h-8 font-heading font-semibold text-[12px] inline-flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          Book now →
        </a>

        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-white/50 hover:text-white transition-colors ml-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyBar;