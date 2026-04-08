'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const education = [
  {
    degree: "M.S. Computer Science",
    school: "Stanford University",
    location: "Stanford, CA",
    period: "2015 – 2017",
    bullets: [
      "Focused on Human-Computer Interaction and Machine Learning",
      "Published research on adaptive UI systems in ACM CHI",
      "Teaching assistant for CS 147: Introduction to HCI",
      "GPA: 3.9 / 4.0",
    ],
  },
  {
    degree: "B.A. Digital Design",
    school: "Rhode Island School of Design",
    location: "Providence, RI",
    period: "2011 – 2015",
    bullets: [
      "Specialized in interactive media and computational design",
      "Senior thesis: \"Generative Interfaces: Code as a Design Medium\"",
      "Dean's List all semesters — graduated with honors",
      "Led the student Design & Technology club",
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

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading text="EDUCATION" />

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ backgroundColor: "#C3E41D", opacity: 0.3 }}
          />

          <div className="space-y-12 md:space-y-16">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-4 md:left-8 top-1.5 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{
                    backgroundColor: "#C3E41D",
                    boxShadow: "0 0 12px rgba(195, 228, 29, 0.4)",
                  }}
                />

                {/* Content Card */}
                <div className="dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-xl p-5 md:p-6 hover:dark:border-[#C3E41D]/30 hover:border-[#C3E41D]/50 transition-colors">
                  {/* Degree & School */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3
                      className="text-lg md:text-xl font-bold dark:text-white text-neutral-900"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      className="text-xs uppercase tracking-widest dark:text-[#C3E41D] text-[#8a9d17] font-medium"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm dark:text-neutral-400 text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>{edu.school}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2">
                    {edu.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.15 + i * 0.08 }}
                        className="flex items-start gap-2 text-sm dark:text-neutral-300 text-neutral-600"
                        style={{ fontFamily: "'Antic', sans-serif", fontSize: "0.95rem" }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C3E41D", opacity: 0.7 }} />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
