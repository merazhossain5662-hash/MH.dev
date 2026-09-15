"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const badges = [
  "STUDENT",
  "PASSION FOR TECH",
  "LEARNER",
  "LINUX ENTHUSIAST",
  "FULL STACK DEVELOPER",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div className="relative z-20 max-w-5xl mx-auto space-y-16">
        {/* TOP SECTION */}
        <motion.div
          initial={isMounted ? { y: 30, opacity: 0 } : false}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center space-y-4"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
            Who Am I
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            A chronological journey through professional evolution and
            engineering milestones.
          </p>
        </motion.div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-14 pt-2">
          {/* Bio Text */}
          <motion.div
            initial={isMounted ? { x: -40, opacity: 0 } : false}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
              delay: 0.15,
            }}
            className="flex-1 text-gray-200 text-lg md:text-xl leading-relaxed font-normal space-y-2 pr-2"
          >
            I’m Meraz Hossain, based in Dhaka, Bangladesh. I design and build
            full-stack applications, with an increasing focus on Artificial
            Intelligence. My work centers on building scalable systems, solving
            complex problems clearly, and delivering practical, real-world
            solutions.
          </motion.div>

          {/* Animated Badges */}
          <motion.div
            variants={containerVariants}
            initial={isMounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true }}
            className="md:w-[380px] flex flex-wrap gap-2.5 justify-start md:justify-end pt-2 md:pt-0"
          >
            {badges.map((tag, idx) => (
              <motion.span
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-neutral-900/60 border border-white/10 backdrop-blur-md text-[11px] font-mono font-bold text-gray-300 tracking-wider shadow-lg hover:border-blue-500/50 hover:bg-neutral-800/80 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
