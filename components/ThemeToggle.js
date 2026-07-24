"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Magnetic from "./animations/Magnetic";

/**
 * ThemeToggle component switches between dark and light modes.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    requestAnimationFrame(() => {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Magnetic strength={0.3}>
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-card-bg border border-border transition-colors hover:bg-white/10 flex items-center justify-center text-foreground"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-brand-green" />
        ) : (
          <Moon className="w-5 h-5 text-brand-green" />
        )}
      </button>
    </Magnetic>
  );
}
