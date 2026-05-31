"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FolderOpen, Star, FileText, MessageSquare, LayoutDashboard, LogOut, Folder, MessageSquare as TestimonialsIcon, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    publishedProjects: 0,
    totalTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, testimonialsRes] = await Promise.all([
        supabase.from("projects").select("*"),
        supabase.from("testimonials").select("*"),
      ]);

      if (projectsRes.data) {
        const projects = projectsRes.data;
        setStats({
          totalProjects: projects.length,
          featuredProjects: projects.filter((p) => p.featured).length,
          publishedProjects: projects.filter((p) => p.published).length,
          totalTestimonials: testimonialsRes.data?.length || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Featured Projects",
      value: stats.featuredProjects,
      icon: Star,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      title: "Published Projects",
      value: stats.publishedProjects,
      icon: FileText,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-text-primary">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent font-medium"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-border/30 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Folder className="w-4 h-4" />
            Projects
          </Link>
          <Link
            href="/admin/testimonials"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-border/30 text-text-secondary hover:text-text-primary transition-colors"
          >
            <TestimonialsIcon className="w-4 h-4" />
            Testimonials
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-border/30 text-text-secondary hover:text-text-primary transition-colors"
          >
            <SettingsIcon className="w-4 h-4" />
            Settings
          </Link>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-surface border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-2">{card.value}</h3>
                <p className="text-sm text-text-secondary">{card.title}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <Link
              href="/admin/projects/new"
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
            >
              Add New Project
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="px-4 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
            >
              Add New Testimonial
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
