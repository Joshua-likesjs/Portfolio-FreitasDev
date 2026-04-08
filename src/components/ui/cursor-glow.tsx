'use client';

import React, { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with a pointer (not touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9999] will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(195, 228, 29, 0.06) 0%, rgba(195, 228, 29, 0.02) 40%, transparent 70%)",
        filter: "blur(1px)",
        transition: "opacity 0.3s ease",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
