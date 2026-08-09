"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiLink,
} from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-24 px-4 md:px-16 overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-20 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-md rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            AVAILABLE FOR WORK
          </div>

          {/* Name Container with Fixed Background Watermark */}
          <div className="relative">
            <span className="absolute -left-2 -top-16 md:-top-24 text-[160px] md:text-[280px] font-black text-white/9 leading-none select-none pointer-events-none z-0 tracking-tighter">
              MH
            </span>

            <div className="relative z-10 pt-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
                Meraz Hossain
              </h1>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-500 mt-2 leading-none">
                Full Stack Developer
              </h2>
            </div>
          </div>

          {/* Paragraph */}
          <p className="text-neutral-400 md:text-base font-semibold leading-relaxed max-w-lg pt-2">
            Full-stack engineer specializing in scalable systems and AI-driven
            solutions. Crafting high-performance digital products with precision
            and purpose.
          </p>

          {/* Action Buttons & Social Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* LIQUID FILL BUTTON */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              className="group relative inline-flex items-center justify-center px-7 py-4 rounded-full text-md font-bold overflow-hidden border border-white bg-white text-black transition-colors duration-500 ease-out hover:border-blue-500 hover:text-white"
            >
              {/* Liquid Wave Layer */}
              <span className="absolute inset-0 z-0 bg-gradient-to-t from-blue-600 to-blue-500 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 rounded-full" />
              <span className="relative z-10">Selected Works</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="px-6 py-4 rounded-full text-md bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-[0_0_25px_rgba(37,99,235,0.45)]"
            >
              Get in Touch <FiSend className="text-xs" />
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pl-4 text-neutral-400 border-l border-white/10">
              {[
                { icon: FiGithub, href: "https://github.com" },
                { icon: FiLinkedin, href: "https://linkedin.com" },
                { icon: FiTwitter, href: "https://twitter.com" },
                { icon: FiLink, href: "#" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.25, color: "#ffffff" }}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors"
                >
                  <item.icon className="text-2xl font-extrabold" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Avatar */}
        <div className="relative group cursor-pointer">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-blue-500 z-20 pointer-events-none transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-blue-500 z-20 pointer-events-none transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[290px] h-[290px] md:w-[350px] md:h-[350px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl"
          >
            <Image
              src="https://i.ibb.co.com/fGdYfxPh/Chat-GPT-Image-Aug-6-2026-10-33-13-PM.png"
              alt="Meraz Hossain"
              fill
              className="object-cover md:opacity-95 md:grayscale-[20%] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
