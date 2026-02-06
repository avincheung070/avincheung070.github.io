"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import { Code2, Server, Database, Cloud, Sparkles } from "lucide-react";

const stackData = [
  {
    key: "frontend",
    icon: Code2,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    gradient: "from-cyan-500/20 to-blue-500/5",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    key: "backend",
    icon: Server,
    color: "text-green-400",
    bg: "bg-green-400/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]",
    gradient: "from-green-500/20 to-emerald-500/5",
    items: [".NET C#", "PHP", "Node.js", "Python"],
  },
  {
    key: "database",
    icon: Database,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]",
    gradient: "from-amber-500/20 to-orange-500/5",
    items: ["MySQL", "SQL Server", "PostgreSQL"],
  },
  {
    key: "cloud",
    icon: Cloud,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]",
    gradient: "from-blue-500/20 to-indigo-500/5",
    items: ["AWS", "Azure", "Hostinger", "Cloudways"],
  },
] as const;

type StackKey = "frontend" | "backend" | "database" | "cloud" | "other";

export default function TechStack() {
  const { t } = useLang();

  return (
    <SectionWrapper id="stack">
      <SectionTitle>{t.stack.title}</SectionTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {stackData.map((category, ci) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: ci * 0.12 }}
              className={`group glass-card rounded-2xl overflow-hidden border-gradient transition-all duration-500 ${category.glow}`}
            >
              {/* Gradient top bar */}
              <div className={`h-1 bg-gradient-to-r ${category.gradient}`} />

              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <motion.div
                    className={`${category.bg} p-2.5 rounded-xl`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={20} className={category.color} />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                    {t.stack[category.key as StackKey] as string}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: ci * 0.1 + ii * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-xs font-medium text-white/75 bg-white/[0.04] rounded-lg border border-white/[0.06] hover:border-white/15 hover:text-white/90 hover:bg-white/[0.08] transition-all duration-200 cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Other / Soft skills */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="group glass-card rounded-2xl overflow-hidden mt-5 border-gradient group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
      >
        <div className="h-1 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/5" />
        <div className="p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <motion.div
              className="bg-violet-400/10 p-2.5 rounded-xl"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles size={20} className="text-violet-400" />
            </motion.div>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              {t.stack.other}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.stack.other_items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 text-xs font-medium text-white/75 bg-white/[0.04] rounded-lg border border-white/[0.06] hover:border-violet-500/30 hover:text-white/90 hover:bg-white/[0.08] transition-all duration-200 cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
