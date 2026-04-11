'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from "react";
import { Menu, X, ChevronDown, Download, Sun, Moon, Search } from "lucide-react";
import Image from "next/image";

/* ─── CSS keyframes (inject once) ─── */
const STYLE_ID = "portfolio-hero-keyframes";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const sheet = document.createElement("style");
  sheet.id = STYLE_ID;
  sheet.textContent = `
    @keyframes rotate-ring {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .animate-rotate-ring {
      animation: rotate-ring 4s linear infinite;
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(8px); }
    }
    .animate-bounce-slow {
      animation: bounce-slow 2s ease-in-out infinite;
    }
    @keyframes blink-cursor {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *::before,
    .theme-transitioning *::after {
      transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease !important;
    }
  `;
  document.head.appendChild(sheet);
}

/* ─── BlurText ─── */
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
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
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

/* ─── TypewriterText ─── */
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsStarted(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isStarted) return;
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayText(currentPhrase.substring(0, displayText.length + 1)),
          typeSpeed
        );
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayText(displayText.substring(0, displayText.length - 1)),
          deleteSpeed
        );
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 300);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, isDeleting, currentPhraseIndex, phrases, typeSpeed, deleteSpeed, pauseTime, isStarted]);

  return (
    <p
      className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white inline-flex items-center"
      style={style}
    >
      {displayText}
      <span
        className="inline-block w-0.5 h-1em ml-1 align-middle animate-[blink-cursor_1s_step-end_infinite]"
        style={{
          backgroundColor: "#C3E41D",
          opacity: isStarted ? 1 : 0,
        }}
      />
    </p>
  );
};

/* ─── ProfileImage (single source of truth) ─── */
const ProfileImage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setOpacity(0), 1500);
    return () => clearTimeout(t);
  }, []);

  // Square sizing so rounded-full makes a circle
  const size = "w-[80px] h-[180px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] lg:w-[300px] lg:h-[400px]";

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        opacity,
        transition: "opacity 1.5s ease-out",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
    >
      <div className="relative">
        {/* Rotating gradient ring */}
  
        {/* Solid background circle to mask inner area */}
        <div
          className="absolute rounded-full"
          style={{
            background: isDark ? "hsl(0, 0%, 7%)" : "hsl(0, 0%, 100%)",
            inset: "-5px",
          }}
        />
        {/* Image */}
        <div
          className={`relative z-10 ${size} rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer`}
        >
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
  );
};

/* ─── Theme helpers ─── */
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

/* ─── Main Component ─── */
export default function PortfolioHero() {
  const isDark = useSyncExternalStore(subscribeToTheme, getStoredTheme, () => true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThemeToast, setShowThemeToast] = useState(false);
  const mountedRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* scroll → header glass */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* sync DOM dark class on theme change (skip first mount to avoid flash) */
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      // Ensure initial state is correct
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  /* active section observer */
  useEffect(() => {
    const ids = [
      "home", "about", "projects", "experience", "education", "writing",
      "testimonials", "faq", "pricing", "achievements", "tools",
      "skills-radar", "contribution-graph", "timeline-journey", "now",
      "quotes", "newsletter", "contact",
    ];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* close menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  /* keyboard shortcut: T → toggle theme */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
      if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        toggleTheme();
        setShowThemeToast(true);
        setTimeout(() => setShowThemeToast(false), 1500);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.classList.toggle("dark", next);
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 500);
  }, [isDark]);

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
      style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)" }}
    >
      {/* Theme toast */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-200 pointer-events-none">
        <div
          className="px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          style={{
            fontFamily: "'Fira Code', monospace",
            backgroundColor: isDark ? "hsl(0, 0%, 12%)" : "hsl(0, 0%, 95%)",
            border: `1px solid ${isDark ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 85%)"}`,
            color: isDark ? "hsl(0, 0%, 80%)" : "hsl(0, 0%, 30%)",
            opacity: showThemeToast ? 1 : 0,
            transform: showThemeToast ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          Theme toggled
        </div>
      </div>

      {/* ─── Header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        style={{
          backgroundColor: isScrolled
            ? isDark ? "hsla(0, 0%, 0%, 0.8)" : "hsla(0, 0%, 98%, 0.8)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isScrolled
            ? `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 90%)"}`
            : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" strokeWidth={2} /> : <Menu className="w-8 h-8" strokeWidth={2} />}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-50 md:w-60 shadow-2xl mt-2 ml-4 p-4 rounded-xl z-100 border"
                style={{
                  backgroundColor: isDark ? "hsla(0, 0%, 5%, 0.9)" : "hsla(0, 0%, 98%, 0.9)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  borderColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 88%)",
                }}
              >
                {menuItems.map((item) => {
                  const id = item.href.replace("#", "");
                  const active = activeSection === id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 rounded"
                      style={{
                        color: active ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                        backgroundColor: active ? (isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 93%)") : "transparent",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#C3E41D"; }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = active ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";
                      }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Signature */}
          <div
            className="text-4xl"
            style={{
              color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            A
          </div>

          {/* Theme toggle */}
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
              {isDark ? <Moon className="w-3.5 h-3.5 text-black" /> : <Sun className="w-3.5 h-3.5 text-yellow-500" />}
            </div>
          </button>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <BlurText
              text="FREITAS"
              delay={100}
              animateBy="letters"
              direction="top"
              className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            />

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

            {/* Single profile image — no duplicates */}
            <ProfileImage isDark={isDark} />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="absolute bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-44 xl:bottom-48 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center gap-4">
            <MagneticButton
              onClick={() => handleNavClick("#contact")}
              bg="#C3E41D"
              color="black"
              hoverShadow="0 4px 20px rgba(195,228,29,0.2)"
            >
              Get in Touch
            </MagneticButton>

            <MagneticButton
              onClick={() => handleNavClick("#projects")}
              bg="transparent"
              color={isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 20%)"}
              border={isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 80%)"}
              hoverBorder="#C3E41D"
              hoverColor="#C3E41D"
              icon={<Download className="w-4 h-4" />}
            >
              Resume
            </MagneticButton>
          </div>
        </div>

        {/* Typewriter tagline */}
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

        {/* Scroll indicator + Cmd+K */}
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

/* ─── MagneticButton (extracted to DRY up hover/translate logic) ─── */
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  bg: string;
  color: string;
  border?: string;
  hoverBorder?: string;
  hoverColor?: string;
  hoverShadow?: string;
  icon?: React.ReactNode;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  bg,
  color,
  border,
  hoverBorder,
  hoverColor,
  hoverShadow,
  icon,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    backgroundColor: bg,
    color,
    border: border ? `1px solid ${border}` : "none",
    fontFamily: "'Fira Code', monospace",
  });

  const reset = useCallback(() => {
    setStyle((s) => ({
      ...s,
      transform: "translate(0px, 0px)",
      borderColor: border ? border : undefined,
      color,
      boxShadow: "none",
    }));
  }, [border, color]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
      style={style}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(-4, Math.min(4, (e.clientX - rect.left - rect.width / 2) * 0.3));
        const y = Math.max(-4, Math.min(4, (e.clientY - rect.top - rect.height / 2) * 0.3));
        setStyle((s) => ({
          ...s,
          transform: `translate(${x}px, ${y}px)`,
          borderColor: hoverBorder,
          color: hoverColor || color,
          boxShadow: hoverShadow || "none",
        }));
      }}
      onMouseLeave={reset}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};