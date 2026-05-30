"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section occupies center
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-surface/85 border-b border-border backdrop-blur-sm py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-semibold text-text-primary tracking-tight cursor-none"
          data-hover
        >
          ak.
        </button>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 text-sm font-normal transition-colors duration-200 cursor-none ${
                  isActive ? "text-text-primary font-semibold" : "text-text-muted hover:text-text-secondary"
                }`}
                data-hover
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Toggle & Button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => scrollToSection("contact")}
            className="rounded bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors cursor-none uppercase tracking-wider"
            data-hover
          >
            get a quote
          </button>
        </div>
      </div>
      
      {/* Mobile nav indicator bar for scroll targeting */}
      <div className="md:hidden flex justify-center gap-5 border-t border-border/30 bg-surface/90 py-2 backdrop-blur-sm">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`text-[9px] transition-colors ${
              activeSection === link.id ? "text-accent font-medium" : "text-text-muted"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
