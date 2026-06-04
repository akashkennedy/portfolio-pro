"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Cursor() {
  const { theme } = useTheme();
  
  // Refs to DOM elements
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position trackers using refs (no component re-renders for smooth 60fps+ animation)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  // Hover state (expansion)
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is touch or has no fine pointer
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    if (mediaQuery.matches) return;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update dot position instantly (GPU-accelerated)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    // Hover event listeners
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const setupEventListeners = () => {
      // Find all interactive elements with data-hover attribute
      const targets = document.querySelectorAll("[data-hover], button, a, input, textarea, select");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set up a MutationObserver to watch for dynamically added components (like admin additions)
    const observer = new MutationObserver(() => {
      setupEventListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setup
    setupEventListeners();

    // Lerp loop for the ring - avoid forced reflow by batching reads and writes
    let animationFrameId: number;
    const lerpFactor = 0.12; // ~80ms lag/easing delay

    const updateRing = () => {
      // Read operations first
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const currentX = ringPos.current.x;
      const currentY = ringPos.current.y;

      // Calculate new positions
      const newX = currentX + (targetX - currentX) * lerpFactor;
      const newY = currentY + (targetY - currentY) * lerpFactor;

      // Update refs (write operation)
      ringPos.current.x = newX;
      ringPos.current.y = newY;

      // Write to DOM in a single batch (GPU-accelerated)
      if (ringRef.current) {
        // Offset for centering: ring width/height is dynamic (28px or 44px)
        const size = isHovered ? 44 : 28;
        ringRef.current.style.transform = `translate3d(${newX - size / 2}px, ${newY - size / 2}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", handleMediaChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      const targets = document.querySelectorAll("[data-hover], button, a, input, textarea, select");
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isHovered]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot layer - follows instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent transition-colors duration-300"
        style={{
          boxShadow: "0 0 8px currentColor",
        }}
      />
      {/* Ring layer - smooth follow (lerped) */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-accent/60 transition-all duration-200 ease-out ${
          isHovered ? "h-11 w-11 bg-accent/10" : "h-7 w-7 bg-transparent"
        }`}
      />
    </>
  );
}
