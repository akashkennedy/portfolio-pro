"use client";

import React from "react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="flex flex-col rounded-lg border-[0.5px] border-border bg-surface p-[15px] transition-all duration-200 hover:border-accent/30"
      data-hover
    >
      {/* Quote */}
      <p className="text-sm font-normal italic leading-relaxed text-text-secondary mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Divider */}
      <hr className="border-t-[0.5px] border-border mb-3" />

      {/* Bottom Profile Details */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          {/* Avatar Circle */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-bg text-[9px] font-medium text-accent-muted border border-accent/10">
            {testimonial.initials}
          </div>
          
          {/* Name & Business */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary leading-tight">
              {testimonial.name}
            </span>
            <span className="text-xs font-normal text-text-muted leading-tight">
              {testimonial.business}
            </span>
          </div>
        </div>

        {/* Stars */}
        <span className="text-sm font-semibold text-accent select-none">
          ★★★★★
        </span>
      </div>
    </div>
  );
}
