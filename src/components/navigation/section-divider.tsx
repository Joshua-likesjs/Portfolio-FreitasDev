'use client';

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SectionDivider() {
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.3 }
    );

    const els = [lineLeftRef.current, lineRightRef.current];
    els.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-4 overflow-hidden" data-scroll-reveal>
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
        <motion.div
          ref={lineLeftRef}
          className="flex-1 h-px scroll-reveal-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transformOrigin: "left",
            background: "linear-gradient(90deg, transparent, rgba(195, 228, 29, 0.3), transparent)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: "#8A00C4",
              boxShadow: "0 0 8px rgba(195, 228, 29, 0.4), 0 0 20px rgba(195, 228, 29, 0.2)",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          />
        </motion.div>
        <motion.div
          ref={lineRightRef}
          className="flex-1 h-px scroll-reveal-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          style={{
            transformOrigin: "right",
            background: "linear-gradient(90deg, transparent, rgba(195, 228, 29, 0.3), transparent)",
          }}
        />
      </div>
    </div>
  );
}
