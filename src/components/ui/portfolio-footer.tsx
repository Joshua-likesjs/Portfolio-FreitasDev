'use client';

import React from "react";
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills-radar" },
  { label: "Tools", href: "#tools" },
  { label: "Activity", href: "#contribution-graph" },
  { label: "Journey", href: "#journey" },
  { label: "Now", href: "#now" },
  { label: "Newsletter", href: "#newsletter" },
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
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-16 px-4 dark:bg-[hsl(0,0%,3%)] bg-[hsl(0,0%,98%)] transition-colors relative overflow-hidden">
      {/* Decorative top gradient border */}
      <div className="gradient-line absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            onClick={() => handleClick("#contact")}
            className="glass-button inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-[#C3E41D20] hover:-translate-y-0.5"
            style={{
              backgroundColor: "#C3E41D",
              color: "black",
              fontFamily: "'Fira Code', monospace",
              border: "none",
            }}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </button>
        </div>

        {/* Divider */}
        <div className="gradient-line mb-10" />

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-400 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors cursor-pointer"
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
          <p style={{ fontFamily: "'Fira Code', monospace" }} className="text-xs uppercase tracking-wider dark:text-neutral-500 text-neutral-400">
            &copy; {new Date().getFullYear()} Freitas. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg dark:text-neutral-500 text-neutral-400 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-all duration-300 hover:-translate-y-0.5"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="flex items-center gap-1.5 text-xs dark:text-neutral-600 text-neutral-400" style={{ fontFamily: "'Antic', sans-serif" }}>
            Built with <Heart className="w-3 h-3 text-[#C3E41D] fill-[#C3E41D]" /> and passion
          </p>
        </div>
      </div>
    </footer>
  );
}
