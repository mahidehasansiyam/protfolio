"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * High-Visibility Cinematic Bubble System (Hydration-Safe).
 * Fixes the 'missing animation' by ensuring random styles are only generated on the client.
 */
export default function BackgroundObjects() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    // 1. Generate random data only on the client to avoid hydration mismatch
    const bubbleCount = 12;

    const generatedObjects = [
      // Bubbles
      ...[...Array(bubbleCount)].map((_, i) => ({
        type: "bubble",
        id: `bubble-${i}`,
        width: 5 + Math.random() * 5,
        height: 5 + Math.random() * 5,
        background: "rgba(255, 255, 255, 0.05)",
        blur: 0,
      })),
    ];

    setObjects(generatedObjects);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll(".ambient-object");

      els.forEach((el, i) => {
        // Initial random position
        gsap.set(el, {
          x: gsap.utils.random(0, 100) + "vw",
          y: gsap.utils.random(0, 100) + "vh",
          scale: gsap.utils.random(0.5, 1.2),
          opacity: 0,
        });

        // Entrance
        gsap.to(el, {
          opacity: 0.5,
          duration: 2,
          delay: i * 0.02,
        });

        // Drift
        gsap.to(el, {
          x: "+=" + gsap.utils.random(-300, 300),
          y: "+=" + gsap.utils.random(-300, 300),
          duration: gsap.utils.random(20, 40),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Pulse
        gsap.to(el, {
          scale: "+=0.4",
          duration: gsap.utils.random(5, 10),
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
    >
      {objects.map((obj) => (
        <div
          key={obj.id}
          className={`ambient-object absolute rounded-full ${obj.type}`}
          style={{
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            background: obj.background,
            filter: obj.blur > 0 ? `blur(${obj.blur}px)` : "none",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            boxShadow: "none",
            transition: "opacity 2s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}