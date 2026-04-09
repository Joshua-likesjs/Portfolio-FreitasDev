'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Flame, TrendingUp } from 'lucide-react';

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDayOfWeek(date: Date): number {
  return date.getDay();
}

interface DayData {
  date: Date;
  count: number;
  level: number; // 0-4
}

function generateActivityData(): DayData[] {
  const days: DayData[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 364);

  let seed = 42;
  let currentStreak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dow = getDayOfWeek(date);

    seed++;
    const r = seededRandom(seed);

    let count = 0;
    // More activity on weekdays
    const weekdayMultiplier = (dow >= 1 && dow <= 5) ? 1.0 : 0.4;

    if (r < 0.25 * weekdayMultiplier) {
      count = 0;
    } else if (r < 0.45 * weekdayMultiplier) {
      seed++;
      count = Math.floor(seededRandom(seed) * 3) + 1;
    } else if (r < 0.65 * weekdayMultiplier) {
      seed++;
      count = Math.floor(seededRandom(seed) * 4) + 4;
    } else if (r < 0.82 * weekdayMultiplier) {
      seed++;
      count = Math.floor(seededRandom(seed) * 5) + 8;
    } else {
      seed++;
      count = Math.floor(seededRandom(seed) * 8) + 13;
    }

    // Occasional burst periods
    if (i > 100 && i < 130 && dow >= 1 && dow <= 5) {
      count = Math.max(count, Math.floor(seededRandom(seed + i) * 6) + 10);
    }
    if (i > 250 && i < 270) {
      count = Math.max(count, Math.floor(seededRandom(seed + i) * 8) + 8);
    }

    let level = 0;
    if (count >= 1 && count <= 3) level = 1;
    else if (count >= 4 && count <= 7) level = 2;
    else if (count >= 8 && count <= 12) level = 3;
    else if (count >= 13) level = 4;

    if (count > 0) currentStreak++;
    else currentStreak = 0;

    days.push({ date, count, level });
  }

  return days;
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
        color: '#C3E41D',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        filter: inView ? 'blur(0px)' : 'blur(8px)',
        transition: 'all 0.7s ease-out',
      }}
    >
      {text}
    </h2>
  );
}

const LEVEL_COLORS_DARK = [
  'hsl(0, 0%, 14%)',    // 0
  'rgba(195,228,29,0.15)', // 1
  'rgba(195,228,29,0.3)',  // 2
  'rgba(195,228,29,0.5)',  // 3
  'rgba(195,228,29,0.75)', // 4
];

