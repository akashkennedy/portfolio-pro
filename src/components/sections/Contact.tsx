"use client";

import React from "react";
import { MessageCircle, Camera, Mail } from "lucide-react";

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
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-md mx-auto">
          {/* WhatsApp Outline Button */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border bg-transparent px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
            data-hover
          >
            <MessageCircle className="h-4 w-4 text-accent" />
            WhatsApp
          </a>

          {/* Instagram Outline Button */}
          <a
            href="https://instagram.com/akashkennedy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-border bg-transparent px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none"
            data-hover
          >
            <Camera className="h-4 w-4 text-accent" />
            Instagram
          </a>

          {/* Email Me Button (Filled) */}
          <a
            href="mailto:akashkennedy@email.com"
            className="flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-all cursor-none shadow-sm"
            data-hover
          >
            <Mail className="h-4 w-4" />
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
