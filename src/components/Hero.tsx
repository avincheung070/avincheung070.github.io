"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";
import content from "@/data/content.json";
import { useCallback, useEffect, useState } from "react";

const codeSnippets = [
  "const app = express();",
  "SELECT * FROM users",
  "git push origin main",
  "docker compose up -d",
  "npm run build",
  "async/await",
  "REST API",
  "<Component />",
  "useEffect(() => {})",
  "deploy: production",
  ".env.local",
  "middleware()",
  "GraphQL",
  "CI/CD Pipeline",
  "kubectl apply",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function FloatingCode() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = codeSnippets.map((text, i) => ({
    text,
    x: seededRandom(i * 3) * 100,
    y: seededRandom(i * 7 + 1) * 100,
    duration: 15 + seededRandom(i * 11 + 2) * 25,
    delay: i * 0.8,
    size: 10 + seededRandom(i * 13 + 3) * 3,
  }));

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="absolute font-mono whitespace-nowrap text-indigo-400/[0.07]"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.15, 0.08, 0.12, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}

const roles = {
  en: ["Full-Stack Developer", "Cloud Engineer", "PM & Coordinator", "AI Integrator"],
  zh: ["全端開發者", "雲端工程師", "PM & 協調者", "AI 工具整合"],
};

const easterEggRoles: string[] = (content as { easterEggRoles?: string[] }).easterEggRoles ?? [];

function TypingRole({ lang, overrideRoles }: { lang: "en" | "zh"; overrideRoles?: string[] | null }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const currentRoles = overrideRoles?.length ? overrideRoles : roles[lang];

  useEffect(() => {
    const role = currentRoles[roleIdx];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIdx === role.length) {
      const timeout = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((prev) => (prev + 1) % currentRoles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIdx((prev) => prev + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, currentRoles]);

  useEffect(() => {
    setCharIdx(0);
    setDeleting(false);
    setRoleIdx(0);
  }, [lang, overrideRoles]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text">{currentRoles[roleIdx].slice(0, charIdx)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1.1em] bg-indigo-400 ml-1 rounded-full"
      />
    </span>
  );
}

function OrbitRing() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[280, 380, 500].map((size, i) => (
        <motion.div
          key={size}
          className="absolute border border-indigo-500/[0.04] rounded-full"
          style={{
            width: size,
            height: size,
            left: -size / 2,
            top: -size / 2,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 30 + i * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/30"
            style={{ top: -3, left: size / 2 - 3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Particle burst on click ── */
interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

const PARTICLE_COLORS = ["#818cf8", "#a78bfa", "#c084fc", "#67e8f9", "#34d399"];
let particleId = 0;

function ClickParticles({ particles }: { particles: Particle[] }) {
  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            top: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  );
}

/* ── Avin interactive button ── */
function AvinButton({
  label,
  clicks,
  needed,
  easterEgg,
  onClick,
}: {
  label: string;
  clicks: number;
  needed: number;
  easterEgg: boolean;
  onClick: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const spawnParticles = useCallback(() => {
    const count = 8 + Math.floor(Math.random() * 6);
    const batch: Particle[] = Array.from({ length: count }, () => ({
      id: ++particleId,
      x: 0,
      y: 0,
      angle: Math.random() * Math.PI * 2,
      distance: 40 + Math.random() * 80,
      size: 3 + Math.random() * 5,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    setParticles((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !batch.includes(p)));
    }, 700);
  }, []);

  const handleClick = () => {
    onClick();
    spawnParticles();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250);
  };

  return (
    <span className="relative inline-block">
      {/* Idle: gentle float up/down — always visible, invites clicking */}
      <motion.button
        type="button"
        onClick={handleClick}
        className="gradient-text cursor-pointer select-none focus:outline-none relative"
        style={{ textShadow: "0 0 30px rgba(99,102,241,0.2)" }}
        aria-label={label}
        animate={
          isClicked
            ? {
                scale: [1, 1.18, 0.92, 1.05, 1],
                rotate: [0, -3, 3, 0],
                y: 0,
              }
            : {
                y: [0, -4, 0],
                scale: 1,
                rotate: 0,
              }
        }
        transition={
          isClicked
            ? { duration: 0.35, ease: "easeOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{
          scale: 1.05,
          textShadow: "0 0 40px rgba(129,140,248,0.4)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {label}

      </motion.button>

      {/* Click counter dots — subtle progress before activation */}
      {!easterEgg && clicks > 0 && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1 p-4 pt-5">
          {Array.from({ length: needed }, (_, i) => (
            <motion.span
              key={i}
              className="rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                backgroundColor: i < clicks ? "#818cf8" : "rgba(255,255,255,0.15)",
              }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              style={{ width: 4, height: 4 }}
            />
          ))}
        </span>
      )}

      {/* Particles container */}
      <span className="absolute inset-0 overflow-visible pointer-events-none">
        <ClickParticles particles={particles} />
      </span>

      {/* Easter egg activation flash */}
      <AnimatePresence>
        {easterEgg && (
          <motion.span
            className="absolute inset-[-20px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)",
            }}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </span>
  );
}

const AVIN_CLICKS_NEEDED = 7;

export default function Hero() {
  const { lang, t } = useLang();
  const [avinClicks, setAvinClicks] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      onMouseMove={handleMouse}
    >
      {/* Mouse-follow spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <FloatingCode />
      <OrbitRing />

      {/* Glow blobs */}
      <div className="glow-blob w-[500px] h-[500px] bg-indigo-600/20 -top-40 -left-40 animate-pulse-glow" />
      <div
        className="glow-blob w-[400px] h-[400px] bg-violet-600/15 bottom-20 right-[-100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="glow-blob w-[300px] h-[300px] bg-cyan-600/10 top-1/3 left-1/4 animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-24">
        {/* Status badge */}
        {/* 
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs text-emerald-400/80 font-medium">
            {lang === "en" ? "Open to opportunities" : "開放新機會"}
          </span>
        </motion.div>
*/}
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm md:text-base text-white/55 font-mono mb-3 tracking-wider"
        >
          {t.hero.greeting}
        </motion.p>

        {/* Name — 7 clicks = easter egg */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          <AvinButton
            label={t.hero.name}
            clicks={avinClicks}
            needed={AVIN_CLICKS_NEEDED}
            easterEgg={easterEgg}
            onClick={() => {
              const next = avinClicks + 1;
              setAvinClicks(next);
              if (next >= AVIN_CLICKS_NEEDED) setEasterEgg(true);
            }}
          />
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-xl md:text-2xl lg:text-3xl font-light mb-6 h-10"
        >
          <TypingRole lang={lang} overrideRoles={easterEgg ? easterEggRoles : null} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm md:text-base text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.hero.cta}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-3.5 text-white/65 hover:text-white border border-white/10 hover:border-white/25 rounded-full text-sm transition-all duration-300 hover:bg-white/[0.03]"
          >
            <MessageCircle size={16} />
            {t.hero.contact}
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator — positioned relative to the section, not the content box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
