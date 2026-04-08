'use client';

import React from "react";
import { Heart, Github, Linkedin, Twitter, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
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
    <footer className="py-12 px-4 dark:bg-[hsl(0,0%,3%)] bg-[hsl(0,0%,98%)] dark:border-neutral-800 border-neutral-200 border-t transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Top row: Nav links */}
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
        <div className="w-full h-px dark:bg-neutral-800 bg-neutral-200 mb-8" />

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
                className="p-2 rounded-lg dark:text-neutral-500 text-neutral-400 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors"
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
