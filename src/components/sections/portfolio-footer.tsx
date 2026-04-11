'use client';

import React, { useRef, useCallback } from "react";
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp, Code2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills-radar" },
  { label: "Tools", href: "#tools" },
  { label: "Activity", href: "#contribution-graph" },
  { label: "Journey", href: "#timeline-journey" },
  { label: "Quotes", href: "#quotes" },
  { label: "Now", href: "#now" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:freitas@freitas.dev", label: "Email" },
];

export default function PortfolioFooter() {
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCtaMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxOffset = 3;
    const offsetX = (x / (rect.width / 2)) * maxOffset;
    const offsetY = (y / (rect.height / 2)) * maxOffset;
    btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, []);

  const handleCtaMouseLeave = useCallback(() => {
    const btn = ctaButtonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  }, []);

  return (
    <footer
      className="relative overflow-hidden transition-colors border-t dark:from-[#0a0a0a] dark:to-[#111111] from-[#f8f8f8] to-[#f0f0f0] dark:bg-linear-to-b bg-linear-to-b"
      style={{ paddingTop: 0 }}
    >
      {/* ========== Animated Gradient Top Border ========== */}
      <div
        className="absolute top-0 left-0 right-0 h-px animate-gradient-slide"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(195, 228, 29, 0.4), transparent, rgba(195, 228, 29, 0.4), transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* ========== Animated SVG Wave Divider ========== */}
      <div className="relative w-full -mt-px" aria-hidden="true">
        <svg
          className="relative block w-full h-15 sm:h-17.5 md:h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1 — back wave, subtle */}
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            className="fill-neutral-200/60 dark:fill-white/3"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z;
                M0,50 C240,10 480,70 720,30 C960,60 1200,10 1440,50 L1440,80 L0,80 Z;
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z
              "
            />
          </path>
          {/* Layer 2 — middle wave */}
          <path
            d="M0,50 C360,10 720,70 1080,30 C1260,15 1380,55 1440,45 L1440,80 L0,80 Z"
            className="fill-neutral-300/50 dark:fill-white/5"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,50 C360,10 720,70 1080,30 C1260,15 1380,55 1440,45 L1440,80 L0,80 Z;
                M0,30 C360,65 720,15 1080,55 C1260,65 1380,20 1440,35 L1440,80 L0,80 Z;
                M0,50 C360,10 720,70 1080,30 C1260,15 1380,55 1440,45 L1440,80 L0,80 Z
              "
            />
          </path>
          {/* Layer 3 — front wave, strongest */}
          <path
            d="M0,55 C180,35 360,65 540,45 C720,25 900,60 1080,40 C1260,20 1380,50 1440,35 L1440,80 L0,80 Z"
            className="fill-neutral-100 dark:fill-[#0a0a0a]"
          >
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
                M0,55 C180,35 360,65 540,45 C720,25 900,60 1080,40 C1260,20 1380,50 1440,35 L1440,80 L0,80 Z;
                M0,35 C180,60 360,25 540,55 C720,65 900,30 1080,50 C1260,60 1380,25 1440,45 L1440,80 L0,80 Z;
                M0,55 C180,35 360,65 540,45 C720,25 900,60 1080,40 C1260,20 1380,50 1440,35 L1440,80 L0,80 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* ========== Footer Content ========== */}
      <div className="max-w-6xl mx-auto relative z-10 px-4 py-16">
        {/* Top section with CTA */}
        <div className="text-center mb-12">
          <p
            className="text-2xl md:text-3xl font-bold mb-4 dark:text-white text-neutral-900"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Let&apos;s work together
          </p>
          <p
            className="text-base dark:text-neutral-400 text-neutral-500 mb-6 max-w-md mx-auto"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <button
            ref={ctaButtonRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            onClick={() => handleClick("#contact")}
            className="glass-button inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer"
            style={{
              backgroundColor: "#C3E41D",
              color: "black",
              fontFamily: "'Fira Code', monospace",
              border: "none",
              transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
            }}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </button>
        </div>

        {/* Divider */}
        <div className="gradient-line mb-10" />

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="link-underline text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-400 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="gradient-line mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright + Back to top */}
          <div className="flex items-center gap-3">
            <p
              style={{ fontFamily: "'Fira Code', monospace" }}
              className="text-xs uppercase tracking-wider dark:text-neutral-500 text-neutral-400"
            >
              &copy; {new Date().getFullYear()} Freitas. All rights reserved.
            </p>
            <span className="dark:text-neutral-700 text-neutral-300">|</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider dark:text-neutral-500 text-neutral-400 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "'Fira Code', monospace" }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              Top
            </button>
          </div>

          {/* Social Icons — subtle bounce on hover */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg dark:text-neutral-500 text-[#C3E41D] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(195,228,29,0.3)]"
                style={{ transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease, color 0.3s ease" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                }}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Made with section */}
          <p
            className="flex items-center gap-1.5 text-xs dark:text-neutral-600 text-neutral-400"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Made with
            <Heart className="w-3 h-3 text-[#C3E41D] fill-[#C3E41D] animate-pulse" />
            and
            <Code2 className="w-3 h-3 text-[#C3E41D]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
