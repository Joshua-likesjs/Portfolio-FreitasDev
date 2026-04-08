'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    icon: "🏆",
    title: "Google UX Design Certificate",
    organization: "Google",
    year: "2024",
    category: "Professional Certificate",
  },
  {
    icon: "📜",
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    year: "2023",
    category: "Professional Certification",
  },
  {
    icon: "⭐",
    title: "Awwwards Site of the Day",
    organization: "Awwwards",
    year: "2023",
    category: "Honorable Mention",
  },
  {
    icon: "🥇",
    title: "1st Place Hackathon",
    organization: "TechCrunch Disrupt",
    year: "2022",
    category: "Winner",
  },
  {
    icon: "🌟",
    title: "50K GitHub Stars",
    organization: "GitHub",
    year: "2022",
    category: "Open Source Milestone",
  },
  {
    icon: "🎨",
    title: "CSS Design Awards",
    organization: "CSS Design Awards",
    year: "2021",
    category: "Best UI Innovation",
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

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="ACHIEVEMENTS" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Awards, certifications, and milestones that define my professional
          journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="h-full p-6 md:p-7 rounded-2xl dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border group hover:-translate-y-1 hover:dark:border-[#C3E41D]/40 hover:border-[#C3E41D]/40 hover:shadow-[0_8px_30px_rgba(195,228,29,0.12)] dark:hover:shadow-[0_8px_30px_rgba(195,228,29,0.08)] transition-all duration-300 relative overflow-hidden">
                {/* Subtle gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.04) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  {/* Emoji Icon */}
                  <span className="text-5xl mb-5 block" role="img" aria-label={achievement.title}>
                    {achievement.icon}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-[#C3E41D] transition-colors duration-300"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {achievement.title}
                  </h3>

                  {/* Organization */}
                  <p
                    className="text-sm dark:text-neutral-500 text-neutral-600 mb-4"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {achievement.organization}
                  </p>

                  {/* Category Badge */}
                  <Badge
                    variant="secondary"
                    className="text-[11px] dark:bg-neutral-800/70 bg-neutral-100 dark:text-neutral-400 text-neutral-500 mb-3"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {achievement.category}
                  </Badge>

                  {/* Year */}
                  <div className="mt-auto pt-2">
                    <span
                      className="text-xs font-semibold tracking-wider"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C3E41D",
                      }}
                    >
                      {achievement.year}
                    </span>
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
