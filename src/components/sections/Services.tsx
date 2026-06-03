"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../ui/ServiceCard";

const services = [
  {
    iconName: "layout",
    name: "Landing pages",
    description:
      "A single, powerful page that tells your story and converts visitors into customers.",
  },
  {
    iconName: "world",
    name: "Business websites",
    description:
      "Multi-page sites with everything your business needs — about, services, contact and more.",
  },
  {
    iconName: "refresh",
    name: "Website redesigns",
    description:
      "Got an old or ugly site? I'll rebuild it clean, fast, and mobile-friendly.",
  },
  {
    iconName: "device-mobile",
    name: "Mobile-first design",
    description:
      "Most customers browse on their phones. Every site I build looks perfect on all screens.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function Services() {
  return (
    <section id="services" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary border-l-4 border-accent pl-4">
            What I Offer
          </h2>
        </div>

        {/* Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ServiceCard
                iconName={service.iconName}
                name={service.name}
                description={service.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
