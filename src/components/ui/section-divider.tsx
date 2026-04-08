'use client';

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative py-4 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
        <motion.div
          className="flex-1 h-px dark:bg-neutral-800 bg-neutral-200"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C3E41D", opacity: 0.4 }} />
        </motion.div>
        <motion.div
          className="flex-1 h-px dark:bg-neutral-800 bg-neutral-200"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          style={{ transformOrigin: "right" }}
        />
      </div>
    </div>
  );
}
