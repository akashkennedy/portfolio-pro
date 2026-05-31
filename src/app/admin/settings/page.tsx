"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { settingsSchema, type SettingsInput } from "@/lib/validations";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Settings {
  business_name: string;
  email: string;
  phone: string;
  location: string;
  social_links: {
    linkedin: string;
    instagram: string;
    github: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SettingsInput>({
    business_name: "",
    email: "",
    phone: "",
    location: "",
    social_links: {
      linkedin: "",
      instagram: "",
      github: "",
    },
    seo: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("settings").select("*");

      if (error) throw error;

      if (data) {
        const settingsMap = new Map(data.map((s: any) => [s.key, s.value]));
        
        setFormData({
          business_name: settingsMap.get("business_name") || "",
          email: settingsMap.get("email") || "",
          phone: settingsMap.get("phone") || "",
          location: settingsMap.get("location") || "",
          social_links: settingsMap.get("social_links") || {
            linkedin: "",
            instagram: "",
            github: "",
          },
          seo: settingsMap.get("seo") || {
            title: "",
            description: "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
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
      const validatedData = settingsSchema.parse(formData);

      // Update each setting
      const updates = [
        { key: "business_name", value: validatedData.business_name },
        { key: "email", value: validatedData.email },
        { key: "phone", value: validatedData.phone },
        { key: "location", value: validatedData.location },
        { key: "social_links", value: validatedData.social_links },
        { key: "seo", value: validatedData.seo },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("settings")
          .update({ value: update.value })
          .eq("key", update.key);
        
        if (error) throw error;
      }

      alert("Settings saved successfully!");
    } catch (error: any) {
      if (error.name === "ZodError") {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error saving settings:", error);
        alert("Failed to save settings");
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
              href="/admin"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline" /> Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Information */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Business Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Your business name"
                  required
                />
                {errors.business_name && <p className="text-sm text-red-500 mt-1">{errors.business_name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="contact@example.com"
                  required
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.social_links.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social_links: { ...formData.social_links, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://linkedin.com/in/username"
                />
                {errors.social_links && <p className="text-sm text-red-500 mt-1">{errors.social_links}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.social_links.instagram || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social_links: { ...formData.social_links, instagram: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.social_links.github || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social_links: { ...formData.social_links, github: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  SEO Title *
                </label>
                <input
                  type="text"
                  value={formData.seo.title}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: { ...formData.seo, title: e.target.value } })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Portfolio"
                  required
                />
                {errors.seo && <p className="text-sm text-red-500 mt-1">{errors.seo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  SEO Description *
                </label>
                <textarea
                  value={formData.seo.description}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: { ...formData.seo, description: e.target.value } })
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Web Developer Portfolio"
                  required
                />
                {errors.seo && <p className="text-sm text-red-500 mt-1">{errors.seo}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
