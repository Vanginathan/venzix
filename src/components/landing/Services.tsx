import { Monitor, ShoppingCart, RefreshCcw, Rocket } from "lucide-react";

const services = [
  { icon: Monitor, title: "Website Design & Development", desc: "A professionally designed website that loads fast, looks great on every device, and is built to convert visitors into clients." },
  { icon: ShoppingCart, title: "E-commerce Stores", desc: "Sell online with a secure storefront, smooth checkout, and integrations for payments, shipping, and inventory." },
  { icon: RefreshCcw, title: "Website Redesign", desc: "Transform a slow, dated site into a modern, mobile-first experience that ranks well and earns trust." },
  { icon: Rocket, title: "Landing Pages", desc: "High-converting single pages for product launches, ads, and lead generation, shipped in days, not weeks." },
];

const Services = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">What we build</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-surface-dark">
          Websites built for the outcomes you actually care about
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, desc }) => (
          <article
            key={title}
            className="group p-6 bg-card border rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-base"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-base">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-surface-dark">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
