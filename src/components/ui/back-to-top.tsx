'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(195,228,29,0.4)] hover:-translate-y-1 group cursor-pointer"
          style={{
            backgroundColor: "#C3E41D",
            boxShadow: isVisible
              ? "0 4px 20px rgba(195, 228, 29, 0.3)"
              : "0 1px 3px rgba(0,0,0,0.1)",
            animation: isVisible ? "glow-pulse 3s ease-in-out infinite" : "none",
          }}
          aria-label="Back to top"
        >
          {/* Spinning ring on hover */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid transparent",
              borderTopColor: "rgba(195, 228, 29, 0.6)",
              borderRightColor: "rgba(195, 228, 29, 0.3)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              animation: isHovered ? "spin-ring 1s linear infinite" : "none",
            }}
          />
          <ArrowUp className="w-5 h-5 text-black transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
