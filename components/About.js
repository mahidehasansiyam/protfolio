"use client";

import Image from "next/image";
import ScrollReveal from "./animations/ScrollReveal";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal animation="fade-up">
          <div className="text-brand-green font-mono text-xs font-bold tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
            <span>01</span>
            <span className="w-8 h-px bg-brand-green/30"></span>
            <span>ABOUT ME</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Image */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal animation="fade-right">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 group">
                <Image
                  src="/photo.jpeg"
                  alt="Mahide Hasan Siyam"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Decorative Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Circle Accent */}
                <div className="absolute top-10 right-10 w-12 h-12 border border-brand-green/30 rounded-full animate-pulse-slow"></div>
              </div>
              
              {/* Background Glow - reduced on mobile */}
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-green/5 md:bg-brand-green/10 blur-[100px] -z-10"></div>
            </ScrollReveal>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-left">
              <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tighter mb-8">
                Building modern digital products with <span className="text-brand-green italic font-serif">precision, creativity, and purpose..</span>
              </h2>
              
              <div className="space-y-6 text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mb-12">
                <p>
                  I'm a passionate Full Stack Developer focused on creating high-performance, scalable, and visually engaging web applications. I specialize in transforming ideas into real-world products with clean code, smooth user experiences, and strong problem-solving.
                </p>
                <p>
                  From responsive frontend interfaces to powerful backend systems, I build solutions that are fast, reliable, and designed for growth.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[200px] p-8 rounded-3xl bg-card-bg border border-border/50 hover:border-brand-green/30 transition-all duration-500 group">
                  <div className="text-4xl font-black text-foreground mb-2 tracking-tighter group-hover:text-brand-green transition-colors">2+</div>
                  <div className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Years Experience</div>
                </div>
                
                <div className="flex-1 min-w-[200px] p-8 rounded-3xl bg-card-bg border border-border/50 hover:border-brand-green/30 transition-all duration-500 group">
                  <div className="text-4xl font-black text-foreground mb-2 tracking-tighter group-hover:text-brand-green transition-colors">10+</div>
                  <div className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Projects Created</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
