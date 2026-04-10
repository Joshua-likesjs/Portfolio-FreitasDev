'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'availability-banner-dismissed';

export default function AvailabilityBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
  if (!dismissed) setVisible(true);  // Só lê localStorage DEPOIS do mount
  }, []); 

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="relative w-full py-2.5 px-4 bg-[hsl(0,0%,95%)] dark:bg-[hsl(0,0%,6%)] z-50"
        >
          {/* Gradient border bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #C3E41D 50%, transparent 100%)',
            }}
          />

          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Left side: pulsing dot + text */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span
                className="text-xs uppercase tracking-widest text-foreground/80"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Available for freelance work
              </span>
            </div>

            {/* Right side: updated date + dismiss */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs text-muted-foreground hidden sm:inline"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Updated Jan 2025
              </span>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-md hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Dismiss availability banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile-only updated date below */}
          <div className="sm:hidden mt-1.5 ml-18px">
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Updated Jan 2025
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
