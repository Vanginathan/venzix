// src/faqData.ts
// Single source for every FAQ on the site (used on the page AND in FAQPage JSON-LD).
// Keep answers factual and consistent with Pricing.tsx.
import type { City } from "./pages/cities/cityData";
import { getTier, tiers } from "./pages/costPages/costPageData";

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "How long does a website take to build?",
    a: "Starter sites go live in about 4–6 days and Growth sites in 7–12 days. Pro projects take 14–21 days. You get a committed launch date on the discovery call. Timelines assume we receive your photos and content on time.",
  },
  {
    q: "What is included in every project?",
    a: "Mobile-first design, on-page SEO (titles, descriptions, headings), a WhatsApp button, a contact form, and Vercel hosting. Growth and above add a CMS so you can edit your own content. Details for each package are in the pricing section.",
  },
  {
    q: "Do you handle SEO?",
    a: "Yes. Every site ships with on-page SEO. Growth adds local SEO with schema markup, Google Analytics and Search Console setup. Pro adds an XML sitemap and advanced local SEO.",
  },
  {
    q: "Can you manage my Google Business Profile?",
    a: "Google Business Profile setup is included from the Starter package. It helps customers find you on Google Maps and contact you directly.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call or message us on WhatsApp. We discuss your goals, review your current site if you have one, and send a fixed quote within 24 hours. There is no commitment to get the quote.",
  },
  {
    q: "Do you only work with businesses in your town?",
    a: "We are based in Chinnasalem and work with businesses across Tamil Nadu, including Salem, Villupuram, Kallakurichi, Namakkal, Erode and Chennai. Meetings happen by phone, WhatsApp or video call.",
  },
  {
    q: "What technology do you use?",
    a: "We choose tools to fit the project. Most sites are built with React and hosted on Vercel, which keeps them fast and secure. You can ask for the source code handover on Custom projects.",
  },
  {
    q: "How does payment work?",
    a: "Packages are one-time prices in INR including GST. Payment is 50% upfront and 50% on launch. Custom projects use milestone-based payments. We accept UPI and bank transfer.",
  },
];

export const chennaiFaqs: Faq[] = [
  {
    q: "Do you work with businesses in Chennai?",
    a: "Yes. We are based in Tamil Nadu and build websites for Chennai businesses remotely. Discovery, design reviews and handover happen by phone, WhatsApp and video call.",
  },
  {
    q: "How much does a website cost in Chennai?",
    a: `Our packages start at ${getTier("Starter").price} (Starter), ${getTier("Growth").price} (Growth) and ${getTier("Pro").price} (Pro, with online store or booking). Custom projects start from ${getTier("Custom").price}. Prices are the same for Chennai and the rest of Tamil Nadu.`,
  },
  {
    q: "Will my site rank for Chennai searches?",
    a: "We build the foundations: fast pages, proper titles and headings, schema markup and a matched Google Business Profile. Rankings depend on competition and ongoing content, so we do not promise a position.",
  },
  {
    q: "How long does it take?",
    a: "Starter sites take about 4–6 days, Growth 7–12 days and Pro 14–21 days, once we have your content.",
  },
  {
    q: "Can you work in Tamil and English?",
    a: "Yes. We can build bilingual pages. Multi-language sites beyond two languages are quoted as Custom projects.",
  },
];

export const cityFaqs = (c: City): Faq[] => [
  {
    q: `How much does a website cost in ${c.name}?`,
    a: `Packages start at ${getTier("Starter").price} for a clean five-page site and ${getTier("Growth").price} for a full local-SEO site with CMS. Pro (${getTier("Pro").price}) adds an online store or booking. All prices are one-time, in INR including GST.`,
  },
  {
    q: `How long does a website for a ${c.name} business take?`,
    a: "Starter takes about 4–6 days and Growth about 7–12 days after we receive your photos and content.",
  },
  {
    q: `Do you set up Google Business Profile for ${c.name} businesses?`,
    a: "Yes. Google Business Profile setup is included from the Starter package so customers can find you on Google Maps.",
  },
  {
    q: "Do I need to buy a domain?",
    a: "You buy the domain in your own name and we connect it for free. Hosting on Vercel is included in the package.",
  },
  {
    q: "How do we talk during the project?",
    a: `We use phone, WhatsApp and video calls, and share previews by link. ${c.isHomeBase ? "As we are based in Chinnasalem, in-person meetings are easy to arrange." : "On-site meetings can be arranged where it makes sense."}`,
  },
];

export const costFaqs = (business?: string, tierName?: "Starter" | "Growth" | "Pro" | "Custom"): Faq[] => {
  const t = tierName ? getTier(tierName) : undefined;
  const subject = business ? `a ${business}` : "a business";
  return [
    {
      q: `How much does a website for ${subject} cost in Tamil Nadu?`,
      a: t
        ? `For most ${business}s we recommend the ${t.name} package at ${t.price}, one-time. Packages range from ${tiers[0].price} to ${tiers[3].price} depending on pages, features and online selling or booking.`
        : `Our packages range from ${tiers[0].price} (Starter) to ${tiers[3].price} (Custom). Most local businesses choose Starter at ${tiers[0].price} or Growth at ${getTier("Growth").price}.`,
    },
    {
      q: "Are there any hidden or recurring charges?",
      a: "The package price is one-time with no hidden fees. You pay for your own domain name (about a yearly renewal with your registrar). Hosting on Vercel is included in the package; support periods differ by package.",
    },
    {
      q: "How does payment work?",
      a: "50% upfront and 50% on launch. Custom projects are paid by milestones. We accept UPI and bank transfer.",
    },
    {
      q: "What can raise the price?",
      a: "Online payments, an admin dashboard, booking systems, multiple languages or locations, and custom features. These are covered in Pro or quoted as Custom.",
    },
  ];
};
