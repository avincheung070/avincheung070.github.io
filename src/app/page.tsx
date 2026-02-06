"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LangProvider } from "@/context/LangContext";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { SectionDivider } from "@/components/SectionWrapper";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LangProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <TechStack />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </motion.div>
    </LangProvider>
  );
}
