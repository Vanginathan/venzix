// src/config/site.ts
// Single source of truth for contact details. Import from here — never hardcode numbers elsewhere.
export const SITE = {
  name: "Venzix",
  url: "https://venzix.vercel.app",
  phoneIntl: "917708201511",      // wa.me format: country code + number, no "+"
  phoneTel: "+917708201511",      // tel: links
  phoneDisplay: "+91 77082 01511",
  email: "infovenzix@gmail.com",  // CONFIRM: footer showed both hello@venzix.com and this
  locality: "Chinnasalem, Tamil Nadu 606201",
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(message)}`;