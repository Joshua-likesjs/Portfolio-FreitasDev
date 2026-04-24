'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface SkillData {
  name: string;
  value: number;
}

const skills: SkillData[] = [
  { name: 'Frontend', value: 73 },
  { name: 'Backend', value: 83 },
  { name: 'Design', value: 80 },
  { name: 'DevOps', value: 80 },
  { name: 'Mobile', value: 76 }
];

const ACCENT = '#8A00C4';
const ACCENT_FILL = 'rgba(195, 228, 29, 0.12)';
const NUM_AXES = skills.length;
const ANGLE_STEP = (2 * Math.PI) / NUM_AXES;
const START_ANGLE = -Math.PI / 2; // start from top

function getPoint(cx: number, cy: number, radius: number, index: number, fraction: number) {
  const angle = START_ANGLE + index * ANGLE_STEP;
  const r = radius * fraction;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function polarToPath(cx: number, cy: number, radius: number, values: number[]) {
  return values
    .map((v, i) => {
      const { x, y } = getPoint(cx, cy, radius, i, v / 100);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';
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
        color: ACCENT,
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

export default function SkillsRadarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Animate radar when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 133;
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const animatedFraction = isVisible ? 1 : 0;

  const dataPath = polarToPath(cx, cy, maxRadius, skills.map((s) => s.value * animatedFraction));

  const gridColor = isDark ? '#333333' : '#dddddd';
  const labelColor = isDark ? '#a3a3a3' : '#a3a3a3'; // neutral-400

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors relative overflow-hidden"
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125500px] rounded-full blur-[160px] dark:opacity-[0.06] opacity-[0.03]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedHeading text="SKILLS OVERVIEW" />
          <p
            className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 max-w-lg mx-auto"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            A visual breakdown of my core competencies across different domains of design and development.
          </p>
        </div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mb-10"
        >
          <div className="relative w-full max-w-125 aspect-square">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full"
              role="img"
              aria-label="Skills radar chart showing proficiency levels"
            >
              {/* Grid rings */}
              {gridLevels.map((level) => (
                <polygon
                  key={level}
                  points={Array.from({ length: NUM_AXES }, (_, i) => {
                    const { x, y } = getPoint(cx, cy, maxRadius, i, level);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke={gridColor}
                  strokeWidth={1}
                />
              ))}

              {/* Axis lines */}
              {skills.map((_, i) => {
                const { x, y } = getPoint(cx, cy, maxRadius, i, 1);
                return (
                  <line
                    key={`axis-${i}`}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={gridColor}
                    strokeWidth={1}
                  />
                );
              })}

              {/* Data polygon */}
              <motion.polygon
                points={dataPath}
                fill={ACCENT_FILL}
                stroke={ACCENT}
                strokeWidth={2}
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              />

              {/* Data points */}
              {skills.map((skill, i) => {
                const { x, y } = getPoint(cx, cy, maxRadius, i, (skill.value * animatedFraction) / 100);
                const isHovered = hoveredIndex === i;
                return (
                  <g key={`point-${i}`}>
                    {/* Invisible hover area */}
                    <circle
                      cx={x}
                      cy={y}
                      r={18}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(i)}
                      onBlur={() => setHoveredIndex(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${skill.name}: ${skill.value}%`}
                    />
                    {/* Outer glow on hover */}
                    {isHovered && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={10}
                        fill={`${ACCENT}30`}
                        initial={{ r: 6, opacity: 0 }}
                        animate={{ r: 10, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {/* Visible dot */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      fill={ACCENT}
                      stroke="white"
                      strokeWidth={2}
                      initial={{ r: 0, opacity: 0 }}
                      animate={{ r: isHovered ? 6 : 4, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                      style={{ pointerEvents: 'none' }}
                    />
                  </g>
                );
              })}

            {skills.map((skill, i) => {
                const { x, y } = getPoint(cx, cy, maxRadius, i, (skill.value * animatedFraction) / 100);
                const isHovered = hoveredIndex === i;
                return (
                  <motion.line
                    key={`jojo-line-${i}`}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={isHovered ? ACCENT : `${ACCENT}80`}
                    strokeWidth={isHovered ? 3 : 2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                    style={{ pointerEvents: 'none' }}
                  />
                );
              })}

              {/* Center dot (JoJo style core) */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={7}
                fill={ACCENT}
                stroke={isDark ? 'hsl(0,0%,10%)' : 'hsl(0,0%,100%)'}
                strokeWidth={3}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 7, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              {/* Center dot inner glow */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={3}
                fill={isDark ? 'hsl(0,0%,10%)' : 'hsl(0,0%,100%)'}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 3, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />


              {/* Labels */}
              {skills.map((skill, i) => {
                const labelRadius = maxRadius + 18;
                const { x, y } = getPoint(cx, cy, labelRadius, i, 1);
                // Adjust text anchor based on position
                let textAnchor: React.SVGAttributes<SVGTextElement>['textAnchor'] = 'middle';
                if (Math.abs(x - cx) > 10) {
                  textAnchor = x > cx ? 'start' : 'end';
                }
                return (
                  <text
                    key={`label-${i}`}
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    className="text-[12px] sm:text-[13px] fill-neutral-400 select-none"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {skill.name}
                  </text>
                );
              })}

              {/* Tooltip */}
              {hoveredIndex !== null && (
                <motion.g
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {(() => {
                    const skill = skills[hoveredIndex];
                    const { x, y } = getPoint(cx, cy, maxRadius, hoveredIndex, skill.value / 100);
                    const tooltipX = x;
                    const tooltipY = y - 20;
                    const textWidth = skill.name.length * 8 + 50;
                    const halfWidth = textWidth / 2;
                    return (
                      <>
                        {/* Shadow */}
                        <rect
                          x={tooltipX - halfWidth - 1}
                          y={tooltipY - 16}
                          width={halfWidth * 2 + 2}
                          height={32}
                          rx={8}
                          fill="rgba(0,0,0,0.3)"
                        />
                        {/* Background */}
                        <rect
                          x={tooltipX - halfWidth}
                          y={tooltipY - 17}
                          width={halfWidth * 2}
                          height={32}
                          rx={8}
                          fill={isDark ? 'hsl(0,0%,12%)' : 'hsl(0,0%,100%)'}
                          stroke={ACCENT}
                          strokeWidth={1.5}
                        />
                        {/* Text */}
                        <text
                          x={tooltipX}
                          y={tooltipY}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="text-[12px] fill-neutral-100"
                          style={{ fontFamily: "'Fira Code', monospace" }}
                        >
                          <tspan fontWeight="bold" fill={ACCENT}>
                            {skill.name}
                          </tspan>
                          <tspan dx={6} fill={isDark ? '#e5e5e5' : '#404040'}>
                            {skill.value}%
                          </tspan>
                        </text>
                      </>
                    );
                  })()}
                </motion.g>
              )}
            </svg>
          </div>
        </motion.div>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" style={{ color: ACCENT }} />
            <span
              className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-400"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              70–79: Proficient
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" style={{ color: ACCENT }} />
            <span
              className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-400"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              80–89: Advanced
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" style={{ color: ACCENT }} />
            <span
              className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-400"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              90+: Expert
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
