"use client";

import Magnetic from "./animations/Magnetic";

/**
 * Footer component - Simplified bottom bar.
 */
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} MK Khalid Mahamud. All rights reserved.</p>
        
        <div className="flex gap-8">
          <Magnetic><a href="https://linkedin.com/in/mkkhalid/" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">LinkedIn</a></Magnetic>
          <Magnetic><a href="https://github.com/mkkhalid5" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">GitHub</a></Magnetic>
          <Magnetic><a href="https://wa.me/8801889917987" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">WhatsApp</a></Magnetic>
        </div>
        
        <p className="font-medium">Built with Next.js & GSAP</p>
      </div>
    </footer>
  );
}
