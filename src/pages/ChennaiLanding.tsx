// src/pages/ChennaiLanding.tsx
// Route: /web-designer-chennai
import { chennaiFaqs } from "@/faqData";
import { chennaiMeta, useSeo } from "@/seo";
import { tiers, costPages } from "@/pages/costPages/costPageData";
import { cities, cityPath } from "@/pages/cities/cityData";
import { PageShell, PageHero, Section, CheckList, TierGrid, LinkList, ChipList, FaqList, CtaBand } from "@/components/landing/PageParts";

const areas = ["Anna Nagar", "T. Nagar", "Adyar", "Velachery", "OMR / Sholinganallur", "Tambaram", "Porur", "Mylapore", "Guindy", "Ambattur"];
const msg = "Hi, I run a business in Chennai and I'd like a free website quote.";

const ChennaiLanding = () => {
  useSeo(chennaiMeta);
  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Web Designer in Chennai" }]}
        h1="Web Designer in Chennai"
        lead="Fast, SEO-ready websites for Chennai businesses at fixed prices from ₹12,000. We are based in Tamil Nadu and work with Chennai clients by phone, WhatsApp and video call, so you get a senior person on your project without agency overheads."
        waMessage={msg}
      />

      <Section title="Why Chennai businesses choose a small studio" intro="Chennai is crowded. Customers compare options on their phones in seconds, so speed, clarity and trust decide who gets the call.">
        <CheckList
          items={[
            "Fixed price quoted within 24 hours",
            "You work directly with the person building your site",
            "Google Business Profile setup so you show on Maps",
            "Fast mobile pages built for Google's Core Web Vitals",
            "Tamil and English pages on request",
            "You own the site and the source on Custom projects",
          ]}
        />
      </Section>

      <Section title="Packages and pricing" intro="One-time prices in INR including GST. 50% upfront, 50% on launch." tone="surface">
        <TierGrid tiers={tiers} highlight="Growth" />
      </Section>

      <Section title="How it works remotely">
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            ["1. Discovery call", "30 minutes on phone, WhatsApp or video. No commitment."],
            ["2. Fixed quote", "Scope and price in writing within 24 hours."],
            ["3. Design & build", "Preview links to review from your phone or laptop."],
            ["4. Launch & support", "Go live, connect your domain, then support as per package."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-lg border border-line p-5">
              <h3 className="font-heading text-[16px] font-bold text-ink">{t}</h3>
              <p className="mt-2 font-body text-[14px] text-body">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Chennai areas we build for" intro="We work with businesses across the city, including:" tone="surface">
        <ChipList items={areas} />
      </Section>

      <Section title="What does a website cost?">
        <LinkList items={costPages.map((p) => ({ href: `/${p.slug}`, label: `Cost for a ${p.business}` }))} />
      </Section>

      <Section title="Also serving Tamil Nadu" tone="surface">
        <LinkList items={cities.map((c) => ({ href: cityPath(c.slug), label: c.name }))} />
      </Section>

      <Section title="Chennai FAQs">
        <FaqList faqs={chennaiFaqs} />
      </Section>

      <CtaBand title="Get a website quote for your Chennai business" text="Tell us what you do. You get a fixed quote within 24 hours." waMessage={msg} />
    </PageShell>
  );
};

export default ChennaiLanding;
