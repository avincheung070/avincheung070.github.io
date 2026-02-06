"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import { Mail, Linkedin, MessageSquare, ArrowUpRight, UserPlus } from "lucide-react";
import contentData from "@/data/content.json";

const iconMap: Record<string, typeof Mail> = {
  email: Mail,
  linkedin: Linkedin,
  whatsapp: MessageSquare,
};

const colorMap: Record<string, { hover: string; icon: string }> = {
  email: {
    hover: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]",
    icon: "text-cyan-400",
  },
  linkedin: {
    hover: "hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(96,165,250,0.08)]",
    icon: "text-blue-400",
  },
  whatsapp: {
    hover: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.08)]",
    icon: "text-emerald-400",
  },
};

function generateVCard() {
  const v = contentData.vcard;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${v.lastName};${v.firstName};;;`,
    `FN:${[v.firstName, v.lastName].filter(Boolean).join(" ")}`,
    v.title ? `TITLE:${v.title}` : "",
    v.company ? `ORG:${v.company}` : "",
    v.email ? `EMAIL;TYPE=INTERNET:${v.email}` : "",
    v.phone ? `TEL;TYPE=CELL:${v.phone}` : "",
    v.website ? `URL:${v.website}` : "",
    v.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${v.linkedin}` : "",
    v.note ? `NOTE:${v.note}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([lines], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${v.firstName}${v.lastName ? "_" + v.lastName : ""}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Contact() {
  const { t } = useLang();

  return (
    <SectionWrapper id="contact">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <SectionTitle>{t.contact.title}</SectionTitle>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/65 text-base mb-2 mt-6"
        >
          {t.contact.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/45 text-sm mb-10"
        >
          {t.contact.cta}
        </motion.p>

        {/* Save to Contacts — vCard button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mb-10"
        >
          <motion.button
            onClick={generateVCard}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
          >
            <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
            {t.contact.saveContact}
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/8" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/8" />
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {t.contact.links.map((item, i) => {
            const Icon = iconMap[item.type] || Mail;
            const colors = colorMap[item.type] || colorMap.email;
            return (
              <motion.a
                key={item.type}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className={`glass-card rounded-xl px-6 py-4 flex items-center gap-3 transition-all duration-300 group ${colors.hover}`}
              >
                <div className="bg-white/5 p-2.5 rounded-lg">
                  <Icon size={20} className={`${colors.icon} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-white/45 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    {item.value}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
