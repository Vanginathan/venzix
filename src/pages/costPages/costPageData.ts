// src/pages/costPages/costPageData.ts
// Tier data mirrors src/components/landing/Pricing.tsx. If you change prices there, change them here.
// One costPages entry = one page at /<slug>.

export type Tier = {
  name: "Starter" | "Growth" | "Pro" | "Custom";
  price: string;
  delivery: string;
  payment: string;
  bestFor: string;
  highlights: string[];
};

export const tiers: Tier[] = [
  {
    name: "Starter",
    price: "₹12,000",
    delivery: "4–6 days",
    payment: "₹6,000 now · ₹6,000 on launch",
    bestFor: "Local shops, tutors and solo professionals who need a clean online presence fast.",
    highlights: ["Up to 5 pages", "Mobile-first design", "Google Business Profile setup", "WhatsApp chat button", "Contact form with email alerts", "On-page SEO", "1 month free support"],
  },
  {
    name: "Growth",
    price: "₹28,000",
    delivery: "7–12 days",
    payment: "₹14,000 now · ₹14,000 on launch",
    bestFor: "Restaurants, clinics, salons, coaching centres and service businesses that want regular leads.",
    highlights: ["Up to 12 pages + blog", "CMS to edit your own content", "Local SEO with schema", "Google Maps + Reviews widget", "Analytics + Search Console", "3 months free support"],
  },
  {
    name: "Pro",
    price: "₹55,000",
    delivery: "14–21 days",
    payment: "₹27,500 now · ₹27,500 on launch",
    bestFor: "Established businesses and shops that want to sell or take bookings online.",
    highlights: ["Full e-commerce store", "Razorpay + UPI + COD", "Admin dashboard for orders", "Online booking system", "Order emails & SMS", "6 months free support"],
  },
  {
    name: "Custom",
    price: "₹1,00,000+",
    delivery: "Set on discovery call",
    payment: "Milestone-based",
    bestFor: "Web apps, multi-location sites and projects needing integrations or custom logic.",
    highlights: ["Custom web application", "Third-party API integrations", "Role-based admin panel", "Milestone tracking", "Full source code handover"],
  },
];

export const getTier = (name: Tier["name"]) => tiers.find((t) => t.name === name)!;

export type CostPage = {
  slug: string;
  business: string;      // singular, e.g. "clinic"
  plural: string;
  recommended: Tier["name"];
  why: string;
  mustHave: string[];
  raisesCost: string[];
  tips: string[];
};

export const costPages: CostPage[] = [
  {
    slug: "website-cost-for-clinic",
    business: "clinic",
    plural: "clinics",
    recommended: "Growth",
    why: "A clinic needs service pages, doctor details, a map and reviews so new patients can trust and reach you. That is what the Growth package is built for.",
    mustHave: ["Pages for each service or treatment", "Doctor profiles, timings and address", "Google Maps and Google Reviews on the site", "Click-to-call and WhatsApp buttons", "Local SEO so you show up for \"clinic near me\" searches", "Google Business Profile that matches the website"],
    raisesCost: ["Online appointment booking (Pro package)", "Patient portal or login areas (Custom quote)", "Multiple branches or languages (Custom quote)"],
    tips: ["Use real photos of your clinic and team.", "Keep timings and phone number identical on the site and Google.", "Start with call and WhatsApp booking; add online booking once you see demand."],
  },
  {
    slug: "website-cost-for-restaurant",
    business: "restaurant",
    plural: "restaurants",
    recommended: "Growth",
    why: "Restaurants win on photos, menu clarity and Google Maps visibility. Growth covers menu pages, maps, reviews and social feeds.",
    mustHave: ["Readable mobile menu", "Photo gallery", "Google Maps embed and reviews", "Instagram feed", "WhatsApp or call button for table enquiries", "Opening hours and address in schema for Google"],
    raisesCost: ["Online ordering with payments (Pro package)", "Table booking system (Pro package)", "Multiple outlets (Custom quote)"],
    tips: ["Upload the menu as text, not only as a PDF image, so Google can read it.", "Keep dish photos consistent in style and size.", "Ask happy customers for Google reviews and show them on the site."],
  },
  {
    slug: "website-cost-for-salon",
    business: "salon",
    plural: "salons",
    recommended: "Growth",
    why: "Salons need a strong gallery, a clear price list and easy booking. A Starter site works for a small single-location studio; Growth adds a blog, reviews and stronger local SEO.",
    mustHave: ["Service and price list", "Before/after or work gallery", "WhatsApp booking button", "Google Maps and reviews", "Instagram feed", "Team or stylist profiles"],
    raisesCost: ["Online appointment booking (Pro package)", "Selling products online (Pro package)", "Multiple branches (Custom quote)"],
    tips: ["Show your best 12–15 photos rather than 100.", "List prices or starting prices to reduce time-wasting enquiries.", "Link the site from your Instagram bio."],
  },
  {
    slug: "website-cost-for-wedding-hall",
    business: "marriage hall",
    plural: "marriage halls",
    recommended: "Starter",
    why: "A hall mainly needs photos, capacity, facilities, location and an enquiry route. Starter's five pages (Home, About, Services, Contact, Gallery) fit this well; move to Growth if you want a blog and stronger SEO.",
    mustHave: ["Photo gallery of halls and events", "Capacity, rooms and facilities", "Google Maps location and directions", "WhatsApp and call buttons", "Enquiry form with date and event type"],
    raisesCost: ["Blog and local SEO content (Growth package)", "Online date availability or booking (Pro package)", "Multiple halls or locations (Custom quote)"],
    tips: ["Add a short video or 360° walkthrough if you have one.", "State parking, AC and catering rules clearly.", "Keep one phone number for enquiries on every page."],
  },
  {
    slug: "website-cost-for-interior-designer",
    business: "interior designer",
    plural: "interior designers",
    recommended: "Growth",
    why: "Interior design is a portfolio business. Growth gives enough pages for project case studies, a blog for search traffic and a CMS so you can add new work yourself.",
    mustHave: ["Project pages with large photos", "Services and process", "Enquiry form", "Google Maps and reviews", "Blog or ideas section for search traffic"],
    raisesCost: ["Large image libraries or 3D walkthroughs", "Client login areas (Custom quote)", "Multiple cities or languages (Custom quote)"],
    tips: ["Photograph finished work well; it is the whole pitch.", "Write short case studies: space, brief, result.", "Add your city to page titles so local searches find you."],
  },
  {
    slug: "website-cost-for-small-shop",
    business: "shop",
    plural: "shops",
    recommended: "Starter",
    why: "A local shop mostly needs to be found, trusted and contacted. Starter covers a clean five-page site, Google Business Profile setup and a WhatsApp button.",
    mustHave: ["Products or categories overview", "Address, timings and map", "WhatsApp and call buttons", "Photo gallery", "Google Business Profile setup"],
    raisesCost: ["Selling online with payments (Pro package)", "Admin dashboard for orders and inventory (Pro package)", "Content editing without a developer (Growth package)"],
    tips: ["Start with a catalogue and WhatsApp orders; move to a store once orders justify it.", "Keep product photos bright and consistent.", "Mention the areas you deliver to."],
  },
];

export const getCostPage = (slug: string) => costPages.find((p) => p.slug === slug);
export const COST_HUB_PATH = "/website-cost-tamil-nadu";
export const COST_UPDATED = "November 2026";
