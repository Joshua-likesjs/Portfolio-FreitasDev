'use client';

import React from "react";
import { Heart } from "lucide-react";

export default function PortfolioFooter() {
  return (
    <footer
      className="py-8 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] dark:border-neutral-800 border-neutral-200 border-t transition-colors"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm dark:text-neutral-500 text-neutral-400">
        <p style={{ fontFamily: "'Fira Code', monospace" }} className="text-xs uppercase tracking-wider">
          © 2024 Alex Kane. All rights reserved.
        </p>

        <p className="flex items-center gap-1.5 text-xs" style={{ fontFamily: "'Antic', sans-serif" }}>
          Built with <Heart className="w-3 h-3 text-[#C3E41D] fill-[#C3E41D]" /> and passion.
        </p>
      </div>
    </footer>
  );
}
