"use client";

import Magnetic from "./animations/Magnetic";

/**
 * Footer component - Simplified bottom bar with updated user info.
 */
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Mahide Hasan Siyam. All rights reserved.</p>
        
        <div className="flex gap-8">
          <Magnetic><a href="https://www.linkedin.com/in/mahedi-hasan-siyam/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></Magnetic>
          <Magnetic><a href="https://github.com/mahidehasansiyam" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></Magnetic>
          <Magnetic><a href="https://wa.me/8801994338692" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a></Magnetic>
        </div>
        
        <p className="font-medium">Built with Next.js, GSAP & Framer Motion</p>
      </div>
    </footer>
  );
}
