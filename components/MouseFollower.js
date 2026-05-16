"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Premium MouseFollower with unified Pointer support (Mouse, Touch, Pen).
 * Uses pointermove for maximum compatibility across all devices and responsive modes.
 */
export default function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const clusterRef = useRef([]);
  const trailsRef = useRef([]);
  const [isViewMode, setIsViewMode] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const cluster = clusterRef.current;
    const trails = trailsRef.current;

    if (!dot || !ring) return;

    // Initial positioning off-screen
    gsap.set([dot, ring, ...cluster, ...trails], { 
      xPercent: -50, 
      yPercent: -50,
      x: -100,
      y: -100
    });

    const moveFollower = (clientX, clientY) => {
      // Use quickSetter or direct to. for smooth animation
      gsap.to(dot, { x: clientX, y: clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.4, ease: "power3.out" });
      
      cluster.forEach((dotItem, i) => {
        gsap.to(dotItem, { x: clientX, y: clientY, duration: 0.5 + i * .5, ease: "power2.out" });
      });

      trails.forEach((trail, index) => {
        gsap.to(trail, { x: clientX, y: clientY, duration: .6 + index * .5, ease: "power2.out" });
      });
    };

    // Unified pointer listener for ALL devices (Mouse/Touch/Pen)
    const handlePointerMove = (e) => {
      moveFollower(e.clientX, e.clientY);
    };

    const handleCursorChange = (e) => {
      const mode = e.detail;
      setIsViewMode(mode === "view");
      
      if (mode === "view") {
        gsap.to(ring, { scale: 2.5, backgroundColor: "rgba(76, 175, 80, 0.1)", duration: 0.4 });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
      } else {
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", duration: 0.4 });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    // Use pointermove which is superior for responsive/simulated environments
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("cursorChange", handleCursorChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("cursorChange", handleCursorChange);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          key={`cluster-${i}`}
          ref={(el) => (clusterRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/30 md:bg-brand-green/40 pointer-events-none z-[9998]"
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/20 md:bg-brand-green/20 pointer-events-none z-[9998]"
        />
      ))}

      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-brand-green/50 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{ transformOrigin: "center center" }}
      >
        {isViewMode && (
          <span className="text-[6px] font-black tracking-widest text-brand-green animate-pulse">VIEW</span>
        )}
      </div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_15px_rgba(76,175,80,0.8)] pointer-events-none z-[10000]"
      />
    </>
  );
}
