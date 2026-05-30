export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  business: string;
  initials: string;
}

export const staticTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Akash built our restaurant website in under a week. Customers keep complimenting it and we've seen more bookings since launch.",
    name: "Ravi Kumar",
    business: "Spice Garden, Nagercoil",
    initials: "RK",
  },
  {
    id: 2,
    quote: "Very professional and easy to work with. He understood exactly what we needed and delivered something better than we imagined.",
    name: "Priya Menon",
    business: "Glow Salon, Marthandam",
    initials: "PM",
  },
  {
    id: 3,
    quote: "Our online presence completely changed after the redesign. We get calls from new customers every week now.",
    name: "Samuel John",
    business: "JS Textiles, Kanyakumari",
    initials: "SJ",
  },
  {
    id: 4,
    quote: "Fast delivery, great communication, and the result was exactly what we wanted. Highly recommend Akash.",
    name: "Leela Devi",
    business: "FitZone Gym, Nagercoil",
    initials: "LD",
  },
];
