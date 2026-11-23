// src/pages/PrivacyPolicy.tsx
// Route: /privacy
// NOTE: general-purpose policy written for this site's actual setup. Have a lawyer review before relying on it.
// EDIT: retention period and any analytics/cookies you add later.
import { SITE } from "@/config/site";
import { privacyMeta, useSeo } from "@/seo";
import { PageShell, Crumbs, Prose } from "@/components/landing/PageParts";

const PrivacyPolicy = () => {
  useSeo(privacyMeta);
  return (
    <PageShell>
      <section className="pt-28 pb-16 md:pt-36">
        <div className="container max-w-3xl">
          <Crumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
          <h1 className="mt-6 font-heading text-[34px] font-bold text-ink md:text-[44px]">Privacy Policy</h1>
          <p className="mt-2 font-body text-[13px] text-mute">Last updated: 23 November 2026</p>
          <div className="mt-8">
            <Prose>
              <p>This policy explains what personal information {SITE.name} ("we", "us") collects through this website, why we collect it, and your choices. We are a web design studio based at {SITE.locality}, India.</p>

              <h2>Information we collect</h2>
              <ul>
                <li><strong>Contact form:</strong> your name, phone number, email address, website (optional), project type, budget (optional) and message.</li>
                <li><strong>WhatsApp, phone and email:</strong> if you contact us this way, we receive the details you share. WhatsApp is operated by Meta and has its own privacy policy.</li>
                <li><strong>Technical data:</strong> our hosting provider may log standard data such as IP address, browser type and pages requested, for security and reliability.</li>
              </ul>

              <h2>How we use it</h2>
              <ul>
                <li>To reply to your enquiry and prepare a quote.</li>
                <li>To manage and follow up on leads and projects.</li>
                <li>To keep the website secure and working.</li>
              </ul>
              <p>We do not sell your personal information and we do not use it for advertising.</p>

              <h2>Where it is stored and who processes it</h2>
              <p>Contact form submissions are stored in a database provided by Supabase. The website is hosted on Vercel. Fonts are loaded from Google Fonts, which means your browser connects to Google when the page loads. These providers process data on our behalf under their own terms and may store data outside India.</p>

              <h2>Cookies and analytics</h2>
              <p>This website does not set advertising cookies. If we add analytics in future, we will update this page.</p>

              <h2>How long we keep it</h2>
              <p>We keep enquiries for as long as needed to respond and manage the relationship, and for record-keeping after a project ends. You can ask us to delete your information at any time.</p>

              <h2>Your rights</h2>
              <p>Under India's Digital Personal Data Protection Act, 2023, you can ask to access, correct or delete your personal data and withdraw consent. Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond within a reasonable time.</p>

              <h2>Children</h2>
              <p>This website is intended for businesses and adults. We do not knowingly collect information from children.</p>

              <h2>Changes</h2>
              <p>We may update this policy and will change the date above when we do.</p>

              <h2>Contact</h2>
              <p>{SITE.name}, {SITE.locality}<br />Phone: <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </Prose>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default PrivacyPolicy;
