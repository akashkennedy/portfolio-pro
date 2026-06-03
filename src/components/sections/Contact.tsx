"use client";

import React from "react";
import { MessageCircle, Camera, Mail, Link } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full bg-surface py-[50px] border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        {/* Headline */}
        <h2 className="text-2xl font-semibold text-text-primary tracking-tight mb-3">
          Ready To Grow Your Business Online?
        </h2>

        {/* Subtext */}
        <p className="text-base font-normal text-text-secondary mb-8">
          Let&apos;s Talk About Your Project. I&apos;ll Get Back To You The Same Day.
        </p>

        {/* Contact Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          {/* WhatsApp Outline Button */}
          <a
            href="https://wa.me/919843491564"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
            data-hover
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            WhatsApp
          </a>

          {/* Instagram Outline Button */}
          <a
            href="https://instagram.com/axash_k"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
            data-hover
            aria-label="View Instagram profile"
          >
            <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            Instagram
          </a>

          {/* LinkedIn Outline Button */}
          <a
            href="https://linkedin.com/in/akashkennedy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
            data-hover
            aria-label="View LinkedIn profile"
          >
            <Link className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            LinkedIn
          </a>

          {/* Email Me Button (Filled) */}
          <a
            href="mailto:akashkennedy1@gmail.com"
            className="flex items-center gap-2 rounded bg-accent px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-accent-dark transition-all cursor-none shadow-sm"
            data-hover
            aria-label="Send email"
          >
            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
