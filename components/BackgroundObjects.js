"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Premium Cinematic Bubble System (Hydration-Safe).
 * High-density ambient background with floating bubbles.
 */
export default function BackgroundObjects() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    // Generate bubbles only on client
    const bubbleCount = 100; // High density as requested

    const generatedObjects = [
      ...[...Array(bubbleCount)].map((_, i) => {
        const size = 2 + Math.random() * 10; // Variety of sizes
        return {
          id: `bubble-${i}`,
          width: size,
          height: size,
          // Subtle white/blueish tint
          background: `rgba(255, 255, 255, ${0.02 + Math.random() * 0.08})`,
          blur: Math.random() > 0.8 ? Math.random() * 3 : 0,
          border: `1px solid rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`,
          // Add a slight glow to some bubbles
          boxShadow: Math.random() > 0.9 ? "0 0 10px rgba(255, 255, 255, 0.1)" : "none",
        };
      }),
    ];

    setObjects(generatedObjects);
    setMounted(true);
  }, []);

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

        // Complex floating motion
        // Use separate tweens for x and y with different durations for organic motion
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

        // Pulse and slight rotation
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
  }, [mounted]);

  if (!mounted) return null;

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
            backdropFilter: obj.width > 20 ? "blur(4px)" : "none",
            boxShadow: obj.boxShadow,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}