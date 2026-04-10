'use client';

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

interface Article {
  number: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
}

const articles: Article[] = [
  {
    number: "01",
    title: "The Art of Micro-Interactions",
    description:
      "Exploring how tiny animations and transitions transform user experiences from ordinary to delightful, with practical examples and design principles.",
    category: "Design",
    readTime: "8 min read",
    date: "Jan 2025",
  },
  {
    number: "02",
    title: "Building Performant React Apps",
    description:
      "A deep dive into optimization techniques including memoization, code splitting, lazy loading, and profiling tools for lightning-fast React applications.",
    category: "Development",
    readTime: "12 min read",
    date: "Feb 2025",
  },
  {
    number: "03",
    title: "Design Systems at Scale",
    description:
      "Lessons from building and maintaining component libraries that serve dozens of products — tokens, accessibility, governance, and team adoption.",
    category: "Design",
    readTime: "10 min read",
    date: "Mar 2025",
  },
  {
    number: "04",
    title: "TypeScript Patterns You Should Know",
    description:
      "Advanced TypeScript patterns including discriminated unions, template literal types, conditional types, and utility type compositions for better code.",
    category: "Development",
    readTime: "15 min read",
    date: "Apr 2025",
  },
  {
    number: "05",
    title: "The Future of Web Animation",
    description:
      "From CSS scroll-driven animations to the View Transitions API — what's coming next and how to prepare your projects for the next wave.",
    category: "Creative",
    readTime: "7 min read",
    date: "May 2025",
  },
  {
    number: "06",
    title: "From Side Project to Product",
    description:
      "The journey of turning a weekend experiment into a profitable SaaS — covering validation, pricing, marketing, and the mental game of indie hacking.",
    category: "Startup",
    readTime: "9 min read",
    date: "Jun 2025",
  },
];

const categoryStyles: Record<
  string,
  { bg: string; text: string; darkBg: string }
> = {
  Design: {
    bg: "rgba(195,228,29,0.1)",
    text: "text-[#C3E41D]",
    darkBg: "rgba(195,228,29,0.1)",
  },
  Development: {
    bg: "rgba(59,130,246,0.1)",
    text: "text-blue-400",
    darkBg: "rgba(59,130,246,0.1)",
  },
  Creative: {
    bg: "rgba(168,85,247,0.1)",
    text: "text-purple-400",
    darkBg: "rgba(168,85,247,0.1)",
  },
  Startup: {
    bg: "rgba(249,115,22,0.1)",
    text: "text-orange-400",
    darkBg: "rgba(249,115,22,0.1)",
  },
};

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

function AnimatedSubtitle({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
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
    <p
      ref={ref}
      className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
      style={{
        fontFamily: "'Antic', sans-serif",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.7s ease-out 0.15s",
      }}
    >
      {children}
    </p>
  );
}

export default function FeaturedArticlesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    const progress = scrollLeft / maxScroll;
    if (progress < 0.25) setActiveDot(0);
    else if (progress < 0.65) setActiveDot(1);
    else setActiveDot(2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToDot = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const positions = [0, maxScroll * 0.45, maxScroll];
    scrollRef.current.scrollTo({
      left: positions[index],
      behavior: "smooth",
    });
  };

  return (
    <section
      id="featured-articles"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedHeading text="FEATURED ARTICLES" />
        <AnimatedSubtitle>
          Thoughts on design, code, and the creative process.
        </AnimatedSubtitle>

        {/* Horizontal scroll container with fade edges */}
        <div className="relative">
          {/* Left fade edge */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-4 w-12 z-10"
            style={{
              background:
                "linear-gradient(to right, hsl(0,0%,4%), transparent)",
            }}
            aria-hidden="true"
          />
          {/* Right fade edge */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 z-10"
            style={{
              background:
                "linear-gradient(to left, hsl(0,0%,4%), transparent)",
            }}
            aria-hidden="true"
          />
          {/* Light mode fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-4 w-12 z-10 hidden"
            style={{
              background:
                "linear-gradient(to right, hsl(0,0%,96%), transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 z-10 hidden"
            style={{
              background:
                "linear-gradient(to left, hsl(0,0%,96%), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 custom-scrollbar-thin"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
            }}
          >
            {articles.map((article, index) => {
              const style = categoryStyles[article.category] || categoryStyles.Design;
              return (
                <motion.article
                  key={article.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="glass-card rounded-2xl p-6 min-w-[320px] sm:min-w-[380px] scroll-snap-align-start cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:dark:shadow-[0_0_30px_rgba(195,228,29,0.08)] hover:shadow-[0_0_30px_rgba(195,228,29,0.06)] hover:dark:border-[#C3E41D]/20 hover:border-[#C3E41D]/30 flex flex-col justify-between"
                >
                  {/* Card number */}
                  <div>
                    <span
                      className="block text-6xl font-bold leading-none mb-4"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C3E41D",
                        opacity: 0.15,
                      }}
                    >
                      {article.number}
                    </span>

                    {/* Category badge */}
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        backgroundColor: style.bg,
                      }}
                    >
                      <span className={style.text}>{article.category}</span>
                    </span>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-[#C3E41D] transition-colors leading-snug"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm dark:text-neutral-400 text-neutral-500 leading-relaxed line-clamp-2 mb-6"
                      style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                      {article.description}
                    </p>
                  </div>

                  {/* Footer: reading time + date + read more */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs dark:text-neutral-500 text-neutral-400">
                      <span
                        className="flex items-center gap-1"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <span
                        className="dark:text-neutral-600 text-neutral-300"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {article.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#C3E41D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 link-underline">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => scrollToDot(dot)}
              aria-label={`Go to article group ${dot + 1}`}
              className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] focus-visible:ring-offset-2"
              style={{
                width: activeDot === dot ? 28 : 8,
                height: 8,
                backgroundColor:
                  activeDot === dot ? "#C3E41D" : "rgba(195,228,29,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
