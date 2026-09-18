"use client";

import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiExternalLink,
  FiGithub,
  FiUploadCloud,
  FiFileText,
  FiCheck,
  FiClock,
} from "react-icons/fi";

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  category?: "fullstack" | "frontend" | "backend";
}

export interface TimelineItem {
  _id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Resume State
  const [resumeUrl, setResumeUrl] = useState("");
  const [loadingResume, setLoadingResume] = useState(true);
  const [savingResume, setSavingResume] = useState(false);
  const [savedResumeSuccess, setSavedResumeSuccess] = useState(false);

  // Timeline States
  const [timelineList, setTimelineList] = useState<TimelineItem[]>([]);
  const [loadingTimeline, setLoadingTimeline] = useState(true);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(
    null,
  );

  const [timeYear, setTimeYear] = useState("");
  const [timeTitle, setTimeTitle] = useState("");
  const [timeSubtitle, setTimeSubtitle] = useState("");
  const [timeCategory, setTimeCategory] = useState("education");
  const [timeDesc, setTimeDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [timeTags, setTimeTags] = useState<string[]>([]);
  const [timelineSubmitting, setTimelineSubmitting] = useState(false);

  // Project Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<
    "fullstack" | "frontend" | "backend"
  >("fullstack");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const BASE_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const PROJECTS_API = `${BASE_API}api/projects`;
  const TIMELINE_API = `${BASE_API}api/timeline`;
  const RESUME_API = `${BASE_API}api/resume`;

  const fetchResume = async () => {
    try {
      setLoadingResume(true);
      const res = await fetch(RESUME_API);
      if (!res.ok) throw new Error("Failed to fetch resume");
      const data = await res.json();
      if (data && data.resumeUrl) setResumeUrl(data.resumeUrl);
    } catch (err) {
      console.error("Resume Fetch Error:", err);
    } finally {
      setLoadingResume(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch(PROJECTS_API);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (err) {
      console.error("Projects Fetch Error:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchTimeline = async () => {
    try {
      setLoadingTimeline(true);
      const res = await fetch(TIMELINE_API);
      if (!res.ok) throw new Error("Failed to fetch timeline items");
      const data = await res.json();
      if (Array.isArray(data)) setTimelineList(data);
    } catch (err) {
      console.error("Timeline Fetch Error:", err);
    } finally {
      setLoadingTimeline(false);
    }
  };

  useEffect(() => {
    fetchResume();
    fetchProjects();
    fetchTimeline();
  }, []);

  const handleSaveResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUrl.trim()) return;

    try {
      setSavingResume(true);
      const res = await fetch(RESUME_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl: resumeUrl.trim() }),
      });

      if (!res.ok) throw new Error("Failed to save resume");

      setSavedResumeSuccess(true);
      setTimeout(() => setSavedResumeSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to save resume");
    } finally {
      setSavingResume(false);
    }
  };

  const handleOpenTimelineModal = (item?: TimelineItem) => {
    if (item) {
      setEditingTimeline(item);
      setTimeYear(item.year || "");
      setTimeTitle(item.title || "");
      setTimeSubtitle(item.subtitle || "");
      setTimeCategory(item.category || "education");
      setTimeDesc(item.description || "");
      setTimeTags(item.tags || []);
    } else {
      setEditingTimeline(null);
      setTimeYear("");
      setTimeTitle("");
      setTimeSubtitle("");
      setTimeCategory("education");
      setTimeDesc("");
      setTimeTags([]);
    }
    setIsTimelineModalOpen(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !timeTags.includes(tagInput.trim())) {
      setTimeTags([...timeTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTimeTags(timeTags.filter((t) => t !== tagToRemove));
  };

  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimelineSubmitting(true);

    const payload = {
      year: timeYear,
      title: timeTitle,
      subtitle: timeSubtitle,
      description: timeDesc,
      category: timeCategory,
      tags: timeTags,
    };

    try {
      const url = editingTimeline
        ? `${TIMELINE_API}/${editingTimeline._id}`
        : TIMELINE_API;
      const method = editingTimeline ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Timeline operation failed");

      await fetchTimeline();
      setIsTimelineModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Error saving timeline entry.");
    } finally {
      setTimelineSubmitting(false);
    }
  };

  const handleDeleteTimeline = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this timeline item?")) return;

    try {
      const res = await fetch(`${TIMELINE_API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete timeline item");
      setTimelineList((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setError("");

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setError("Missing NEXT_PUBLIC_IMGBB_API_KEY in your .env file!");
      setImageUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        throw new Error("Failed to upload image to ImgBB.");
      }
    } catch (err: any) {
      setError(err.message || "Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setCategory("fullstack");
    setLiveUrl("");
    setGithubUrl("");
    setImageUrl("");
    setTechStack([]);
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setCategory(project.category || "fullstack");
    setLiveUrl(project.liveUrl || "");
    setGithubUrl(project.githubUrl || "");
    setImageUrl(project.imageUrl || "");
    setTechStack(project.techStack || []);
    setError("");
    setIsModalOpen(true);
  };

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechStack(techStack.filter((t) => t !== techToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      title,
      description,
      category,
      liveUrl,
      githubUrl,
      imageUrl,
      techStack,
    };

    try {
      const url = editingProject
        ? `${PROJECTS_API}/${editingProject._id}`
        : PROJECTS_API;
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Operation failed.");

      await fetchProjects();
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${PROJECTS_API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
            // SYSTEM CONTROL
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-1">
            Admin Dashboard
          </h1>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-mono font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
        >
          <FiPlus className="text-base" /> ADD PROJECT
        </button>
      </div>

      {/* RESUME MANAGEMENT SECTION */}
      <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiFileText className="text-blue-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              // RESUME MANAGEMENT (MONGODB)
            </h2>
          </div>
          {savedResumeSuccess && (
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
              <FiCheck /> Saved to MongoDB
            </span>
          )}
        </div>

        <form
          onSubmit={handleSaveResume}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="url"
            disabled={loadingResume}
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder={
              loadingResume
                ? "Loading resume link..."
                : "Paste PDF URL (Google Drive, Cloudinary, Vercel Blob...)"
            }
            className="flex-1 rounded-xl border border-white/10 bg-neutral-950 p-3 text-xs text-white focus:border-blue-500 focus:outline-none disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={savingResume || loadingResume}
            className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-mono font-bold text-white hover:bg-blue-500 transition-colors shrink-0 disabled:opacity-50"
          >
            {savingResume ? "SAVING..." : "UPDATE RESUME"}
          </button>
        </form>
      </div>

      {/* TIMELINE MANAGEMENT SECTION */}
      <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiClock className="text-blue-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              // TIMELINE & EXPERIENCE MANAGEMENT
            </h2>
          </div>
          <button
            onClick={() => handleOpenTimelineModal()}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-mono font-bold hover:bg-white/20 transition-all"
          >
            <FiPlus /> ADD ENTRY
          </button>
        </div>

        {loadingTimeline ? (
          <div className="text-center py-6 text-neutral-400 font-mono text-xs animate-pulse">
            &gt; Syncing timeline collection...
          </div>
        ) : timelineList.length === 0 ? (
          <div className="text-center py-6 text-neutral-500 font-mono text-xs border border-dashed border-white/10 rounded-xl">
            No timeline items found in database.
          </div>
        ) : (
          <div className="space-y-3">
            {timelineList.map((item) => (
              <div
                key={item._id}
                className="flex items-start justify-between p-4 rounded-xl border border-white/5 bg-neutral-950/60 hover:border-white/10 transition-all"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
                    <span className="text-blue-400 font-bold">{item.year}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-white font-semibold">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-neutral-400">
                        @ {item.subtitle}
                      </span>
                    )}
                    {item.category && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 uppercase">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-neutral-400">
                      {item.description}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenTimelineModal(item)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                  >
                    <FiEdit2 className="text-xs" />
                  </button>
                  <button
                    onClick={() => handleDeleteTimeline(item._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PROJECTS SECTION */}
      {loadingProjects ? (
        <div className="text-center font-mono text-neutral-400 py-12 animate-pulse">
          &gt; Syncing repository database...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
          No projects found. Click "ADD PROJECT" to create your first build.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-5 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
            >
              <div className="space-y-3">
                {project.imageUrl && (
                  <div className="h-36 w-full rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase">
                    {project.category || "fullstack"}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {project.description}
                </p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-3 text-neutral-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-400"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(project)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TIMELINE MODAL */}
      {isTimelineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-mono text-sm font-bold tracking-wider text-blue-400">
                {editingTimeline ? "// EDIT TIMELINE" : "// ADD TIMELINE"}
              </h2>
              <button
                onClick={() => setIsTimelineModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveTimeline} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Year / Period
                  </label>
                  <input
                    type="text"
                    required
                    value={timeYear}
                    onChange={(e) => setTimeYear(e.target.value)}
                    placeholder="e.g. Sep 2026"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={timeCategory}
                    onChange={(e) => setTimeCategory(e.target.value)}
                    placeholder="education / certificate"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={timeTitle}
                  onChange={(e) => setTimeTitle(e.target.value)}
                  placeholder="e.g. Basic Robotics Workshop"
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Subtitle / Organization
                </label>
                <input
                  type="text"
                  value={timeSubtitle}
                  onChange={(e) => setTimeSubtitle(e.target.value)}
                  placeholder="e.g. RoboGenesis or Programming Hero"
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={timeDesc}
                  onChange={(e) => setTimeDesc(e.target.value)}
                  placeholder="Summary of course or event..."
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Add Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="robotics"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-xl bg-blue-600 px-3 text-white hover:bg-blue-500"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {timeTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {timeTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-neutral-950 px-2 py-1 text-[10px] font-mono text-neutral-300"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-neutral-400 hover:text-red-400"
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-mono text-neutral-400 hover:bg-white/5 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={timelineSubmitting}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-mono font-bold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {timelineSubmitting ? "SAVING..." : "SAVE ENTRY"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-mono text-sm font-bold tracking-wider text-blue-400">
                {editingProject ? "// EDIT PROJECT" : "// CREATE PROJECT"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Project Thumbnail
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-dashed border-white/20 bg-neutral-950 px-4 py-2.5 text-xs font-mono text-neutral-300 hover:border-blue-500 hover:text-blue-400 transition-colors">
                    <FiUploadCloud className="text-base" />
                    {imageUploading ? "UPLOADING TO IMGBB..." : "UPLOAD IMAGE"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="hidden"
                    />
                  </label>
                  {imageUrl && (
                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/20">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. StartHubX"
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of build..."
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="fullstack">fullstack</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Add Tech
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="React"
                      className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="rounded-xl bg-blue-600 px-3 text-white hover:bg-blue-500"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-neutral-950 px-2 py-1 text-[10px] font-mono text-neutral-300"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-neutral-400 hover:text-red-400"
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-mono text-neutral-400 hover:bg-white/5 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting || imageUploading}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-mono font-bold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {submitting ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
