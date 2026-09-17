"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ProjectCard from "./ProjectCard";
import { MdFolderOff } from "react-icons/md";

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  category?: "fullstack" | "frontend" | "backend";
}

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "StartHubX",
    description: "Startup platform showcasing and managing startup workflows.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    category: "fullstack",
    liveUrl: "https://start-hub-x-client.vercel.app/",
    githubUrl: "https://github.com",
  },
  {
    _id: "2",
    title: "DocAppoint",
    description: "Doctor appointment booking system with automated scheduling.",
    techStack: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS"],
    category: "fullstack",
    githubUrl: "https://github.com",
  },
  {
    _id: "3",
    title: "BorrowBox",
    description: "A platform for managing and sharing items seamlessly.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    category: "frontend",
    githubUrl: "https://github.com",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<
    "all" | "fullstack" | "frontend" | "backend"
  >("all");
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLElement>(null);

  // Award-level smooth scroll entrance scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.92, 1, 1, 0.95],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/projects`;
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    const projectCategory = project.category || "fullstack";
    return projectCategory === filter;
  });

  return (
    <motion.section
      ref={containerRef}
      style={{ scale, opacity }}
      id="projects"
      className="py-24 px-6 max-w-6xl mx-auto space-y-12"
    >
      {/* Header with Glass Pill Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase font-bold">
            // WORKS & APPS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-1 tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-950/60 border border-white/10 backdrop-blur-md">
          {(["all", "fullstack", "frontend", "backend"] as const).map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterHighlight"
                    className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {cat === "all" ? "ALL PROJECTS" : cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Content with Spring Stagger */}
      {loading ? (
        <div className="py-24 text-center font-mono text-neutral-400 animate-pulse">
          &gt; Loading repositories from matrix...
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-dashed border-white/15 bg-neutral-900/30 p-12 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <MdFolderOff className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-white">
                No Projects Found
              </h3>
              <p className="text-sm font-mono text-neutral-400 max-w-md">
                No active builds found in the{" "}
                <span className="text-blue-400 uppercase">[{filter}]</span>{" "}
                directory.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={filter}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.section>
  );
}
