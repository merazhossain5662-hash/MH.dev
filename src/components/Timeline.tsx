"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

interface TimelineItem {
  year: string;
  title: string;
  insight?: string;
  isCurrent?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    year: "2026",
    title:
      "Focused on mastering advanced tools and preparing for professional opportunities.",
    insight:
      "Deepening expertise in modern Next.js architectures, performance optimizations, interactive UI design systems, and real-time canvas animations.",
    isCurrent: true,
  },
  {
    year: "2025",
    title:
      "Began exploring Artificial Intelligence and its practical applications.",
    insight:
      "Integrated generative AI APIs into web platforms, experimented with LLM interfaces, and focused on building intelligent user experiences.",
    isCurrent: false,
  },
  {
    year: "2023",
    title:
      "Advanced into modern web development by building full-stack projects.",
    insight:
      "Mastered React, Node.js, and modern CSS frameworks like Tailwind CSS, transitioning from fundamental frontend layouts to complex full-stack web applications.",
    isCurrent: false,
  },
];

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleInsight = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="timeline"
      className="relative py-20 px-4 md:px-16 max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-xs md:text-lg font-bold uppercase tracking-[0.3em] text-blue-500 border-b border-blue-500/40 pb-1">
          TIMELINE
        </span>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 md:pl-10">
        {/* Continuous Vertical Connecting Line */}
        <div className="absolute left-[11px] md:left-[19px] top-3 bottom-3 w-[2px] bg-white/10" />

        <div className="space-y-10">
          {timelineData.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col gap-2 group"
              >
                {/* Node Indicator Dot */}
                <div className="absolute -left-[30px] md:-left-[46px] top-1.5 flex items-center justify-center z-10">
                  {item.isCurrent ? (
                    // Solid Blue Glowing Node for Current Year
                    <div className="w-3 h-3 rounded-full bg-blue-500  animate-pulse ring-4 ring-black shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  ) : (
                    // Hollow Blue Ring for Past Years
                    <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
                  )}
                </div>

                {/* Year Label */}
                <span className="text-sm font-bold text-neutral-500 tracking-wider">
                  {item.year}
                </span>

                {/* Event Card */}
                <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-transparent backdrop-blur-xs transition-all duration-300 hover:border-white/20 hover:backdrop-blur-sm shadow-xl">
                  <h3 className="text-lg  font-extrabold text-white leading-relaxed">
                    {item.title}
                  </h3>

                  {/* Expandable Insight Section */}
                  {item.insight && (
                    <div className="mt-4 pt-2">
                      <button
                        onClick={() => toggleInsight(index)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 tracking-wider hover:text-blue-400 transition-colors uppercase"
                      >
                        {isExpanded ? (
                          <>
                            <FiMinus className="text-sm" /> READ LESS
                          </>
                        ) : (
                          <>
                            <FiPlus className="text-sm" /> READ INSIGHT
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-neutral-400 leading-relaxed border-l-2 border-blue-500/40 pl-3"
                        >
                          {item.insight}
                        </motion.p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
