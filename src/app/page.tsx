import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

// Dynamically import below-fold sections to reduce initial JavaScript bundle
const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="w-full py-16" />,
});

const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <div className="w-full py-16" />,
});

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <div className="w-full py-16" />,
});

const Work = dynamic(() => import("@/components/sections/Work"), {
  loading: () => <div className="w-full py-16" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="w-full py-16" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="w-full py-16" />,
});

const Chatbot = dynamic(() => import("@/components/ui/Chatbot"), {
  loading: () => null,
});

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

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}
