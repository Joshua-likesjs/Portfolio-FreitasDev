'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skills = [
  "React", "TypeScript", "Next.js", "Node.js", "Python",
  "Figma", "Tailwind CSS", "Three.js", "PostgreSQL", "GraphQL",
  "Docker", "AWS", "Prisma", "Framer Motion", "Git",
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
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <h2
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 md:mb-16"
      style={{
        fontFamily: "'Fira Code', monospace",
        color: "#C3E41D",
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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="ABOUT" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700 mb-6"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              I&apos;m Alex Kane — a creative developer and designer who bridges the gap between
              aesthetics and engineering. With over 7 years of experience building digital products,
              I specialize in crafting interfaces that are not only beautiful but also performant
              and accessible.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700 mb-8"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              My approach combines a deep understanding of design principles with modern web
              technologies. I believe great software is invisible — it simply works, feels
              intuitive, and brings delight to every interaction.
            </p>

            {/* Skills Grid */}
            <div>
              <h3
                className="text-sm uppercase tracking-widest dark:text-neutral-500 text-neutral-500 mb-4"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-sm dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#C3E41D] dark:hover:text-[#C3E41D] border-neutral-300 text-neutral-600 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  border: "3px solid #C3E41D",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Alex Kane headshot"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-3 -right-3 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl -z-10"
                style={{ backgroundColor: "#C3E41D", opacity: 0.15 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
