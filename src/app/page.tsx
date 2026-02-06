"use client";

import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SectionDivider } from "@/components/SectionWrapper";

export default function Home() {
  return (
    <LangProvider>
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
    </LangProvider>
  );
}
