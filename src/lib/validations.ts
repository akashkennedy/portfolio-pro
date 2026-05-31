import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  client_name: z.string().optional(),
  category: z.enum(["Landing page", "Business website", "Redesign"]),
  short_description: z.string().min(1, "Short description is required"),
  technologies: z.array(z.string()).default([]),
  project_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  github_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  gallery_images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

export const testimonialSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  client_company: z.string().optional(),
  client_position: z.string().optional(),
  client_photo: z.string().optional(),
  testimonial_text: z.string().min(1, "Testimonial text is required"),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const settingsSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  social_links: z.object({
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
  }),
  seo: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
  }),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
