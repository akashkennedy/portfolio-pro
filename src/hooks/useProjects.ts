"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  category: "Landing page" | "Business website" | "Redesign";
  short_description: string;
  technologies: string[];
  project_url: string | null;
  github_url: string | null;
  gallery_images: string[];
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProjects = async () => {
    if (!supabase) {
      console.warn("Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return { projects, loading, refreshProjects };
}
