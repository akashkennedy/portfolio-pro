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
    name: "Anonymous Client",
    business: "Restaurant Owner",
    initials: "AC",
  },
  {
    id: 2,
    quote: "Very professional and easy to work with. He understood exactly what we needed and delivered something better than we imagined.",
    name: "Anonymous Client",
    business: "Salon Owner",
    initials: "AC",
  },
  {
    id: 3,
    quote: "Our online presence completely changed after the redesign. We get calls from new customers every week now.",
    name: "Anonymous Client",
    business: "Retail Business",
    initials: "AC",
  },
  {
    id: 4,
    quote: "Fast delivery, great communication, and the result was exactly what we wanted. Highly recommend Akash.",
    name: "Anonymous Client",
    business: "Gym Owner",
    initials: "AC",
  },
  {
    id: 5,
    quote: "The website he created for our clinic has made booking appointments so much easier. Patients love how simple it is to use.",
    name: "Anonymous Client",
    business: "Clinic Owner",
    initials: "AC",
  },
  {
    id: 6,
    quote: "We needed a quick turnaround for our event website, and Akash delivered beyond expectations. The design is stunning.",
    name: "Anonymous Client",
    business: "Event Planner",
    initials: "AC",
  },
  {
    id: 7,
    quote: "Professional, responsive, and truly talented. Our new website has helped us attract more clients than ever before.",
    name: "Anonymous Client",
    business: "Service Business",
    initials: "AC",
  },
  {
    id: 8,
    quote: "The attention to detail and commitment to quality is remarkable. Our website stands out from competitors now.",
    name: "Anonymous Client",
    business: "Startup Founder",
    initials: "AC",
  },
];
