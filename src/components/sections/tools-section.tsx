'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Server, Cloud, Monitor, Search, ChevronDown, ChevronRight } from 'lucide-react';
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
      { name: 'Figma', description: 'for design work', emoji: '🎨' },
    ],
  },
  {
    name: 'Frontend',
    icon: Palette,
    tools: [
      { name: 'React / Next.js', description: 'framework', emoji: '⚛️' },
      { name: 'TypeScript', description: 'language', emoji: '🔷' },
      { name: 'Tailwind CSS', description: 'styling', emoji: '💨' },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    tools: [
      { name: 'Node.js', description: 'runtime', emoji: '🟢' },
      { name: 'Prisma', description: 'ORM', emoji: '🔷' },
    ],
  },
  {
    name: 'DevOps',
    icon: Cloud,
    tools: [
      { name: 'GitHub Actions', description: 'CI/CD', emoji: '🤖' },
      { name: 'Vercel', description: 'deployment', emoji: '▲' },
    ],
  },
  {
    name: 'Hardware',
    icon: Monitor,
    tools: [
      { name: 'Acer Aspire A515-45"', description: 'laptop', emoji: '💻' },
      { name: 'ELG Dragon War Camuflado (MGDW)', description: 'mouse', emoji: '🖱️' },
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
        color: '#8A00C4',
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

function ToolCard({ tool, index, baseDelay }: { tool: Tool; index: number; baseDelay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: baseDelay + index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -2 }}
      className="px-3 py-2 rounded-xl dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border transition-all duration-300 cursor-default group/card"
      style={{
        boxShadow: 'inset 0 0 0 0 rgba(195,228,29,0)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(195,228,29,0.4)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(195,228,29,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      <div className="flex items-center gap-2.5">
        <motion.span
          className="text-base leading-none shrink-0 inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          animate={{ scale: 1 }}
        >
          {tool.emoji}
        </motion.span>
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

function CategoryGroup({ category, categoryIndex, searchQuery }: { category: ToolCategory; categoryIndex: number; searchQuery: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const Icon = category.icon;

  const filteredTools = searchQuery
    ? category.tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : category.tools;

  // If search is active and no tools match, hide the entire category
  if (searchQuery && filteredTools.length === 0) return null;

  // If search is active, auto-expand matching categories
  const displayCollapsed = searchQuery ? false : isCollapsed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
    >
      {/* Clickable category header */}
      <button
        onClick={() => !searchQuery && setIsCollapsed(!isCollapsed)}
        className={`w-full flex items-center gap-2 mb-4 text-left group/cat ${!searchQuery ? 'cursor-pointer' : 'cursor-default'}`}
        disabled={!!searchQuery}
      >
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300" style={{ color: '#8A00C4' }} />
        <h3
          className="text-xs uppercase tracking-widest font-semibold transition-colors duration-300 group-hover/cat:text-[#8A00C4]"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: '#8A00C4',
          }}
        >
          {category.name}
        </h3>
        {!searchQuery && (
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 90 }}
            transition={{ duration: 0.25 }}
            className="ml-1"
          >
            <ChevronRight className="w-3.5 h-3.5 dark:text-neutral-600 text-neutral-400" />
          </motion.div>
        )}
        <span
          className="ml-auto text-[10px] dark:text-neutral-600 text-neutral-400 tabular-nums"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {filteredTools.length} tools
        </span>
      </button>

      {/* Collapsible tool cards */}
      <AnimatePresence initial={false}>
        {!displayCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 pb-2">
              {filteredTools.map((tool, toolIndex) => (
                <ToolCard
                  key={tool.name}
                  tool={tool}
                  index={toolIndex}
                  baseDelay={0}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ToolsSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section
      id="tools"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="TOOLS & SETUP" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-8 md:mb-12 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          The hardware, software, and tools I use daily to build great products.
        </p>

        {/* Search Input */}
        <div className="relative mb-10 md:mb-14 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-neutral-500 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border outline-none transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(195,228,29,0.3)] focus:border-[#8A00C4] dark:text-neutral-200 text-neutral-800 placeholder:dark:text-neutral-600 placeholder:text-neutral-400"
            style={{ fontFamily: "'Fira Code', monospace" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs dark:text-neutral-500 text-neutral-400 hover:text-[#8A00C4] transition-colors"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              ESC
            </button>
          )}
        </div>

        <div className="space-y-10">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <CategoryGroup
                category={category}
                categoryIndex={index}
                searchQuery={searchQuery}
              />
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
