"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Premium Cinematic Bubble System (Hydration-Safe).
 * High-density ambient background with floating bubbles.
 */
export default function BackgroundObjects() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [objects, setObjects] = useState([]);
  const isMobile = useIsMobile();
  


  useEffect(() => {
    // Generate bubbles only on client
    const bubbleCount = isMobile ? 30 : 100; // "FEW" on mobile

    const generatedObjects = [
      ...[...Array(bubbleCount)].map((_, i) => {
        const size = isMobile ? (1 + Math.random() * 5) : (2 + Math.random() * 10);
        return {
          id: `bubble-${i}`,
          width: size,
          height: size,
          background: `rgba(255, 255, 255, ${0.02 + Math.random() * 0.08})`,
          blur: isMobile ? 0 : (Math.random() > 0.8 ? Math.random() * 3 : 0), // "REDUCE" blur
          border: `1px solid rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`,
          boxShadow: !isMobile && Math.random() > 0.9 ? "0 0 10px rgba(255, 255, 255, 0.1)" : "none",
        };
      }),
    ];

    requestAnimationFrame(() => {
      setObjects(generatedObjects);
      setMounted(true);
    });
  }, [isMobile]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll(".ambient-bubble");

      els.forEach((el, i) => {
        // Initial random spread
        gsap.set(el, {
          x: gsap.utils.random(-10, 110) + "vw",
          y: gsap.utils.random(-10, 110) + "vh",
          scale: gsap.utils.random(0.3, 1.8),
          opacity: 0,
        });

        // Soft entrance
        gsap.to(el, {
          opacity: 1,
          duration: gsap.utils.random(2, 4),
          delay: gsap.utils.random(0, 3),
          ease: "power2.inOut",
        });

        if (isMobile) return;

        // Complex floating motion for desktop
        gsap.to(el, {
            x: (Math.random() > 0.5 ? "+=" : "-=") + gsap.utils.random(200, 500),
            duration: gsap.utils.random(40, 80),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(el, {
            y: (Math.random() > 0.5 ? "+=" : "-=") + gsap.utils.random(200, 500),
            duration: gsap.utils.random(35, 75),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Pulse and slight rotation for desktop
          gsap.to(el, {
            scale: "*=1.3",
            rotation: gsap.utils.random(-45, 45),
            opacity: gsap.utils.random(0.2, 0.9),
            duration: gsap.utils.random(5, 12),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {objects.map((obj) => (
        <div
          key={obj.id}
          className="ambient-bubble absolute rounded-full"
          style={{
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            background: obj.background,
            filter: obj.blur > 0 ? `blur(${obj.blur}px)` : "none",
            border: obj.border,
            backdropFilter: (!isMobile && obj.width > 20) ? "blur(4px)" : "none",
            boxShadow: obj.boxShadow,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}