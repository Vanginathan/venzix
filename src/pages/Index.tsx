import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Proof from "@/components/landing/Proof";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Portfolio from "@/components/landing/Portfolio";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <Proof />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
