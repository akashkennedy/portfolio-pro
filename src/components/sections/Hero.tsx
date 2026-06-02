"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Zap, Target, Sparkles } from "lucide-react";
import ContactFormModal from "../ui/ContactFormModal";

export default function Hero() {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center py-20"
    >
      <div className="mx-auto grid max-w-7xl w-full grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-bg text-accent text-sm font-semibold mb-6"
          >
            🚀 Helping Local Businesses Build Their Online Presence
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Modern Landing Pages That Help Local Businesses Get More Customers
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-base leading-[1.8] text-text-secondary mb-8"
          >
            Fast, mobile-friendly websites designed to build trust, showcase your services, and turn visitors into paying customers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3.5"
          >
            <motion.button
              onClick={() => setContactFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-all cursor-none shadow-sm"
              data-hover
            >
              Get a Website
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("work")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded border border-border bg-transparent px-6 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
              data-hover
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column - Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end relative"
        >
          {/* Browser Window Mockup */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="relative w-full max-w-md"
          >
            {/* Browser Window */}
            <div className="bg-surface border-2 border-border rounded-lg shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-border rounded-full max-w-xs mx-auto" />
                </div>
              </div>
              {/* Browser Content */}
              <div className="p-6 bg-gradient-to-br from-accent/10 to-accent-bg/30">
                {/* Mock Hero Section */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <div className="h-4 bg-accent/20 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-border/40 rounded w-full mb-2" />
                  <div className="h-3 bg-border/40 rounded w-5/6 mb-4" />
                  <div className="h-8 bg-accent rounded-full w-32" />
                </div>
                {/* Mock Features */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="h-3 bg-border/40 rounded w-full mb-2" />
                      <div className="h-2 bg-border/30 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -left-4 lg:-left-8 bg-surface border border-border rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-[10px] lg:text-xs font-medium text-text-primary">Mobile Optimized</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -top-4 -right-4 lg:-right-8 bg-surface border border-border rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-[10px] lg:text-xs font-medium text-text-primary">Fast Loading</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute -bottom-4 -left-2 lg:-left-4 bg-surface border border-border rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-[10px] lg:text-xs font-medium text-text-primary">Lead Generation</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute -bottom-4 -right-2 lg:-right-4 bg-surface border border-border rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
                <span className="text-[10px] lg:text-xs font-medium text-text-primary">Modern Design</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
    </section>
  );
}
