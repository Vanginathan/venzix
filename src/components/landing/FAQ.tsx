import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long does it take to build a website?", a: "Most Starter sites launch in 3–5 days. Growth plans take 7–14 days. We'll commit to a hard date in your discovery call." },
  { q: "What does it cost to build a website?", a: "Plans start at ₹24,999 for a 3-page site. Most small businesses fit in our Growth plan at ₹59,999. Custom scope is quoted after a call." },
  { q: "Do you provide hosting and a domain?", a: "Yes. We can set up hosting, domain, and SSL for you, or work with what you already have. Hosting is billed transparently at cost." },
  { q: "Will my site be mobile-friendly and fast?", a: "Every site we build is mobile-first, optimized for Core Web Vitals, and tested on real devices before launch." },
  { q: "Can I update content myself after launch?", a: "Absolutely. We hand over a simple CMS plus a 20-minute training video so your team can update text, images, and blog posts." },
  { q: "Do you help with SEO and Google Business Profile?", a: "Yes. Every site includes on-page SEO basics, Google Search Console setup, and we'll help you optimize your Google Business Profile." },
  { q: "What if I'm not happy with the design?", a: "We include 2 rounds of revisions in every plan. If something is off, we keep iterating until you're genuinely happy." },
];

const FAQ = () => (
  <section id="faq" className="py-20 md:py-28 bg-surface-soft">
    <div className="container max-w-3xl">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
          Questions we get asked most
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-xl px-6 shadow-card">
            <AccordionTrigger className="text-left text-base font-semibold text-surface-dark hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