const LEVEL_COLORS_LIGHT = [
  'hsl(0, 0%, 92%)',    // 0
  'rgba(195,228,29,0.2)',  // 1
  'rgba(195,228,29,0.35)', // 2
  'rgba(195,228,29,0.55)', // 3
  'rgba(195,228,29,0.8)',  // 4
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

export default function ContributionGraphSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const scrollObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) scrollObserver.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (sectionRef.current) scrollObserver.unobserve(sectionRef.current);
    };
  }, []);

  const activityData = useMemo(() => generateActivityData(), []);

  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);

  // Calculate streaks
  let longestStreak = 0;
  let currentStreak = 0;
  let streakStart = 0;
  for (let i = 0; i < activityData.length; i++) {
    if (activityData[i].count > 0) {
      if (currentStreak === 0) streakStart = i;
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }
  // Current streak from end
  let currentStreakEnd = 0;
  for (let i = activityData.length - 1; i >= 0; i--) {
    if (activityData[i].count > 0) currentStreakEnd++;
    else break;
  }

  let busiestDay = 0;
  for (const d of activityData) {
    if (d.count > busiestDay) busiestDay = d.count;
  }

  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  // Build the grid: 7 rows (days) x 53 columns (weeks)
  // Pad start to Sunday
  const firstDay = activityData[0].date.getDay();
  const paddedData: (DayData | null)[] = Array(firstDay).fill(null).concat(activityData);

  // Get month labels positions
  const monthPositions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  for (let i = 0; i < paddedData.length; i++) {
    const d = paddedData[i];
    if (d) {
      const month = d.date.getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        monthPositions.push({ label: MONTH_LABELS[month], col: Math.floor(i / 7) });
      }
    }
  }

  const cellSize = 11;
  const gap = 2;

  return (
    <section
      id="contribution-graph"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: '#C3E41D', opacity: isDark ? 0.04 : 0.02 }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedHeading text="CONTRIBUTION ACTIVITY" />
          <p
            className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-10 md:mb-14 max-w-xl"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            A snapshot of my daily coding and creative output over the past year.
          </p>
        </motion.div>

        {/* Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto pb-4 custom-scrollbar-thin"
        >
          <div className="min-w-[780px]">
            {/* Month labels */}
            <div className="flex ml-[36px] mb-2">
              {Array.from({ length: 53 }, (_, i) => {
                const mp = monthPositions.find(m => m.col === i);
                return (
                  <div
                    key={i}
                    className="text-[10px] dark:text-neutral-600 text-neutral-400 shrink-0"
                    style={{
                      width: cellSize + gap,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {mp ? mp.label : ''}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-0">
              {/* Day labels */}
              <div className="flex flex-col shrink-0 mr-2" style={{ gap: `${gap}px` }}>
                {DAY_LABELS.map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-end pr-2"
                    style={{
                      height: cellSize,
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '10px',
                      color: isDark ? 'hsl(0, 0%, 35%)' : 'hsl(0, 0%, 65%)',
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Cells grid */}
              <div
                className="grid shrink-0"
                style={{
                  gridTemplateRows: `repeat(7, ${cellSize}px)`,
                  gridTemplateColumns: `repeat(53, ${cellSize}px)`,
                  gap: `${gap}px`,
                }}
              >
                {paddedData.map((day, i) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${i}`}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          borderRadius: 2,
                        }}
                      />
                    );
                  }

                  const dateStr = day.date.toISOString().split('T')[0];
                  const bg = colors[day.level];

                  return (
                    <motion.div
                      key={dateStr}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(i * 0.0008, 0.6),
                        ease: 'easeOut',
                      }}
                      title={`${day.count} contributions on ${dateStr}`}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 2,
                        backgroundColor: bg,
                        cursor: 'default',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-6 mt-8 pt-6 dark:border-neutral-800 border-neutral-200 border-t"
        >
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4" style={{ color: '#C3E41D' }} />
            <span
              className="text-sm dark:text-neutral-300 text-neutral-600"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              <span className="font-bold dark:text-white text-neutral-900" style={{ fontFamily: "'Fira Code', monospace" }}>
                {totalContributions.toLocaleString()}
              </span>{' '}
              contributions in the last year
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4" style={{ color: '#C3E41D' }} />
            <span
              className="text-sm dark:text-neutral-300 text-neutral-600"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              <span className="font-bold dark:text-white text-neutral-900" style={{ fontFamily: "'Fira Code', monospace" }}>
                {longestStreak}
              </span>{' '}
              day longest streak
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: '#C3E41D' }} />
            <span
              className="text-sm dark:text-neutral-300 text-neutral-600"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              <span className="font-bold dark:text-white text-neutral-900" style={{ fontFamily: "'Fira Code', monospace" }}>
                {currentStreakEnd}
              </span>{' '}
              day current streak
            </span>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-4">
          <span className="text-[11px] dark:text-neutral-500 text-neutral-400 mr-1" style={{ fontFamily: "'Fira Code', monospace" }}>
            Less
          </span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="rounded-sm"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: colors[level],
              }}
            />
          ))}
          <span className="text-[11px] dark:text-neutral-500 text-neutral-400 ml-1" style={{ fontFamily: "'Fira Code', monospace" }}>
            More
          </span>
        </div>
      </div>
    </section>
  );
}
