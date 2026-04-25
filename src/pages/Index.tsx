import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Proof from "@/components/landing/Proof";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-shell">
    <a
      href="#hero"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md"
    >
      Skip to main content
    </a>
    <main className="px-3 md:px-6 pt-3 md:pt-6">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <div className="bg-white rounded-[28px] mt-3 md:mt-6 overflow-hidden">
        <Proof />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      </div>
    </main>
    <Footer />
  </div>
);

export default Index;
