"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import TiltCard from "./animations/TiltCard";
import ScrollReveal from "./animations/ScrollReveal";
import Magnetic from "./animations/Magnetic";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  {
    id: 1,
    title: "EcoSphere AI",
    category: "AI & Sustainability",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    tags: ["Next.js", "Python", "TensorFlow"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    description: "EcoSphere AI is a platform that uses machine learning to optimize energy consumption in smart cities. It provides real-time data visualization and predictive analytics to reduce carbon footprints."
  },
  {
    id: 2,
    title: "Nova Dashboard",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "D3.js", "Node.js"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    description: "A comprehensive financial dashboard for high-frequency traders. Nova features low-latency data feeds, custom indicator builders, and automated portfolio rebalancing."
  },
  {
    id: 3,
    title: "Aura Marketplace",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
    tags: ["Shopify", "Tailwind", "GSAP"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    description: "Aura is a luxury lifestyle marketplace focused on high-end fashion and art. It features an immersive 3D viewing experience and seamless multi-currency checkouts."
  },
  {
    id: 4,
    title: "Zenith OS",
    category: "System Design",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    tags: ["Rust", "Wasm", "React"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    description: "An experimental web-based operating system built with Rust and WebAssembly. Zenith explores the limits of browser performance and security for cloud applications."
  },
];

const categories = ["All", "AI & Sustainability", "FinTech", "E-Commerce", "System Design"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  // Parallax for Background Text - "LIGHT" on mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const xBgText = useTransform(scrollYProgress, [0, 1], ["20%", isMobile ? "0%" : "-20%"]);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const toggleCursor = (isHovering) => {
    const event = new CustomEvent("cursorChange", { detail: isHovering ? "view" : "default" });
    window.dispatchEvent(event);
  };

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden"
    >
      {/* Parallax Background Text */}
      <motion.div 
        style={{ x: xBgText }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0"
      >
        SELECTED WORKS • SELECTED WORKS •
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label */}
        <ScrollReveal animation="fade-up">
          <div className="text-brand-green font-mono text-xs font-bold tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
            <span>05</span>
            <span className="w-8 h-px bg-brand-green/30"></span>
            <span>SELECTED WORKS</span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <ScrollReveal animation="fade-up">
            <h2 className="text-5xl md:text-8xl font-bold text-foreground tracking-tighter leading-[0.9]">
              Exceptional <br />
              <span className="text-brand-green italic font-serif">Solutions.</span>
            </h2>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal animation="fade-up" delay={0.2} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 border",
                  filter === cat 
                  ? "bg-brand-green border-brand-green text-black shadow-[0_15px_35px_-5px_rgba(76,175,80,0.5)]" 
                  : "bg-transparent border-border text-gray-500 hover:border-brand-green/50 hover:text-foreground shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(76,175,80,0.2)]"
                )}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                onView={() => setSelectedProject(project)}
                onHover={toggleCursor}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-bg/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-5xl bg-card-bg border border-border rounded-[3rem] overflow-hidden shadow-[0_60px_150px_-30px_rgba(0,0,0,1)] flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 relative h-[300px] md:h-auto">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-brand-green hover:text-black shadow-[0_5px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(76,175,80,0.4)] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <span className="text-brand-green text-xs font-bold tracking-[0.3em] uppercase mb-4">
                  {selectedProject.category}
                </span>
                <h3 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter mb-8">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-12">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-6">
                  <Magnetic>
                    <a href={selectedProject.liveUrl} target="_blank" className="px-8 py-4 bg-brand-green text-black font-bold rounded-2xl flex items-center gap-2 shadow-[0_15px_30px_-5px_rgba(76,175,80,0.4)] hover:shadow-[0_0_40px_rgba(76,175,80,0.6)] transition-all">
                      Live Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href={selectedProject.repoUrl} target="_blank" className="px-8 py-4 border border-border text-foreground font-bold rounded-2xl flex items-center gap-2 hover:bg-white/5 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(76,175,80,0.2)] transition-all">
                      GitHub
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onView, onHover }) {
  const cardRef = useRef(null);
  
  const isMobile = useIsMobile();
  
  // Parallax for Card Image - "LIGHT" on mobile
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", isMobile ? "0%" : "10%"]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onView}
    >
      <TiltCard className="group relative aspect-[4/5] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-card-bg border border-border shadow-[0_40px_100px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_0_60px_rgba(76,175,80,0.2)] transition-all duration-700 cursor-none">
        {/* Parallax Image */}
        <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12">
          <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
            <span className="text-brand-green text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              {project.category}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="h-px flex-1 bg-white/20"></div>
              
              <div className="flex gap-4">
                <Magnetic strength={0.5}>
                  <div className="w-12 h-12 rounded-full bg-brand-green text-black flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(76,175,80,0.4)] group-hover:shadow-[0_0_30px_rgba(76,175,80,0.6)] transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
