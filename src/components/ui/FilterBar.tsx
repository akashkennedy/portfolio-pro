"use client";

import React from "react";

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const categories = ["All", "Landing page", "Business website", "Redesign"];
const types = ["All", "Single page", "Multi-page"];

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 mb-7 w-full max-w-2xl mx-auto">
      {/* Category Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-muted font-semibold mr-2 tracking-wide uppercase">
          Category:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full border px-4 py-2 text-xs font-normal transition-all duration-200 cursor-none ${
                  isActive
                    ? "border-accent bg-accent-bg text-accent font-semibold"
                    : "border-border bg-transparent text-text-muted hover:text-text-secondary hover:border-border/60"
                }`}
                data-hover
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-muted font-semibold mr-2 tracking-wide uppercase">
          Type:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {types.map((t) => {
            const isActive = selectedType === t;
            return (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`rounded-full border px-4 py-2 text-xs font-normal transition-all duration-200 cursor-none ${
                  isActive
                    ? "border-accent bg-accent-bg text-accent font-semibold"
                    : "border-border bg-transparent text-text-muted hover:text-text-secondary hover:border-border/60"
                }`}
                data-hover
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
