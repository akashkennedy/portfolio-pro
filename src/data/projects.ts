export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "Landing page" | "Business website" | "Redesign";
  type: "Single page" | "Multi-page";
  liveUrl: string;
  featured: boolean;
}

export const staticProjects: Project[] = [
  {
    id: 1,
    title: "Restaurant website",
    description: "Modern multi-page site for a local restaurant with menu and booking.",
    image: "/images/projects/restaurant.png",
    category: "Business website",
    type: "Multi-page",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Salon landing page",
    description: "Clean landing page for a local beauty salon with services and booking CTA.",
    image: "/images/projects/salon.png",
    category: "Landing page",
    type: "Single page",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Retail store site",
    description: "Product showcase and contact page for a local clothing shop.",
    image: "/images/projects/retail.png",
    category: "Business website",
    type: "Multi-page",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Gym website",
    description: "Bold one-page site for a local gym with class schedule and membership plans.",
    image: "/images/projects/gym.png",
    category: "Landing page",
    type: "Single page",
    liveUrl: "#",
    featured: false,
  },
];
