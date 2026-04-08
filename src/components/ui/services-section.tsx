'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Code2, Smartphone, Globe, BarChart3, Zap } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive, beautiful interfaces grounded in user research and design thinking. From wireframes to high-fidelity prototypes in Figma.",
    tags: ["Figma", "Prototyping", "Design Systems"],
    caseStudy:
      "For a fintech startup, I redesigned their onboarding flow — reducing drop-off by 34% and cutting time-to-value from 8 minutes to under 3. The project involved user interviews with 40+ participants, A/B tested prototypes in Figma, and a comprehensive design system that scaled across 12 product screens.",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, performant web applications with modern frameworks. Clean code, pixel-perfect implementation, and accessibility-first.",
    tags: ["React", "Next.js", "TypeScript"],
    caseStudy:
      "I led the frontend rebuild of a SaaS analytics dashboard serving 50K+ daily users. Migrating from a legacy jQuery codebase to Next.js with server components cut initial load time by 62% and improved Lighthouse scores from 54 to 96. The component library I built is now shared across three product teams.",
  },
  {
    icon: Globe,
    title: "Full-Stack Engineering",
    description: "End-to-end application development with scalable APIs, database design, and cloud infrastructure. From concept to production.",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    caseStudy:
      "Built a real-time collaboration platform from scratch — handling 10K+ concurrent WebSocket connections with graceful scaling. The architecture includes event-driven microservices, a custom auth layer with RBAC, and automated CI/CD pipelines that reduced deployment time from 45 minutes to under 4.",
  },
  {
    icon: Smartphone,
    title: "Mobile Experiences",
    description: "Cross-platform mobile applications that feel native. Smooth animations, offline support, and device-specific optimizations.",
    tags: ["React Native", "PWA", "Touch UX"],
    caseStudy:
      "Developed a fitness tracking app used by 200K+ users across iOS and Android. Implemented offline-first architecture with background sync, haptic feedback patterns, and gesture-based navigation that earned a 4.8-star rating. The app processes 2M+ workout events per month with zero data loss.",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Turning complex data into clear, actionable visual stories. Interactive dashboards, charts, and real-time analytics.",
    tags: ["D3.js", "Charts", "Dashboards"],
    caseStudy:
      "Created an executive analytics dashboard for a logistics company tracking 5M+ shipments monthly. Custom D3.js visualizations revealed bottleneck patterns that led to $2.1M in annual savings. The dashboard features real-time data streaming, drill-down capabilities, and exportable reports.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Auditing and improving Core Web Vitals, bundle sizes, and rendering performance. Making fast experiences even faster.",
    tags: ["Lighthouse", "CDN", "Caching"],
    caseStudy:
      "Audited and optimized an e-commerce platform processing $8M in monthly revenue. Reduced Time to Interactive from 6.2s to 1.8s, implemented smart prefetching, and optimized image delivery — resulting in a 23% increase in conversion rate and 15% reduction in bounce rate within the first month post-launch.",
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

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Animated gradient border wrapper */}
      <div
        className="relative rounded-2xl p-[1.5px] cursor-pointer"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, #C3E41D 0%, #8aaa10 50%, #C3E41D 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
      >
        <div className="h-full p-6 md:p-7 rounded-2xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border transition-all duration-300 relative overflow-hidden">
          {/* Subtle gradient background on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(195, 228, 29, 0.05) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            {/* Service number indicator — top right */}
            <span
              className="absolute top-4 right-5 select-none"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "12px",
                opacity: 0.3,
                color: isHovered ? "#C3E41D" : "currentColor",
                transition: "color 0.3s ease",
              }}
            >
              {numberLabel}
            </span>

            {/* Icon with spring bounce */}
            <motion.div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ backgroundColor: "#C3E41D15" }}
              animate={
                isHovered
                  ? { scale: [1, 1.1, 1.0] }
                  : { scale: 1 }
              }
              transition={
                isHovered
                  ? { duration: 0.4, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            >
              <service.icon
                className="w-6 h-6"
                style={{ color: "#C3E41D" }}
              />
            </motion.div>

            {/* Title */}
            <h3
              className="text-lg font-bold dark:text-white text-neutral-900 mb-3 transition-colors duration-300"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: isHovered ? "#C3E41D" : undefined,
              }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-5"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              {service.description}
            </p>

            {/* Tags — shift up on card hover */}
            <div className="flex flex-wrap gap-1.5 transition-transform duration-300"
              style={{
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full dark:bg-neutral-800/50 bg-neutral-100 font-medium transition-opacity duration-300"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: isHovered ? "#C3E41D" : undefined,
                    opacity: isHovered ? 0.9 : undefined,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Expanded case study */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t dark:border-neutral-800 border-neutral-200">
                    <p
                      className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed"
                      style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                      {service.caseStudy}
                    </p>
                    <span
                      className="inline-block mt-3 text-[11px] font-medium"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C3E41D",
                        opacity: 0.7,
                      }}
                    >
                      Click to collapse ↑
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand hint (when not expanded) */}
            {!isExpanded && (
              <motion.span
                className="inline-block mt-4 text-[11px] font-medium"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: "#C3E41D",
                  opacity: isHovered ? 0.6 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                Click for case study →
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="WHAT I DO" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          I bring ideas to life through design and code. Here&apos;s how I can
          help you build something great.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
