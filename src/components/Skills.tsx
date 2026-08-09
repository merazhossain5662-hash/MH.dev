"use client";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 max-w-5xl mx-auto px-6 border-t border-white/10"
    >
      <h2 className="text-2xl font-bold text-white mb-8">Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((s, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sm font-medium text-gray-200">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
