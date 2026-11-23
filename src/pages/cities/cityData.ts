// src/pages/cities/cityData.ts
// One entry = one page at /web-designer-<slug>. Add a city here and it gets a page,
// a sitemap entry and prerendered meta tags automatically.
// EDIT any "localNote" or "businesses" line that doesn't match what you actually know about the area.

export type City = {
  slug: string;
  name: string;
  district: string;
  isHomeBase?: boolean;
  intro: string;
  businesses: string[];
  nearby: string[];
  localNote: string;
};

export const cities: City[] = [
  {
    slug: "chinnasalem",
    name: "Chinnasalem",
    district: "Kallakurichi district",
    isHomeBase: true,
    intro:
      "Venzix is based in Chinnasalem. If you run a shop, clinic, workshop or service business here, you can meet, call or WhatsApp the person who actually builds your website.",
    businesses: ["Shops & retail", "Clinics & medical stores", "Workshops & contractors", "Tutors & coaching centres", "Hotels & restaurants", "Marriage halls"],
    nearby: ["Kallakurichi", "Salem", "Villupuram"],
    localNote:
      "Most Chinnasalem businesses are found through Google Maps and word of mouth. A fast mobile site plus a correct Google Business Profile covers both.",
  },
  {
    slug: "salem",
    name: "Salem",
    district: "Salem district",
    intro:
      "Salem has a large, competitive local market. Customers search on their phones first, so a fast site and a strong Google Business Profile decide who gets the call.",
    businesses: ["Restaurants & cafés", "Clinics & dental practices", "Salons & beauty studios", "Coaching centres", "Interior designers", "Retail & wholesale shops"],
    nearby: ["Namakkal", "Erode", "Chinnasalem"],
    localNote:
      "Searches like \"clinic near me\" or \"best salon in Salem\" are decided on Google Maps results and reviews. We set up the site and the listing together.",
  },
  {
    slug: "villupuram",
    name: "Villupuram",
    district: "Villupuram district",
    intro:
      "Many Villupuram businesses still have no website at all, which makes a clean, fast site an easy way to stand out in local search.",
    businesses: ["Shops & showrooms", "Clinics & labs", "Schools & tuition centres", "Hotels & restaurants", "Contractors & service providers"],
    nearby: ["Kallakurichi", "Chinnasalem", "Salem"],
    localNote:
      "A site with your services, address, photos and a WhatsApp button usually brings more enquiries than another round of printed flyers.",
  },
  {
    slug: "kallakurichi",
    name: "Kallakurichi",
    district: "Kallakurichi district",
    intro:
      "Kallakurichi businesses are close to our base in Chinnasalem, so planning and handover are easy to coordinate.",
    businesses: ["Shops & retail", "Clinics & pharmacies", "Hotels & restaurants", "Tutors & institutes", "Event & marriage halls"],
    nearby: ["Chinnasalem", "Villupuram", "Salem"],
    localNote:
      "We keep sites light so they load quickly on mobile data, which matters in smaller towns where connections vary.",
  },
  {
    slug: "namakkal",
    name: "Namakkal",
    district: "Namakkal district",
    intro:
      "Namakkal's trading and transport businesses often sell to customers outside the town. A clear website makes it easy for them to find you and trust you.",
    businesses: ["Transport & logistics", "Trading & wholesale", "Clinics & hospitals", "Restaurants & lodges", "Manufacturers & workshops"],
    nearby: ["Salem", "Erode", "Chinnasalem"],
    localNote:
      "If customers come from other towns, your site should answer the basics fast: what you do, where you are, how to reach you.",
  },
  {
    slug: "erode",
    name: "Erode",
    district: "Erode district",
    intro:
      "Erode has a strong base of traders and manufacturers. A professional website helps new buyers verify your business before they call.",
    businesses: ["Textile & trading businesses", "Manufacturers", "Clinics & diagnostics", "Restaurants & hotels", "Retail & showrooms"],
    nearby: ["Namakkal", "Salem", "Chinnasalem"],
    localNote:
      "For B2B businesses, a clear catalogue page and a quick enquiry route often matter more than flashy design.",
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
export const cityPath = (slug: string) => `/web-designer-${slug}`;
