"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({ className, children, interactive = false, ...props }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

  function onMouseMove(event) {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    rotateX.set(((y / rect.height) - 0.5) * -8);
    rotateY.set(((x / rect.width) - 0.5) * 8);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      style={interactive ? { transform, transformStyle: "preserve-3d" } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={interactive ? { y: -5 } : undefined}
      className={cn("glass rounded-lg p-5", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
