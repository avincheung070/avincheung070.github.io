"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import {
  ExternalLink,
  Lock,
  CreditCard,
  Globe,
  ShoppingBag,
  Gem,
  Box,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import projectsData from "@/data/projects.json";

/* ---- Icon map ---- */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CreditCard,
  Globe,
  ShoppingBag,
  Gem,
  Box,
};

/* ---- Types from JSON ---- */
type ProjectGalleryItem = {
  image: string;
  label: string;
};

type ProjectData = (typeof projectsData.projects)[number];

/* ---- Project Fullscreen Modal ---- */
function ProjectModal({
  projectIdx,
  onClose,
}: {
  projectIdx: number;
  onClose: () => void;
}) {
  const { lang, t } = useLang();
  const data = projectsData.projects[projectIdx];
  const content = data[lang];
  const Icon = iconMap[data.icon] || Box;
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const gallery = data.gallery as ProjectGalleryItem[];
  const hasUrl = !!content.url;

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="project-modal-overlay flex items-center justify-center p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        layoutId={`project-card-${projectIdx}`}
        className="w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "rgba(12, 12, 28, 0.98)",
          border: `1px solid ${data.accentHex}20`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Top accent bar */}
        <div className={`h-1 bg-gradient-to-r ${data.accent}`} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`${data.accentBg} w-9 h-9 rounded-lg flex items-center justify-center`}>
              <Icon size={18} className={data.accentText} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/95">{content.title}</h2>
              <p className={`text-xs ${data.accentText} opacity-70`}>{content.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content — 50/50 split on desktop */}
        <div className="flex-1 overflow-auto flex flex-col md:flex-row min-h-0">
          {/* LEFT: Gallery — 50% */}
          <div className="w-full md:w-1/2 flex flex-col min-w-0 border-r-0 md:border-r border-white/5">
            {/* Big preview */}
            <div className="relative p-4 md:p-5 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="w-full relative rounded-xl overflow-hidden bg-black/30 aspect-video"
                >
                  <Image
                    src={gallery[activeSlide].image}
                    alt={gallery[activeSlide].label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Scan line animation */}
                  <motion.div
                    className="absolute inset-x-0 h-px opacity-30 pointer-events-none"
                    style={{ background: data.accentHex }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Label overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-xs font-medium text-white/80">{gallery[activeSlide].label}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur text-white/60 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur text-white/60 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Slide counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="group p-1"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? "w-6"
                          : "w-1.5 bg-white/25 group-hover:bg-white/45"
                      }`}
                      style={
                        idx === activeSlide ? { background: data.accentHex } : undefined
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div
              ref={galleryRef}
              className="gallery-scroll flex gap-2.5 px-4 md:px-5 pb-4 md:pb-5 overflow-x-auto"
            >
              {gallery.map((g, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`gallery-thumb shrink-0 w-24 md:w-28 ${
                    idx === activeSlide ? "active" : ""
                  }`}
                  style={
                    idx === activeSlide
                      ? { borderColor: `${data.accentHex}60` }
                      : undefined
                  }
                >
                  <div className="aspect-video rounded-[10px] overflow-hidden relative bg-black/30">
                    <Image
                      src={g.image}
                      alt={g.label}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <p className="text-[9px] md:text-[10px] text-white/45 mt-1 truncate px-0.5">
                    {g.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info panel — 50% */}
          <div className="w-full md:w-1/2 overflow-y-auto">
            <div className="p-5 md:p-6 space-y-5">
              {/* Description */}
              <div>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {lang === "en" ? "Description" : "描述"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Features */}
              {content.features && (
                <div>
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                    {lang === "en" ? "Features" : "功能"}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {content.features}
                  </p>
                </div>
              )}

              {/* Role */}
              <div>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {lang === "en" ? "Role" : "角色"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">{content.role}</p>
              </div>

              {/* Result */}
              <div>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {lang === "en" ? "Result" : "成果"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {content.result}
                </p>
              </div>

              {/* Screens tags */}
              <div>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {lang === "en" ? "Screens" : "截圖"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {gallery.map((g) => (
                    <button
                      key={g.label}
                      onClick={() =>
                        setActiveSlide(gallery.findIndex((x) => x.label === g.label))
                      }
                      className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/65 transition-colors cursor-pointer"
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visit site button */}
              {hasUrl && (
                <a
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm ${data.accentText} hover:opacity-80 transition-opacity px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 mt-2`}
                >
                  <ExternalLink size={14} />
                  {t.projects.viewSite}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---- Project Card ---- */
function ProjectCard({
  data,
  index,
  onClick,
}: {
  data: ProjectData;
  index: number;
  onClick: () => void;
}) {
  const { lang } = useLang();
  const content = data[lang];
  const Icon = iconMap[data.icon] || Box;
  const hasUrl = !!content.url;
  const gallery = data.gallery as ProjectGalleryItem[];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="glow-border cursor-pointer group"
      style={
        { "--glow-color": data.glowColor } as React.CSSProperties
      }
    >
      <div className="relative rounded-2xl overflow-hidden bg-[rgba(10,10,22,0.95)]">
        {/* Mouse-follow spotlight inside card */}
        <div
          className="absolute w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            left: mousePos.x - 96,
            top: mousePos.y - 96,
            background: `radial-gradient(circle, ${data.glowColor.replace("0.5", "0.07")} 0%, transparent 70%)`,
          }}
        />

        {/* Colored accent top bar */}
        <div
          className={`h-0.5 bg-gradient-to-r ${data.accent} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Card content */}
        <div className="p-6 md:p-7 relative">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              className={`${data.accentBg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={22} className={data.accentText} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className={`text-xs font-mono ${data.accentText} opacity-60`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-white/95 group-hover:text-white transition-colors">
                  {content.title}
                </h3>
                {!hasUrl && (
                  <span className="flex items-center gap-1 text-[11px] text-white/35 bg-white/5 px-2 py-0.5 rounded-full">
                    <Lock size={9} />
                    Internal
                  </span>
                )}
              </div>
              <p className={`text-sm ${data.accentText} opacity-60 mb-2`}>
                {content.subtitle}
              </p>
              <p className="text-[14px] text-white/55 leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">
                {content.description}
              </p>
            </div>

            {/* Expand hint */}
            <motion.div
              className="mt-2 shrink-0 p-2 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Maximize2
                size={16}
                className="text-white/15 group-hover:text-white/50 transition-colors"
              />
            </motion.div>
          </div>

          {/* Gallery preview strip — real images */}
          <div className="flex gap-2 mt-5 overflow-hidden">
            {gallery.slice(0, 4).map((g, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + gi * 0.06 }}
                className="h-14 md:h-16 flex-1 rounded-lg relative overflow-hidden opacity-60 group-hover:opacity-90 transition-opacity duration-500 bg-black/30"
              >
                <Image
                  src={g.image}
                  alt={g.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 200px"
                />
                <div className="absolute bottom-1 left-1.5">
                  <span className="text-[8px] text-white/50 drop-shadow-lg">{g.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Main Projects Section ---- */
export default function Projects() {
  const { t } = useLang();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <SectionWrapper id="projects">
      <SectionTitle>{t.projects.title}</SectionTitle>

      <div className="grid gap-5 mt-12">
        {projectsData.projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            data={project}
            index={i}
            onClick={() => setSelectedIdx(i)}
          />
        ))}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <ProjectModal
            projectIdx={selectedIdx}
            onClose={() => setSelectedIdx(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
