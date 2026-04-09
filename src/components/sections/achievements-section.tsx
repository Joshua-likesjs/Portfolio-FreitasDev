'use client';

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, Star } from "lucide-react";

interface Achievement {
  icon: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  filterCategory: 'Certification' | 'Award' | 'Milestone';
}

const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "Google UX Design Certificate",
    organization: "Google",
    year: "2024",
    category: "Professional Certificate",
    filterCategory: "Certification",
  },
  {
    icon: "📜",
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    year: "2023",
    category: "Professional Certification",
    filterCategory: "Certification",
  },
  {
    icon: "⭐",
    title: "Awwwards Site of the Day",
    organization: "Awwwards",
    year: "2023",
    category: "Honorable Mention",
    filterCategory: "Award",
  },
  {
    icon: "🥇",
    title: "1st Place Hackathon",
    organization: "TechCrunch Disrupt",
    year: "2022",
    category: "Winner",
    filterCategory: "Award",
  },
  {
    icon: "🌟",
    title: "50K GitHub Stars",
    organization: "GitHub",
    year: "2022",
    category: "Open Source Milestone",
    filterCategory: "Milestone",
  },
  {
    icon: "🎨",
    title: "CSS Design Awards",
    organization: "CSS Design Awards",
    year: "2021",
    category: "Best UI Innovation",
    filterCategory: "Award",
  },
];

type FilterType = 'All' | 'Certification' | 'Award' | 'Milestone';

const filterOptions: { label: string; value: FilterType; icon: React.ReactNode }[] = [
  { label: 'All', value: 'All', icon: <Star className="w-3.5 h-3.5" /> },
  { label: 'Certification', value: 'Certification', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { label: 'Award', value: 'Award', icon: <Award className="w-3.5 h-3.5" /> },
  { label: 'Milestone', value: 'Milestone', icon: <Star className="w-3.5 h-3.5" /> },
];

function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(2000);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startYear = 2000;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startYear + (target - startYear) * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function AnimatedYear({ year }: { year: string }) {
  const target = parseInt(year, 10);
  const { count, ref } = useCountUp(target);

  return (
    <span ref={ref} className="tabular-nums" style={{ fontFamily: "'Fira Code', monospace" }}>
      {count}
    </span>
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

export default function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredAchievements = activeFilter === 'All'
    ? achievements
    : achievements.filter((a) => a.filterCategory === activeFilter);

  const handleFilter = useCallback((value: FilterType) => {
    setActiveFilter(value);
  }, []);

  return (
    <section
      id="achievements"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="ACHIEVEMENTS" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-8 md:mb-12 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Awards, certifications, and milestones that define my professional
          journey.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilter(option.value)}
              className={[
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border',
                activeFilter === option.value
                  ? 'border-[rgba(195,228,29,0.4)]'
                  : 'dark:border-neutral-700 border-neutral-300 dark:text-neutral-400 text-neutral-500 hover:dark:border-[#C3E41D]/30 hover:border-[#C3E41D]/30',
              ].join(' ')}
              style={{
                fontFamily: "'Fira Code', monospace",
                backgroundColor: activeFilter === option.value
                  ? 'rgba(195, 228, 29, 0.15)'
                  : 'transparent',
                color: activeFilter === option.value ? '#C3E41D' : undefined,
              }}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                  layout: { duration: 0.3 },
                }}
              >
                <div className="h-full p-6 md:p-7 rounded-2xl dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border group hover:-translate-y-1 hover:dark:border-[#C3E41D]/40 hover:border-[#C3E41D]/40 hover:shadow-[0_8px_30px_rgba(195,228,29,0.12)] dark:hover:shadow-[0_8px_30px_rgba(195,228,29,0.08)] transition-all duration-300 relative overflow-hidden">
                  {/* Hover sweep gradient overlay (left to right) */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(195, 228, 29, 0.06) 40%, rgba(195, 228, 29, 0.03) 100%)',
                      transition: 'opacity 0.5s ease, transform 0.7s cubic-bezier(0.25, 0.4, 0.25, 1)',
                    }}
                  />

                  {/* Subtle radial gradient on hover */}
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

                    {/* Year with count-up animation */}
                    <div className="mt-auto pt-2">
                      <span
                        className="text-xs font-semibold tracking-wider"
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          color: "#C3E41D",
                        }}
                      >
                        <AnimatedYear year={achievement.year} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
