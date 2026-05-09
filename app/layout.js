import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundObjects from "@/components/BackgroundObjects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gilberto | Web Developer Portfolio",
  description: "A web developer who's passionate about performance, security, and great user experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="relative">
        <ScrollProgress />
        
        {/* Background Elements */}
        <div className="noise-overlay" />
        <div className="grid-background" />
        <div className="aurora">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
        </div>
        <BackgroundObjects />
        
        {/* Interaction Elements */}

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
