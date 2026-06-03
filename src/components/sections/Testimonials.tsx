"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialCard from "../ui/TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section id="testimonials" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text-primary border-l-4 border-accent pl-4">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative min-h-[300px]">
          {loading ? (
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 px-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-surface border border-border rounded-lg animate-pulse" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No testimonials available
            </div>
          ) : (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full hover:bg-border/30 transition-colors cursor-none opacity-50 hover:opacity-100"
                data-hover
              >
                <ChevronLeft className="w-5 h-5 text-text-muted" />
              </button>

              {/* Testimonials Grid */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-3.5 md:grid-cols-2 px-8"
              >
                <AnimatePresence mode="wait">
                  {currentTestimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full hover:bg-border/30 transition-colors cursor-none opacity-50 hover:opacity-100"
                data-hover
              >
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </button>

              {/* Page Indicators */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-none ${
                        index === currentIndex ? "bg-accent" : "bg-border/50 hover:bg-border/70"
                      }`}
                      data-hover
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
