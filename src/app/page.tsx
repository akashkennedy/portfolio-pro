import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import HowItWorks from "@/components/sections/HowItWorks";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Hero Area */}
        <Hero />

        {/* Services / What I offer */}
        <Services />

        {/* Pricing */}
        <Pricing />

        {/* How It Works */}
        <HowItWorks />

        {/* Work / Projects Showcase */}
        <Work />

        {/* Testimonials / Client reviews */}
        <Testimonials />

        {/* Contact form CTAs */}
        <Contact />
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </>
  );
}
