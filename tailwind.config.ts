import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#7F77DD",
          dark: "#534AB7",
          muted: "#AFA9EC",
          bg: "#2a2040",
          light: "#EEEDFE",
        },
      },
    },
  },
  plugins: [],
};

export default config;
