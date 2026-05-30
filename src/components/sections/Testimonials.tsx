"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialCard from "../ui/TestimonialCard";

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

export default function Testimonials() {
  const { testimonials } = useTestimonials();

  return (
    <section id="testimonials" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-semibold text-text-primary">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-3.5 md:grid-cols-2"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
