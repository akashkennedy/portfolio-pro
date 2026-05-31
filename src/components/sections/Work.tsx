"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModal";
import Link from "next/link";

export default function Work() {
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<{ title: string; liveUrl: string } | null>(null);

  // Show only first 4 projects
  const displayedProjects = projects.slice(0, 4);

  const handleProjectClick = (project: { title: string; project_url: string | null }) => {
    if (project.project_url) {
      setSelectedProject({ title: project.title, liveUrl: project.project_url });
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="work" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-semibold text-text-primary">Recent Work</h2>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[300px]"
        >
          {loading ? (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-surface border border-border rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
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
              {displayedProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <span className="text-[11px] text-text-muted">
                    No projects available.
                  </span>
                </motion.div>
              )}

              {/* Show More Button */}
              {projects.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex justify-center mt-8"
                >
                  <Link
                    href="/projects"
                    className="rounded border border-border bg-transparent px-6 py-3 text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-all cursor-none inline-block"
                    data-hover
                  >
                    View All Projects
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </section>
  );
}
