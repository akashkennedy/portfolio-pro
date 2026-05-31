"use client";

import React from "react";
import { FileText, Globe, Sparkles, Folder } from "lucide-react";
import type { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Dynamic icon based on category
  const getCategoryIcon = () => {
    switch (project.category) {
      case "Landing page":
        return <FileText className="h-5 w-5 text-accent-muted/80" />;
      case "Business website":
        return <Globe className="h-5 w-5 text-accent-muted/80" />;
      case "Redesign":
        return <Sparkles className="h-5 w-5 text-accent-muted/80" />;
      default:
        return <Folder className="h-5 w-5 text-accent-muted/80" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col overflow-hidden rounded-lg bg-surface transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
        project.featured
          ? "border border-accent-muted/40 shadow-sm"
          : "border-[0.5px] border-border"
      }`}
      data-hover
    >
      {/* Image / Icon Area */}
      <div className="relative h-[200px] w-full overflow-hidden bg-bg-surface-2 flex items-center justify-center">
        {project.project_url ? (
          <iframe
            src={project.project_url}
            title={project.title}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full bg-gradient-to-br from-bg-surface-2 to-accent-bg/40">
            {getCategoryIcon()}
            <span className="text-[9px] text-text-muted">{project.category}</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <span className="absolute top-2.5 right-2.5 rounded-full border border-accent/40 bg-accent-bg px-2 py-0.5 text-[8px] font-medium text-accent-muted">
            Featured
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          {project.title}
        </h3>
        <p className="text-xs font-normal leading-normal text-text-secondary line-clamp-2">
          {project.short_description}
        </p>
      </div>
    </div>
  );
}
