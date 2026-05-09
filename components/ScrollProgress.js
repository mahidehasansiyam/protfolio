"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress component renders a progress bar at the top of the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-green origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
