import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

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

        {/* Work / Projects Showcase */}
        <Work />

        {/* Testimonials / Client reviews */}
        <Testimonials />

        {/* Contact form CTAs */}
        <Contact />
      </main>
    </>
  );
}
