"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "We Talk",
    description: "Discovery call or WhatsApp chat to understand your needs and goals",
  },
  {
    icon: Code,
    title: "I Build",
    description: "Design and development of your custom website with regular updates",
  },
  {
    icon: Rocket,
    title: "You Launch",
    description: "Go live with your new website and start attracting customers",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary border-l-4 border-accent pl-4">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-accent-bg flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>

                {/* Connector Line (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
