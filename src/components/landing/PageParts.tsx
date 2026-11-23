// src/components/landing/PageParts.tsx
// Shared building blocks for the SEO / lead-gen pages (city, Chennai, cost, case study, legal).
import type { ReactNode } from "react";
import { ChevronDown, Check, MessageCircle } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyBar from "@/components/StickyBar";
import { waLink } from "@/config/site";
import type { Faq } from "@/faqData";
import type { Tier } from "@/pages/costPages/costPageData";

export const btnPrimary =
  "inline-flex h-12 items-center justify-center rounded-pill bg-ink px-6 font-heading text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors";
export const btnOutline =
  "inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-line bg-white px-6 font-heading text-[14px] font-semibold text-ink hover:bg-surface transition-colors";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md font-body text-[14px]"
    >
      Skip to main content
    </a>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
    <WhatsAppButton />
    <StickyBar />
  </div>
);

export const Crumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="font-body text-[13px] text-mute">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <li key={it.label} className="flex items-center gap-2">
          {it.href ? <a href={it.href} className="hover:text-ink">{it.label}</a> : <span aria-current="page" className="text-ink">{it.label}</span>}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export const PageHero = ({
  crumbs, h1, lead, waMessage, children,
}: {
  crumbs: { label: string; href?: string }[];
  h1: string;
  lead: string;
  waMessage: string;
  children?: ReactNode;
}) => (
  <section className="bg-surface pt-28 pb-14 md:pt-36 md:pb-20">
    <div className="container max-w-4xl">
      <Crumbs items={crumbs} />
      <h1 className="mt-6 font-heading text-[34px] font-bold leading-[1.1] text-ink md:text-[52px]">{h1}</h1>
      <p className="mt-5 max-w-2xl font-body text-[17px] leading-relaxed text-body">{lead}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/#contact" className={btnPrimary}>Get a free quote</a>
        <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className={btnOutline}>
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
        </a>
      </div>
      {children}
    </div>
  </section>
);

export const Section = ({ title, intro, children, tone = "white" }: { title: string; intro?: string; children: ReactNode; tone?: "white" | "surface" }) => (
  <section className={`py-14 md:py-20 ${tone === "surface" ? "bg-surface" : "bg-white"}`}>
    <div className="container max-w-4xl">
      <h2 className="font-heading text-[26px] font-bold text-ink md:text-[34px]">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl font-body text-[16px] leading-relaxed text-body">{intro}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

export const CheckList = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3 sm:grid-cols-2">
    {items.map((t) => (
      <li key={t} className="flex gap-3 font-body text-[15px] text-body">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

export const TierGrid = ({ tiers, highlight }: { tiers: Tier[]; highlight?: Tier["name"] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {tiers.map((t) => (
      <div key={t.name} className={`rounded-lg border p-6 ${t.name === highlight ? "border-ink bg-white shadow-sm" : "border-line bg-white"}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-heading text-[18px] font-bold text-ink">{t.name}</h3>
          <span className="font-heading text-[22px] font-bold text-ink">{t.price}</span>
        </div>
        <p className="mt-2 font-body text-[14px] text-mute">{t.bestFor}</p>
        <ul className="mt-4 space-y-1.5 font-body text-[14px] text-body">
          {t.highlights.map((h) => <li key={h}>• {h}</li>)}
        </ul>
        <p className="mt-4 font-body text-[13px] text-mute">Delivery: {t.delivery} · {t.payment}</p>
      </div>
    ))}
  </div>
);

export const LinkList = ({ items }: { items: { href: string; label: string }[] }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((l) => (
      <li key={l.href}>
        <a href={l.href} className="inline-block rounded-pill border border-line bg-white px-4 py-2 font-body text-[14px] text-ink hover:bg-ink hover:text-white transition-colors">
          {l.label}
        </a>
      </li>
    ))}
  </ul>
);

export const ChipList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((l) => (
      <li key={l} className="rounded-pill border border-line bg-white px-4 py-2 font-body text-[14px] text-ink">{l}</li>
    ))}
  </ul>
);

export const FaqList = ({ faqs }: { faqs: Faq[] }) => (
  <div className="divide-y divide-line rounded-lg border border-line bg-white">
    {faqs.map((f) => (
      <details key={f.q} className="group p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-[16px] font-semibold text-ink">
          {f.q}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-body">{f.a}</p>
      </details>
    ))}
  </div>
);

export const CtaBand = ({ title, text, waMessage }: { title: string; text: string; waMessage: string }) => (
  <section className="bg-ink py-16 text-white md:py-20">
    <div className="container max-w-4xl text-center">
      <h2 className="font-heading text-[28px] font-bold md:text-[38px]">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl font-body text-[16px] text-white/70">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="/#contact" className="inline-flex h-12 items-center rounded-pill bg-white px-6 font-heading text-[14px] font-semibold text-ink hover:opacity-90">
          Get a free quote
        </a>
        <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-pill border border-white/30 px-6 font-heading text-[14px] font-semibold text-white hover:bg-white/10">
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
        </a>
      </div>
    </div>
  </section>
);

export const Prose = ({ children }: { children: ReactNode }) => (
  <div className="space-y-4 font-body text-[15px] leading-relaxed text-body [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-ink [&_a]:underline">
    {children}
  </div>
);
