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
    details: ["Kickoff call", "Stakeholder interviews", "Competitive analysis", "Requirements doc"],
  },
  {
    number: "02",
    icon: Search,
    title: "Research & Strategy",
    description: "I dive deep into user research, market analysis, and technical feasibility. This phase ensures every design and engineering decision is grounded in data.",
    details: ["User research", "Information architecture", "Technical planning", "Project roadmap"],
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Design & Prototype",
    description: "From wireframes to high-fidelity prototypes in Figma. Every interaction is considered, every pixel is intentional. You'll review and iterate until it's perfect.",
    details: ["Wireframes", "UI design", "Interactive prototypes", "Design system"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Build & Launch",
    description: "Clean, performant code with modern technologies. Regular updates, thorough testing, and a smooth handoff. Your product ships on schedule.",
    details: ["Development sprints", "Code review", "QA testing", "Deployment & launch"],
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
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full p-6 rounded-2xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border group hover:dark:border-[#C3E41D]/40 hover:border-[#C3E41D]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(195,228,29,0.05)] relative overflow-hidden">
                {/* Step number */}
                <div
                  className="text-5xl font-black mb-4 leading-none select-none"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: "#C3E41D",
                    opacity: 0.15,
                  }}
                >
                  {step.number}
                </div>

                {/* Subtle gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.04) 0%, transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="inline-flex p-3 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#C3E41D15" }}
                >
                  <step.icon className="w-5 h-5" style={{ color: "#C3E41D" }} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold dark:text-white text-neutral-900 mb-3"
                  style={{ fontFamily: "'Fira Code', monospace" }}
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
                      <ArrowRight className="w-3 h-3 shrink-0" style={{ color: "#C3E41D", opacity: 0.5 }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector arrow (not on last item in each row) */}
              {index < 3 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-[#C3E41D] opacity-30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
