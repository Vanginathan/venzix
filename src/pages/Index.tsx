// src/pages/Index.tsx
import Navbar      from "@/components/landing/Navbar";
import Hero        from "@/components/landing/Hero";
import Proof       from "@/components/landing/Proof";
import Services    from "@/components/landing/Services";
import Portfolio   from "@/components/landing/Portfolio";
import Process     from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import Pricing     from "@/components/landing/Pricing";
import FAQ         from "@/components/landing/FAQ";
import Contact     from "@/components/landing/Contact";
import Footer      from "@/components/landing/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyBar   from "@/components/StickyBar";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Accessibility skip link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md font-body text-[14px]"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Proof />
  <Services />
  <Portfolio />
  <Process />
  <Testimonials />
  <Pricing />
  <FAQ />
  <Contact />
</main>

      <Footer />
      <WhatsAppButton />
      <StickyBar />
    </div>
  );
};

export default Index;