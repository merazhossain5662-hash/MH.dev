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

// Register GSAP ScrollTrigger plugin (100% free)
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
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP ScrollTrigger to step through categories on scroll
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 20%",
        onEnter: () => setActiveCategory("frontend"),
      });

      // Animate section entrance
      gsap.from(".skills-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid elements when active category changes
  useEffect(() => {
    const activeCard = cardsRef.current[activeCategory];
    if (!activeCard) return;

    // Stagger animate skill icons inside the newly expanded card
    const tiles = activeCard.querySelectorAll(".skill-tile");
    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.8, y: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 px-4 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <div className="skills-header text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          My Tech Stack
        </h2>
        <p className="text-neutral-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Hover or scroll across categories to reveal full modern toolsets.
        </p>
      </div>

      {/* GSAP Morphing Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[500px]">
        {stackData.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              ref={(el) => {
                cardsRef.current[cat.id] = el;
              }}
              onMouseEnter={() => setActiveCategory(cat.id)}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative cursor-pointer rounded-2xl border transition-all duration-500 ease-out p-6 md:p-8 flex flex-col justify-between overflow-hidden backdrop-blur-md ${
                isActive
                  ? "lg:col-span-8 border-blue-500/50 bg-neutral-900/80 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                  : "lg:col-span-4 border-white/10 bg-neutral-950/40 hover:border-white/20 hover:bg-neutral-900/50"
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-5 rounded-full transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                        : "bg-neutral-600"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? "text-blue-400" : "text-neutral-400"
                    }`}
                  >
                    {cat.category}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-0.5 rounded-full">
                  {cat.skills.length} ITEMS
                </span>
              </div>

              {/* Dynamic Skill Icon Grid */}
              <div
                className={`grid gap-3 transition-all duration-300 ${
                  isActive
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 opacity-100 mt-2"
                    : "grid-cols-2 opacity-60 scale-95"
                }`}
              >
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="skill-tile group relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border border-white/5 bg-neutral-950/80 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300"
                    >
                      <Icon
                        className={`text-2xl md:text-3xl transition-all duration-300 ${
                          isActive
                            ? "text-neutral-200 group-hover:text-blue-400 group-hover:scale-110"
                            : "text-neutral-500"
                        }`}
                      />
                      <span className="mt-2 text-[10px] md:text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors duration-300 tracking-wider text-center">
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
  );
}
