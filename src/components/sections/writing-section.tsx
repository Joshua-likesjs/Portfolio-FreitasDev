'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Clock } from "lucide-react";

const articles = [
  {
    title: "Building Design Systems That Scale",
    excerpt: "Lessons learned from building a component library used across 12 products — from tokens to documentation.",
    date: "Dec 2024",
    readTime: "8 min read",
    tags: ["Design Systems", "React"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
  },
  {
    title: "The Art of Micro-Interactions",
    excerpt: "How small animations and transitions can dramatically improve user experience and perceived performance.",
    date: "Nov 2024",
    readTime: "6 min read",
    tags: ["UX", "Animation"],
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=500&h=300&fit=crop",
  },
  {
    title: "TypeScript Patterns I Use Every Day",
    excerpt: "A collection of advanced TypeScript patterns that have improved my code quality and developer experience.",
    date: "Oct 2024",
    readTime: "10 min read",
    tags: ["TypeScript", "Engineering"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
  },
  {
    title: "From Designer to Developer: My Journey",
    excerpt: "Reflections on transitioning from a design-focused role to full-stack development, and why both skills matter.",
    date: "Sep 2024",
    readTime: "5 min read",
    tags: ["Career", "Design"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
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

export default function WritingSection() {
  return (
    <section
      id="writing"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="WRITING" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Thoughts on design, engineering, and the intersection of creativity and code.
        </p>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <article className="group cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-2xl overflow-hidden dark:hover:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(195,228,29,0.08)]">
              <div className="relative overflow-hidden h-48 md:h-full">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent md:from-black/50" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black"
                  style={{ backgroundColor: "#8A00C4", fontFamily: "'Fira Code', monospace" }}
                >
                  Featured
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3 text-xs dark:text-neutral-500 text-neutral-400" style={{ fontFamily: "'Fira Code', monospace" }}>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{articles[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{articles[0].readTime}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-[#8A00C4] transition-colors"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {articles[0].title}
                  <ArrowUpRight className="inline w-5 h-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p
                  className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-4"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {articles[0].excerpt}
                </p>
                <div className="flex gap-2">
                  {articles[0].tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs dark:border-neutral-700 dark:text-neutral-400 border-neutral-300 text-neutral-500"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-xl overflow-hidden dark:hover:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(195,228,29,0.05)]"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2 text-[11px] dark:text-neutral-500 text-neutral-400" style={{ fontFamily: "'Fira Code', monospace" }}>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                </div>
                <h3
                  className="text-base font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-[#8A00C4] transition-colors leading-snug"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {article.title}
                  <ArrowUpRight className="inline w-4 h-4 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p
                  className="text-xs dark:text-neutral-400 text-neutral-500 leading-relaxed line-clamp-2"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {article.excerpt}
                </p>
                <div className="flex gap-1.5 mt-3">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] dark:border-neutral-700 dark:text-neutral-500 border-neutral-300 text-neutral-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
