"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the current device is mobile based on screen width.
 * @param {number} breakpoint - Breakpoint in pixels. Default is 768.
 * @returns {boolean} - True if screen width is less than or equal to breakpoint.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Initial check
    checkMobile();

    // Event listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
