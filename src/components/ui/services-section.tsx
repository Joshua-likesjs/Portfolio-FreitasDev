'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    description: "End-to-end application development with scalable APIs, database design, and cloud infrastructure. From concept to production.",
    tags: ["Node.js", "PostgreSQL", "AWS"],
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
    tags: ["Lighthouse", "CDN", "Caching"],
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

export default function ServicesSection() {
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
          I bring ideas to life through design and code. Here&apos;s how I can help you build something great.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="h-full p-6 md:p-7 rounded-2xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border group hover:dark:border-[#C3E41D]/40 hover:border-[#C3E41D]/60 transition-all duration-300 relative overflow-hidden">
                {/* Subtle gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.05) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="inline-flex p-3 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "#C3E41D15" }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: "#C3E41D" }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-[#C3E41D] transition-colors duration-300"
                    style={{ fontFamily: "'Fira Code', monospace" }}
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full dark:bg-neutral-800/50 bg-neutral-100 dark:text-neutral-500 text-neutral-500 font-medium"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
