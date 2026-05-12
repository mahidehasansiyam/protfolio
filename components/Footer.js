"use client";

import ScrollReveal from "./animations/ScrollReveal";
import Magnetic from "./animations/Magnetic";

/**
 * Footer component with premium typography and interactive CTA.
 */
export default function Footer() {
  return (
    <footer id="contact" className="py-32 px-6 text-center border-t border-border bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up">
          <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter">
            Talk is <span className="text-brand-green">Cheap.</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up" delay={0.2}>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-lg mx-auto">
            Ready to build something extraordinary? Let's connect and turn your vision into a high-performance reality.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.4}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Magnetic>
              <a href="mailto:hello@mahedi.dev" className="text-3xl md:text-4xl font-bold text-foreground hover:text-brand-green transition-colors underline decoration-brand-green/30 underline-offset-8">
                hello@mahedi.dev
              </a>
            </Magnetic>
          </div>
        </ScrollReveal>

        <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mahedi Hasan Siyam. All rights reserved.</p>
          <div className="flex gap-8">
            <Magnetic><a href="#" className="hover:text-foreground">Twitter</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-foreground">LinkedIn</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-foreground">GitHub</a></Magnetic>
          </div>
          <p>Built with Next.js, GSAP & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
