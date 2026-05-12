"use client";

import ScrollReveal from "./animations/ScrollReveal";
import Magnetic from "./animations/Magnetic";
import { motion } from "framer-motion";

const academicEducation = [
  {
    year: "2023 — Present",
    degree: "BSc in Statistics",
    institution: "University of Rajshahi",
    location: "Rajshahi, Bangladesh",
    description: "Deepening knowledge in data analysis, mathematical modeling, and statistical inference. Exploring the intersection of data science and web technologies.",
    tags: ["Data Analysis", "Probability", "Statistical Modeling"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    year: "2020 — 2022",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Gazipur Cantonment College",
    location: "Gazipur, Bangladesh",
    description: "Completed higher secondary education in Science group. Developed a strong foundation in Mathematics and Physics.",
    tags: ["Science", "Mathematics", "Analytical Skills"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    year: "2010 — 2020",
    degree: "Secondary School Certificate (SSC)",
    institution: "Janata Adarsha Bidyapith",
    location: "Palash, Narsingdi",
    description: "Foundational secondary education in Science group, graduating with excellence in core technical subjects.",
    tags: ["Science", "Foundational Studies"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal animation="fade-up">
          <div className="text-brand-green font-mono text-xs font-bold tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
            <span>02</span>
            <span className="w-8 h-px bg-brand-green/30"></span>
            <span>EDUCATION</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Section Header */}
          <div className="lg:col-span-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="sticky top-32">
                <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs mb-6 block">
                  Academic History
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tighter mb-8">
                  My <span className="text-brand-green italic">Academic</span> <br />
                  Journey.
                </h2>
                <div className="w-20 h-1.5 bg-brand-green rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-sm">
                  My formal education at prestigious institutions in Bangladesh has provided me with a strong analytical foundation.
                </p>

                <div className="mt-12 hidden lg:block">
                  <Magnetic>
                    <a href="#contact" className="group flex items-center gap-4 text-foreground font-semibold">
                      <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-brand-green group-hover:text-black transition-all duration-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                      Download Resume
                    </a>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Education List */}
          <div className="lg:col-span-8 space-y-4">
            {academicEducation.map((item, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 0.1}
              >
                <div className="group relative bg-card-bg border border-border/50 hover:border-brand-green/30 rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(76,175,80,0.25)]">
                  {/* Hover Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 ">
                    {/* Icon & Year */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-border flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-black transition-all duration-500 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_25px_rgba(76,175,80,0.4)]">
                        {item.icon}
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold font-mono tracking-tighter">
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-brand-green transition-colors duration-300">
                          {item.degree}
                        </h3>
                        <div className="flex flex-col items-start md:items-end">
                          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 border border-border/50 rounded-full bg-brand-bg/50">
                            {item.institution}
                          </span>
                          <span className="text-gray-500 text-[8px] uppercase tracking-widest mt-1 md:mr-2 font-semibold">
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6 max-w-2xl">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
