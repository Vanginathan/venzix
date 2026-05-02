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
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
  <div className="min-h-screen bg-background">
    <a
      href="#hero"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md"
    >
      Skip to main content
    </a>
    <Navbar />
    <main>
      <Hero />
      <div className="reveal"><Proof /></div>
      <div className="reveal"><Services /></div>
      <div className="reveal"><Portfolio /></div>
      <div className="reveal"><Process /></div>
      <div className="reveal"><Testimonials /></div>
      <div className="reveal"><Pricing /></div>
      <div className="reveal"><FAQ /></div>
      <div className="reveal"><Contact /></div>
    </main>
    <Footer />
  </div>
  );
};

export default Index;
