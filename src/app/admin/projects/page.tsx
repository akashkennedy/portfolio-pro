"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  category: string;
  short_description: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
}

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured: !featured })
        .eq("id", id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Failed to update project");
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ published: !published })
        .eq("id", id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error("Error toggling published:", error);
      alert("Failed to update project");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-text-primary">Projects</h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="Landing page">Landing page</option>
            <option value="Business website">Business website</option>
            <option value="Redesign">Redesign</option>
          </select>
        </div>

        {/* Projects Table */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-surface border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No projects found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      )}
                      {!project.published && (
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{project.short_description}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>{project.category}</span>
                      {project.client_name && <span>• {project.client_name}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title={project.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star className={`w-4 h-4 ${project.featured ? "text-accent fill-current" : "text-text-muted"}`} />
                    </button>
                    <button
                      onClick={() => handleTogglePublished(project.id, project.published)}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title={project.published ? "Unpublish" : "Publish"}
                    >
                      {project.published ? (
                        <Eye className="w-4 h-4 text-text-muted" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-text-muted" />
                      )}
                    </button>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-text-muted" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
