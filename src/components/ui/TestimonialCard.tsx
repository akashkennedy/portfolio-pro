"use client";

import React from "react";
import type { Testimonial } from "@/hooks/useTestimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Fallback for empty names
  const displayName = testimonial.client_name || "Gym Owner";
  const displayCompany = testimonial.client_company || "Chennai";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const stars = "★".repeat(testimonial.rating);

  return (
    <div
      className="flex flex-col rounded-lg border-[0.5px] border-border bg-surface p-[15px] transition-all duration-200 hover:border-accent/30"
      data-hover
    >
      {/* Quote */}
      <p className="text-sm font-normal italic leading-relaxed text-text-secondary mb-4">
        &ldquo;{testimonial.testimonial_text}&rdquo;
      </p>

      {/* Divider */}
      <hr className="border-t-[0.5px] border-border mb-3" />

      {/* Bottom Profile Details */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          {/* Avatar Circle */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-bg text-[9px] font-medium text-accent-muted border border-accent/10">
            {initials}
          </div>

          {/* Name & Business */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary leading-tight">
              {displayName}
            </span>
            <span className="text-xs font-normal text-text-muted leading-tight">
              {displayCompany}
            </span>
          </div>
        </div>

        {/* Stars */}
        <span className="text-sm font-semibold text-accent select-none">
          {stars}
        </span>
      </div>
    </div>
  );
}
