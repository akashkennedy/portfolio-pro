"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent/40 transition-all duration-300 focus:outline-none"
      aria-label="Toggle theme"
      data-hover
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5 text-accent" />
      ) : (
        <Sun className="w-5 h-5 text-accent" />
      )}
    </button>
  );
}
