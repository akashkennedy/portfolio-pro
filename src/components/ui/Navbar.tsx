"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ContactFormModal from "./ContactFormModal";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "how-it-works", label: "How It Works" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);

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
      setMobileMenuOpen(false);
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
          className="text-base sm:text-lg font-semibold text-text-primary tracking-tight cursor-none"
          data-hover
        >
          ak.
        </button>

        {/* Center: Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 text-xs sm:text-sm font-normal transition-colors duration-200 cursor-none ${
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

        {/* Right: Toggle, Button & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <button
            onClick={() => setContactFormOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors cursor-none uppercase tracking-wider"
            data-hover
          >
            Get a Website
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-border/30 transition-colors cursor-none"
            data-hover
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-text-primary" /> : <Menu className="w-5 h-5 text-text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-border bg-surface/95 backdrop-blur-sm"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors cursor-none ${
                    isActive
                      ? "bg-accent-bg text-accent font-semibold"
                      : "text-text-muted hover:text-text-primary hover:bg-border/30"
                  }`}
                  data-hover
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactFormOpen(true);
              }}
              className="w-full mt-4 rounded bg-accent px-4 py-3 text-xs font-semibold text-white hover:bg-accent-dark transition-colors cursor-none uppercase tracking-wider"
              data-hover
            >
              Get a Website
            </button>
          </div>
        </motion.div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
    </nav>
  );
}
