import { Linkedin, Instagram, Facebook, Dribbble } from "lucide-react";

const Footer = () => (
  <footer id="footer" className="bg-surface-dark text-surface-dark-foreground pt-16 pb-8">
    <div className="container grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="h-3 w-3 rounded-sm bg-primary" />
          DevCraft<span className="text-primary">.</span>
        </div>
        <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
          A Chennai web design studio building fast, conversion-focused websites for local businesses, clinics, and growing startups.
        </p>
        <div className="mt-6 flex gap-3">
          {[Linkedin, Instagram, Facebook, Dribbble].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-md bg-white/5 hover:bg-primary flex items-center justify-center transition-base">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Quick Links</h4>
        <ul className="mt-4 space-y-2 text-sm">
          {[["#services","Services"],["#process","Process"],["#work","Work"],["#pricing","Pricing"],["#faq","FAQ"],["#contact","Contact"]].map(([h,l]) => (
            <li key={h}><a href={h} className="text-white/80 hover:text-white">{l}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Get in touch</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li><a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
          <li><a href="mailto:hello@devcraftstudio.com" className="hover:text-white">hello@devcraftstudio.com</a></li>
          <li><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp us</a></li>
          <li>Anna Salai, Chennai 600002</li>
        </ul>
      </div>
    </div>

    <div className="container mt-12">
      <div className="rounded-xl overflow-hidden border border-white/10 aspect-[16/5]">
        <iframe
          title="DevCraft Studio location"
          src="https://www.google.com/maps?q=Anna+Salai,+Chennai&output=embed"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>

    <div className="container mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
      <p>© {new Date().getFullYear()} DevCraft Studio. All rights reserved.</p>
      <p>Crafted in Chennai · Built to convert.</p>
    </div>
  </footer>
);

export default Footer;
