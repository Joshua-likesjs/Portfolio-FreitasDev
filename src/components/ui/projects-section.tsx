'use client';

import React, { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, X, Github, Globe } from "lucide-react";

function getStoredTheme(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("portfolio-theme");
  if (saved !== null) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

const categories = ["All", "Web Apps", "Mobile", "Design", "Open Source"] as const;

type Category = (typeof categories)[number];

const projects = [
  {
    name: "DesignFlow",
    category: "Web Apps" as Category,
    description:
      "An AI-powered design tool that helps teams generate, iterate, and refine UI designs in real-time using natural language prompts and smart suggestions.",
    fullDescription: "DesignFlow uses state-of-the-art machine learning models to understand design intent from natural language. Teams can describe what they want, and the AI generates multiple design variants that can be refined through an intuitive interface. Features include real-time collaboration, version history, design token extraction, and automatic responsive layout generation.",
    tags: ["React", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    featured: true,
    link: "#",
    github: "#",
    highlights: ["AI-powered design generation", "Real-time collaboration", "Design token extraction", "Automatic responsive layouts"],
  },
  {
    name: "CloudSync",
    category: "Web Apps" as Category,
    description:
      "A real-time collaboration platform enabling distributed teams to work on documents, designs, and code simultaneously with seamless syncing.",
    fullDescription: "CloudSync provides a zero-latency collaboration experience through operational transformation algorithms and WebSocket connections. It supports rich text editing, code collaboration with syntax highlighting, design file commenting, and video conferencing integration. Built to scale to thousands of concurrent users.",
    tags: ["Next.js", "WebSocket", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    featured: false,
    link: "#",
    github: "#",
    highlights: ["Operational transformation", "Syntax-highlighted code editing", "Video conferencing", "File version management"],
  },
  {
    name: "PixelArt Studio",
    category: "Design" as Category,
    description:
      "A creative pixel art editor built with the Canvas API, featuring layers, animation timeline, custom palettes, and export to sprite sheets.",
    fullDescription: "PixelArt Studio is a browser-based pixel art editor designed for game developers and digital artists. It features a layer system with blend modes, an animation timeline with onion skinning, custom color palettes, tilemap editing, and export to sprite sheets, GIF animations, and PNG sequences. All processing happens client-side for instant feedback.",
    tags: ["Canvas API", "TypeScript"],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop",
    featured: false,
    link: "#",
    github: "#",
    highlights: ["Layer system with blend modes", "Animation timeline", "Custom palettes", "Sprite sheet export"],
  },
  {
    name: "EcoTrack",
    category: "Mobile" as Category,
    description:
      "A sustainability dashboard that visualizes environmental impact data, tracks carbon footprints, and provides actionable insights.",
    fullDescription: "EcoTrack helps organizations measure, track, and reduce their environmental impact. The dashboard visualizes carbon emissions across scopes, tracks sustainability goals, benchmarks against industry standards, and provides AI-powered recommendations for reduction strategies. Integrates with popular carbon accounting APIs and IoT sensor data.",
    tags: ["React", "D3.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop",
    featured: false,
    link: "#",
    github: "#",
    highlights: ["Scope 1/2/3 emissions tracking", "AI-powered recommendations", "Industry benchmarking", "IoT sensor integration"],
  },
  {
    name: "NoteFlow",
    category: "Open Source" as Category,
    description:
      "A beautiful markdown note-taking app with real-time preview, syntax highlighting, and cloud sync. Minimalist design meets powerful features.",
    fullDescription: "NoteFlow is a markdown-first note-taking application with a split-pane editor and live preview. It features syntax highlighting for 50+ languages, keyboard shortcuts for power users, tagging and search, and real-time cloud sync across devices. The UI is designed for focus mode with distraction-free editing.",
    tags: ["React", "MDX", "IndexedDB"],
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop",
    featured: false,
    link: "#",
    github: "#",
    highlights: ["Split-pane markdown editor", "50+ language syntax highlight", "Cloud sync across devices", "Focus mode with minimal UI"],
  },
  {
    name: "ShopStream",
    category: "Web Apps" as Category,
    description:
      "A modern e-commerce platform with live streaming shopping, real-time inventory management, and integrated payment processing.",
    fullDescription: "ShopStream combines live video shopping with a full e-commerce backend. Features include stream scheduling, real-time chat during streams, instant purchase buttons, inventory management dashboard, analytics, and Stripe payment integration. Built for creators who want to monetize their audience.",
    tags: ["Next.js", "Stripe", "WebRTC"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    featured: false,
    link: "#",
    github: "#",
    highlights: ["Live video shopping", "Real-time inventory sync", "Stripe payment processing", "Creator analytics dashboard"],
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

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48 md:h-56">
          <Image
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            width={600}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <h3
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {project.name}
            </h3>
            <div className="flex gap-2 mt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} className="text-xs bg-[#C3E41D] text-black border-none font-semibold">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <p
            className="text-sm md:text-base dark:text-neutral-300 text-neutral-700 leading-relaxed"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            {project.fullDescription}
          </p>

          {/* Highlights */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-500 mb-3"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Key Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm dark:text-neutral-300 text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C3E41D" }} />
                  <span style={{ fontFamily: "'Antic', sans-serif" }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t dark:border-neutral-800 border-neutral-200">
            <Button
              variant="outline"
              size="sm"
              className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#C3E41D] dark:hover:text-[#C3E41D] border-neutral-300 text-neutral-600 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors"
              onClick={onClose}
            >
              <Globe className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#C3E41D] dark:hover:text-[#C3E41D] border-neutral-300 text-neutral-600 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors"
              onClick={onClose}
            >
              <Github className="w-4 h-4 mr-2" />
              Source Code
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const isDark = useSyncExternalStore(subscribeToTheme, getStoredTheme, () => true);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="PROJECTS" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-2xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          A selection of projects I&apos;ve built — from AI-powered tools to real-time collaboration platforms.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const count = category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={
                  isActive
                    ? { scale: 1.03 }
                    : { scale: 1.03, borderColor: "#C3E41D", color: "#C3E41D" }
                }
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-1 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  backgroundColor: isActive ? "#C3E41D" : "transparent",
                  color: isActive ? "black" : isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                  border: `1px solid ${isActive ? "#C3E41D" : isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 82%)"}`,
                }}
              >
                <span>{category}</span>
                <span
                  className="inline-flex items-center justify-center rounded-full px-1.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: isActive ? "rgba(0,0,0,0.15)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                    color: isActive ? "black" : undefined,
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  layout: { duration: 0.35, ease: "easeInOut" },
                }}
              >
                <Card
                  className="dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 dark:hover:border-[#C3E41D]/40 hover:border-[#C3E41D]/60 transition-all duration-300 overflow-hidden group h-full relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  tabIndex={0}
                  role="button"
                >
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                    >
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  <div className="relative overflow-hidden -mx-6 -mt-6 mb-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white text-lg font-bold drop-shadow-lg" style={{ fontFamily: "'Fira Code', monospace" }}>
                        {project.name}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pt-4">
                    <CardDescription
                      className="dark:text-neutral-400 text-neutral-600 leading-relaxed text-sm"
                      style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs dark:bg-neutral-800 dark:text-neutral-300 bg-neutral-100 text-neutral-600">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#C3E41D] dark:hover:text-[#C3E41D] border-neutral-300 text-neutral-600 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
