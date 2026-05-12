"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./animations/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2, label: "Years Experience", suffix: "+" },
  { value: 10, label: "Projects Completed", suffix: "+" },
  { value: 50, label: "Happy Clients", suffix: "+" },
  { value: 120, label: "Problem Solving", suffix: "+" },
];

/**
 * Experience stats section with animated counters.
 */
export default function Stats() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, idx) => (
          <ScrollReveal key={stat.label} animation="fade-up" delay={idx * 0.1}>
            <div className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-500 text-sm md:text-base font-medium mt-2">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value,
          duration: 2,
          ease: "power3.out",
          onUpdate: function() {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      },
      once: true
    });
  }, [value]);

  return (
    <div ref={ref} className="text-5xl md:text-7xl font-black text-foreground tracking-tighter">
      {count}{suffix}
    </div>
  );
}
