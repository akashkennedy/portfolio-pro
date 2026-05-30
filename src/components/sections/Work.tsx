"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import FilterBar from "../ui/FilterBar";
import ProjectCard from "../ui/ProjectCard";

export default function Work() {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Filters logic: both must match (AND condition) unless "All" is active
  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === "All" || project.category === selectedCategory;
    const typeMatch =
      selectedType === "All" || project.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <section id="work" className="w-full py-16 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-semibold text-text-primary">Recent Work</h2>
        </div>

        {/* Filter Bar Component */}
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[300px]"
        >
          <motion.div
            layout
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <span className="text-[11px] text-text-muted">
                No projects match the selected filters.
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
