import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import dynamic from "next/dynamic";

// Dynamically import non-critical components to reduce initial JavaScript bundle
const Cursor = dynamic(() => import("@/components/cursor/Cursor"), {
  ssr: false,
  loading: () => null,
});

const Background = dynamic(() => import("@/components/background/Background"), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  verification: {
  google: "Y57YwUGDe85C1x8CLiYH13iN-EYR-UXukBZIYNyJ1mo",
},
  metadataBase: new URL("https://akashkennedy.xyz"),
  title: "Akash Kennedy — Web Designer for Local Businesses",
  description: "I build fast, professional websites for local businesses. Landing pages, business websites, and redesigns. Get in touch today.",
  keywords: ["web designer", "website for business", "landing page", "local business website"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Akash Kennedy — Web Designer",
    description: "Fast, professional websites for local businesses.",
    url: "https://akashkennedy.xyz",
    type: "website",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" style={{ scrollBehavior: "smooth" }}>
      <body>
        <ThemeProvider>
          {/* Animated Background particle layer */}
          <Background />
          
          {/* Two-layer Custom Cursor */}
          <Cursor />
          
          {/* Content layer */}
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
