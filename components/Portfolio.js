"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./animations/TiltCard";
import ScrollReveal from "./animations/ScrollReveal";
import Magnetic from "./animations/Magnetic";

const projects = [
  {
    id: 1,
    title: "EcoSphere AI",
    category: "AI & Sustainability",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    tags: ["Next.js", "Python", "TensorFlow"],
  },
  {
    id: 2,
    title: "Nova Dashboard",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "D3.js", "Node.js"],
  },
  {
    id: 3,
    title: "Aura Marketplace",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
    tags: ["Shopify", "Tailwind", "GSAP"],
  },
  {
    id: 4,
    title: "Zenith OS",
    category: "System Design",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    tags: ["Rust", "Wasm", "React"],
  },
];

const categories = ["All", "AI & Sustainability", "FinTech", "E-Commerce", "System Design"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal animation="fade-up">
          <div className="text-brand-green font-mono text-xs font-bold tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
            <span>05</span>
            <span className="w-8 h-px bg-brand-green/30"></span>
            <span>SELECTED WORKS</span>
          </div>
        </ScrollReveal>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <ScrollReveal animation="fade-up">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Selected <span className="text-brand-green">Works</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md">
              A collection of projects that push the boundaries of digital experience and performance.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal animation="fade-up" delay={0.2} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat 
                  ? "bg-brand-green text-black" 
                  : "bg-card-bg text-gray-500 hover:bg-brand-green/10 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-card-bg border border-border shadow-card cursor-pointer">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-brand-green text-sm font-bold tracking-widest uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* View Project Button (Floating) */}
                  <div className="absolute top-8 right-8 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <Magnetic strength={0.3}>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </Magnetic>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <ScrollReveal animation="fade-up">
            <Magnetic>
              <button className="text-foreground font-medium flex items-center gap-3 group">
                Explore all projects
                <span className="w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center group-hover:bg-brand-green group-hover:text-black transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </button>
            </Magnetic>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
