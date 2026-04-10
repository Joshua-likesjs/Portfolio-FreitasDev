'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';

// ─── Playlist data ────────────────────────────────────────────────────
interface Track {
  title: string;
  artist: string;
  duration: number; // seconds
  gradient: string; // album art gradient
}

const playlist: Track[] = [
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 355, // 5:55
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Strobe',
    artist: 'Deadmau5',
    duration: 633, // 10:33
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    title: 'Time',
    artist: 'Pink Floyd',
    duration: 426, // 7:06
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: 'Digital Love',
    artist: 'Daft Punk',
    duration: 298, // 4:58
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    title: 'Midnight City',
    artist: 'M83',
    duration: 243, // 4:03
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Equalizer bars ───────────────────────────────────────────────────
function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  const bars = [
    { delay: '0s', maxHeight: '60%' },
    { delay: '0.15s', maxHeight: '90%' },
    { delay: '0.3s', maxHeight: '45%' },
    { delay: '0.1s', maxHeight: '75%' },
    { delay: '0.25s', maxHeight: '55%' },
  ];

  return (
    <div className="flex items-end gap-[3px] h-5 w-5">
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] rounded-full"
          style={{ maxHeight: bar.maxHeight }}
          animate={
            isPlaying
              ? {
                  height: ['15%', bar.maxHeight, '25%', bar.maxHeight, '15%'],
                }
              : { height: '15%' }
          }
          transition={
            isPlaying
              ? {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: parseFloat(bar.delay),
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────
export default function MusicPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0-100 percentage
  const [currentTime, setCurrentTime] = useState(0);

  const track = playlist[currentTrackIndex];
  const durationSeconds = track.duration;

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;

    const totalMs = durationSeconds * 1000;
    const startTime = Date.now() - (progress / 100) * totalMs;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalMs) * 100, 100);
      setProgress(pct);
      setCurrentTime((pct / 100) * durationSeconds);

      if (pct >= 100) {
        // Auto-advance to next track
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setProgress(0);
        setCurrentTime(0);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex, durationSeconds, progress]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  // Derive a stable key for track change animations from index
  const trackKey = currentTrackIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md w-full"
    >
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(195, 228, 29, 0.07)' }}
        />

        {/* Currently listening label */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          {/* Pulsing green dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.2em] dark:text-neutral-500 text-neutral-400 font-semibold"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Currently listening
          </span>
        </div>

        {/* Album art + track info */}
        <div className="flex items-center gap-4 relative z-10">
          {/* Album art placeholder with gradient */}
          <motion.div
            key={`art-${trackKey}`}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-lg"
          >
            <div
              className="absolute inset-0"
              style={{ background: track.gradient }}
            />
            {/* Vinyl grooves overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black/20 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>
            {/* Spinning animation when playing */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={
                isPlaying
                  ? { duration: 8, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.5 }
              }
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.06) 25%, transparent 50%)',
              }}
            />
          </motion.div>

          {/* Track info + equalizer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${trackKey}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="min-w-0 flex-1"
                >
                  <h4
                    className="text-sm font-bold truncate dark:text-neutral-100 text-neutral-800"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {track.title}
                  </h4>
                  <p
                    className="text-xs dark:text-neutral-400 text-neutral-500 truncate mt-0.5"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {track.artist}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Equalizer bars */}
              <EqualizerBars isPlaying={isPlaying} />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 relative z-10">
          {/* Clickable progress area */}
          <div
            className="relative h-1.5 rounded-full dark:bg-neutral-800 bg-neutral-200 cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
              setCurrentTime((Math.max(0, Math.min(100, pct)) / 100) * durationSeconds);
            }}
            role="slider"
            aria-label="Track progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: '#C3E41D',
                width: `${progress}%`,
              }}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {/* Hover expand effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity dark:bg-neutral-700 bg-neutral-300" style={{ width: `${progress}%` }} />
            {/* Thumb */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundColor: '#C3E41D',
                left: `calc(${progress}% - 7px)`,
              }}
              whileHover={{ scale: 1.2 }}
            />
          </div>

          {/* Time stamps */}
          <div className="flex justify-between mt-1.5">
            <span
              className="text-[10px] dark:text-neutral-500 text-neutral-400 tabular-nums"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              className="text-[10px] dark:text-neutral-500 text-neutral-400 tabular-nums"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {formatTime(durationSeconds)}
            </span>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mt-3 relative z-10">
          {/* Track indicator */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <Music2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C3E41D' }} />
            <span
              className="text-[10px] dark:text-neutral-600 text-neutral-400 truncate"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {currentTrackIndex + 1}/{playlist.length}
            </span>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-1">
            <motion.button
              onClick={handlePrev}
              className="p-2 rounded-full dark:text-neutral-400 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 hover:bg-neutral-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4" fill="currentColor" />
            </motion.button>

            <motion.button
              onClick={handlePlayPause}
              className="p-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: '#C3E41D',
                color: '#000',
              }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(195, 228, 29, 0.3)' }}
              whileTap={{ scale: 0.92 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause className="w-5 h-5" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="p-2 rounded-full dark:text-neutral-400 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 hover:bg-neutral-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" fill="currentColor" />
            </motion.button>
          </div>

          {/* Volume indicator (decorative) */}
          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <Volume2 className="w-3.5 h-3.5 flex-shrink-0 dark:text-neutral-600 text-neutral-400" />
            {/* Mini volume bar */}
            <div className="w-12 h-1 rounded-full dark:bg-neutral-800 bg-neutral-200 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ backgroundColor: '#C3E41D', width: '72%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
