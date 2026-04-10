'use client';

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star, Shuffle } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechVision Labs",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote: "Alex is one of the most talented developers I've ever worked with. His ability to bridge design and engineering is rare — he doesn't just build features, he crafts experiences that users love.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Product Lead, Digital Dynamics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "Working with Alex transformed our product. He brought a level of polish and attention to detail that elevated our entire platform. The design system he built is still the foundation of our UI.",
    rating: 5,
  },
  {
    name: "Emily Park",
    role: "Design Director, Creative Studio",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    quote: "Alex has an incredible eye for design paired with deep technical expertise. He understands both sides of the equation and delivers solutions that are both beautiful and performant.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Founder, EcoTrack",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    quote: "Alex took our vague vision and turned it into a stunning, data-rich dashboard. His communication throughout the project was excellent — always proactive, always clear.",
    rating: 5,
  },
];

const AUTO_ADVANCE_INTERVAL = 6000;

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

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const shuffle = useCallback(() => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * testimonials.length);
    } while (newIndex === current && testimonials.length > 1);
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  }, [current]);

  // Progress bar animation using requestAnimationFrame — direct DOM update to avoid setState in effect
  useEffect(() => {
    // Clean up previous animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Immediately reset bar width via DOM
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }

    if (isPaused) return;

    const startTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTimestamp;
      const newProgress = Math.min((elapsed / AUTO_ADVANCE_INTERVAL) * 100, 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${newProgress}%`;
      }

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [current, isPaused]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(next, AUTO_ADVANCE_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const navBtnClass =
    "p-2 rounded-full dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border dark:hover:border-[#C3E41D]/50 hover:border-[#C3E41D]/60 dark:text-neutral-400 text-neutral-500 dark:hover:text-[#C3E41D] hover:text-[#C3E41D] transition-colors";

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading text="TESTIMONIALS" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          What people say about working with me.
        </p>

        {/* Testimonial Card */}
        <div
          className="relative min-h-[300px] md:min-h-[280px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-2xl p-6 md:p-10 h-full flex flex-col justify-between hover:dark:border-[#C3E41D]/20 hover:border-[#C3E41D]/30 transition-all duration-300 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8" style={{ color: "#C3E41D", opacity: 0.5 }} />
                </div>

                {/* Quote Text */}
                <blockquote className="flex-1 mb-8">
                  <p
                    className="text-base md:text-lg leading-relaxed dark:text-neutral-300 text-neutral-700 italic"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#C3E41D]"
                    >
                      <Image
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <p
                        className="font-bold dark:text-white text-neutral-900 text-sm"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {testimonials[current].name}
                      </p>
                      <p className="text-xs dark:text-neutral-500 text-neutral-400" style={{ fontFamily: "'Antic', sans-serif" }}>
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C3E41D] text-[#C3E41D]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-xs h-[2px] rounded-full dark:bg-neutral-800 bg-neutral-200 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full rounded-full"
              style={{
                width: "0%",
                backgroundColor: "#C3E41D",
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className={navBtnClass}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? "#C3E41D" : "hsl(0 0% 50%)",
                  opacity: i === current ? 1 : 0.3,
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Shuffle Button */}
          <button
            onClick={shuffle}
            className={navBtnClass}
            aria-label="Random testimonial"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className={navBtnClass}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
