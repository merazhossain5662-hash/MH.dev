"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFolderPlus,
  FiClock,
  FiImage,
  FiLink,
  FiGithub,
  FiPlus,
  FiX,
  FiSend,
  FiUploadCloud,
  FiLoader,
} from "react-icons/fi";

const API_BASE = "http://localhost:5000/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "timeline">(
    "projects",
  );

  // Project Form State
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    category: "fullstack", // Default category selection
    techStack: [] as string[],
  });
  const [techInput, setTechInput] = useState("");

  // Image Upload State
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Timeline Form State
  const [timelineData, setTimelineData] = useState({
    year: "",
    title: "",
    subtitle: "",
    description: "",
    category: "project",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const [loading, setLoading] = useState(false);

  // Image Upload & Validation Handler
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");

    // TYPE VALIDATION
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    // SIZE VALIDATION (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setImageError("Image must be less than 2MB.");
      return;
    }

    // PREVIEW
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // UPLOAD TO IMGBB
    const formData = new FormData();
    formData.append("image", file);

    setIsUploadingImage(true);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.success) {
        setProjectData((prev) => ({ ...prev, imageUrl: data.data.url }));
      } else {
        setImageError("Failed to upload image to ImgBB.");
      }
    } catch (err) {
      setImageError("Upload failed. Try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setProjectData((prev) => ({ ...prev, imageUrl: "" }));
  };

  // Tech Stack Handlers
  const addTechTag = () => {
    if (techInput.trim() && !projectData.techStack.includes(techInput.trim())) {
      setProjectData({
        ...projectData,
        techStack: [...projectData.techStack, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechTag = (tag: string) => {
    setProjectData({
      ...projectData,
      techStack: projectData.techStack.filter((t) => t !== tag),
    });
  };

  // Timeline Tag Handlers
  const addTimelineTag = () => {
    if (tagInput.trim() && !timelineData.tags.includes(tagInput.trim())) {
      setTimelineData({
        ...timelineData,
        tags: [...timelineData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTimelineTag = (tag: string) => {
    setTimelineData({
      ...timelineData,
      tags: timelineData.tags.filter((t) => t !== tag),
    });
  };

  // Submit Handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (res.ok) {
        alert("Project created successfully!");
        setProjectData({
          title: "",
          description: "",
          imageUrl: "",
          liveUrl: "",
          githubUrl: "",
          category: "fullstack",
          techStack: [],
        });
        setPreview(null);
      }
    } catch (err) {
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const handleTimelineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/timeline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timelineData),
      });
      if (res.ok) {
        alert("Timeline event added successfully!");
        setTimelineData({
          year: "",
          title: "",
          subtitle: "",
          description: "",
          category: "project",
          tags: [],
        });
      }
    } catch (err) {
      alert("Error saving timeline entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 bg-neutral-950 text-white flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-blue-500 tracking-widest uppercase font-semibold">
            CONTROL CENTER
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
              activeTab === "projects"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                : "bg-neutral-900 text-neutral-400 border border-white/10"
            }`}
          >
            <FiFolderPlus /> ADD PROJECT
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
              activeTab === "timeline"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                : "bg-neutral-900 text-neutral-400 border border-white/10"
            }`}
          >
            <FiClock /> ADD TIMELINE ITEM
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10"
        >
          {activeTab === "projects" ? (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <h2 className="text-xl font-bold border-b border-white/10 pb-4">
                Project Information
              </h2>

              {/* Title & Image Input Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={projectData.title}
                    onChange={(e) =>
                      setProjectData({ ...projectData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    PROJECT CATEGORY
                  </label>
                  <select
                    value={projectData.category}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="fullstack">Full Stack</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                  </select>
                </div>

                {/* IMAGE UPLOAD SECTION */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                    <FiImage /> PROJECT IMAGE UPLOAD
                  </label>

                  {!preview ? (
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/20 hover:border-blue-500/60 rounded-xl cursor-pointer bg-neutral-950/60 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isUploadingImage ? (
                          <FiLoader className="text-xl text-blue-500 animate-spin" />
                        ) : (
                          <>
                            <FiUploadCloud className="text-2xl text-neutral-400 group-hover:text-blue-400 mb-1" />
                            <p className="text-xs text-neutral-400 font-mono">
                              Click to upload (JPG, PNG, WEBP &lt; 2MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative w-full h-28 rounded-xl overflow-hidden border border-white/10 bg-neutral-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-900/80 text-white hover:bg-red-500 transition-colors"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}

                  {imageError && (
                    <p className="text-xs text-red-400 font-mono">
                      {imageError}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Description..."
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Repos / Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                    <FiGithub /> GITHUB URL
                  </label>
                  <input
                    type="url"
                    placeholder="GitHub Repository URL"
                    value={projectData.githubUrl}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        githubUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                    <FiLink /> LIVE DEMO URL
                  </label>
                  <input
                    type="url"
                    placeholder="Live Site URL"
                    value={projectData.liveUrl}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        liveUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  TECH STACK TAGS
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. React, Next.js, Tailwind CSS"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-4 bg-white/10 rounded-xl text-xs font-mono font-bold hover:bg-white/20"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {projectData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono"
                    >
                      {tech}{" "}
                      <button type="button" onClick={() => removeTechTag(tech)}>
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isUploadingImage}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <FiSend />{" "}
                <span>{loading ? "SAVING..." : "PUBLISH PROJECT"}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleTimelineSubmit} className="space-y-6">
              <h2 className="text-xl font-bold border-b border-white/10 pb-4">
                Timeline Entry Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Year/Period (e.g. 2026 - Present)"
                  value={timelineData.year}
                  onChange={(e) =>
                    setTimelineData({ ...timelineData, year: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                />
                <select
                  value={timelineData.category}
                  onChange={(e) =>
                    setTimelineData({
                      ...timelineData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="career">Career / Job</option>
                  <option value="project">Project Milestone</option>
                  <option value="certificate">Certificate</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Title"
                  value={timelineData.title}
                  onChange={(e) =>
                    setTimelineData({ ...timelineData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Subtitle / Institution"
                  value={timelineData.subtitle}
                  onChange={(e) =>
                    setTimelineData({
                      ...timelineData,
                      subtitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder="Description..."
                value={timelineData.description}
                onChange={(e) =>
                  setTimelineData({
                    ...timelineData,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add Tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/80 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addTimelineTag}
                    className="px-4 bg-white/10 rounded-xl text-xs font-mono font-bold hover:bg-white/20"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {timelineData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono"
                    >
                      {tag}{" "}
                      <button
                        type="button"
                        onClick={() => removeTimelineTag(tag)}
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <FiSend />{" "}
                <span>{loading ? "SAVING..." : "ADD TIMELINE ENTRY"}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
