"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./animations/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Navbar component with persistent visibility, active section tracking,
 * dynamic button states, and a fully responsive mobile menu.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Track active section
      const sections = ["about", "education", "skills", "expertise", "portfolio", "contact"];
      const scrollPosition = currentScrollY + 200;

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

  const getButtonContent = () => {
    if (activeSection === "contact") return "Message Now";
    if (activeSection === "portfolio") return "See More";
    if (activeSection === "expertise") return "Hire Me";
    return "Get a Plan";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={cn(
          "fixed top-0 z-[60] w-full px-6 py-4 md:px-12 transition-all duration-500",
          isScrolled || isMobileMenuOpen ? "bg-brand-bg/80 backdrop-blur-2xl border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Magnetic>
            <a href="#" className="text-2xl font-bold tracking-tight text-foreground cursor-pointer flex items-center gap-1 group">
              <span className="group-hover:text-brand-green transition-colors">Mahide</span>
              <span className="text-brand-green">.</span>
            </a>
          </Magnetic>

          {/* Center Links - Desktop */}
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
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            <Magnetic strength={0.3}>
              <a 
                className="hidden sm:flex px-6 py-2.5 bg-brand-green text-black font-bold rounded-full text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500 min-w-[140px] items-center justify-center" 
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

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-card-bg border border-border text-foreground hover:bg-brand-green hover:text-black transition-all duration-300"
            >
              <div className="relative w-6 h-5">
                <span className={cn(
                  "absolute left-0 w-full h-[2px] bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                )}></span>
                <span className={cn(
                  "absolute left-0 top-2 w-full h-[2px] bg-current transition-opacity duration-300",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                )}></span>
                <span className={cn(
                  "absolute left-0 w-full h-[2px] bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
                )}></span>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-bg pt-32 px-6 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-4xl font-bold tracking-tighter transition-colors",
                    activeSection === link.id ? "text-brand-green" : "text-gray-500 hover:text-foreground"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-12 flex flex-col items-center gap-8"
              >
                <ThemeToggle />
                <a 
                  className="w-full max-w-xs px-8 py-5 bg-brand-green text-black font-black rounded-2xl text-lg uppercase tracking-widest text-center shadow-lg"
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getButtonContent()}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
