import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Cursor from "@/components/cursor/Cursor";
import Background from "@/components/background/Background";

export const metadata: Metadata = {
  metadataBase: new URL("https://akashkennedy.xyz"),
  title: "Akash Kennedy — Web Designer for Local Businesses",
  description: "I build fast, professional websites for local businesses. Landing pages, business websites, and redesigns. Get in touch today.",
  keywords: ["web designer", "website for business", "landing page", "local business website"],
  icons: {
    icon: "/favicon.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Akash Kennedy — Web Designer",
    description: "Fast, professional websites for local businesses.",
    url: "https://akashkennedy.xyz",
    type: "website",
  }
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
