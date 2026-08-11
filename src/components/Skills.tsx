"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the skills section while scrolling through all 4 categories
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stackData.length * 100}%`, // Gives room for full section scroll
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Map scroll progress (0 to 1) to active category index (0, 1, 2, 3)
          const newIndex = Math.min(
            Math.floor(self.progress * stackData.length),
            stackData.length - 1,
          );
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      <section
        ref={containerRef}
        id="skills"
        className="w-full py-12 px-4 md:px-12 max-w-6xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            My Tech Stack
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto text-xs md:text-sm leading-relaxed">
            Scroll down to step through full modern toolsets.
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

        {/* Static Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stackData.map((cat, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={cat.id}
                className={`relative rounded-2xl border transition-all duration-500 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md ${
                  isActive
                    ? "border-blue-500/60 bg-neutral-900/80 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[1.01]"
                    : "border-white/5 bg-neutral-950/30 opacity-40 grayscale-[40%]"
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-4 rounded-full transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                          : "bg-neutral-700"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-neutral-500"
                      }`}
                    >
                      {cat.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-0.5 rounded-full">
                    {cat.skills.length} ITEMS
                  </span>
                </div>

                {/* Skill Icon Tiles */}
                <div className="grid grid-cols-3 gap-3">
                  {cat.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "border-white/10 bg-neutral-900/90 text-white shadow-md"
                            : "border-white/5 bg-neutral-950/40 text-neutral-600"
                        }`}
                      >
                        <Icon
                          className={`text-2xl md:text-3xl transition-colors duration-300 ${
                            isActive ? "text-neutral-200" : "text-neutral-600"
                          }`}
                        />
                        <span
                          className={`mt-2 text-[10px] font-semibold tracking-wider text-center transition-colors duration-300 ${
                            isActive ? "text-neutral-300" : "text-neutral-600"
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
