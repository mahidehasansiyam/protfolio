"use client";

import { useEffect, useRef } from "react";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import TextReveal from "./animations/TextReveal";
import Magnetic from "./animations/Magnetic";
import ScrollReveal from "./animations/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Hero section with advanced entrance animations, parallax imagery,
 * and magnetic interactions.
 */
export default function Hero() {
  const containerRef = useRef(null);
  const mockupRef = useRef(null);

  // Parallax effect for the mockup using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yMockup = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateMockup = useTransform(scrollYProgress, [0, 1], [-2, 5]);

  useEffect(() => {
    // Floating animation for the mockup using GSAP
    if (mockupRef.current) {
      gsap.to(mockupRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Mouse move rotation for the mockup
    const handleMouseMove = (e) => {
      if (!mockupRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(mockupRef.current, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 pt-20 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-center w-full relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black leading-[1.05] text-foreground tracking-tighter">
              <TextReveal text="Building Smart" className="block" />
              <div className="flex items-center gap-4">
                <TextReveal text="&" delay={0.3} />
                <span className="relative inline-block">
                  <span className="text-brand-green animate-pulse-slow drop-shadow-[0_0_15px_rgba(76,175,80,0.3)]">
                    Scalable
                  </span>
                </span>
              </div>
              <TextReveal text="Web Solutions" delay={0.6} />
            </h1>
          </div>

          <ScrollReveal delay={1} animation="fade-up">
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg leading-relaxed">
              A web developer who's passionate about performance, security, and great user experience. From concept to clean code.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1.2} animation="fade-up" className="flex flex-wrap items-center gap-6 pt-4">
            <Magnetic>
              <a
                className="px-10 py-5 bg-brand-green text-black font-bold rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(76,175,80,0.6)] transition-all duration-300"
                href="#contact"
              >
                Hire Me
              </a>
            </Magnetic>

            <div className="flex items-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-card-bg border border-border text-foreground hover:bg-white/10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(76,175,80,0.3)] transition-all"
                  href="https://www.linkedin.com/in/mahedi-hasan-siyam/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-card-bg border border-border text-foreground hover:bg-white/10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(76,175,80,0.3)] transition-all"
                  href="https://github.com/mahidehasansiyam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Imagery */}
        <motion.div
          style={{ y: yMockup }}
          className="relative flex justify-center lg:justify-end "
        >
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
            {/* Ambient Glow behind image */}
            <div className="absolute inset-0 bg-brand-green/20 blur-[100px] rounded-full animate-pulse-slow"></div>

            {/* Circular Profile Container with Liquid Morphing Effect */}
            <motion.div
              ref={mockupRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="relative w-full h-full p-4 z-10"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white/5 relative animate-morph shadow-[0_0_50px_rgba(76,175,80,0.2)]">
                <Image
                  src="/photo.jpeg"
                  alt="Mahide Hasan Siyam Portrait"
                  fill
                  className="object-cover object-top scale-100"
                  priority
                />
              </div>

              {/* Outer Liquid Ring */}
              <div className="absolute inset-0 border-2 border-brand-green/30 rounded-full animate-morph opacity-50 -z-10" style={{ animationDelay: '1s' }} />
            </motion.div>

            {/* Floating Stat Cards */}
            {/* 1. Experience */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute top-[20%] -left-16 z-20 hidden lg:block"
            >
              <FloatingCard
                icon={<BriefcaseIcon />}
                value="1+"
                label="Year of Experience"
                className="bg-black/60 border-white/10 backdrop-blur-xl"
              />
            </motion.div>

            {/* 2. Problem Solving */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="absolute -top-4 -right-12 z-20 hidden lg:block"
            >
              <FloatingCard
                icon={<TargetIcon />}
                value="70"
                label="Problem Solving"
                className="bg-black/60 border-white/10 backdrop-blur-xl"
              />
            </motion.div>

            {/* 3. Projects */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-4 left-1/4 z-20 hidden lg:block"
            >
              <FloatingCard
                icon={<RocketIcon />}
                value="3+"
                label="Finished Projects"
                className="bg-black/60 border-white/10 backdrop-blur-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Progress Line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-white/5 overflow-hidden rounded-full"
      >
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-1/2 bg-brand-green"
        />
      </motion.div>
    </section>
  );
}

/**
 * Helper components for the floating stat cards
 */
function FloatingCard({ icon, value, label, className }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.to(cardRef.current, {
      y: -15,
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "flex items-center gap-4 px-5 py-4 rounded-2xl border shadow-2xl",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-green border border-white/5">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-white leading-none">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-1 whitespace-nowrap">
          {label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
        </div>
      </div>
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  );
}
