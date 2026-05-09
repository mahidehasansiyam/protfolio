"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal component reveals children as they enter the viewport.
 * Supports various animation types (fade, slide, scale).
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 1,
  className,
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fromVars = { opacity: 0 };
    let toVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    };

    switch (animation) {
      case "fade-up":
        fromVars.y = 50;
        toVars.y = 0;
        break;
      case "fade-down":
        fromVars.y = -50;
        toVars.y = 0;
        break;
      case "scale-in":
        fromVars.scale = 0.9;
        toVars.scale = 1;
        break;
      case "slide-left":
        fromVars.x = 50;
        toVars.x = 0;
        break;
      case "slide-right":
        fromVars.x = -50;
        toVars.x = 0;
        break;
    }

    gsap.fromTo(el, fromVars, toVars);
  }, [animation, delay, duration, once]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
