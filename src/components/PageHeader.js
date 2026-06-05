"use client";

import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </motion.div>
  );
}
