// src/pages/CityLanding.tsx
// Renders /web-designer-<slug> for every entry in cityData.ts
import { getCity, cities, cityPath } from "@/pages/cities/cityData";
import { costPages, tiers } from "@/pages/costPages/costPageData";
import { cityFaqs } from "@/faqData";
import { cityMeta, useSeo } from "@/seo";
import { PageShell, PageHero, Section, CheckList, TierGrid, LinkList, FaqList, CtaBand } from "@/components/landing/PageParts";
import NotFound from "@/pages/NotFound";

const CityLanding = ({ slug }: { slug: string }) => {
  const city = getCity(slug);
  useSeo(city ? cityMeta(city) : { path: "/404", title: "Page not found | Venzix", description: "", noindex: true });
  if (!city) return <NotFound />;

  const others = cities.filter((c) => c.slug !== city.slug);
  const msg = `Hi, I run a business in ${city.name} and I'd like a free website quote.`;

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: `Web Designer in ${city.name}` }]}
        h1={`Web Designer in ${city.name}`}
        lead={`${city.intro} Packages start at ₹12,000, with Google Business Profile setup and a WhatsApp button included.`}
        waMessage={msg}
      />

      <Section title={`Websites for ${city.name} businesses`} intro={city.localNote}>
        <CheckList items={city.businesses} />
      </Section>

      <Section title="Packages and pricing" intro="One-time prices in INR including GST. 50% upfront, 50% on launch." tone="surface">
        <TierGrid tiers={tiers} highlight="Growth" />
      </Section>

      <Section title="Every site includes">
        <CheckList
          items={[
            "Mobile-first design that loads fast on phones",
            "Google Business Profile setup (from Starter)",
            "WhatsApp and call buttons",
            "On-page SEO: titles, descriptions, headings",
            "Contact form with email alerts",
            "Vercel hosting, always online",
          ]}
        />
      </Section>

      <Section title="What does a website cost?" tone="surface">
        <LinkList items={costPages.map((p) => ({ href: `/${p.slug}`, label: `Cost for a ${p.business}` }))} />
      </Section>

      <Section title="Also serving nearby towns">
        <LinkList items={[...others.map((c) => ({ href: cityPath(c.slug), label: c.name })), { href: "/web-designer-chennai", label: "Chennai" }]} />
      </Section>

      <Section title={`Questions from ${city.name} business owners`} tone="surface">
        <FaqList faqs={cityFaqs(city)} />
      </Section>

      <CtaBand
        title={`Ready for a website in ${city.name}?`}
        text="Tell us about your business. You get a fixed quote within 24 hours, with no commitment."
        waMessage={msg}
      />
    </PageShell>
  );
};

export default CityLanding;
