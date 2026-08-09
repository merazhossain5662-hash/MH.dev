"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCode, FaGithub, FaStar } from "react-icons/fa";
import {
  FiHome,
  FiUser,
  FiFolder,
  FiTarget,
  FiMail,
  FiTerminal,
} from "react-icons/fi";

const navItems = [
  { id: "home", label: "HOME", href: "#", icon: FiHome },
  { id: "about", label: "ABOUT", href: "#about", icon: FiUser },
  { id: "projects", label: "PROJECTS", href: "#projects", icon: FiFolder },
  { id: "skills", label: "SKILLS", href: "#skills", icon: FiTarget },
  { id: "contact", label: "CONTACT", href: "#contact", icon: FiMail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      {/* --- TOP BAR --- */}
      <header className="fixed top-0 left-0 w-full z-50 pt-8 pb-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Top Left Logo: </ > MH.dev */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-white font-mono text-sm tracking-wide shadow-xl backdrop-blur-sm cursor-pointer"
          >
            <FaCode className="text-blue-500 text-base" />
            <span className="font-extrabold text-white">MH</span>
            <span className="font-semibold text-neutral-400">.dev</span>
          </motion.div>

          {/* Top Right GitHub Star Badge */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-white/10 text-xs text-gray-300 backdrop-blur-md shadow-xl hover:border-white/20 transition-all"
          >
            <FaGithub className="text-sm" />
            <FaStar className="text-yellow-400 text-xs" />
            <span className="font-bold text-white">11</span>
            <FiTerminal className="text-gray-500 text-xs pl-1 border-l border-white/10" />
          </motion.a>
        </div>
      </header>

      {/* --- ANIMATED FLOATING DOCK --- */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors"
              >
                {/* Smooth Animated Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white/15 rounded-xl border border-white/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon
                  className={`relative z-10 text-base ${isActive ? "text-blue-400" : "text-gray-400 hover:text-white"}`}
                />

                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 text-white font-semibold tracking-wider"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}
