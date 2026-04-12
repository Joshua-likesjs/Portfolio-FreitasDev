'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery",
    description: "We start with a conversation. I learn about your goals, audience, constraints, and vision. No question is too small — understanding is the foundation of great work.",
    details: ["Kickoff call", "Stakeholder interviews", "Competitive Analysis", "Requirements doc"],
    keyTools: ["Obsidian"],
  },
  {
    number: "02",
    icon: Search,
    title: "Research & Strategy",
    description: "I dive deep into user research, market analysis, and technical feasibility. This phase ensures every design and engineering decision is grounded in data.",
    details: ["User research", "Information architecture", "Technical planning", "Project roadmap"],
    keyTools: ["Analytics", "Competitive Analysis"],
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Design & Prototype",
    description: "From wireframes to high-fidelity prototypes in Figma. Every interaction is considered, every pixel is intentional. You'll review and iterate until it's perfect.",
    details: ["Wireframes", "UI design", "Interactive prototypes", "Design system"],
    keyTools: ["Figma"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Build & Launch",
    description: "Clean, performant code with modern technologies. Regular updates, thorough testing, and a smooth handoff. Your product ships on schedule.",
    details: ["Development sprints", "Code review", "QA testing", "Deployment & launch"],
    keyTools: ["Next.js", "TypeScript", "GitHub Actions"],
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

function ProgressRing({ stepIndex }: { stepIndex: number }) {
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
        {steps[stepIndex].number}
      </span>
    </div>
  );
}

function ConnectorArrow({ index }: { index: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div
      ref={ref}
      className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" className="overflow-visible">
        {/* Dashed line */}
        <motion.line
          x1="0"
          y1="12"
          x2="20"
          y2="12"
          stroke="#8A00C4"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        />
        {/* Arrow head */}
        <motion.polygon
          points="18,8 24,12 18,16"
          fill="#8A00C4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function ProcessCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
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
            <ProgressRing stepIndex={index} />
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
              Key Tools
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

      {/* Connector arrow (not on last item) */}
      {index < 3 && <ConnectorArrow index={index} />}
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="HOW I WORK" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A proven process that turns ideas into polished products. Four phases, clear deliverables, zero surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
