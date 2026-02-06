"use client";

import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import { Languages, Zap, FolderKanban, Clock, Rocket } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = {
  en: [
    { icon: Clock, value: 5, suffix: "+", label: "Years Experience", color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { icon: FolderKanban, value: 15, suffix: "+", label: "Projects Delivered", color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { icon: Zap, value: 30, suffix: "%", label: "Efficiency Boost via AI", color: "text-amber-400", bg: "bg-amber-400/10" },
    { icon: Rocket, value: 4, suffix: "", label: "Weeks to Ship", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ],
  zh: [
    { icon: Clock, value: 5, suffix: "+", label: "年開發經驗", color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { icon: FolderKanban, value: 15, suffix: "+", label: "專案交付", color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { icon: Zap, value: 70, suffix: "%", label: "AI 效率提升", color: "text-amber-400", bg: "bg-amber-400/10" },
    { icon: Rocket, value: 4, suffix: "", label: "週內交付", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ],
};

export default function About() {
  const { lang, t } = useLang();

  const paragraphs = [t.about.p1, t.about.p2, t.about.p3, t.about.p4, t.about.p5];

  const languages = [
    { name: t.about.lang_cantonese, level: t.about.lang_speak, pct: 100 },
    { name: t.about.lang_mandarin, level: t.about.lang_speak, pct: 100 },
    { name: t.about.lang_english, level: t.about.lang_speak, pct: 100 },
    { name: t.about.lang_japanese, level: t.about.lang_listen, pct: 50 },
  ];

  const currentStats = stats[lang];

  return (
    <SectionWrapper id="about">
      <SectionTitle>{t.about.title}</SectionTitle>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-14">
        {currentStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 text-center border-gradient group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white/90 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-white/55">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Text content */}
        <div className="md:col-span-2 space-y-5">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-white/65 leading-relaxed text-[15px]"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Languages card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 h-fit border-gradient"
        >
          <div className="flex items-center gap-2 mb-5">
            <Languages size={18} className="text-violet-400" />
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t.about.languages}
            </h3>
          </div>
          <div className="space-y-4">
            {languages.map((l) => (
              <div key={l.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-white/80 text-sm font-medium">{l.name}</p>
                  <p className="text-white/50 text-[11px]">{l.level}</p>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
