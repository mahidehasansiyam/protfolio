"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Premium MouseFollower with a dynamic "VIEW" mode for project cards.
 */
export default function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const clusterRef = useRef([]);
  const trailsRef = useRef([]);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const cluster = clusterRef.current;
    const trails = trailsRef.current;

    if (!dot || !ring || !glow) return;

    gsap.set([dot, ring, glow, ...cluster, ...trails], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      gsap.to(glow, { x: clientX, y: clientY, duration: 1.5, ease: "power2.out" });
      gsap.to(dot, { x: clientX, y: clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.4, ease: "power3.out" });
      
      cluster.forEach((dotItem, i) => {
        gsap.to(dotItem, { x: clientX, y: clientY, duration: 0.5 + i * .5, ease: "power2.out" });
      });

      trails.forEach((trail, index) => {
        gsap.to(trail, { x: clientX, y: clientY, duration: .6 + index * .5, ease: "power2.out" });
      });
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("cursorChange", handleCursorChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("cursorChange", handleCursorChange);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[9997] opacity-20 mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(76, 175, 80, 0.15) 0%, transparent 70%)" }}
      />

      {[...Array(6)].map((_, i) => (
        <div
          key={`cluster-${i}`}
          ref={(el) => (clusterRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/40 pointer-events-none z-[9998]"
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/20 pointer-events-none z-[9998]"
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
