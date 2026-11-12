'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, DraftingCompass, Terminal, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

/* Icon per step, aligned by index with t.process.steps */
const stepIcons = [MessageSquare, DraftingCompass, Terminal, Rocket];

interface ProcessStep {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  keyTools: string[];
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

function ProgressRing({ stepIndex, number }: { stepIndex: number; number: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const size = 44;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

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
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="dark:text-neutral-800 text-neutral-200"
        />
        {/* Animated progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8A00C4"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? 0 : circumference}
          style={{
            transition: `stroke-dashoffset 1s ease-out ${stepIndex * 0.2}s`,
          }}
        />
      </svg>
      <span
        className="absolute text-xs font-bold"
        style={{
          fontFamily: "'Fira Code', monospace",
          color: "#8A00C4",
        }}
      >
        {number}
      </span>
    </div>
  );
}

function ProcessCard({ step, index, keyToolsTitle }: { step: ProcessStep; index: number; keyToolsTitle: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={step.number}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full p-6 rounded-2xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(195,228,29,0.05)] relative overflow-hidden">
        {/* Subtle gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          {/* Animated progress ring */}
          <div className="mb-4">
            <ProgressRing stepIndex={index} number={step.number} />
          </div>

          {/* Icon */}
          <motion.div
            className="inline-flex p-3 rounded-xl mb-4"
            style={{ backgroundColor: "#8A00C415" }}
            animate={isHovered ? { scale: [1, 1.1, 1.0] } : { scale: 1 }}
            transition={isHovered ? { duration: 0.4, ease: "easeInOut" } : { duration: 0.3 }}
          >
            <step.icon className="w-5 h-5" style={{ color: "#8A00C4" }} />
          </motion.div>

          {/* Title */}
          <h3
            className="text-lg font-bold dark:text-white text-neutral-900 mb-3 transition-colors duration-300"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: isHovered ? "#8A00C4" : undefined,
            }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-4"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            {step.description}
          </p>

          {/* Details */}
          <ul className="space-y-1.5">
            {step.details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-2 text-xs dark:text-neutral-500 text-neutral-400"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <ArrowRight className="w-3 h-3 shrink-0" style={{ color: "#8A00C4", opacity: 0.5 }} />
                {detail}
              </li>
            ))}
          </ul>

          {/* Key Tools — fade in on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={
              isHovered
                ? { opacity: 1, height: "auto", marginTop: 16 }
                : { opacity: 0, height: 0, marginTop: 0 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <span
              className="text-[10px] uppercase tracking-wider dark:text-neutral-600 text-neutral-400 mb-2 block"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {keyToolsTitle}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {step.keyTools.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    backgroundColor: "#8A00C415",
                    color: "#8A00C4",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      
    </motion.div>
  );
}

export default function ProcessSection() {
  const { t } = useLanguage();
  const steps: ProcessStep[] = t.process.steps.map((step, i) => ({
    ...step,
    number: String(i + 1).padStart(2, "0"),
    icon: stepIcons[i],
  }));

  return (
    <section
      id="process"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text={t.process.heading} />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {t.process.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} keyToolsTitle={t.process.keyToolsTitle} />
          ))}
        </div>
      </div>
    </section>
  );
}
