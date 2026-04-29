'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Backend" },
  { name: "Prisma", category: "ORM" },
  { name: "Figma", category: "Design" },
  { name: "Git", category: "Tools" },
  { name: "Vercel", category: "Hosting" },
  { name: "D3.js", category: "Visualization" },
];

// Row 1 items
const marqueeItemsRow1 = [...technologies, ...technologies];
// Row 2 items (reversed, using spread to avoid mutating original)
const marqueeItemsRow2 = [...[...technologies].reverse(), ...[...technologies].reverse()];

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

export default function TechMarqueeSection() {
  return (
    <section
      id="tech-stack"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="TECH STACK" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          The tools and technologies I use to bring products to life.
        </p>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 dark:bg-linear-to-r dark:from-[hsl(0,0%,4%)] dark:to-transparent bg-linear-to-r from-[hsl(0,0%,96%)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 dark:bg-linear-to-l dark:from-[hsl(0,0%,4%)] dark:to-transparent bg-linear-to-l from-[hsl(0,0%,96%)] to-transparent pointer-events-none" />

        {/* Row 1 - scrolling left */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {marqueeItemsRow1.map((tech, i) => (
              <div
                key={`row1-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-full dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border shrink-0 hover:dark:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 transition-colors duration-300 cursor-default"
              >
                <span
                  className="text-sm font-semibold dark:text-neutral-200 text-neutral-700 whitespace-nowrap"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {tech.name}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-500 text-neutral-400 whitespace-nowrap"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {tech.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {marqueeItemsRow2.map((tech, i) => (
              <div
                key={`row2-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-full dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border shrink-0 hover:dark:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 transition-colors duration-300 cursor-default"
              >
                <span
                  className="text-sm font-semibold dark:text-neutral-200 text-neutral-700 whitespace-nowrap"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {tech.name}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-500 text-neutral-400 whitespace-nowrap"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {tech.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
