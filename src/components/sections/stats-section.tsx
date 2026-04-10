'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Code2, Users, Layers, Award } from "lucide-react";
import ScrollReveal from "@/components/effects/scroll-reveal";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatCounter({ icon: Icon, value, suffix, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

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

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        delay: delay / 1000,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[hsl(0,0%,8%)] bg-white/60 dark:border-neutral-800/50 border-neutral-200/50 border backdrop-blur-sm"
    >
      <div
        className="inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(195,228,29,0.15)]"
        style={{ backgroundColor: "#C3E41D12" }}
      >
        <Icon className="w-6 h-6" style={{ color: "#C3E41D" }} />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-neutral-900 mb-1">
        <motion.span style={{ fontFamily: "'Fira Code', monospace" }}>
          <motion.span>{rounded}</motion.span>
          <span className="text-gradient-accent">{suffix}</span>
        </motion.span>
      </div>
      <p
        className="text-xs sm:text-sm uppercase tracking-widest dark:text-neutral-500 text-neutral-400"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

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

const stats = [
  { icon: Code2, value: 50, suffix: "+", label: "Projects Built", delay: 0 },
  { icon: Users, value: 30, suffix: "+", label: "Happy Clients", delay: 150 },
  { icon: Layers, value: 12, suffix: "", label: "Products Shipped", delay: 300 },
  { icon: Award, value: 7, suffix: "+", label: "Years Experience", delay: 450 },
];

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="py-20 md:py-32 px-4 relative overflow-hidden dark:bg-[hsl(0,0%,5%)] bg-[hsl(0,0%,97%)] transition-colors"
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#C3E41D 1px, transparent 1px), linear-gradient(90deg, #C3E41D 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[128px] dark:opacity-10 opacity-[0.04]"
        style={{ backgroundColor: "#C3E41D" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[128px] dark:opacity-5 opacity-[0.02]"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedHeading text="BY THE NUMBERS" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A snapshot of my journey in design and development.
        </p>

        <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
