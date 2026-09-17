"use client";

import React, { useEffect, useState } from "react";
import {
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeData {
  resumeUrl?: string;
  updatedAt?: string;
}

export default function ResumePage() {
  const [rawResumeUrl, setRawResumeUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const RESUME_API = `${process.env.NEXT_PUBLIC_API_URL}api/resume`;

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(RESUME_API);
      if (!res.ok) throw new Error("Failed to load resume details.");

      const data: ResumeData = await res.json();
      if (data && data.resumeUrl) {
        setRawResumeUrl(data.resumeUrl);
      } else {
        setError("No resume URL found in the database.");
      }
    } catch (err: any) {
      setError(err.message || "Unable to fetch resume.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
      return url
        .replace(/\/view(\?.*)?$/, "/preview")
        .replace(/\/edit(\?.*)?$/, "/preview");
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const getDownloadUrl = (url: string) => {
    if (!url) return "#";
    const driveIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveIdMatch && driveIdMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${driveIdMatch[1]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(rawResumeUrl);
  const downloadUrl = getDownloadUrl(rawResumeUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-black text-white p-4 sm:p-8 max-w-6xl mx-auto space-y-6"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
            // DOCUMENT VIEWER
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-1 flex items-center gap-2">
            <FiFileText className="text-blue-500 animate-pulse" /> Curriculum
            Vitae
          </h1>
        </motion.div>

        {rawResumeUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={rawResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-mono font-bold hover:bg-white/20 transition-all border border-white/5"
            >
              <FiExternalLink /> OPEN FULLSCREEN
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-mono font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 border border-blue-400/30"
            >
              <FiDownload /> DOWNLOAD PDF
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* MAIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 p-2 sm:p-4 min-h-[75vh] flex flex-col justify-center items-center shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-neutral-400 font-mono text-xs"
            >
              <FiRefreshCw className="animate-spin text-2xl text-blue-400" />
              <span>&gt; Fetching document location from MongoDB...</span>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4 max-w-md p-6 border border-dashed border-red-500/20 bg-red-500/5 rounded-xl"
            >
              <p className="text-xs font-mono text-red-400">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchResume}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-all"
              >
                TRY AGAIN
              </motion.button>
            </motion.div>
          ) : embedUrl ? (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[75vh] rounded-xl overflow-hidden border border-white/10 bg-neutral-950 shadow-inner"
            >
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                title="Resume PDF Viewer"
                allow="autoplay"
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-neutral-500 font-mono text-sm"
            >
              No active resume linked yet. Upload one via the Admin Dashboard.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
