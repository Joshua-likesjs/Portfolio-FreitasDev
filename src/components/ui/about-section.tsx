'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { BookOpen, Code2, Palette, Database } from "lucide-react";

const skillCategories = [
  {
    label: "Frontend",
    icon: Code2,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    label: "Backend",
    icon: Database,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 82 },
      { name: "PostgreSQL / Prisma", level: 85 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    label: "Design",
    icon: Palette,
    skills: [
      { name: "Figma", level: 90 },
      { name: "UI/UX Design", level: 88 },
      { name: "Design Systems", level: 85 },
      { name: "Prototyping", level: 80 },
    ],
  },
  {
    label: "Tools",
    icon: BookOpen,
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker / AWS", level: 80 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "Three.js / WebGL", level: 72 },
    ],
  },
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

function ProgressBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span
          className="text-sm dark:text-neutral-300 text-neutral-600"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {name}
        </span>
        <span
          className="text-xs font-mono dark:text-neutral-500 text-neutral-400"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {level}%
        </span>
      </div>
      <div className="h-2 rounded-full dark:bg-neutral-800 bg-neutral-200 overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: "#C3E41D" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>
    </div>
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
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A creative developer and designer based in San Francisco, crafting digital experiences that matter.
        </p>

        <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Bio + Headshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
              {/* Headshot */}
              <div className="relative shrink-0">
                <div
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ border: "3px solid #C3E41D" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
                    alt="Freitas headshot"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <div
                  className="absolute -bottom-2 -right-2 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl -z-10"
                  style={{ backgroundColor: "#C3E41D", opacity: 0.15 }}
                />
                {/* Status badge */}
                <div className="absolute -top-2 -right-2 flex items-center gap-1.5 px-2 py-1 rounded-full dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 border shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono dark:text-neutral-300 text-neutral-600">Open to work</span>
                </div>
              </div>

              {/* Bio text */}
              <div className="flex-1">
                <p
                  className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700 mb-4"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  I&apos;m Freitas — a creative developer and designer who bridges the gap between
                  aesthetics and engineering. With 7+ years building digital products, I specialize
                  in crafting interfaces that are beautiful, performant, and accessible.
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  My approach combines design principles with modern web technologies. I believe great
                  software is invisible — it simply works and brings delight.
                </p>
              </div>
            </div>

            {/* Quick stat badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { label: "7+ Years Exp.", value: "" },
                { label: "50+ Projects", value: "" },
                { label: "12 Products", value: "" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 text-sm dark:border-neutral-700 dark:text-neutral-300 border-neutral-300 text-neutral-600 cursor-default"
                    style={{ borderColor: "#C3E41D30" }}
                  >
                    {stat.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skill Categories with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {skillCategories.map((category, catIdx) => (
              <div key={category.label}>
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="w-4 h-4" style={{ color: "#C3E41D" }} />
                  <h3
                    className="text-xs uppercase tracking-widest dark:text-neutral-400 text-neutral-500 font-semibold"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {category.label}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <ProgressBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIdx * 0.15 + skillIdx * 0.08}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
