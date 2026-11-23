// src/components/StickyBar.tsx
// Mobile-only sticky CTA. No fabricated scarcity claims.
import { MessageCircle } from "lucide-react";
import { waLink } from "@/config/site";

const StickyBar = () => (
  <div
    role="complementary"
    aria-label="Quick contact"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:hidden"
  >
    <div className="flex items-center gap-3">
      <a
        href="#contact"
        className="flex h-11 flex-1 items-center justify-center rounded-pill bg-ink font-heading text-[14px] font-semibold text-white"
      >
        Get a Free Quote
      </a>
      <a
        href={waLink("Hi, I'd like to get a free quote for my website.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </a>
    </div>
  </div>
);

export default StickyBar;