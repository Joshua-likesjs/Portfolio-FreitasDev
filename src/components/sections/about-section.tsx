'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code2, Palette, Database, MapPin, Zap } from "lucide-react";
import imageProfile from "../images/imageProfile.png"

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
      { name: "PostgreSQL / Prisma", level: 85 },
      { name: "Firebase", level: 78 },
    ],
  },
  {
    label: "Design",
    icon: Palette,
    skills: [
      { name: "Figma", level: 60 },
      { name: "UI/UX Design", level: 58 },
      { name: "Design Systems", level: 45 },
      { name: "Prototyping", level: 68 },
    ],
  },
  {
    label: "Tools",
    icon: BookOpen,
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "D3.js", level: 42 },
    ],
  },
];

const statusItems = [
  {
    emoji: "🟢",
    label: "Available for freelance",
    description: "Open to new projects",
    icon: null,
  },
  {
    emoji: "📍",
    label: "Manaus, AM",
    description: "Open to remote work worldwide",
    icon: MapPin,
  },
  {
    emoji: "⚡",
    label: "Usually responds",
    description: "Within 24h",
    icon: Zap,
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
    <div className="flex items-center gap-4">
      <h2
        ref={ref}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0"
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
      {/* Animated "Available" badge with pulsing green dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-green-500/10 bg-green-50 dark:border-green-500/20 border border-green-200"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span
          className="text-xs font-semibold dark:text-green-400 text-green-700"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          Available
        </span>
      </motion.div>
    </div>
  );
}

function ProgressBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div ref={ref} className="space-y-1.5 relative group">
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
      <div
        className="h-2 rounded-full dark:bg-neutral-800 bg-neutral-200 overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #4c0e66 0%, #b403ff 60%, #c475e6   100%)",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        >
          {/* Shimmer animation on viewport entry */}
          <div
            className="absolute inset-0"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.3s ease 0.8s",
            }}
          >
            <div
              className="absolute inset-0 animate-[shimmer_2s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                transform: "translateX(-100%)",
                animation: inView ? "shimmer 2s ease-in-out 0.8s 1" : "none",
              }}
            />
          </div>
        </motion.div>

        {/* Tooltip overlay on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-md text-xs font-mono font-bold whitespace-nowrap shadow-lg dark:bg-neutral-700 bg-white dark:text-neutral-100 text-neutral-800 border dark:border-neutral-600 border-neutral-200"
            style={{ fontFamily: "'Fira Code', monospace", color: "#8A00C4" }}
          >
            {level}%
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 rotate-45 dark:bg-neutral-700 bg-white border-r border-b dark:border-neutral-600 border-neutral-200" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Container stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <AnimatedHeading text="ABOUT" />
        </div>
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A creative developer and designer based in San Francisco, crafting digital experiences that matter.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start"
        >
          {/* Left: Bio + Headshot — delay 0s */}
          <motion.div variants={fadeUpVariants} custom={0}>
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
              {/* Headshot — delay 0.1s */}
              <motion.div variants={fadeUpVariants} custom={0.1} className="relative shrink-0">
                <div
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ border: "3px solid #8A00C4" }}
                >
                  <Image
                    src={imageProfile}
                    alt="Freitas headshot"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <div
                  className="absolute -bottom-2 -right-2 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl -z-10"
                  style={{ backgroundColor: "#8A00C4", opacity: 0.15 }}
                />
                {/* Status badge */}
                <div className="absolute -top-2 -right-2 flex items-center gap-1.5 px-2 py-1 rounded-full dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 border shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono dark:text-neutral-300 text-neutral-600">Open to work</span>
                </div>
              </motion.div>

              {/* Bio text */}
              <div className="flex-1">
                <p
                  className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700 mb-4"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  I&apos;m Freitas — a creative Jr. developer and designer who bridges the gap between
                  aesthetics and engineering. With 1+ year building digital products, I specialize
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
                { label: "1+ Year Exp.", value: "" },
                { label: "3 Projects", value: "" },
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
                    style={{ borderColor: "#8A00C430" }}
                  >
                    {stat.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skill Categories with Progress Bars — delay 0.2s */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.2}
            className="space-y-8 relative"
          >
            {/* Decorative dot pattern behind skills area */}
            <div
              className="absolute -top-4 -left-4 -right-4 -bottom-4 -z-10 rounded-3xl pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #8A00C4 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {skillCategories.map((category, catIdx) => (
              <div key={category.label}>
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="w-4 h-4" style={{ color: "#8A00C4" }} />
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

            {/* Status Indicators — delay 0.3s */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.3}
              className="mt-10"
            >
              <h3
                className="text-xs uppercase tracking-widest dark:text-neutral-400 text-neutral-500 font-semibold mb-4"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Currently
              </h3>
              <div className="space-y-3">
                {statusItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl dark:bg-neutral-900/50 bg-white/70 border dark:border-neutral-800/60 border-neutral-200/80 transition-all hover:dark:border-[#8A00C4]/20 hover:border-[#8A00C4]/30 hover:shadow-sm"
                  >
                    <span className="text-lg shrink-0">{item.emoji}</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
                      <span
                        className="text-sm font-bold dark:text-neutral-200 text-neutral-700"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {item.label}
                      </span>
                      <span className="hidden sm:inline dark:text-neutral-600 text-neutral-400">—</span>
                      <span
                        className="text-sm dark:text-neutral-400 text-neutral-500"
                        style={{ fontFamily: "'Antic', sans-serif" }}
                      >
                        {item.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
