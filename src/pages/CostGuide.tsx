// src/pages/CostGuide.tsx
// <CostGuide />            -> /website-cost-tamil-nadu   (hub)
// <CostGuide slug="..." /> -> /<slug>                    (per-business page, data in costPageData.ts)
import { tiers, getTier, getCostPage, costPages, COST_HUB_PATH, COST_UPDATED } from "@/pages/costPages/costPageData";
import { costFaqs } from "@/faqData";
import { costHubMeta, costPageMeta, useSeo } from "@/seo";
import { PageShell, PageHero, Section, CheckList, TierGrid, LinkList, FaqList, CtaBand } from "@/components/landing/PageParts";
import NotFound from "@/pages/NotFound";

const CostGuide = ({ slug }: { slug?: string }) => {
  const page = slug ? getCostPage(slug) : undefined;
  useSeo(slug ? (page ? costPageMeta(page) : { path: "/404", title: "Page not found | Venzix", description: "", noindex: true }) : costHubMeta);
  if (slug && !page) return <NotFound />;

  /* ---------- Hub ---------- */
  if (!page) {
    const msg = "Hi, I'd like to know the cost of a website for my business.";
    return (
      <PageShell>
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Website cost in Tamil Nadu" }]}
          h1="Website cost in Tamil Nadu"
          lead={`Our packages run from ${tiers[0].price} to ${tiers[3].price}. Prices are one-time, in INR including GST, with no hidden fees. Last updated ${COST_UPDATED}.`}
          waMessage={msg}
        />
        <Section title="Packages" intro="Pick the package that matches what your business needs online today. You can upgrade later." tone="white">
          <TierGrid tiers={tiers} highlight="Growth" />
        </Section>
        <Section title="What decides the price" tone="surface">
          <CheckList
            items={[
              "Number of pages (5 on Starter, up to 12 on Growth)",
              "Content editing yourself (CMS from Growth)",
              "Local SEO depth: schema, Search Console, analytics",
              "Online selling, payments or booking (Pro)",
              "Integrations, multiple languages or locations (Custom)",
              "Support period after launch (1, 3 or 6 months)",
            ]}
          />
        </Section>
        <Section title="Cost by type of business">
          <LinkList items={costPages.map((p) => ({ href: `/${p.slug}`, label: `Website for a ${p.business}` }))} />
        </Section>
        <Section title="Pricing FAQs" tone="surface">
          <FaqList faqs={costFaqs()} />
        </Section>
        <CtaBand title="Get an exact quote" text="Share what you need. You get a fixed quote within 24 hours." waMessage={msg} />
      </PageShell>
    );
  }

  /* ---------- Business-specific page ---------- */
  const t = getTier(page.recommended);
  const cap = page.business.charAt(0).toUpperCase() + page.business.slice(1);
  const msg = `Hi, I run a ${page.business} and I'd like a website quote.`;
  const related = costPages.filter((p) => p.slug !== page.slug);

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Website cost", href: COST_HUB_PATH }, { label: cap }]}
        h1={`Website cost for a ${page.business} in Tamil Nadu`}
        lead={`Most ${page.plural} choose our ${t.name} package at ${t.price} (one-time, incl. GST). ${page.why}`}
        waMessage={msg}
      />
      <Section title={`Recommended for a ${page.business}: ${t.name} — ${t.price}`} tone="white">
        <TierGrid tiers={[t]} highlight={t.name} />
      </Section>
      <Section title={`What a ${page.business} website needs`} tone="surface">
        <CheckList items={page.mustHave} />
      </Section>
      <Section title="What can raise the cost">
        <CheckList items={page.raisesCost} />
      </Section>
      <Section title="Tips before you start" tone="surface">
        <ul className="list-disc space-y-2 pl-5 font-body text-[15px] text-body">
          {page.tips.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Section>
      <Section title="All packages">
        <TierGrid tiers={tiers} highlight={t.name} />
      </Section>
      <Section title="Cost for other businesses" tone="surface">
        <LinkList items={[{ href: COST_HUB_PATH, label: "All pricing" }, ...related.map((p) => ({ href: `/${p.slug}`, label: `Website for a ${p.business}` }))]} />
      </Section>
      <Section title="FAQs">
        <FaqList faqs={costFaqs(page.business, page.recommended)} />
      </Section>
      <CtaBand title={`Get a quote for your ${page.business}`} text="Fixed price in writing within 24 hours." waMessage={msg} />
    </PageShell>
  );
};

export default CostGuide;
