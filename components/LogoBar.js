"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";

/**
 * LogoBar component with an infinite marquee effect using Framer Motion
 * to avoid hydration mismatches.
 */
export default function LogoBar() {
  const logos = [
    { name: "fortune", icon: "circles" },
    { name: "Junkxier Corp", icon: "layers" },
    { name: "Derhuxe", icon: "diamond" },
    { name: "LOGIPSU", icon: "heart" },
    { name: "Lipsum", icon: "corner" },
  ];

  // Double the logos for seamless looping
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-24 px-6 border-y border-border bg-brand-bg relative overflow-hidden">
      <ScrollReveal animation="fade-up">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">
            Trusted by industry leaders
          </p>
        </div>
      </ScrollReveal>

      <div className="flex overflow-hidden group select-none">
        <motion.div 
          className="flex items-center space-x-16 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeLogos.map((logo, i) => (
            <div 
              key={`${logo.name}-${i}`} 
              className="flex items-center space-x-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <LogoIcon type={logo.icon} />
              <span className={getLogoClass(logo.name)}>{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LogoIcon({ type }) {
  switch (type) {
    case "circles":
      return (
        <div className="flex space-x-1">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-foreground"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-foreground"></div>
        </div>
      );
    case "layers":
      return (
        <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path>
        </svg>
      );
    case "diamond":
      return (
        <div className="w-6 h-6 rounded-full border-2 border-foreground flex items-center justify-center">
          <div className="w-3 h-3 bg-foreground rotate-45"></div>
        </div>
      );
    case "heart":
      return (
        <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      );
    case "corner":
      return <div className="w-5 h-5 border-t-4 border-l-4 border-foreground"></div>;
    default:
      return null;
  }
}

function getLogoClass(name) {
  switch (name) {
    case "fortune": return "text-xl font-bold tracking-tighter text-white";
    case "Junkxier Corp": return "text-lg font-semibold italic text-white";
    case "Derhuxe": return "text-lg font-bold text-white";
    case "LOGIPSU": return "text-xl font-black uppercase tracking-widest text-white";
    case "Lipsum": return "text-2xl font-bold tracking-tight text-white";
    default: return "text-white";
  }
}
