"use client";

import React, { useState, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMessageSquare,
  FiCalendar,
  FiFileText,
  FiSend,
  FiCheck,
} from "react-icons/fi";

// Register useGSAP hook
gsap.registerPlugin(useGSAP);

const topics = [
  "Full-time role",
  "Freelance project",
  "Just saying hi",
  "Bug report",
  "Other",
];

const socialLinks = [
  { icon: FiMail, href: "mailto:your-email@example.com", label: "Email" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiMessageSquare, href: "#", label: "Discord/Chat" },
];

export default function Contact() {
  const [mode, setMode] = useState<"book" | "message">("book");
  const [selectedTopic, setSelectedTopic] = useState<string>("Full-time role");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation Container Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const topicPillsRef = useRef<HTMLDivElement>(null);

  // Initialize Cal.com Dark UI Theme
  useGSAP(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#3B82F6" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // GSAP: Animate Content Card Switcher (Book <-> Message)
  useGSAP(() => {
    if (contentCardRef.current) {
      gsap.fromTo(
        contentCardRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }
  }, [mode]);

  // GSAP: Animate Topic Switch
  const handleTopicChange = (topic: string) => {
    if (topic === selectedTopic) return;
    setSelectedTopic(topic);

    if (topicPillsRef.current) {
      const activePill = topicPillsRef.current.querySelector(
        `[data-topic="${topic}"]`,
      );
      if (activePill) {
        gsap.fromTo(
          activePill,
          { scale: 0.85, y: -4 },
          { scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setIsSubmitting(true);

    // Liquid submit button GSAP pulse
    gsap.to(".submit-btn", {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center bg-transparent text-white overflow-hidden"
    >
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Tag */}
        <span className="text-[11px] font-mono tracking-[0.2em] text-blue-500 uppercase mb-2 font-semibold">
          GET IN TOUCH
        </span>

        {/* Main Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mb-3">
          LET&apos;S{" "}
          <span className="text-blue-500 italic font-serif">Connect</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-neutral-400 font-mono tracking-widest uppercase text-center mb-6">
          SCHEDULE A CALL OR SEND A MESSAGE
        </p>

        {/* Social Icons Row */}
        <div className="flex items-center gap-3 mb-8">
          {socialLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="w-10 h-10 rounded-full border border-white/10 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                <Icon className="text-lg" />
              </a>
            );
          })}
        </div>

        {/* Toggle Pills: Book a Call / Resume / Send a Message */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-white/10 bg-neutral-950/80 backdrop-blur-xl mb-10">
          {/* Book a Call Button */}
          <button
            onClick={() => setMode("book")}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
              mode === "book"
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FiCalendar className="text-sm" />
            <span>Book a Call</span>
          </button>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <FiFileText className="text-sm text-blue-400" />
            <span>Resume</span>
          </a>

          {/* Send a Message Button */}
          <button
            onClick={() => setMode("message")}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
              mode === "message"
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FiMessageSquare className="text-sm" />
            <span>Send a Message</span>
          </button>
        </div>

        {/* ANIMATED CONTENT CARD WRAPPER */}
        <div ref={contentCardRef} className="w-full">
          {/* DISPLAY 1: CAL.COM INLINE BOOKING WIDGET */}
          {mode === "book" && (
            <div className="w-full rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <Cal
                namespace="30min"
                calLink="meraz-hossain-ciohet/30min"
                style={{ width: "100%", height: "100%", minHeight: "650px" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          )}

          {/* DISPLAY 2: CONTACT FORM */}
          {mode === "message" && (
            <div className="w-full rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Topics Container */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    TOPIC
                  </label>
                  <div
                    ref={topicPillsRef}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {topics.map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          data-topic={topic}
                          onClick={() => handleTopicChange(topic)}
                          className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 ${
                            isSelected
                              ? "border-blue-500 bg-blue-500/15 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.25)]"
                              : "border-white/10 bg-neutral-950/40 text-neutral-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or just say hi..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) =>
                      setFormData({ ...formData, agreed: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      formData.agreed
                        ? "border-blue-500 bg-blue-500 text-black"
                        : "border-white/20 bg-neutral-950 group-hover:border-white/40"
                    }`}
                  >
                    {formData.agreed && (
                      <FiCheck className="text-xs stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    I agree that my submitted data is collected and stored to
                    respond to my inquiry.
                  </span>
                </label>

                {/* LIQUID SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!formData.agreed || isSubmitting}
                    className="submit-btn relative group w-full h-12 rounded-xl overflow-hidden border border-blue-500/40 font-semibold text-sm text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <div className="absolute inset-0 bg-blue-600 transition-transform duration-700 ease-out translate-y-full group-hover:translate-y-0" />
                    <div className="absolute -top-12 left-0 w-[200%] h-24 bg-blue-500/80 rounded-[40%] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiSend className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
