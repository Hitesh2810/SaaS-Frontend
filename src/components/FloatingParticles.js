"use client";

import { motion } from "framer-motion";

export default function FloatingParticles({ count = 22 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/45 shadow-[0_0_24px_rgba(45,212,191,0.55)]"
          style={{ left: `${(index * 47) % 100}%`, top: `${(index * 29) % 100}%` }}
          animate={{ y: [-12, 16, -12], opacity: [0.25, 0.85, 0.25], scale: [1, 1.5, 1] }}
          transition={{ duration: 5 + (index % 7), repeat: Infinity, delay: index * 0.13 }}
        />
      ))}
    </div>
  );
}
