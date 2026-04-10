'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const quotes = [
  {
    text: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs',
    role: 'Co-founder, Apple',
  },
  {
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
    role: 'Computer Scientist',
  },
  {
    text: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    role: 'Polymath & Visionary',
  },
  {
    text: 'Good design is obvious. Great design is transparent.',
    author: 'Joe Sparano',
    role: 'Graphic Designer',
  },
  {
    text: 'Code is poetry.',
    author: 'Various',
    role: 'Developer Philosophy',
  },
  {
    text: 'Make it simple, but significant.',
    author: 'Don Draper',
    role: 'Creative Director (fictional)',
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

export default function QuoteSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % quotes.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const quote = quotes[current];

  return (
    <section
      id="quotes"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors"
    >
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedHeading text="WORDS I LIVE BY" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl mx-auto"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Quotes and philosophies that shape how I think about design, code, and craft.
        </p>

        {/* Quote Display */}
        <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
          {/* Decorative Quote Mark */}
          <div
            className="absolute -top-6 md:-top-10 left-4 md:left-8 text-[120px] md:text-[180px] leading-none select-none pointer-events-none"
            style={{
              fontFamily: 'Georgia, serif',
              color: '#C3E41D',
              opacity: 0.12,
            }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 24 : -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -24 : 24 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full px-4 md:px-12"
            >
              {/* Quote Text */}
              <blockquote className="mb-8 md:mb-10">
                <p
                  className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed lg:leading-snug font-medium dark:text-neutral-200 text-neutral-700"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-center gap-1"
              >
                <p
                  className="text-base md:text-lg font-bold"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: '#C3E41D',
                  }}
                >
                  {quote.author}
                </p>
                <p
                  className="text-sm dark:text-neutral-500 text-neutral-400"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {quote.role}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
          <button
            onClick={prev}
            className="p-2 rounded-full dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border dark:hover:border-[#C3E41D]/50 hover:border-[#C3E41D]/60 dark:text-neutral-400 text-neutral-500 dark:hover:text-[#C3E41D] hover:text-[#C3E41D] transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? '#C3E41D' : 'hsl(0 0% 50%)',
                  opacity: i === current ? 1 : 0.3,
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border dark:hover:border-[#C3E41D]/50 hover:border-[#C3E41D]/60 dark:text-neutral-400 text-neutral-500 dark:hover:text-[#C3E41D] hover:text-[#C3E41D] transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Decorative bottom quote mark */}
        <div
          className="mt-8 md:mt-12 text-[80px] md:text-[100px] leading-none select-none"
          style={{
            fontFamily: 'Georgia, serif',
            color: '#C3E41D',
            opacity: 0.08,
          }}
        >
          &rdquo;
        </div>
      </div>
    </section>
  );
}
