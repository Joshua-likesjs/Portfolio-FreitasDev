'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "DesignFlow",
    description:
      "An AI-powered design tool that helps teams generate, iterate, and refine UI designs in real-time using natural language prompts and smart suggestions.",
    tags: ["React", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    name: "CloudSync",
    description:
      "A real-time collaboration platform enabling distributed teams to work on documents, designs, and code simultaneously with seamless syncing and conflict resolution.",
    tags: ["Next.js", "WebSocket", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    name: "PixelArt Studio",
    description:
      "A creative pixel art editor built with the Canvas API, featuring layers, animation timeline, custom palettes, and export to sprite sheets.",
    tags: ["Canvas API", "TypeScript"],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop",
  },
  {
    name: "EcoTrack",
    description:
      "A sustainability dashboard that visualizes environmental impact data, tracks carbon footprints, and provides actionable insights for greener decisions.",
    tags: ["React", "D3.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop",
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
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 md:mb-16"
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

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading text="PROJECTS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 3 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 dark:hover:border-[#C3E41D]/40 hover:border-[#C3E41D]/60 transition-all duration-300 overflow-hidden group h-full">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-0">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <CardHeader className="pt-4">
                  <CardTitle
                    className="text-xl font-bold dark:text-white text-neutral-900"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {project.name}
                  </CardTitle>
                  <CardDescription
                    className="dark:text-neutral-400 text-neutral-600 leading-relaxed text-sm"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs dark:bg-neutral-800 dark:text-neutral-300 bg-neutral-100 text-neutral-600"
                    >
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
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
