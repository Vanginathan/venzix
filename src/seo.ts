// src/seo.ts
// Single source of truth for page titles, descriptions, JSON-LD and the sitemap.
// Used by: pages (via useSeo) AND scripts/prerender-meta.mjs (build-time meta + sitemap).
// Keep imports RELATIVE here (no "@/") so the build script can bundle this file.
import { useEffect } from "react";
import { SITE } from "./config/site";
import { cities, cityPath, type City } from "./pages/cities/cityData";
import { costPages, COST_HUB_PATH, getTier, type CostPage } from "./pages/costPages/costPageData";
import { caseStudies, type CaseStudy } from "./pages/caseStudyData";
import { chennaiFaqs, cityFaqs, costFaqs } from "./faqData";
import type { Faq } from "./faqData";

type Json = Record<string, unknown>;

export const SITE_URL = SITE.url.replace(/\/$/, "");
export const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
export const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  jsonLd?: Json[];
  noindex?: boolean;
};

/* ---------- JSON-LD builders ---------- */
export const breadcrumbLd = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqLd = (faqs: Faq[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (name: string, description: string, area: string): Json => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: "Web design and development",
  provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE_URL, telephone: SITE.phoneTel },
  areaServed: { "@type": "AdministrativeArea", name: area },
});

/* ---------- Route metadata ---------- */
export const homeMeta: RouteMeta = {
  path: "/",
  title: "Web Designer in Chinnasalem | Venzix — Websites for Local Businesses",
  description:
    "Venzix builds fast, mobile-friendly websites for local shops, clinics and restaurants in Chinnasalem, Salem and across Tamil Nadu. From ₹12,000. Call +91 77082 01511.",
  h1: "Websites for local businesses in Tamil Nadu",
  priority: 1.0,
  changefreq: "weekly",
  jsonLd: [], // homepage JSON-LD lives in index.html (business) and FAQ.tsx (FAQPage)
};

export const chennaiMeta: RouteMeta = {
  path: "/web-designer-chennai",
  title: "Web Designer in Chennai | Websites from ₹12,000 | Venzix",
  description:
    "Fast, SEO-ready websites for Chennai businesses. Fixed prices from ₹12,000, Google Business Profile setup and a WhatsApp button included. Free quote in 24 hours.",
  h1: "Web Designer in Chennai",
  priority: 0.9,
  changefreq: "monthly",
  jsonLd: [
    serviceLd("Web design for Chennai businesses", "Fast, mobile-first, SEO-ready websites for businesses in Chennai.", "Chennai"),
    breadcrumbLd([{ name: "Home", path: "/" }, { name: "Web Designer in Chennai", path: "/web-designer-chennai" }]),
    faqLd(chennaiFaqs),
  ],
};

export const cityMeta = (c: City): RouteMeta => ({
  path: cityPath(c.slug),
  title: `Web Designer in ${c.name} | Websites from ₹12,000 | Venzix`,
  description: `Affordable, fast websites for ${c.name} businesses. Fixed prices from ₹12,000, Google Business Profile and WhatsApp button included. Free quote in 24 hours.`,
  h1: `Web Designer in ${c.name}`,
  priority: c.isHomeBase ? 0.9 : 0.8,
  changefreq: "monthly",
  jsonLd: [
    serviceLd(`Web design in ${c.name}`, `Fast, mobile-first websites for businesses in ${c.name}, ${c.district}.`, c.name),
    breadcrumbLd([{ name: "Home", path: "/" }, { name: `Web Designer in ${c.name}`, path: cityPath(c.slug) }]),
    faqLd(cityFaqs(c)),
  ],
});

export const costHubMeta: RouteMeta = {
  path: COST_HUB_PATH,
  title: "Website Cost in Tamil Nadu (2026): Packages from ₹12,000 | Venzix",
  description:
    "What a website costs in Tamil Nadu: Starter ₹12,000, Growth ₹28,000, Pro ₹55,000, Custom ₹1,00,000+. What's included, what raises the price, and how payment works.",
  h1: "Website cost in Tamil Nadu",
  priority: 0.9,
  changefreq: "monthly",
  jsonLd: [
    breadcrumbLd([{ name: "Home", path: "/" }, { name: "Website cost in Tamil Nadu", path: COST_HUB_PATH }]),
    faqLd(costFaqs()),
  ],
};

export const costPageMeta = (p: CostPage): RouteMeta => {
  const t = getTier(p.recommended);
  const cap = p.business.charAt(0).toUpperCase() + p.business.slice(1);
  return {
    path: `/${p.slug}`,
    title: `Website Cost for a ${cap} in Tamil Nadu (${t.price}) | Venzix`,
    description: `How much does a ${p.business} website cost? Most ${p.plural} choose our ${t.name} package at ${t.price}. See what's included and what raises the price.`,
    h1: `Website cost for a ${p.business}`,
    priority: 0.7,
    changefreq: "monthly",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Website cost", path: COST_HUB_PATH },
        { name: `Cost for a ${p.business}`, path: `/${p.slug}` },
      ]),
      faqLd(costFaqs(p.business, p.recommended)),
    ],
  };
};

export const caseMeta = (c: CaseStudy): RouteMeta => ({
  path: `/case-studies/${c.slug}`,
  title: `${c.title} — ${c.category} | Venzix Case Study`,
  description: c.summary,
  h1: c.title,
  priority: 0.6,
  changefreq: "yearly",
  jsonLd: [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Case studies", path: "/#work" },
      { name: c.title, path: `/case-studies/${c.slug}` },
    ]),
  ],
});

export const privacyMeta: RouteMeta = {
  path: "/privacy",
  title: "Privacy Policy | Venzix",
  description: "How Venzix collects, uses and protects the information you share through this website.",
  h1: "Privacy Policy",
  priority: 0.2,
  changefreq: "yearly",
};

export const termsMeta: RouteMeta = {
  path: "/terms",
  title: "Terms of Service | Venzix",
  description: "Terms for working with Venzix: quotes, payments, delivery, ownership and support.",
  h1: "Terms of Service",
  priority: 0.2,
  changefreq: "yearly",
};

/** Every indexable route. Drives sitemap.xml and prerendered meta tags. */
export const getRouteMeta = (): RouteMeta[] => [
  homeMeta,
  chennaiMeta,
  ...cities.map(cityMeta),
  costHubMeta,
  ...costPages.map(costPageMeta),
  ...caseStudies.map(caseMeta),
  privacyMeta,
  termsMeta,
];

/* ---------- Runtime hook ---------- */
const upsert = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export function useSeo(meta: Pick<RouteMeta, "path" | "title" | "description" | "jsonLd" | "noindex">) {
  const ld = JSON.stringify(meta.jsonLd ?? []);
  useEffect(() => {
    const url = abs(meta.path);
    document.title = meta.title;
    upsert("name", "description", meta.description);
    upsert("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
    upsert("property", "og:title", meta.title);
    upsert("property", "og:description", meta.description);
    upsert("property", "og:url", url);
    upsert("property", "og:image", OG_IMAGE);
    upsert("name", "twitter:title", meta.title);
    upsert("name", "twitter:description", meta.description);
    upsert("name", "twitter:image", OG_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const scripts: HTMLScriptElement[] = (JSON.parse(ld) as Json[]).map((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.pageLd = "1";
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [meta.path, meta.title, meta.description, meta.noindex, ld]);
}
