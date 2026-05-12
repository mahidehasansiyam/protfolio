"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollReveal from "./animations/ScrollReveal";
import TiltCard from "./animations/TiltCard";

const skillCategories = [
  {
    title: "Frontend",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "GSAP", "Framer Motion"]
  },
  {
    title: "Backend",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ["Node.js", "Express", "NestJS", "REST"]
  },
  {
    title: "Database",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ["PostgreSQL", "MongoDB"]
  },
  {
    title: "Tools & Platforms",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    skills: ["Git", "GitHub", "Vercel", "Figma", "Vite"]
  }
];

export default function Skills() {
  const iconRefs = useRef([]);

  useEffect(() => {
    iconRefs.current.forEach((icon, i) => {
      gsap.to(icon, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.3
      });
    });
  }, []);

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <ScrollReveal animation="fade-up">
            <div className="inline-block p-1.5 px-3 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
              A toolkit refined over <span className="text-brand-green italic font-serif">years.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <ScrollReveal 
              key={category.title} 
              animation="fade-up" 
              delay={idx * 0.1}
            >
              <TiltCard className="h-full">
                <div className="group relative h-full bg-card-bg border border-border/50 hover:border-brand-green/30 rounded-3xl p-8 transition-all duration-500 hover:shadow-card overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div 
                      ref={el => iconRefs.current[idx] = el}
                      className="w-12 h-12 rounded-xl bg-brand-bg border border-border flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-black transition-all duration-500 mb-8 shadow-sm"
                    >
                      {category.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-8 group-hover:text-brand-green transition-colors">
                      {category.title}
                    </h3>

                    <ul className="space-y-4">
                      {category.skills.map((skill, sIdx) => (
                        <motion.li 
                          key={skill} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium group/item"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green/40 group-hover/item:bg-brand-green transition-colors"></span>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
