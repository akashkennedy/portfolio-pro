"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_position: string | null;
  client_photo: string | null;
  testimonial_text: string;
  rating: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTestimonials = async () => {
    if (!supabase) {
      console.warn("Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTestimonials();
  }, []);

  return { testimonials, loading, refreshTestimonials };
}
