"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal component animates text word-by-word or character-by-character.
 */
export default function TextReveal({ text, className, delay = 0, stagger = 0.05 }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    
    gsap.fromTo(
      words,
      {
        y: 100,
        opacity: 0,
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: stagger,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, stagger]);

  // Split text into words
  const words = text.split(" ");

  return (
    <span ref={rootRef} className={cn("inline-block overflow-hidden py-1", className)}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em] will-change-transform">
          {word}
        </span>
      ))}
    </span>
  );
}
