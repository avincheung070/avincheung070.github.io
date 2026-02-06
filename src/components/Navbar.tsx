"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/context/LangContext";

const navLinks = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "stack", href: "#stack" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { lang, t, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050510]/80 backdrop-blur-xl "
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight">
            <span className="gradient-text">A</span>
            <span className="text-white/90">vin</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-white/65 hover:text-white transition-colors duration-200"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
            >
              <Globe size={14} />
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-sm text-white/50 hover:text-white transition-colors px-2 py-1 rounded border border-white/10"
            >
              <Globe size={14} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white/70 hover:text-white"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050510]/95 backdrop-blur-xl pt-20 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-light text-white/70 hover:text-white transition-colors"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
