'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from "react";
import { Menu, X, ChevronDown, Download, Sun, Moon, Search } from "lucide-react";
import Image from "next/image";

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

// Typewriter rotating text component
interface TypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  style?: React.CSSProperties;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typeSpeed = 50,
  deleteSpeed = 30,
  pauseTime = 2000,
  style,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start after initial blur animation completes
  useEffect(() => {
    const startTimer = setTimeout(() => setIsStarted(true), 2200);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Pause at full text
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        // Move to next phrase
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 300);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentPhraseIndex, phrases, typeSpeed, deleteSpeed, pauseTime, isStarted]);

  return (
    <p
      className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white inline-flex items-center"
      style={style}
    >
      {displayText}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{
          backgroundColor: "#C3E41D",
          animation: "blink-cursor 1s step-end infinite",
          opacity: isStarted ? 1 : 0,
        }}
      />
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
    const sectionIds = ["home", "about", "projects", "experience", "education", "writing", "testimonials", "faq", "pricing", "achievements", "tools", "skills-radar", "contribution-graph", "timeline-journey", "now", "quotes", "newsletter", "contact"];
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
    { label: "PRICING", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      id="home"
      className="min-h-screen text-foreground transition-colors relative"
      style={{
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >


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
            className="relative w-16 h-8 rounded-full transition-all duration-300 hover:shadow-[0_0_12px_rgba(195,228,29,0.2)]"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 88%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isDark ? "#C3E41D" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 text-black" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-yellow-500" />
              )}
            </div>
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
              <div className="relative">
                {/* Animated rotating gradient ring */}
                <div
                  className="absolute inset-[-6px] rounded-full animate-rotate-ring"
                  style={{
                    background: 'conic-gradient(from 0deg, #C3E41D 0%, transparent 25%, transparent 50%, #C3E41D 75%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute inset-[-6px] rounded-full"
                  style={{
                    background: isDark ? 'hsl(0, 0%, 7%)' : 'hsl(0, 0%, 100%)',
                    inset: '-5px',
                  }}
                />
                {/* Inner image container */}
                <div className="relative z-10 w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <Image
                    src="https://i.postimg.cc/y8DnKLyK/albert-dera-ILip77-Sbm-OE-unsplash.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                    loading="eager"
                    priority
                  />
                </div>
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
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const maxOffset = 4;
                const clampedX = Math.max(-maxOffset, Math.min(maxOffset, x * 0.3));
                const clampedY = Math.max(-maxOffset, Math.min(maxOffset, y * 0.3));
                e.currentTarget.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0px, 0px)";
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
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const maxOffset = 4;
                const clampedX = Math.max(-maxOffset, Math.min(maxOffset, x * 0.3));
                const clampedY = Math.max(-maxOffset, Math.min(maxOffset, y * 0.3));
                e.currentTarget.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 80%)";
                e.currentTarget.style.color = isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 20%)";
                e.currentTarget.style.transform = "translate(0px, 0px)";
              }}
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Tagline - Typewriter rotating text */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 xl:bottom-32 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <TypewriterText
              phrases={[
                "Designing human experiences in code.",
                "Building products people love.",
                "Turning ideas into interactive reality.",
                "Crafting interfaces that feel alive.",
                "Where design meets engineering.",
              ]}
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator + Cmd+K hint */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick("#about")}
            className="animate-bounce-slow transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
          </button>
          <button
            type="button"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md dark:bg-white/5 bg-black/5 dark:text-neutral-500 text-neutral-400 text-[10px] uppercase tracking-widest hover:dark:bg-white/10 hover:bg-black/10 hover:dark:text-neutral-300 hover:text-neutral-600 transition-colors"
            style={{ fontFamily: "'Fira Code', monospace" }}
            aria-label="Open command palette (Ctrl+K)"
          >
            <Search className="w-3 h-3" />
            <span>⌘K</span>
          </button>
        </div>
      </main>
    </div>
  );
}
