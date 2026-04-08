'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from "react";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import Image from "next/image";
import ParticleNetwork from "@/components/ui/particle-network";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

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

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

function getStoredTheme(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("portfolio-theme");
  if (saved !== null) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToTheme(callback: () => void) {
 window.addEventListener("storage", callback);
 const mq = window.matchMedia("(prefers-color-scheme: dark)");
 mq.addEventListener("change", callback);
 return () => {
    window.removeEventListener("storage", callback);
    mq.removeEventListener("change", callback);
  };
}

export default function PortfolioHero() {
  const isDark = useSyncExternalStore(subscribeToTheme, getStoredTheme, () => true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const mountedRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track scroll for header glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync DOM class with isDark state
  useEffect(() => {
    if (!mountedRef.current) {
 mountedRef.current = true;
 } else {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDark]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "experience", "education", "writing", "testimonials", "faq", "achievements", "tools", "newsletter", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;
    localStorage.setItem("portfolio-theme", newTheme ? "dark" : "light");
    // Add smooth transition class
    document.documentElement.classList.add("theme-transitioning");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Force re-render by dispatching storage event
    window.dispatchEvent(new Event("storage"));
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  }, [isDark]);

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const menuItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      id="home"
      className="min-h-screen text-foreground transition-colors relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Particle Network Animation */}
      <ParticleNetwork isDark={isDark} />

      {/* Animated gradient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] animate-pulse"
          style={{
            background: "radial-gradient(circle, #C3E41D 0%, transparent 70%)",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] animate-pulse"
          style={{
            background: "radial-gradient(circle, #C3E41D 0%, transparent 70%)",
            animationDuration: "10s",
            animationDelay: "4s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse, #C3E41D 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        style={{
          backgroundColor: isScrolled
            ? (isDark ? "hsla(0, 0%, 0%, 0.8)" : "hsla(0, 0%, 98%, 0.8)")
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isScrolled
            ? `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 90%)"}`
            : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] shadow-2xl mt-2 ml-4 p-4 rounded-xl z-[100] dark:border-neutral-800 border-neutral-200 border"
                style={{
                  backgroundColor: isDark ? "hsla(0, 0%, 5%, 0.9)" : "hsla(0, 0%, 98%, 0.9)",
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
              >
                {menuItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 rounded"
                      style={{
                        color: isActive ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                        backgroundColor: isActive ? (isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 93%)") : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#C3E41D";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? "#C3E41D" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="text-4xl" style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            A
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="FREITAS"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Role subtitle */}
            <div className="mt-4">
              <BlurText
                text="Creative Developer & Designer"
                delay={60}
                animateBy="words"
                direction="top"
                className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase justify-center text-neutral-500"
                style={{ fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer ring-4 ring-transparent hover:ring-[#C3E41D]/30">
                <Image
                  src="https://i.postimg.cc/y8DnKLyK/albert-dera-ILip77-Sbm-OE-unsplash.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="absolute bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-44 xl:bottom-48 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-[#C3E41D20] hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: "#C3E41D",
                color: "black",
                fontFamily: "'Fira Code', monospace",
              }}
            >
              <span>Get in Touch</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("#projects")}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider border transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                borderColor: isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 80%)",
                color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 20%)",
                fontFamily: "'Fira Code', monospace",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C3E41D";
                e.currentTarget.style.color = "#C3E41D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 80%)";
                e.currentTarget.style.color = isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 20%)";
              }}
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 xl:bottom-32 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Designing human experiences in code."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow transition-colors duration-300"
          aria-label="Scroll down"
          onClick={() => handleNavClick("#about")}
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
