// src/components/landing/Footer.tsx
import { Linkedin, Instagram, Dribbble } from "lucide-react";

const Footer = () => (
  <footer id="footer" className="bg-white border-t border-line">
    <div className="container py-16 grid gap-10 md:grid-cols-3">
      <div>
        <div className="font-heading font-bold text-[18px] text-ink">
          Venzix
        </div>
        <p className="mt-4 font-body text-[14px] text-mute max-w-xs leading-relaxed">
          A Chennai web design studio building fast, conversion-focused websites for local businesses and growing startups.
        </p>
        <div className="mt-6 flex gap-2">
          {[
            { I: Linkedin, label: "LinkedIn" },
            { I: Instagram, label: "Instagram" },
            { I: Dribbble, label: "Dribbble" },
          ].map(({ I, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="h-9 w-9 rounded-md border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-base"
            >
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-heading font-bold text-[13px] text-ink uppercase tracking-wider">
          Navigate
        </h4>
        <ul className="mt-4 space-y-2 font-body text-[14px]">
          {[
            ["#services", "Services"],
            ["#work", "Work"],
            ["#process", "Process"],
            ["#pricing", "Pricing"],
            ["#faq", "FAQ"],
            ["#contact", "Contact"],
          ].map(([h, l]) => (
            <li key={h}>
              <a href={h} className="text-body hover:text-ink transition-base">{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-heading font-bold text-[13px] text-ink uppercase tracking-wider">
          Get in touch
        </h4>
        <ul className="mt-4 space-y-2 font-body text-[14px] text-body">
          <li><a href="tel:+919876543210" className="hover:text-ink">+91 98765 43210</a></li>
          <li><a href="mailto:hello@venzix.com" className="hover:text-ink">hello@venzix.com</a></li>
          <li>
            <a
              href="https://www.google.com/maps?q=Anna+Salai,+Chennai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              Anna Salai, Chennai 600002
            </a>
          </li>
          <li>
            <a
              href="https://g.page/venzix"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              View on Google Business
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-line">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-body text-[13px] text-mute">
        <p>© {new Date().getFullYear()} Venzix. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;