"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { projectSchema, type ProjectInput } from "@/lib/validations";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ProjectInput>({
    title: "",
    slug: "",
    client_name: "",
    category: "Landing page",
    short_description: "",
    technologies: [],
    project_url: "",
    github_url: "",
    gallery_images: [],
    featured: false,
    published: true,
    display_order: 0,
  });
  const [techInput, setTechInput] = useState("");
  const resolvedParams = use(params);

  useEffect(() => {
    fetchProject();
  }, [resolvedParams.id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          client_name: data.client_name || "",
          category: data.category,
          short_description: data.short_description,
          technologies: data.technologies || [],
          project_url: data.project_url || "",
          github_url: data.github_url || "",
          gallery_images: data.gallery_images || [],
          featured: data.featured,
          published: data.published,
          display_order: data.display_order,
        });
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      router.push("/admin/projects");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData({ ...formData, title: value, slug: generateSlug(value) });
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);

    try {
      // Validate with Zod
      const validatedData = projectSchema.parse(formData);

      const { error } = await supabase
        .from("projects")
        .update(validatedData)
        .eq("id", params.id);

      if (error) throw error;

      router.push("/admin/projects");
    } catch (error: any) {
      if (error.name === "ZodError") {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error updating project:", error);
        alert("Failed to update project");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/projects"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline" /> Projects
            </Link>
            <h1 className="text-2xl font-semibold text-text-primary">Edit Project</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Project title"
                  required
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="project-slug"
                  required
                />
                {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.client_name || ""}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
                  required
                >
                  <option value="Landing page">Landing page</option>
                  <option value="Business website">Business website</option>
                  <option value="Redesign">Redesign</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Short Description *
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Brief description for the project card"
                  required
                />
                {errors.short_description && <p className="text-sm text-red-500 mt-1">{errors.short_description}</p>}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Technologies</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Add technology (e.g., React, Next.js)"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(index)}
                        className="hover:text-accent-dark"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  value={formData.project_url || ""}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://example.com"
                />
                {errors.project_url && <p className="text-sm text-red-500 mt-1">{errors.project_url}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url || ""}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://github.com/username/repo"
                />
                {errors.github_url && <p className="text-sm text-red-500 mt-1">{errors.github_url}</p>}
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Gallery Images (Optional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Gallery Images (comma-separated URLs)
                </label>
                <textarea
                  value={formData.gallery_images?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gallery_images: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-text-secondary">Featured</label>
                  <p className="text-xs text-text-muted">Show this project on the homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    formData.featured ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      formData.featured ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-text-secondary">Published</label>
                  <p className="text-xs text-text-muted">Make this project visible on the public site</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    formData.published ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      formData.published ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/projects"
              className="px-6 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
