'use client';

import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const pct = totalHeight > 0 ? (current / totalHeight) * 100 : 0;
      setProgress(pct);

      if (pct >= 99.5 && !isComplete) {
        setIsComplete(true);
      } else if (pct < 95) {
        setIsComplete(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isComplete]);

  return (
    <div className="fixed top-0 left-0 right-0 z-60 h-3px">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C3E41D, #a8bf0e)",
          boxShadow: "0 0 10px rgba(195, 228, 29, 0.5), 0 2px 8px rgba(195, 228, 29, 0.25)",
          borderRadius: "0 2px 2px 0",
          animation: isComplete ? "flash-complete 0.6s ease" : "none",
        }}
      />
    </div>
  );
}
