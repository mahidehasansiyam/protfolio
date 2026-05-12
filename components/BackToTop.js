"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./animations/Magnetic";

/**
 * BackToTop component - A floating button that appears on scroll
 * to allow users to smoothly jump back to the top of the page.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after 400px of scrolling
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-10 right-10 z-[9999]" // Extremely high z-index
        >
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-14 h-14 bg-brand-green text-black rounded-full shadow-[0_0_30px_rgba(76,175,80,0.4)] flex items-center justify-center group transition-all duration-500 hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer"
              aria-label="Back to Top"
            >
              <svg 
                className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
