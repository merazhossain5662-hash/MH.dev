"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaScrewdriverWrench } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io";

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
  const [activeTab, setActiveTab] = useState<string>("languages");
  const currentCategory = stackData.find((item) => item.id === activeTab)!;

  return (
    // Clean section padding without forcing full viewport height
    <section
      id="skills"
      className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-8 bg-transparent"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          My Tech Stack
        </h2>
        <p className="text-neutral-400 text-xs md:text-sm tracking-wide">
          Select a category to view technologies.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {stackData.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all duration-300 ${
                isActive
                  ? "text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "text-neutral-400 hover:text-white border border-white/5 hover:border-white/20 bg-neutral-900/30"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Glassmorphic Grid Window */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 md:p-8 rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentCategory.skills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300"
                  >
                    <Icon
                      className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                    />
                    <span className="mt-2 text-[11px] font-mono font-semibold text-neutral-300 group-hover:text-white text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
