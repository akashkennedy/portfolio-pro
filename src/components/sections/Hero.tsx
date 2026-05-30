"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [headlineText, setHeadlineText] = useState("");
  const fullHeadline = "Your business deserves a great website";

  // Quick typewriter effect for headline on mount
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setHeadlineText(fullHeadline.slice(0, index + 1));
      index++;
      if (index >= fullHeadline.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] w-full items-center justify-center py-20"
    >
      <div className="mx-auto grid max-w-7xl w-full grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_auto] items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start text-left">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-sm font-semibold uppercase tracking-wider text-accent mb-4"
          >
            WEB DESIGN & DEVELOPMENT
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-text-primary md:text-5xl leading-tight mb-6 min-h-[100px] sm:min-h-0 md:min-h-[120px]"
          >
            Your business deserves <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1">
              a great website
              {/* Underline decoration */}
              <span className="absolute left-0 bottom-[-4px] h-[3px] w-full bg-accent rounded-full opacity-80" />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-base leading-[1.8] text-text-secondary mb-8"
          >
            I help local businesses get online with fast, professional websites
            that bring in customers — not just look good.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3.5 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection("work")}
              className="rounded bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-all cursor-none shadow-sm"
              data-hover
            >
              See my work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded border border-border bg-transparent px-6 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
              data-hover
            >
              Let&apos;s talk
            </button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-10 border-t border-border pt-6 w-full max-w-lg"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent">6+</span>
              <span className="text-sm text-text-muted">Projects Delivered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent">Fast</span>
              <span className="text-sm text-text-muted">Turnaround</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent">100%</span>
              <span className="text-sm text-text-muted">Satisfaction</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          {/* Floating Avatar Container */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex h-24 w-24 items-center justify-center rounded-2xl border border-accent/30 bg-accent-bg shadow-sm"
          >
            <span className="text-[26px] font-medium text-accent tracking-tighter">
              AK
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
