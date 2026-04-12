'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface Shortcut {
  keys: string;
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: 'Cmd+K / Ctrl+K', description: 'Command Palette' },
  { keys: '?', description: 'Toggle Shortcuts' },
  { keys: 'T', description: 'Toggle Theme' },
  { keys: 'H', description: 'Scroll to Home' },
  { keys: '↑ / ↓', description: 'Navigate Sections' },
];

export default function KeyboardShortcutsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard listener: ? key to toggle, click outside to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        togglePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [togglePanel]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        closePanel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closePanel]);

  // Escape to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closePanel]);

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-xl p-4 max-w-xs mb-2 shadow-xl"
          >
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-3 text-neutral-500"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Keyboard Shortcuts
            </h3>
            <div className="flex flex-col gap-2">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.keys}
                  className="flex items-center justify-between gap-3"
                >
                  <span
                    className="text-sm text-neutral-400"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {shortcut.description}
                  </span>
                  <span className="kbd">{shortcut.keys}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-white/5 dark:border-white/5 border-black/5">
              <span
                className="text-[10px] text-neutral-600 tracking-wider"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                PRESS <span className="kbd">ESC</span> TO CLOSE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info button */}
      <motion.button
        ref={buttonRef}
        onClick={togglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-full transition-colors duration-300 cursor-pointer"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        aria-label="Toggle keyboard shortcuts panel"
      >
        <Info className="w-4 h-4 text-neutral-400" />
      </motion.button>
    </div>
  );
}
