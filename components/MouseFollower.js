"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Premium MouseFollower with a Dot Cluster, Outline Ring, and smooth glow.
 * Reverted to the preferred "Dot + Outline + Trails" style with a dynamic swarm.
 */
export default function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const clusterRef = useRef([]);
  const trailsRef = useRef([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const cluster = clusterRef.current;
    const trails = trailsRef.current;

    if (!dot || !ring || !glow) return;

    // Initial positioning
    gsap.set([dot, ring, glow, ...cluster, ...trails], { xPercent: -50, yPercent: -50 });

    // Internal "swarm" animation for the cluster (The previous style they liked)
    cluster.forEach((dotItem, i) => {
      gsap.to(dotItem, {
        x: "+=" + (Math.random() * 40 - 20),
        y: "+=" + (Math.random() * 40 - 20),
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // 0. Global Glow (Very smooth)
      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 1.5,
        ease: "power2.out",
      });

      // 1. Main Dot & Ring follow instantly
      gsap.to([dot, ring], {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // 2. Cluster Swarm follows with a tighter, more responsive delay
      cluster.forEach((dotItem, i) => {
        gsap.to(dotItem, {
          x: clientX,
          y: clientY,
          duration: 0.5 + i * .5,
          ease: "power2.out",
        });
      });

      // 3. Trails follow with a close, snappy delay
      trails.forEach((trail, index) => {
        gsap.to(trail, {
          x: clientX,
          y: clientY,
          duration: .6 + index * .5,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main Glow Background */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[9997] opacity-20 mix-blend-screen overflow-hidden"
        style={{
          background: "radial-gradient(circle, rgba(76, 175, 80, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Cluster Dots (Swarm effect) */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`cluster-${i}`}
          ref={(el) => (clusterRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/40 pointer-events-none z-[9998]"
        />
      ))}

      {/* Trailing Small Circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-brand-green/20 pointer-events-none z-[9998]"
        />
      ))}

      {/* Outline Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-brand-green/50 rounded-full pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />

      {/* Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_15px_rgba(76,175,80,0.8)] pointer-events-none z-[10000]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
