// src/pages/Terms.tsx
// Route: /terms
// NOTE: starting point based on your package terms. Have a lawyer review. EDIT the refund and governing-law lines to match your real policy.
import { SITE } from "@/config/site";
import { termsMeta, useSeo } from "@/seo";
import { PageShell, Crumbs, Prose } from "@/components/landing/PageParts";

const Terms = () => {
  useSeo(termsMeta);
  return (
    <PageShell>
      <section className="pt-28 pb-16 md:pt-36">
        <div className="container max-w-3xl">
          <Crumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
          <h1 className="mt-6 font-heading text-[34px] font-bold text-ink md:text-[44px]">Terms of Service</h1>
          <p className="mt-2 font-body text-[13px] text-mute">Last updated: 23 November 2026</p>
          <div className="mt-8">
            <Prose>
              <p>These terms apply when you hire {SITE.name} to design or build a website. The written quote or proposal we send you forms part of the agreement.</p>

              <h2>1. Scope and quotes</h2>
              <p>We quote a fixed price for an agreed scope (pages and features). Work outside that scope is quoted separately before we start it. Quotes are in INR and include GST unless stated otherwise.</p>

              <h2>2. Payment</h2>
              <p>Starter, Growth and Pro projects are paid 50% before work starts and 50% on launch. Custom projects are paid in milestones set out in the quote. Payment is by UPI or bank transfer. We may pause work if a payment is overdue.</p>

              <h2>3. Timelines</h2>
              <p>Delivery times shown on our website are estimates that start once we have your payment, content and approvals. Delays in receiving photos, text or feedback move the delivery date.</p>

              <h2>4. Your content</h2>
              <p>You confirm you have the right to use the text, images, logos and other material you give us. You are responsible for the accuracy of business information such as prices, timings and contact details.</p>

              <h2>5. Ownership</h2>
              <p>After full payment, you own the final website design and content delivered to you. We may keep our own tools, code libraries and general know-how. We may show the finished site in our portfolio unless you ask us not to.</p>

              <h2>6. Domains, hosting and third-party services</h2>
              <p>You buy and own your domain name. Hosting on Vercel is included in the package for the period stated in the quote. Third-party services (payment gateways, SMS, email, plugins) may have their own fees and terms.</p>

              <h2>7. Support</h2>
              <p>Free support periods depend on the package (for example 1 month on Starter, 3 months on Growth, 6 months on Pro). Support covers fixing defects and small content edits as listed in your package. New features are quoted separately.</p>

              <h2>8. Revisions and cancellation</h2>
              <p>We include reasonable revisions during design and build. If you cancel after work has started, fees for work already completed are payable. Refund terms, if any, are set out in your written quote.</p>

              <h2>9. Results</h2>
              <p>We build sites to be fast and search-friendly, but we cannot guarantee search rankings, traffic or sales, which depend on factors outside our control.</p>

              <h2>10. Liability</h2>
              <p>To the extent permitted by law, our total liability for any claim is limited to the fees you paid for the project, and we are not liable for indirect or consequential losses.</p>

              <h2>11. Governing law</h2>
              <p>These terms are governed by the laws of India. Courts at Salem, Tamil Nadu have jurisdiction, subject to applicable law.</p>

              <h2>12. Contact</h2>
              <p>{SITE.name}, {SITE.locality}<br />Phone: <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </Prose>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Terms;
