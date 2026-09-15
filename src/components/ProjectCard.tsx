"use client";

import React from "react";
import { Project } from "./Projects";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group">
      <div>
        {/* Project Image or Cool Placeholder */}
        <div className="relative w-full h-48 bg-neutral-950 overflow-hidden border-b border-white/10">
          {project.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950/30 p-4 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                <FiCode className="text-2xl" />
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                CLASSIFIED SOURCE
              </span>
              <p className="text-[11px] font-mono text-neutral-500 mt-1">
                // Live preview currently unavailable
              </p>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {project.category && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase">
                {project.category}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Links */}
      <div className="p-6 pt-0 flex items-center gap-4 text-xs font-mono text-neutral-400 border-t border-white/5 mt-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors pt-4"
          >
            <FiGithub /> Source Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors pt-4"
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
