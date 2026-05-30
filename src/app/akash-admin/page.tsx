"use client";

import React, { useState, useEffect } from "react";
import { Project, staticProjects } from "@/data/projects";
import { Testimonial, staticTestimonials } from "@/data/testimonials";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [shake, setShake] = useState(false);
  
  // Data lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Project form state
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projCategory, setProjCategory] = useState<"Landing page" | "Business website" | "Redesign">("Landing page");
  const [projType, setProjType] = useState<"Single page" | "Multi-page">("Single page");
  const [projLiveUrl, setProjLiveUrl] = useState("");
  const [projFeatured, setProjFeatured] = useState(false);

  // Testimonial form state
  const [testQuote, setTestQuote] = useState("");
  const [testName, setTestName] = useState("");
  const [testBusiness, setTestBusiness] = useState("");
  const [testInitials, setTestInitials] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"projects" | "testimonials">("projects");

  useEffect(() => {
    // Check auth
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    if (typeof window === "undefined") return;

    // Load projects
    const localProjects = localStorage.getItem("admin_projects");
    let mergedProjects = [...staticProjects];
    if (localProjects) {
      try {
        const parsed: Project[] = JSON.parse(localProjects);
        const staticIds = new Set(staticProjects.map((p) => p.id));
        const custom = parsed.filter((p) => !staticIds.has(p.id));
        const editedStatic = staticProjects.map((sp) => {
          const edited = parsed.find((p) => p.id === sp.id);
          return edited || sp;
        });
        mergedProjects = [...editedStatic, ...custom];
      } catch (e) {
        console.error(e);
      }
    }
    setProjects(mergedProjects);

    // Load testimonials
    const localTestimonials = localStorage.getItem("admin_testimonials");
    let mergedTestimonials = [...staticTestimonials];
    if (localTestimonials) {
      try {
        const parsed: Testimonial[] = JSON.parse(localTestimonials);
        const staticIds = new Set(staticTestimonials.map((t) => t.id));
        const custom = parsed.filter((t) => !staticIds.has(t.id));
        const editedStatic = staticTestimonials.map((st) => {
          const edited = parsed.find((t) => t.id === st.id);
          return edited || st;
        });
        mergedTestimonials = [...editedStatic, ...custom];
      } catch (e) {
        console.error(e);
      }
    }
    setTestimonials(mergedTestimonials);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError(false);
      loadAllData();
    } else {
      setLoginError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc) return;

    // Generate unique ID
    const nextId = Math.max(0, ...projects.map((p) => p.id)) + 1;
    const newProject: Project = {
      id: nextId,
      title: projTitle,
      description: projDesc,
      image: projImage || "/images/projects/placeholder.png",
      category: projCategory,
      type: projType,
      liveUrl: projLiveUrl || "#",
      featured: projFeatured,
    };

    const updated = [...projects, newProject];
    
    // Save to local storage (only save custom or modified ones)
    const customList = updated.filter(p => !staticProjects.some(sp => sp.id === p.id && JSON.stringify(sp) === JSON.stringify(p)));
    localStorage.setItem("admin_projects", JSON.stringify(updated));
    setProjects(updated);
    
    // Dispatch update event
    window.dispatchEvent(new Event("projectsUpdated"));

    // Reset form
    setProjTitle("");
    setProjDesc("");
    setProjImage("");
    setProjLiveUrl("");
    setProjFeatured(false);
  };

  // Delete Project
  const handleDeleteProject = (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem("admin_projects", JSON.stringify(updated));
    setProjects(updated);
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  // Toggle Featured
  const handleToggleFeatured = (id: number) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    localStorage.setItem("admin_projects", JSON.stringify(updated));
    setProjects(updated);
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  // Add Testimonial
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuote || !testName || !testBusiness) return;

    const nextId = Math.max(0, ...testimonials.map((t) => t.id)) + 1;
    const newTestimonial: Testimonial = {
      id: nextId,
      quote: testQuote,
      name: testName,
      business: testBusiness,
      initials: testInitials || testName.slice(0, 2).toUpperCase(),
    };

    const updated = [...testimonials, newTestimonial];
    localStorage.setItem("admin_testimonials", JSON.stringify(updated));
    setTestimonials(updated);
    window.dispatchEvent(new Event("testimonialsUpdated"));

    // Reset form
    setTestQuote("");
    setTestName("");
    setTestBusiness("");
    setTestInitials("");
  };

  // Delete Testimonial
  const handleDeleteTestimonial = (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const updated = testimonials.filter((t) => t.id !== id);
    localStorage.setItem("admin_testimonials", JSON.stringify(updated));
    setTestimonials(updated);
    window.dispatchEvent(new Event("testimonialsUpdated"));
  };

  // RENDER LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#111016] px-4 font-sans text-[#e0daf5]">
        <div
          className={`w-full max-w-sm rounded-lg border border-[#2a2535] bg-[#18151f] p-6 shadow-xl ${
            shake ? "animate-shake" : ""
          }`}
        >
          <div className="flex flex-col items-center gap-1.5 mb-6 text-center">
            <span className="text-xl font-medium tracking-tight text-accent">ak.admin</span>
            <span className="text-[11px] text-text-secondary">Akash Kennedy Portfolio Panel</span>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3.5 py-2 text-[12px] text-[#e0daf5] placeholder-[#5a5270] focus:border-accent focus:outline-none"
              />
            </div>

            {loginError && (
              <span className="text-[10px] text-red-400 font-medium">
                Incorrect password. Please try again.
              </span>
            )}

            <button
              type="submit"
              className="rounded bg-accent py-2 text-[12px] font-medium text-white hover:bg-accent-dark transition-colors cursor-none"
              data-hover
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER DASHBOARD
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111016] text-[#e0daf5] font-sans">
      {/* Header */}
      <header className="border-b border-[#2a2535] bg-[#18151f] py-4 px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-tight text-accent">ak.admin</span>
            <span className="rounded bg-[#2a2040] border border-accent/20 px-2 py-0.5 text-[8px] font-medium text-accent-muted uppercase">
              Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-red-400 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto flex-1 w-full max-w-5xl p-4 sm:p-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#2a2535] gap-1">
          <button
            onClick={() => setActiveTab("projects")}
            className={`border-b-2 px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === "projects"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`border-b-2 px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === "testimonials"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left Area - Lists */}
          <div className="flex flex-col gap-4 border border-[#2a2535] bg-[#18151f] rounded-lg p-4">
            <h2 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
              Manage {activeTab === "projects" ? "Projects" : "Testimonials"}
            </h2>

            {activeTab === "projects" ? (
              /* Projects Management list */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#2a2535] text-text-muted">
                      <th className="py-2.5">Title</th>
                      <th className="py-2.5">Category</th>
                      <th className="py-2.5 text-center">Featured</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.id} className="border-b border-[#2a2535]/30 hover:bg-[#1e1a2a]/20">
                        <td className="py-3 font-medium text-text-primary">
                          {p.title}
                          {staticProjects.some(sp => sp.id === p.id) && (
                            <span className="ml-1.5 text-[8px] text-text-muted px-1.5 py-0.2 bg-bg-surface-2 rounded">
                              Static
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-text-secondary">{p.category}</td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => handleToggleFeatured(p.id)}
                            className={`text-xs ${p.featured ? "text-yellow-400" : "text-text-muted hover:text-[#e0daf5]"}`}
                          >
                            {p.featured ? "★" : "☆"}
                          </button>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Testimonials Management list */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#2a2535] text-text-muted">
                      <th className="py-2.5">Client Name</th>
                      <th className="py-2.5">Business</th>
                      <th className="py-2.5">Quote excerpt</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((t) => (
                      <tr key={t.id} className="border-b border-[#2a2535]/30 hover:bg-[#1e1a2a]/20">
                        <td className="py-3 font-medium text-text-primary">
                          {t.name}
                          {staticTestimonials.some(st => st.id === t.id) && (
                            <span className="ml-1.5 text-[8px] text-text-muted px-1.5 py-0.2 bg-bg-surface-2 rounded">
                              Static
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-text-secondary">{t.business}</td>
                        <td className="py-3 text-text-muted max-w-[200px] truncate">{t.quote}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Area - Add Forms */}
          <div className="flex flex-col gap-4 border border-[#2a2535] bg-[#18151f] rounded-lg p-4">
            {activeTab === "projects" ? (
              /* Add Project Form */
              <form onSubmit={handleAddProject} className="flex flex-col gap-3.5">
                <h3 className="text-xs font-medium text-text-primary uppercase tracking-wider border-b border-[#2a2535] pb-2">
                  Add New Project
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Title</label>
                  <input
                    type="text"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="e.g. Salon Landing Page"
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Description</label>
                  <textarea
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="Brief description..."
                    rows={3}
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Image URL</label>
                  <input
                    type="text"
                    value={projImage}
                    onChange={(e) => setProjImage(e.target.value)}
                    placeholder="/images/projects/salon.png"
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Category</label>
                    <select
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value as any)}
                      className="rounded border border-[#2a2535] bg-[#1e1a2a] px-2 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                    >
                      <option value="Landing page">Landing page</option>
                      <option value="Business website">Business website</option>
                      <option value="Redesign">Redesign</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Type</label>
                    <select
                      value={projType}
                      onChange={(e) => setProjType(e.target.value as any)}
                      className="rounded border border-[#2a2535] bg-[#1e1a2a] px-2 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                    >
                      <option value="Single page">Single page</option>
                      <option value="Multi-page">Multi-page</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Live URL</label>
                  <input
                    type="text"
                    value={projLiveUrl}
                    onChange={(e) => setProjLiveUrl(e.target.value)}
                    placeholder="#"
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="projFeatured"
                    checked={projFeatured}
                    onChange={(e) => setProjFeatured(e.target.checked)}
                    className="h-3.5 w-3.5 border-[#2a2535] bg-[#1e1a2a] text-accent accent-accent focus:outline-none"
                  />
                  <label htmlFor="projFeatured" className="text-[11px] text-text-secondary font-medium">
                    Feature this project
                  </label>
                </div>

                <button
                  type="submit"
                  className="rounded bg-accent py-2 text-xs font-medium text-white hover:bg-accent-dark transition-colors cursor-none"
                  data-hover
                >
                  Save Project
                </button>
              </form>
            ) : (
              /* Add Testimonial Form */
              <form onSubmit={handleAddTestimonial} className="flex flex-col gap-3.5">
                <h3 className="text-xs font-medium text-text-primary uppercase tracking-wider border-b border-[#2a2535] pb-2">
                  Add Testimonial
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Client Name</label>
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="e.g. Ramesh Babu"
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Business / Location</label>
                  <input
                    type="text"
                    value={testBusiness}
                    onChange={(e) => setTestBusiness(e.target.value)}
                    placeholder="e.g. Kumar Stores, Salem"
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Quote</label>
                  <textarea
                    value={testQuote}
                    onChange={(e) => setTestQuote(e.target.value)}
                    placeholder="What the client said..."
                    rows={4}
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase text-text-secondary tracking-wider font-medium">Initials (Optional)</label>
                  <input
                    type="text"
                    value={testInitials}
                    onChange={(e) => setTestInitials(e.target.value.toUpperCase())}
                    placeholder="e.g. RB"
                    maxLength={2}
                    className="rounded border border-[#2a2535] bg-[#1e1a2a] px-3 py-1.5 text-xs text-[#e0daf5] focus:border-accent focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded bg-accent py-2 text-xs font-medium text-white hover:bg-accent-dark transition-colors cursor-none"
                  data-hover
                >
                  Save Testimonial
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
