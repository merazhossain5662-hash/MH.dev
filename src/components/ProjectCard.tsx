"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";
import { Project } from "./Projects";

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt physics
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Spotlight positions inside the card
  const spotlightX = useSpring(
    useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]),
    { stiffness: 200, damping: 25 },
  );
  const spotlightY = useSpring(
    useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]),
    { stiffness: 200, damping: 25 },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-blue-500/40 shadow-2xl"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Card Content Container with 3D Depth */}
      <div className="space-y-5" style={{ transform: "translateZ(30px)" }}>
        {/* Holographic Header Thumbnail */}
        <div className="relative h-44 w-full rounded-2xl bg-neutral-950/80 border border-white/5 flex flex-col items-center justify-center overflow-hidden group-hover:border-blue-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <>
              <FiCode className="text-4xl text-neutral-600 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500 relative z-10" />
              <span className="mt-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase group-hover:text-neutral-300 transition-colors relative z-10">
                CLASSIFIED SOURCE
              </span>
            </>
          )}

          {/* Glowing bottom line accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>

        {/* Title & Category Badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
            {project.title}
          </h3>
          {project.category && (
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              {project.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-neutral-950/60 border border-white/10 text-[10px] font-mono text-neutral-300 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div
        className="flex items-center gap-5 pt-6 border-t border-white/5 mt-6 relative z-10"
        style={{ transform: "translateZ(40px)" }}
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-400 hover:text-white transition-colors group/link"
          >
            <FiGithub className="text-sm group-hover/link:scale-110 transition-transform" />
            <span>Source Code</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            <FiExternalLink className="text-sm group-hover/link:scale-110 transition-transform" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
