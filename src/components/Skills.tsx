"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNextdotjs,
  SiShadcnui,
  SiTypescript,
  SiFlutter,
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
} from "react-icons/si";

interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

const stackData: SkillCategory[] = [
  {
    category: "FRONTEND",
    skills: [
      { name: "REACT", icon: SiReact },
      { name: "VITE", icon: SiVite },
      { name: "TAILWINDCSS", icon: SiTailwindcss },
      { name: "NEXT.JS", icon: SiNextdotjs },
      { name: "SHADCN-UI", icon: SiShadcnui },
      { name: "TYPESCRIPT", icon: SiTypescript },
    ],
  },
  {
    category: "MOBILE",
    skills: [{ name: "FLUTTER", icon: SiFlutter }],
  },
  {
    category: "BACKEND",
    skills: [
      { name: "NODE.JS", icon: SiNodedotjs },
      { name: "EXPRESS.JS", icon: SiExpress },
      { name: "MONGODB", icon: SiMongodb },
      { name: "MYSQL", icon: SiMysql },
      { name: "POSTGRESQL", icon: SiPostgresql },
    ],
  },
  {
    category: "TOOLS",
    skills: [
      { name: "GIT", icon: SiGit },
      { name: "PYTHON", icon: SiPython },
      { name: "DOCKER", icon: SiDocker },
      { name: "PRISMA", icon: SiPrisma },
      { name: "REDUX/ZUSTAND", icon: SiRedux },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 px-4 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          My Stack
        </h2>
        <p className="text-neutral-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          A curated selection of technologies I use to build high-performance
          products.
        </p>
      </div>

      {/* 2x2 Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stackData.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="p-6 md:p-8 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Category Header Tag */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                {cat.category}
              </span>
            </div>

            {/* Tech Icon Tiles */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {cat.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-neutral-950/60 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 hover:scale-[1.03]"
                  >
                    <Icon className="text-2xl md:text-3xl text-neutral-300 group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="mt-2 text-[10px] md:text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors duration-300 tracking-wider text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
