"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiAward,
  FiBook,
  FiCpu,
  FiCalendar,
} from "react-icons/fi";

interface TimelineItem {
  _id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: "career" | "project" | "certificate" | "education";
  tags?: string[];
}

const fallbackTimeline: TimelineItem[] = [
  {
    _id: "1",
    year: "2026",
    title: "Full-Stack Software Developer",
    subtitle: "Independent Projects & Client Solutions",
    description:
      "Architected and deployed scalable MERN & Next.js web applications, integrating modern authentication systems and RESTful APIs.",
    category: "career",
    tags: ["Next.js", "React", "Node.js", "TypeScript", "TailwindCSS"],
  },
  {
    _id: "2",
    year: "2026",
    title: "Basic Robotics Workshop",
    subtitle: "RoboGenesis Workshop",
    description:
      "Completed hands-on training in basic robotics, microcontroller integration, and embedded systems programming.",
    category: "certificate",
    tags: ["Robotics", "Embedded Systems", "Hardware"],
  },
  {
    _id: "3",
    year: "2025 - 2026",
    title: "Complete Web Development Bootcamp",
    subtitle: "Programming Hero",
    description:
      "Mastered modern full-stack development, building production-grade applications with MongoDB, Express, React, and Node.",
    category: "education",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    _id: "4",
    year: "2024 - Present",
    title: "Diploma in Electrical & Electronics Engineering",
    subtitle: "Shyamoli Ideal Technical College",
    description:
      "Pursuing core engineering principles, circuit design, control systems, and electronics foundational theory.",
    category: "education",
    tags: ["EEE", "Circuit Design", "Electronics"],
  },
];

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/timeline`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTimeline(data);
        } else {
          setTimeline(fallbackTimeline);
        }
        setLoading(false);
      })
      .catch(() => {
        setTimeline(fallbackTimeline);
        setLoading(false);
      });
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "career":
        return <FiBriefcase />;
      case "certificate":
        return <FiAward />;
      case "education":
        return <FiBook />;
      default:
        return <FiCpu />;
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center font-mono text-neutral-400 animate-pulse">
        &gt; Retrieving historical logs...
      </div>
    );
  }

  return (
    <section id="timeline" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-16">
        <span className="text-xs font-mono text-blue-500 tracking-widest uppercase font-semibold">
          MILESTONES & JOURNEY
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Career Timeline
        </h2>
      </div>

      <div className="relative border-l-2 border-white/10 pl-6 md:pl-10 ml-4 md:ml-32 space-y-12">
        {timeline.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Icon Badge */}
            <div className="absolute -left-[43px] md:-left-[59px] top-0 h-10 w-10 rounded-full bg-neutral-900 border border-blue-500/40 text-blue-400 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:scale-110 group-hover:border-blue-500 transition-all">
              {getCategoryIcon(item.category)}
            </div>

            {/* Desktop Left Date Marker */}
            <div className="hidden md:block absolute -left-44 top-2 text-right w-32 font-mono text-xs text-neutral-400 font-bold">
              {item.year}
            </div>

            {/* Content Card */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md p-6 space-y-3 hover:border-blue-500/30 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="md:hidden flex items-center gap-1 text-xs font-mono text-blue-400 font-bold">
                  <FiCalendar /> {item.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-blue-400/80 mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
