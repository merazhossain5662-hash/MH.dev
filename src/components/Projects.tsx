"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "BorrowBox",
    description: "A platform for managing and sharing items seamlessly.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Hub Assistant",
    description: "Multi-model chat and content creation assistant dashboard.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "#",
    live: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 max-w-5xl mx-auto px-6 border-t border-white/10"
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,111,238,0.12)_0%,transparent_100%)] pointer-events-none" />{" "}
      <h2 className="text-2xl font-bold text-white mb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-white/10 bg-white/5 flex flex-col justify-between hover:border-white/20 transition-all"
          >
            <div>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
              >
                <FaGithub /> Source
              </a>
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
