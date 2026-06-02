"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.projectType) newErrors.projectType = "Project type is required";
    if (!formData.budget) newErrors.budget = "Budget range is required";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";
    if (!formData.description.trim()) newErrors.description = "Project description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-surface/95 backdrop-blur-xl rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col border border-border">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-text-primary">Get a Website</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-border/30 transition-colors cursor-none"
                  data-hover
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-surface/80 backdrop-blur-sm">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-text-primary mb-2">Message Sent!</h4>
                    <p className="text-text-secondary">I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors ${
                          errors.name ? "border-red-500" : "border-border"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors ${
                          errors.email ? "border-red-500" : "border-border"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors cursor-pointer ${
                          errors.projectType ? "border-red-500" : "border-border"
                        }`}
                      >
                        <option value="">Select project type</option>
                        <option value="landing-page">Landing Page</option>
                        <option value="business-website">Business Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.projectType && <p className="text-sm text-red-500 mt-1">{errors.projectType}</p>}
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Budget Range (₹) *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors cursor-pointer ${
                          errors.budget ? "border-red-500" : "border-border"
                        }`}
                      >
                        <option value="">Select budget range</option>
                        <option value="5000-10000">₹5,000 - ₹10,000</option>
                        <option value="10000-20000">₹10,000 - ₹20,000</option>
                        <option value="20000-35000">₹20,000 - ₹35,000</option>
                        <option value="35000+">₹35,000+</option>
                      </select>
                      {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget}</p>}
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Timeline *
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors cursor-pointer ${
                          errors.timeline ? "border-red-500" : "border-border"
                        }`}
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="2-4-weeks">2-4 weeks</option>
                        <option value="1-month+">1 month+</option>
                      </select>
                      {errors.timeline && <p className="text-sm text-red-500 mt-1">{errors.timeline}</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Project Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none ${
                          errors.description ? "border-red-500" : "border-border"
                        }`}
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                      />
                      {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors cursor-none disabled:opacity-50 disabled:cursor-not-allowed"
                      data-hover
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
