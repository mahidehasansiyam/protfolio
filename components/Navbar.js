"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./animations/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Navbar component with persistent visibility, active section tracking,
 * and dynamic button states during scroll.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Track active section
      const sections = ["about", "skills", "expertise", "education", "portfolio", "contact"];
      const scrollPosition = currentScrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }

      // Special case for top of page
      if (currentScrollY < 100) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Expertise", href: "#expertise", id: "expertise" },
    { name: "Works", href: "#portfolio", id: "portfolio" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // Dynamic button content based on scroll
  const getButtonContent = () => {
    if (activeSection === "contact") return "Message Now";
    if (activeSection === "portfolio") return "See More";
    if (activeSection === "expertise") return "Hire Me";
    return "Get a Plan";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={cn(
        "fixed top-0 z-50 w-full px-6 py-4 md:px-12 transition-all duration-500",
        isScrolled ? "bg-brand-bg/70 backdrop-blur-2xl border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Magnetic>
          <div className="text-2xl font-bold tracking-tight text-foreground cursor-pointer flex items-center gap-1 group">
            <span className="group-hover:text-brand-green transition-colors">Mahedi</span>
            <span className="text-brand-green">.</span>
          </div>
        </Magnetic>

        {/* Center Links */}
        <div className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.15}>
              <a
                href={link.href}
                className={cn(
                  "px-4 py-2 transition-all duration-300 relative group",
                  activeSection === link.id ? "text-brand-green" : "text-gray-500 hover:text-foreground"
                )}
              >
                {link.name}
                {/* Underline for active/hover state */}
                <motion.span
                  className={cn(
                    "absolute bottom-0 left-4 right-4 h-[2px] bg-brand-green origin-left transition-transform duration-300",
                    activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Magnetic strength={0.2}>
            <a
              className="hidden sm:block px-6 py-2.5 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-foreground hover:bg-card-bg transition-all duration-300 backdrop-blur-sm"
              href="#contact"
            >
              Hire Me
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              className="px-6 py-2.5 bg-brand-green text-black font-bold rounded-full text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500 min-w-[140px] text-center"
              href="#contact"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={getButtonContent()}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {getButtonContent()}
                </motion.span>
              </AnimatePresence>
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
}
