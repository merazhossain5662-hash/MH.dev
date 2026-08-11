"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNextdotjs,
  SiShadcnui,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiPython,
  SiDocker,
  SiPrisma,
  SiRedux,
  SiGraphql,
  SiPostman,
  SiSwagger,
  SiFastapi,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

const stackData: SkillCategory[] = [
  {
    id: "frontend",
    category: "FRONTEND",
    skills: [
      { name: "REACT", icon: SiReact },
      { name: "NEXT.JS", icon: SiNextdotjs },
      { name: "TAILWINDCSS", icon: SiTailwindcss },
      { name: "TYPESCRIPT", icon: SiTypescript },
      { name: "VITE", icon: SiVite },
      { name: "SHADCN-UI", icon: SiShadcnui },
    ],
  },
  {
    id: "backend",
    category: "BACKEND",
    skills: [
      { name: "NODE.JS", icon: SiNodedotjs },
      { name: "EXPRESS.JS", icon: SiExpress },
      { name: "MONGODB", icon: SiMongodb },
      { name: "POSTGRESQL", icon: SiPostgresql },
      { name: "MYSQL", icon: SiMysql },
    ],
  },
  {
    id: "tools",
    category: "TOOLS",
    skills: [
      { name: "GIT", icon: SiGit },
      { name: "PYTHON", icon: SiPython },
      { name: "DOCKER", icon: SiDocker },
      { name: "PRISMA", icon: SiPrisma },
      { name: "REDUX/ZUSTAND", icon: SiRedux },
    ],
  },
  {
    id: "apis",
    category: "APIS (REST & GRAPHQL)",
    skills: [
      { name: "REST API", icon: TbApi },
      { name: "GRAPHQL", icon: SiGraphql },
      { name: "POSTMAN", icon: SiPostman },
      { name: "SWAGGER", icon: SiSwagger },
      { name: "FASTAPI", icon: SiFastapi },
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
      // Pin section and step through accordion collapse on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stackData.length * 120}%`,
        pin: true,
        scrub: 0.6,
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

  // Animate accordion layout transitions with GSAP Flip / Stagger
  useEffect(() => {
    const activeCat = stackData[activeIndex].id;
    const activeEl = cardRefs.current[activeCat];

    if (!activeEl) return;

    // Animate inner skill tiles in active card
    const tiles = activeEl.querySelectorAll(".skill-tile");
    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.85, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
      },
    );
  }, [activeIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-16 pb-20"
    >
      <section
        id="skills"
        className="w-full px-4 md:px-12 max-w-4xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            My Tech Stack
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm">
            Scroll down to expand categories.
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {stackData.map((cat, idx) => (
              <div
                key={cat.id}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeIndex
                    ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    : "w-2 bg-neutral-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Collapsible Accordion Grid Container */}
        <div className="flex flex-col gap-3">
          {stackData.map((cat, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={cat.id}
                ref={(el) => {
                  cardRefs.current[cat.id] = el;
                }}
                className={`relative rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-md ${
                  isActive
                    ? "border-blue-500/60 bg-neutral-900/90 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                    : "border-white/10 bg-neutral-950/40 hover:border-white/20"
                }`}
              >
                {/* Header (Always Visible) */}
                <div
                  className={`flex items-center justify-between p-4 md:p-5 transition-colors duration-300 ${
                    isActive ? "border-b border-white/10 bg-white/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-1.5 h-4 rounded-full transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                          : "bg-neutral-600"
                      }`}
                    />
                    <span
                      className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-neutral-400"
                      }`}
                    >
                      {cat.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-0.5 rounded-full">
                      {cat.skills.length} ITEMS
                    </span>
                    <FiChevronDown
                      className={`text-neutral-400 transition-transform duration-300 ${
                        isActive ? "rotate-180 text-blue-400" : "rotate-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Collapsible Content Area */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 p-4 md:p-6"
                      : "grid-rows-[0fr] opacity-0 p-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                      {cat.skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className="skill-tile flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border border-white/5 bg-neutral-950/80 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300"
                          >
                            <Icon className="text-2xl md:text-3xl text-neutral-200 group-hover:text-blue-400" />
                            <span className="mt-2 text-[10px] md:text-xs font-semibold text-neutral-300 tracking-wider text-center">
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
