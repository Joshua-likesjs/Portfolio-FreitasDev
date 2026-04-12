'use client';

import React, { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, X, Github, Globe } from "lucide-react";
import TALON from "../images/TALON.png"
import incubadora from "../images/incubadora.jpg"


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

const categories = ["All", "Web Apps", "Mobile", "Design", "Open Source", "Web and Mobile"] as const;

type Category = (typeof categories)[number];

const projects = [
  {
    name: ".Talon",
    category: "Web Apps" as Category,
    description: "A tracking and location observation networky for endangered Brazilian felines, leveraging IoT and embedded technology for wildlife conservation.",
    fullDescription: "Talon integrates an embedded system with GPS, SIM module, and a dashboard with real-time mapping, including location history and heat map/tracking capabilities, in addition to a geofencing system.",
    tags: ["Next.js", "OpenStreetMap", "Leaflet"],
    image: TALON,
    featured: false,
    link: "https://talon-beta.vercel.app/",
    github: "https://github.com/Joshua-likesjs/TALON",
    highlights: ["Live video shopping", "Real-time inventory sync", "Stripe payment processing", "Creator analytics dashboard"],
  },
  {
    name: ".ChocaSystem",
    category: "Web and Mobile" as Category,
    description: "A system for monitoring variables in an egg incubator, with the possibility of controlling heaters and humidifiers, as well as including a presence detector.",
    fullDescription: "ChocaSystem integrates an embedded system with heaters, humidifiers, and a dashboard in realtime with temperature, presence and humidity capabilities.",
    tags: ["Next.js", "ESP32", "IoT"],
    image: incubadora,
    featured: false,
    link: "https://incubadora-vpjs.vercel.app/",
    github: "https://github.com/Joshua-likesjs/Projeto-ChocaSystem",
    highlights: ["Live video shopping", "Real-time inventory sync", "Stripe payment processing", "Creator analytics dashboard"],
  }
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

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {

   const handleLiveDemo = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  // Função para abrir o GitHub
  const handleGithub = () => {
    if (project.github) {
      window.open(project.github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
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
            className="w-full h-full object-cover "
            width={600}
            height={400}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
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
                <Badge key={tag} className="text-xs bg-[#8A00C4] text-black border-none font-semibold">
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
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#8A00C4" }} />
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
              className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#8A00C4] dark:hover:text-[#8A00C4] border-neutral-300 text-neutral-600 hover:border-[#8A00C4] hover:text-[#8A00C4] transition-colors"
              onClick={handleLiveDemo}
            >
              <Globe className="w-4 h-4 mr-2" />
              Live
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#8A00C4] dark:hover:text-[#8A00C4] border-neutral-300 text-neutral-600 hover:border-[#8A00C4] hover:text-[#8A00C4] transition-colors"
              onClick={handleGithub}
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
                    : { scale: 1.03, borderColor: "#8A00C4", color: "#8A00C4" }
                }
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-1 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  backgroundColor: isActive ? "#8A00C4" : "transparent",
                  color: isActive ? "black" : isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                  border: `1px solid ${isActive ? "#8A00C4" : isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 82%)"}`,
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
                  className="dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 dark:hover:border-[#8A00C4]/40 hover:border-[#8A00C4]/60 transition-all duration-300 overflow-hidden group h-full relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  tabIndex={0}
                  role="button"
                >
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: "#8A00C4", fontFamily: "'Fira Code', monospace" }}
                    >
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  <div className="relative overflow-hidden -mx-6 -mt-6 mb-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 img-adapt"
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
                      className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[#8A00C4] dark:hover:text-[#8A00C4] border-neutral-300 text-neutral-600 hover:border-[#8A00C4] hover:text-[#8A00C4] transition-colors"
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
