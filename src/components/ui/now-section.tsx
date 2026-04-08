'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import MusicPlayerWidget from "./music-player-widget";

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

interface NowItem {
  emoji: string;
  label: string;
  value: string;
}

const nowItems: NowItem[] = [
  {
    emoji: "🎵",
    label: "Currently listening to",
    value: "Bohemian Rhapsody — Queen",
  },
  {
    emoji: "📍",
    label: "Currently based in",
    value: "San Francisco, CA",
  },
  {
    emoji: "💻",
    label: "Currently building",
    value: "A new design system project",
  },
  {
    emoji: "📚",
    label: "Currently learning",
    value: "Rust programming language",
  },
  {
    emoji: "☕",
    label: "Currently fueled by",
    value: "Too much coffee",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function NowSection() {
  return (
    <section
      id="now"
      className="relative py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors overflow-hidden"
    >
      {/* Decorative gradient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(195,228,29,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-start justify-between">
            <div>
              {/* Decorative icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                style={{ backgroundColor: "rgba(195,228,29,0.1)" }}
              >
                <Radio className="w-7 h-7" style={{ color: "#C3E41D" }} />
              </motion.div>

              <AnimatedHeading text="RIGHT NOW" />

              <p
                className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 max-w-lg"
                style={{ fontFamily: "'Antic', sans-serif" }}
              >
                What I&apos;m up to at this very moment. A real-time glimpse into my world.
              </p>
            </div>

            {/* LIVE badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border dark:border-green-500/30 border-green-500/40 dark:bg-green-500/10 bg-green-50 shrink-0 mt-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span
                className="text-xs font-bold uppercase tracking-widest text-green-500"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Live
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Status cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nowItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group flex items-center gap-4 rounded-xl p-4 md:p-5 dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                // @ts-expect-error CSS custom property for hover glow
                '--hover-glow': 'rgba(195,228,29,0.15)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(195,228,29,0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 20px rgba(195,228,29,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              {/* Emoji icon in circle */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full text-xl dark:bg-[hsl(0,0%,15%)] bg-neutral-100 transition-colors duration-300 group-hover:dark:bg-[hsl(0,0%,18%)] group-hover:bg-neutral-50"
              >
                {item.emoji}
              </div>

              {/* Label + Value */}
              <div className="min-w-0">
                <p
                  className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-1 truncate"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm md:text-base dark:text-neutral-200 text-neutral-700 truncate"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Music Player Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-10 flex justify-center"
        >
          <MusicPlayerWidget />
        </motion.div>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full dark:bg-neutral-600 bg-neutral-300" />
          <p
            className="text-xs dark:text-neutral-500 text-neutral-400"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Updated just now
          </p>
        </motion.div>
      </div>
    </section>
  );
}
