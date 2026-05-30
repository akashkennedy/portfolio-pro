"use client";

import { useEffect, useState } from "react";
import { Project, staticProjects } from "@/data/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  const refreshProjects = () => {
    if (typeof window === "undefined") return;
    
    try {
      const localData = localStorage.getItem("admin_projects");
      if (localData) {
        const parsed: Project[] = JSON.parse(localData);
        // Merge: Append all local projects that aren't already represented, or merge by ID.
        // We'll keep static ones and append local additions, ensuring unique IDs.
        const staticIds = new Set(staticProjects.map((p) => p.id));
        const customProjects = parsed.filter((p) => !staticIds.has(p.id));
        
        // Also support edits by mapping over static projects if they were edited and stored in local storage
        const editedStaticProjects = staticProjects.map((staticProj) => {
          const edited = parsed.find((p) => p.id === staticProj.id);
          return edited || staticProj;
        });

        setProjects([...editedStaticProjects, ...customProjects]);
      } else {
        setProjects(staticProjects);
      }
    } catch (e) {
      console.error("Failed to parse admin_projects from localStorage", e);
      setProjects(staticProjects);
    }
  };

  useEffect(() => {
    refreshProjects();

    // Listen to storage changes from admin panel
    window.addEventListener("storage", refreshProjects);
    // Custom event to support refresh within the same tab (e.g. from the admin dashboard)
    window.addEventListener("projectsUpdated", refreshProjects);

    return () => {
      window.removeEventListener("storage", refreshProjects);
      window.removeEventListener("projectsUpdated", refreshProjects);
    };
  }, []);

  return { projects, refreshProjects };
}
