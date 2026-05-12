"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";

const expertiseData = [
  {
    title: "Frontend Engineering",
    percentage: 70,
    details: "React, Next.js, advanced animations"
  },
  {
    title: "Backend & APIs",
    percentage: 30,
    details: "Node, REST, GraphQL, auth, payments"
  },
  {
    title: "UI / UX & Design Systems",
    percentage: 92,
    details: "Figma, tokens, accessibility"
  },
  {
    title: "Database & Schema Design",
    percentage: 60,
    details: "Postgres, Mongo, Prisma"
  },
  {
    title: "DevOps & Deployment",
    percentage: 80,
    details: "Vercel, AWS, CI/CD, Docker"
  },
  {
    title: "Problem Solving",
    percentage: 94,
    details: "Architecture, debugging, performance"
  },
  {
    title: "API Integration",
    percentage: 99,
    details: "Third-party SDKs, webhooks"
  },
  {
    title: "Git / GitHub Workflow",
    percentage: 93,
    details: "Branching, PR review, releases"
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal animation="fade-up">
          <div className="text-brand-green font-mono text-xs font-bold tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
            <span>04</span>
            <span className="w-8 h-px bg-brand-green/30"></span>
            <span>EXPERTISE</span>
          </div>
        </ScrollReveal>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-24">
          <ScrollReveal animation="fade-up" className="lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
              Skills sharpened by <span className="text-brand-green italic font-serif">real projects.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2} className="lg:w-1/3">
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              Numbers are useful but craft is felt. Every percent below maps to projects shipped, problems solved, and clients delighted.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {expertiseData.map((item, idx) => (
            <ExpertiseCard key={item.title} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = item.percentage;
      if (start === end) return;

      let totalDuration = 2000;
      let incrementTime = (totalDuration / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, item.percentage]);

  return (
    <div ref={ref} className="group relative">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-brand-green transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            {item.details}
          </p>
        </div>
        <div className="text-3xl font-black text-foreground tracking-tighter opacity-50">
          {count}%
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-1 w-full bg-border/30 rounded-full relative overflow-visible">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute top-0 left-0 h-full bg-brand-green rounded-full flex items-center justify-end"
        >
          {/* Animated Dot */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-green flex items-center justify-center translate-x-1/2"
          >
            <div className="w-1 h-1 rounded-full bg-brand-green animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
