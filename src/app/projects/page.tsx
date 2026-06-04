"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "@/components/ui/ProjectCard";
import dynamic from "next/dynamic";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Dynamically import modal to reduce initial bundle size
const ProjectModal = dynamic(() => import("@/components/ui/ProjectModal"), {
  ssr: false,
  loading: () => null,
});

export default function ProjectsPage() {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProject, setSelectedProject] = useState<{ title: string; liveUrl: string } | null>(null);

  // Filters logic: both must match (AND condition) unless "All" is active
  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === "All" || project.category === selectedCategory;
    const typeMatch =
      selectedType === "All" || project.category === selectedType;
    const searchMatch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleProjectClick = (project: { title: string; project_url: string | null }) => {
    if (project.project_url) {
      setSelectedProject({ title: project.title, liveUrl: project.project_url });
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-border/10 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6 cursor-none"
            data-hover
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-semibold text-text-primary mb-4">All Projects</h1>
          <p className="text-base text-text-secondary">
            Browse through my portfolio of web development projects
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Unified Filter Bar */}
        <div className="mb-6 p-4 rounded-lg border border-border bg-surface">
          <div className="flex flex-col gap-4">
            {/* Search and Sort Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors cursor-pointer text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="featured">Featured First</option>
              </select>
            </div>

            {/* Filter Bar - Inline */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category */}
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <span className="text-xs text-text-muted font-semibold mr-2 tracking-wide uppercase whitespace-nowrap">
                  Category:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Landing page", "Business website", "Redesign"].map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-normal transition-all duration-200 cursor-none ${
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

              {/* Type */}
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <span className="text-xs text-text-muted font-semibold mr-2 tracking-wide uppercase whitespace-nowrap">
                  Type:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Single page", "Multi-page"].map((t) => {
                    const isActive = selectedType === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedType(t)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-normal transition-all duration-200 cursor-none ${
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-text-muted">
          Showing {sortedProjects.length} project{sortedProjects.length !== 1 ? "s" : ""}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ProjectCard 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <span className="text-sm text-text-muted">
              No projects match your search or filters.
            </span>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </div>
  );
}
