'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

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

interface Milestone {
  year: string;
  title: string;
  description: string;
  active?: boolean;
}

const milestones: Milestone[] = [
  {
    year: "2024",
    title: "Started coding journey",
    description:
      "Built my first website and fell in love with web development",
  },
  {
    year: "2025",
    title: "First freelance project",
    description:
      "Landed my first client and learned the art of client communication",
  },
  {
    year: "2026",
    title: "Building the future",
    description: "Exploring AI-powered interfaces and creative tools",
    active: true,
  },
];

export default function TimelineJourneySection() {
  return (
    <section
      id="journey"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatedHeading text="MY JOURNEY" />
        <p
          className="text-base md:text-lg dark:text-neutral-500 text-neutral-500 mb-12 md:mb-16"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A timeline of key moments in my career.
        </p>

        <div className="relative">
          {/* Vertical gradient timeline line */}
          <div
            className="absolute left-5.75 md:left-6.75 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #8A00C4, #8A00C433)",
            }}
          />

          <div className="space-y-8 md:space-y-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative pl-14 md:pl-16"
              >
                {/* Timeline dot / node */}
                <div
                  className="absolute left-4.5 md:left-5.5 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={
                    milestone.active
                      ? {
                          backgroundColor: "#8A00C4",
                          border: "2px solid #8A00C4",
                          boxShadow:
                            "0 0 10px rgba(195,228,29,0.6), 0 0 20px rgba(195,228,29,0.3)",
                        }
                      : {
                          backgroundColor: "var(--dot-fill, hsl(0,0%,7%))",
                          border: "2px solid #8A00C4",
                        }
                  }
                >
                  {/* Pulsing ring for active milestone */}
                  {milestone.active && (
                    <span
                      className="absolute inset-1 rounded-full animate-ping"
                      style={{
                        backgroundColor: "rgba(195,228,29,0.3)",
                      }}
                    />
                  )}
                </div>

                {/* Year label — positioned on the left */}
                <span
                  className="absolute left-0 md:-left-7 top-5 text-xs md:text-sm font-bold tracking-wider whitespace-nowrap dark:text-[#8A00C4] text-[#8a9d17]"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {milestone.year}
                </span>

                {/* Card on the right */}
                <div
                  className="dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(195,228,29,0.05)] group "
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(195,228,29,0.4)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 100  px rgba(195,228,29,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {/* Title row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3
                      className="text-base md:text-lg font-bold dark:text-white text-neutral-900"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                      }}
                    >
                      {milestone.title}
                    </h3>
                    {milestone.active && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold dark:text-[#8A00C4] text-[#8a9d17] shrink-0 px-2 py-0.5 rounded-full dark:bg-[#8A00C4]/10 bg-[#8A00C4]/10">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8A00C4] opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8A00C4]" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm dark:text-neutral-400 text-neutral-500 leading-relaxed"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
