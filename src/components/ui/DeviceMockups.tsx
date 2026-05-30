"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const websites = [
  {
    id: 1,
    name: "Restaurant Website",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    headline: "RETURN TO 'NORMALCY'",
    subtext: "Experience dining like never before",
    logo: "🍽️",
  },
  {
    id: 2,
    name: "Salon Landing",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    headline: "LIVE IN THE FUTURE",
    subtext: "Beauty reimagined for the modern era",
    logo: "💇",
  },
  {
    id: 3,
    name: "Retail Store",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    headline: "STYLE REDEFINED",
    subtext: "Fashion that speaks your language",
    logo: "🛍️",
  },
  {
    id: 4,
    name: "Gym Website",
    gradient: "from-green-500 via-emerald-500 to-lime-500",
    headline: "TRANSFORM TODAY",
    subtext: "Your fitness journey starts here",
    logo: "💪",
  },
];

export default function DeviceMockups() {
  const [currentWebsite, setCurrentWebsite] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWebsite((prev) => (prev + 1) % websites.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const website = websites[currentWebsite];

  return (
    <div className="flex flex-col items-center justify-center gap-6 relative">
      {/* Laptop Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        {/* Laptop Screen */}
        <div className="relative w-[340px] h-[220px] bg-surface border-2 border-border rounded-t-lg overflow-hidden shadow-xl">
          {/* Website Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWebsite}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className={`absolute inset-0 bg-gradient-to-br ${website.gradient} flex flex-col`}
            >
              {/* Navbar */}
              <div className="h-10 flex items-center justify-between px-4 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
                <div className="text-white text-lg font-bold">{website.logo}</div>
              </div>
              {/* Hero Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-2xl font-bold leading-tight mb-2">
                  {website.headline}
                </h3>
                <p className="text-white/90 text-xs mb-4">{website.subtext}</p>
                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/90 transition-colors">
                  Explore Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Laptop Base */}
        <div className="w-[380px] h-4 bg-surface border-2 border-t-0 border-border rounded-b-lg shadow-xl" />
        {/* Laptop Stand */}
        <div className="w-24 h-2 bg-border/50 rounded-full mx-auto -mt-1" />
      </motion.div>

      {/* Mobile Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative -mt-2"
      >
        {/* Phone Body */}
        <div className="relative w-[150px] h-[300px] bg-surface border-2 border-border rounded-[2rem] overflow-hidden shadow-xl">
          {/* Phone Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-surface border border-border rounded-full z-10" />
          
          {/* Website Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWebsite}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className={`absolute inset-0 bg-gradient-to-br ${website.gradient} flex flex-col pt-10`}
            >
              {/* Navbar */}
              <div className="h-12 flex items-center justify-between px-3 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </div>
                <div className="text-white text-base font-bold">{website.logo}</div>
              </div>
              {/* Hero Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-lg font-bold leading-tight mb-2">
                  {website.headline}
                </h3>
                <p className="text-white/90 text-[10px] mb-3">{website.subtext}</p>
                <button className="bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-semibold hover:bg-white/90 transition-colors">
                  Explore
                </button>
              </div>
              {/* Bottom Nav */}
              <div className="h-12 flex items-center justify-around px-4 bg-black/20 backdrop-blur-sm">
                <div className="w-6 h-6 rounded-full bg-white/30" />
                <div className="w-6 h-6 rounded-full bg-white/30" />
                <div className="w-6 h-6 rounded-full bg-white/30" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Phone Button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-border rounded-full" />
      </motion.div>

      {/* Floating Animation */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute -inset-4 pointer-events-none"
      />
    </div>
  );
}
