// src/pages/CaseStudy.tsx
// Route: /case-studies/:slug  (data in caseStudyData.ts)
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import wTn from "@/assets/work-tn-fencing.png";
import wVelavan from "@/assets/work-velavan.png";
import wVelvera from "@/assets/work-velvera.png";
import { getCaseStudy, caseStudies } from "@/pages/caseStudyData";
import { caseMeta, useSeo } from "@/seo";
import { PageShell, Crumbs, Section, CheckList, LinkList, CtaBand, btnPrimary } from "@/components/landing/PageParts";
import NotFound from "@/pages/NotFound";

const images = { "tn-fencing": wTn, velavan: wVelavan, velvera: wVelvera } as const;

const CaseStudy = () => {
  const { slug = "" } = useParams();
  const cs = getCaseStudy(slug);
  useSeo(cs ? caseMeta(cs) : { path: "/404", title: "Page not found | Venzix", description: "", noindex: true });
  if (!cs) return <NotFound />;

  const msg = `Hi, I saw the ${cs.title} project and I'd like something similar for my business.`;
  return (
    <PageShell>
      <section className="bg-surface pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container max-w-4xl">
          <Crumbs items={[{ label: "Home", href: "/" }, { label: "Case studies", href: "/#work" }, { label: cs.title }]} />
          <p className="mt-6 font-body text-[13px] font-semibold uppercase tracking-wider text-mute">{cs.category}</p>
          <h1 className="mt-2 font-heading text-[34px] font-bold leading-[1.1] text-ink md:text-[52px]">{cs.title}</h1>
          <p className="mt-5 max-w-2xl font-body text-[17px] leading-relaxed text-body">{cs.summary}</p>
          <div className="mt-8">
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Visit live site <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </div>
          <img
            src={images[cs.imageKey]}
            alt={`${cs.title} website homepage`}
            width={1200}
            height={750}
            loading="eager"
            className="mt-10 w-full rounded-lg border border-line"
          />
        </div>
      </section>

      <Section title="The brief"><p className="max-w-2xl font-body text-[16px] leading-relaxed text-body">{cs.brief}</p></Section>
      <Section title="What we built" tone="surface"><CheckList items={cs.built} /></Section>

      {cs.stack && cs.stack.length > 0 && (
        <Section title="Built with">
          <ul className="flex flex-wrap gap-2">
            {cs.stack.map((s) => <li key={s} className="rounded-pill border border-line px-4 py-2 font-body text-[14px] text-ink">{s}</li>)}
          </ul>
        </Section>
      )}

      {cs.results.length > 0 && (
        <Section title="Results" tone="surface"><CheckList items={cs.results} /></Section>
      )}

      <Section title="More work">
        <LinkList items={caseStudies.filter((c) => c.slug !== cs.slug).map((c) => ({ href: `/case-studies/${c.slug}`, label: c.title }))} />
      </Section>

      <CtaBand title="Want a site like this?" text="Tell us about your business. Fixed quote within 24 hours." waMessage={msg} />
    </PageShell>
  );
};

export default CaseStudy;
