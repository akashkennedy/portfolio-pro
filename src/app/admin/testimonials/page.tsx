"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_position: string | null;
  testimonial_text: string;
  rating: number;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export default function AdminTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ featured: !featured })
        .eq("id", id);
      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Failed to update testimonial");
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ published: !published })
        .eq("id", id);
      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error("Error toggling published:", error);
      alert("Failed to update testimonial");
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return (
      testimonial.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.testimonial_text.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
            <h1 className="text-2xl font-semibold text-text-primary">Testimonials</h1>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Testimonials List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-surface border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No testimonials found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">{testimonial.client_name}</h3>
                      {testimonial.featured && (
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      )}
                      {!testimonial.published && (
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    {(testimonial.client_company || testimonial.client_position) && (
                      <p className="text-sm text-text-muted mb-2">
                        {testimonial.client_position}
                        {testimonial.client_position && testimonial.client_company && " • "}
                        {testimonial.client_company}
                      </p>
                    )}
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                      {testimonial.testimonial_text}
                    </p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= testimonial.rating ? "text-yellow-500 fill-current" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeatured(testimonial.id, testimonial.featured)}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title={testimonial.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star className={`w-4 h-4 ${testimonial.featured ? "text-accent fill-current" : "text-text-muted"}`} />
                    </button>
                    <button
                      onClick={() => handleTogglePublished(testimonial.id, testimonial.published)}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title={testimonial.published ? "Unpublish" : "Publish"}
                    >
                      {testimonial.published ? (
                        <Eye className="w-4 h-4 text-text-muted" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-text-muted" />
                      )}
                    </button>
                    <Link
                      href={`/admin/testimonials/${testimonial.id}/edit`}
                      className="p-2 rounded-lg hover:bg-border/30 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-text-muted" />
                    </Link>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
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
