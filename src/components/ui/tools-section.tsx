'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Server, Cloud, Monitor } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  emoji: string;
}

interface ToolCategory {
  name: string;
  icon: LucideIcon;
  tools: Tool[];
}

const categories: ToolCategory[] = [
  {
    name: 'Editor & IDE',
    icon: Code2,
    tools: [
      { name: 'VS Code', description: 'primary', emoji: '💻' },
      { name: 'Vim', description: 'for quick edits', emoji: '⚡' },
      { name: 'Figma', description: 'for design work', emoji: '🎨' },
      { name: 'iTerm2', description: 'terminal', emoji: '🖥️' },
    ],
  },
  {
    name: 'Frontend',
    icon: Palette,
    tools: [
      { name: 'React / Next.js', description: 'framework', emoji: '⚛️' },
      { name: 'TypeScript', description: 'language', emoji: '🔷' },
      { name: 'Tailwind CSS', description: 'styling', emoji: '💨' },
      { name: 'Framer Motion', description: 'animations', emoji: '🎬' },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    tools: [
      { name: 'Node.js', description: 'runtime', emoji: '🟢' },
      { name: 'Prisma', description: 'ORM', emoji: '🔷' },
      { name: 'PostgreSQL', description: 'database', emoji: '🐘' },
      { name: 'Redis', description: 'cache', emoji: '🔴' },
    ],
  },
  {
    name: 'DevOps',
    icon: Cloud,
    tools: [
      { name: 'Docker', description: 'containers', emoji: '🐳' },
      { name: 'GitHub Actions', description: 'CI/CD', emoji: '🤖' },
      { name: 'AWS', description: 'cloud', emoji: '☁️' },
      { name: 'Vercel', description: 'deployment', emoji: '▲' },
    ],
  },
  {
    name: 'Hardware',
    icon: Monitor,
    tools: [
      { name: 'MacBook Pro 16"', description: 'laptop', emoji: '💻' },
      { name: 'LG 4K Monitor', description: 'display', emoji: '🖥️' },
      { name: 'Keychron K2', description: 'keyboard', emoji: '⌨️' },
      { name: 'Logitech MX Master 3', description: 'mouse', emoji: '🖱️' },
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

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="px-3 py-2 rounded-xl dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border hover:dark:border-[#C3E41D]/40 hover:border-[#C3E41D]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(195,228,29,0.08)] cursor-default"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-base leading-none shrink-0">{tool.emoji}</span>
        <div className="min-w-0">
          <p
            className="text-sm font-medium dark:text-neutral-200 text-neutral-800 truncate"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {tool.name}
          </p>
          <p
            className="text-xs dark:text-neutral-500 text-neutral-400 truncate"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            {tool.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryGroup({ category, categoryIndex }: { category: ToolCategory; categoryIndex: number }) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 shrink-0" style={{ color: '#C3E41D' }} />
        <h3
          className="text-xs uppercase tracking-widest font-semibold"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: '#C3E41D',
          }}
        >
          {category.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {category.tools.map((tool, toolIndex) => (
          <ToolCard key={tool.name} tool={tool} index={toolIndex} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="TOOLS & SETUP" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          The hardware, software, and tools I use daily to build great products.
        </p>

        <div className="space-y-10">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <CategoryGroup category={category} categoryIndex={index} />
              {index < categories.length - 1 && (
                <div className="dark:border-neutral-800 border-neutral-200 border-t" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
