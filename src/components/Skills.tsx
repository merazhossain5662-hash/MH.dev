"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiTailwindcss,
  SiGreensock,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiJsonwebtokens,
} from "react-icons/si";
import { TbApi, TbBrandMysql, TbMail } from "react-icons/tb";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  name: string;
  icon: React.ElementType;
  color: string; // Official brand color hex
}

interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

const stackData: SkillCategory[] = [
  {
    id: "languages",
    category: "LANGUAGES",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JAVASCRIPT", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TYPESCRIPT", icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", icon: TbBrandMysql, color: "#4479A1" },
    ],
  },
  {
    id: "frameworks",
    category: "FRAMEWORKS & LIBRARIES",
    skills: [
      { name: "REACT", icon: SiReact, color: "#61DAFB" },
      { name: "NEXT.JS", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "EXPRESS.JS", icon: SiExpress, color: "#EEEEEE" },
      { name: "NODE.JS", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "TAILWIND CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ],
  },
  {
    id: "databases",
    category: "DATABASES",
    skills: [
      { name: "POSTGRESQL", icon: SiPostgresql, color: "#336791" },
      { name: "MONGODB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "apis",
    category: "APIS & AUTH",
    skills: [
      { name: "REST API", icon: TbApi, color: "#009688" },
      { name: "GRAPHQL", icon: SiGraphql, color: "#E10098" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
      { name: "BETTER AUTH", icon: IoShieldCheckmarkSharp, color: "#3B82F6" },
    ],
  },
  {
    id: "tools",
    category: "TOOLS & SERVICES",
    skills: [
      { name: "NODEMAILER", icon: TbMail, color: "#22B573" },
      { name: "DEV TOOLS", icon: FaScrewdriverWrench, color: "#A855F7" },
    ],
  },
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned section with high inertia scrub for smooth, weighted scroll feel
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stackData.length * 120}%`,
        pin: true,
        scrub: 1.2, // Ultra-smooth inertia delay
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * stackData.length),
            stackData.length - 1,
          );
          setActiveIndex(index);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Stagger animate skill icons when active index switches
  useEffect(() => {
    const activeCat = stackData[activeIndex].id;
    const activeEl = cardRefs.current[activeCat];

    if (!activeEl) return;

    const tiles = activeEl.querySelectorAll(".skill-tile");
    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.8, y: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 md:px-8"
    >
      <section
        id="skills"
        className="w-full max-w-5xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            My Tech Stack
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm tracking-wide">
            Scroll down to step through full toolsets.
          </p>

          {/* iPhone Pill Progress Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {stackData.map((cat, idx) => (
              <div
                key={cat.id}
                className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                  idx === activeIndex
                    ? "w-8 bg-blue-500 shadow-[0_0_12px_#3b82f6]"
                    : "w-2 bg-neutral-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {stackData.map((cat, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={cat.id}
                ref={(el) => {
                  cardRefs.current[cat.id] = el;
                }}
                className={`relative rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-2xl border ${
                  isActive
                    ? "border-blue-500/50 bg-neutral-900/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                    : "border-white/10 bg-neutral-950/20 opacity-50 hover:opacity-80"
                }`}
                style={{
                  boxShadow: isActive
                    ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 0 30px rgba(59, 130, 246, 0.15)"
                    : "none",
                }}
              >
                {/* iPhone Glass Header Bar */}
                <div
                  className={`flex items-center justify-between p-4.5 px-6 transition-colors duration-300 ${
                    isActive
                      ? "border-b border-white/10 bg-white/[0.03]"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-blue-500 shadow-[0_0_10px_#3b82f6] scale-125"
                          : "bg-neutral-600"
                      }`}
                    />
                    <span
                      className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {cat.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium text-neutral-400 border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {cat.skills.length} ITEMS
                    </span>
                    <FiChevronDown
                      className={`text-neutral-400 transition-transform duration-500 ${
                        isActive ? "rotate-180 text-blue-400" : "rotate-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Collapsible Grid Content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 p-5"
                      : "grid-rows-[0fr] opacity-0 p-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {cat.skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className="skill-tile group relative flex flex-col items-center justify-center p-3.5 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md hover:bg-neutral-800/60 hover:border-white/20 transition-all duration-300 hover:scale-[1.03]"
                            style={{
                              boxShadow:
                                "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            {/* Brand Colored Glow on Active/Hover */}
                            <Icon
                              className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110"
                              style={{ color: skill.color }}
                            />
                            <span className="mt-2 text-[10px] md:text-xs font-semibold text-neutral-200 group-hover:text-white tracking-wider text-center">
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
