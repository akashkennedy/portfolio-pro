"use client";

import { useEffect, useState } from "react";
import { Testimonial, staticTestimonials } from "@/data/testimonials";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  const refreshTestimonials = () => {
    if (typeof window === "undefined") return;

    try {
      const localData = localStorage.getItem("admin_testimonials");
      if (localData) {
        const parsed: Testimonial[] = JSON.parse(localData);
        
        const staticIds = new Set(staticTestimonials.map((t) => t.id));
        const customTestimonials = parsed.filter((t) => !staticIds.has(t.id));
        
        const editedStaticTestimonials = staticTestimonials.map((staticTest) => {
          const edited = parsed.find((t) => t.id === staticTest.id);
          return edited || staticTest;
        });

        setTestimonials([...editedStaticTestimonials, ...customTestimonials]);
      } else {
        setTestimonials(staticTestimonials);
      }
    } catch (e) {
      console.error("Failed to parse admin_testimonials from localStorage", e);
      setTestimonials(staticTestimonials);
    }
  };

  useEffect(() => {
    refreshTestimonials();

    window.addEventListener("storage", refreshTestimonials);
    window.addEventListener("testimonialsUpdated", refreshTestimonials);

    return () => {
      window.removeEventListener("storage", refreshTestimonials);
      window.removeEventListener("testimonialsUpdated", refreshTestimonials);
    };
  }, []);

  return { testimonials, refreshTestimonials };
}
