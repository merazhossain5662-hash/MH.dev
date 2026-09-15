"use client";

import React, { useEffect, useState } from "react";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<
    "all" | "fullstack" | "frontend" | "backend"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    const projectCategory = project.category || "fullstack";
    return projectCategory === filter;
  });

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono text-blue-500 tracking-widest uppercase font-semibold">
            WORKS & APPS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
            Featured Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(["all", "fullstack", "frontend", "backend"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-neutral-900 text-neutral-400 border border-white/10 hover:border-white/20"
              }`}
            >
              {cat === "all" ? "ALL PROJECTS" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading or Content State inside consistent container */}
      {loading ? (
        <div className="py-24 text-center font-mono text-neutral-400 animate-pulse">
          &gt; Loading repositories from matrix...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-neutral-900/30 p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <MdFolderOff className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-white">No Projects Found</h3>
          <p className="text-sm font-mono text-neutral-400 max-w-md">
            No active builds found in the{" "}
            <span className="text-blue-400 uppercase">[{filter}]</span>{" "}
            directory yet. Check back soon for new deployments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
