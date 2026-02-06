"use client";

import { motion } from "framer-motion";

const items = [
  "Next.js",
  "React",
  ".NET C#",
  "Node.js",
  "Python",
  "PHP",
  "AWS",
  "Azure",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "AI Integration",
  "Full-Stack",
  "Project Management",
  "REST API",
  "TypeScript",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full py-6 overflow-hidden border-y border-white/[0.03] bg-white/[0.01]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#050510] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#050510] to-transparent z-10" />

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-max gap-6 md:gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/40 font-mono shrink-0"
            >
              <span className="w-1 h-1 rounded-full bg-indigo-500/40 shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
