'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Code2, Smartphone, Globe, BarChart3, Zap } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive, beautiful interfaces grounded in user research and design thinking. From wireframes to high-fidelity prototypes in Figma.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, performant web applications with modern frameworks. Clean code, pixel-perfect implementation, and accessibility-first.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Globe,
    title: "Full-Stack Engineering",
    description: "End-to-end application development with scalable APIs and database design. From concept to production.",
    tags: ["Node.js", "Firebase"],
  },
  {
    icon: Smartphone,
    title: "Mobile Experiences",
    description: "Cross-platform mobile applications that feel native. Smooth animations, offline support, and device-specific optimizations.",
    tags: ["React Native", "PWA", "Touch UX"],
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Turning complex data into clear, actionable visual stories. Interactive dashboards, charts, and real-time analytics.",
    tags: ["D3.js", "Charts", "Dashboards"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Auditing and improving Core Web Vitals, bundle sizes, and rendering performance. Making fast experiences even faster.",
    tags: ["Lighthouse", "Caching"],
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

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Animated gradient border wrapper */}
      <div
        className="relative rounded-2xl p-[1.5px] cursor-pointer"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, #C3E41D 0%, #8aaa10 50%, #C3E41D 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
      >
        <div className="h-full p-6 md:p-7 rounded-2xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border transition-all duration-300 relative overflow-hidden">
          {/* Subtle gradient background on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.05) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            {/* Service number indicator — top right */}
            <span
              className="absolute top-4 right-5 select-none"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "22px",
                opacity: 0.3,
                color: isHovered ? "#8A00C4" : "currentColor",
                transition: "color 0.3s ease",
              }}
            >
              {numberLabel}
            </span>

            {/* Icon with spring bounce */}
            <motion.div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ backgroundColor: "#8A00C415" }}
              animate={
                isHovered
                  ? { scale: [1, 1.1, 1.0] }
                  : { scale: 1 }
              }
              transition={
                isHovered
                  ? { duration: 0.4, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            >
              <service.icon
                className="w-6 h-6"
                style={{ color: "#8A00C4" }}
              />
            </motion.div>

            {/* Title */}
            <h3
              className="text-lg font-bold dark:text-white text-neutral-900 mb-3 transition-colors duration-300"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: isHovered ? "#8A00C4" : undefined,
              }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-5"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              {service.description}
            </p>

            {/* Tags — shift up on card hover */}
            <div className="flex flex-wrap gap-1.5 transition-transform duration-300"
              style={{
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full dark:bg-neutral-800/50 bg-neutral-100 font-medium transition-opacity duration-300"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: isHovered ? "#8A00C4" : undefined,
                    opacity: isHovered ? 0.9 : undefined,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="WHAT I DO" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          I bring ideas to life through design and code. Here&apos;s how I can
          help you build something great.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
