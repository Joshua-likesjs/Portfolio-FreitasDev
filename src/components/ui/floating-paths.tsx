"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 40 }, (_, i) => {
    const yOffset = (i / 40) * 2400;
    return {
      id: i,
      d: `M-${340 - i * 4 * position} ${yOffset} C-${
        340 - i * 4 * position
      } ${yOffset + 200} -${270 - i * 4 * position} ${yOffset + 400} ${
        130 - i * 4 * position
      } ${yOffset + 600}C${530 - i * 4 * position} ${yOffset + 800} ${
        600 - i * 4 * position
      } ${yOffset + 1000} ${600 - i * 4 * position} ${yOffset + 1200}`,
      width: 0.5 + i * 0.02,
    };
  });

  return (
    <svg
      className="w-full h-full text-slate-950 dark:text-white"
      viewBox={`0 0 696 ${2400 + 1200}`}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Background Paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.06 + path.id * 0.012}
          initial={{ pathLength: 0.2, opacity: 0.4 }}
          animate={{
            pathLength: 1,
            opacity: [0.2, 0.5, 0.2],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

export default function FloatingPathsBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
