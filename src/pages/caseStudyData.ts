// src/pages/caseStudyData.ts
// One entry = one page at /case-studies/<slug>.
// IMPORTANT: add real numbers to `results` (calls, enquiries, rankings, load time) when you have them.
// The page hides the Results section while `results` is empty, so nothing is invented.

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  imageKey: "tn-fencing" | "velavan" | "velvera";
  liveUrl: string;
  summary: string;
  brief: string;
  built: string[];
  stack?: string[];
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tn-fencing-works",
    title: "TN Fencing Works",
    category: "Local business website",
    imageKey: "tn-fencing",
    liveUrl: "https://tn-fencing-works.vercel.app/",
    summary: "A lead-focused website for a fencing contractor, with city landing pages built for local search.",
    brief: "A fencing business wins work when people searching in their town find a clear service list, proof of work and a fast way to call or WhatsApp. The site was built around that.",
    built: ["Service pages and project gallery", "City landing pages for local search", "On-page SEO and structured data", "Call and WhatsApp buttons on every page", "Fast, mobile-first layout"],
    stack: ["React", "Vite", "Vercel"],
    results: [], // EDIT: e.g. "Ranked on page 1 for 'fencing works Salem' in 6 weeks", "32 enquiries in first month"
  },
  {
    slug: "sri-velavan-thirumana-mahal",
    title: "Sri Velavan Thirumana Mahal",
    category: "Marriage hall website",
    imageKey: "velavan",
    liveUrl: "https://velavan-thirumana-hall.lovable.app/",
    summary: "A website for a marriage hall that puts photos, facilities and the enquiry route first.",
    brief: "Families choosing a marriage hall want to see the space, check capacity and facilities, and contact the owner quickly. The site is organised around those three needs.",
    built: ["Photo gallery of the hall", "Facilities and capacity details", "Location with map", "Enquiry and WhatsApp buttons"],
    results: [], // EDIT
  },
  {
    slug: "velvera-salon",
    title: "Velvéra Salon",
    category: "Beauty & salon website",
    imageKey: "velvera",
    liveUrl: "https://velvera.framer.website/",
    summary: "A clean, image-led website for a salon, designed to turn browsing into bookings.",
    brief: "Salon customers decide on photos and prices. The design keeps imagery large, services clear and the booking route one tap away.",
    built: ["Service and price overview", "Work gallery", "Booking and contact buttons", "Mobile-first layout"],
    results: [], // EDIT
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
