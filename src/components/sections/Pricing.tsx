"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import modal to reduce initial bundle size
const ContactFormModal = dynamic(() => import("../ui/ContactFormModal"), {
  ssr: false,
  loading: () => null,
});

const pricingTiers = [
  {
    name: "Starter",
    price: "₹5,000",
    description: "Perfect for simple landing pages",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "2 revision rounds",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹15,000",
    description: "Great for small business websites",
    features: [
      "Multi-page website (3-5 pages)",
      "Mobile responsive design",
      "Contact form integration",
      "Advanced SEO setup",
      "Social media integration",
      "3 revision rounds",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹30,000",
    description: "For custom business solutions",
    features: [
      "Custom design & development",
      "Unlimited pages",
      "Mobile responsive design",
      "Advanced SEO & analytics",
      "E-commerce functionality",
      "CMS integration",
      "Priority support",
      "Unlimited revisions",
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function Pricing() {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <section id="pricing" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary border-l-4 border-accent pl-4">
            Pricing
          </h2>
        </div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 ${
                tier.popular
                  ? "border-accent bg-accent-bg/10 shadow-lg"
                  : "border-border bg-surface"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-4">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-text-primary">{tier.price}</span>
                <span className="text-sm text-text-muted ml-1">starting</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => setContactFormOpen(true)}
                className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all cursor-none ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent-dark"
                    : "border border-border text-text-primary hover:border-accent hover:text-accent"
                }`}
                data-hover
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
    </section>
  );
}
