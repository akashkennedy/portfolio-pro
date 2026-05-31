"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations";
import { ArrowLeft, Save, Star } from "lucide-react";
import Link from "next/link";

export default function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TestimonialInput>({
    client_name: "",
    client_company: "",
    client_position: "",
    client_photo: "",
    testimonial_text: "",
    rating: 5,
    featured: false,
    published: true,
  });
  const resolvedParams = use(params);

  useEffect(() => {
    fetchTestimonial();
  }, [resolvedParams.id]);

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          client_name: data.client_name,
          client_company: data.client_company || "",
          client_position: data.client_position || "",
          client_photo: data.client_photo || "",
          testimonial_text: data.testimonial_text,
          rating: data.rating,
          featured: data.featured,
          published: data.published,
        });
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      router.push("/admin/testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);

    try {
      // Validate with Zod
      const validatedData = testimonialSchema.parse(formData);

      const { error } = await supabase
        .from("testimonials")
        .update(validatedData)
        .eq("id", resolvedParams.id);

      if (error) throw error;

      router.push("/admin/testimonials");
    } catch (error: any) {
      if (error.name === "ZodError") {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error updating testimonial:", error);
        alert("Failed to update testimonial");
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
              href="/admin/testimonials"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline" /> Testimonials
            </Link>
            <h1 className="text-2xl font-semibold text-text-primary">Edit Testimonial</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Client name"
                  required
                />
                {errors.client_name && <p className="text-sm text-red-500 mt-1">{errors.client_name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.client_company || ""}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.client_position || ""}
                  onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Job title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={formData.client_photo || ""}
                  onChange={(e) => setFormData({ ...formData, client_photo: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Testimonial</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Testimonial Text *
                </label>
                <textarea
                  value={formData.testimonial_text}
                  onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Client testimonial"
                  required
                />
                {errors.testimonial_text && <p className="text-sm text-red-500 mt-1">{errors.testimonial_text}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? "text-yellow-500 fill-current" : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-text-muted ml-2">{formData.rating}/5</span>
                </div>
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
                  <p className="text-xs text-text-muted">Show this testimonial on the homepage</p>
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
                  <p className="text-xs text-text-muted">Make this testimonial visible on the public site</p>
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/testimonials"
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
