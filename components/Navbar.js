"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./animations/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Navbar component with scroll-aware visibility, blur effects, 
 * and magnetic interactions.
 */
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Determine if navbar is scrolled past threshold
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Works", href: "#portfolio" },
    { name: "Education", href: "#education" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 z-50 w-full px-6 py-4 md:px-12 transition-all duration-300",
        isScrolled ? "bg-brand-bg/60 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Magnetic>
          <div className="text-2xl font-bold tracking-tight text-foreground cursor-pointer">
            Mahedi<span className="text-brand-green">.</span>
          </div>
        </Magnetic>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.2}>
              <a
                href={link.href}
                className="px-4 py-2 text-gray-500 hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-0 left-4 right-4 h-[1px] bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Magnetic strength={0.3}>
            <a 
              className="hidden sm:block px-6 py-2.5 border border-border rounded-full text-sm font-medium text-foreground hover:bg-card-bg transition-all duration-300 backdrop-blur-sm" 
              href="#"
            >
              Schedule a Call
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a 
              className="px-6 py-2.5 bg-brand-green text-black font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-300" 
              href="#"
            >
              Get a Plan
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
}
