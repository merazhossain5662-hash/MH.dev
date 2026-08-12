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
  SiDaisyui,
  SiHeroui,
  SiPostman,
  SiBetterauth,
} from "react-icons/si";
import { TbApi, TbBrandMysql, TbMail } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  name: string;
  icon: React.ElementType;
  color: string;
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
      { name: "CSS3", icon: IoLogoCss3, color: "#1572B6" },
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
      { name: "DAISYUI", icon: SiDaisyui, color: "#5A0EF8" },
      { name: "HEROUI", icon: SiHeroui, color: "#0070F3" },
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
      { name: "BETTER AUTH", icon: SiBetterauth, color: "#3B82F6" },
    ],
  },
  {
    id: "tools",
    category: "TOOLS & SERVICES",
    skills: [
      { name: "POSTMAN", icon: SiPostman, color: "#FF6C37" },
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
      // Light scrub (0.4) for crisp mobile responsiveness without lag
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stackData.length * 50}%`, // Reduced height so sections flip cleanly with minimal scrolling
        pin: true,
        scrub: 0.4,
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

  // Stagger animation when switching categories
  useEffect(() => {
    const activeCat = stackData[activeIndex].id;
    const activeEl = cardRefs.current[activeCat];

    if (!activeEl) return;

    const tiles = activeEl.querySelectorAll(".skill-tile");
    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.85, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.out",
      },
    );
  }, [activeIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-12 px-4 md:px-8"
    >
      <section
        id="skills"
        className="w-full max-w-5xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            My Tech Stack
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm tracking-wide">
            Scroll down to step through categories.
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {stackData.map((cat, idx) => (
              <div
                key={cat.id}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
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
                    ? "border-blue-500/50 bg-neutral-900/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                    : "border-white/10 bg-neutral-950/20 opacity-50 hover:opacity-80"
                }`}
                style={{
                  boxShadow: isActive
                    ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 0 25px rgba(59, 130, 246, 0.15)"
                    : "none",
                }}
              >
                {/* Header Bar */}
                <div
                  className={`flex items-center justify-between p-4 px-6 transition-colors duration-300 ${
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

                {/* Collapsible Content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 p-4 md:p-5"
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
                            className="skill-tile group relative flex flex-col items-center justify-center p-3.5 rounded-2xl border border-white/5 bg-neutral-900/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-white/30 hover:bg-neutral-800/80 hover:shadow-lg cursor-pointer"
                            style={{
                              boxShadow:
                                "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            {/* Brand Color Icon with Scale Glow */}
                            <Icon
                              className="text-2xl md:text-3xl transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
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
