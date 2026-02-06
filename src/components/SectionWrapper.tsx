"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: Props) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
    >
      <span className="gradient-text">{children}</span>
    </motion.h2>
  );
}

export function SectionDivider() {
  return <div className="section-divider max-w-6xl mx-auto" />;
}
