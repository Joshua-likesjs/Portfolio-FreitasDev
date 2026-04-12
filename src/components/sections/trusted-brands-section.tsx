'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "Google", color: "#4285F4", category: "Technology" },
  { name: "Vercel", color: "#FFFFFF", category: "Cloud Platform" },
  { name: "Figma", color: "#F24E1E", category: "Design" },
  { name: "GitHub", color: "#E6EDF3", category: "Developer Tools" },
  { name: "Obsidian", color: "#7E1DFB", category: "Productivity" },
  { name: "Firebase", color: "#FFC400", category: "Cloud" },
  { name: "AWS", color: "#FF9900", category: "Infrastructure" }
];

function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <h2
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6"
      style={{
        fontFamily: "'Fira Code', monospace",
        color: "#8A00C4",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        filter: inView ? "blur(0px)" : "blur(8px)",
        transition: "all 0.7s ease-out",
      }}
    >
      {text}
    </h2>
  );
}

export default function TrustedBrandsSection() {
  return (
    <section
      id="trusted-brands"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,6%)] bg-[hsl(0,0%,99%)] transition-colors relative overflow-hidden"
    >
      {/* Subtle radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(195, 228, 29, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedHeading text="TRUSTED BY" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Companies and teams I&apos;ve had the privilege of working with.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="h-full p-5 md:p-6 rounded-2xl backdrop-blur-sm dark:bg-white/[0.03] bg-black/[0.02] dark:border-neutral-800 border-neutral-200 border group hover:scale-[1.05] hover:-translate-y-0.5 hover:dark:border-[#8A00C4]/50 hover:border-[#8A00C4]/50 hover:shadow-[0_8px_30px_rgba(195,228,29,0.15)] dark:hover:shadow-[0_8px_30px_rgba(195,228,29,0.1)] transition-all duration-300 cursor-default">
                {/* Decorative colored dot and line */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: brand.color,
                      boxShadow: `0 0 8px ${brand.color}40`,
                    }}
                  />
                  <span
                    className="w-6 h-[2px] rounded-full opacity-50 group-hover:w-10 group-hover:opacity-100 transition-all duration-300"
                    style={{ backgroundColor: brand.color }}
                  />
                </div>

                {/* Brand Name */}
                <h3
                  className="text-base md:text-lg font-bold dark:text-white text-neutral-900 mb-1.5 group-hover:text-[#8A00C4] transition-colors duration-300"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {brand.name}
                </h3>

                {/* Category */}
                <p
                  className="text-xs dark:text-neutral-500 text-neutral-400"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {brand.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
