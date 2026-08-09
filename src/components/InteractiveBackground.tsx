"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface InteractiveBackgroundProps {
  children: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

export default function InteractiveBackground({
  children,
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[][] = [];
    const gridSize = 50; // Grid cell size in px
    let cols = 0;
    let rows = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Airflow influence radius
      power: 18, // Airflow push strength
    };

    // Smooth GSAP mouse tracking for fluid warping
    const xTo = gsap.quickTo(mouse, "x", { duration: 0.9, ease: "power2.out" });
    const yTo = gsap.quickTo(mouse, "y", { duration: 0.9, ease: "power2.out" });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      cols = Math.ceil(canvas.width / gridSize) + 1;
      rows = Math.ceil(canvas.height / gridSize) + 1;

      points = [];
      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize;
          const y = r * gridSize;
          row.push({
            x,
            y,
            originX: x,
            originY: y,
          });
        }
        points.push(row);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      xTo(-1000);
      yTo(-1000);
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Calculate fluid airflow displacement
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          const dx = p.originX - mouse.x;
          const dy = p.originY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const factor = Math.cos((dist / mouse.radius) * (Math.PI / 2));
            const force = factor * mouse.power;
            const angle = Math.atan2(dy, dx);
            const targetX = p.originX + Math.cos(angle) * force;
            const targetY = p.originY + Math.sin(angle) * force;

            p.x += (targetX - p.x) * 0.05;
            p.y += (targetY - p.y) * 0.05;
          } else {
            p.x += (p.originX - p.x) * 0.04;
            p.y += (p.originY - p.y) * 0.04;
          }
        }
      }

      // 2. Center-focused Radial Masking (AJ-style vignette)
      // Grid lines are clear near the center, but fade to 0 opacity towards edges
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.65;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)"); // Visible in center
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)"); // Fades in mid-screen
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)"); // Fades completely to dark at edges

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;

      // Draw horizontal curves
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(points[r][0].x, points[r][0].y);

        for (let c = 0; c < cols - 1; c++) {
          const curr = points[r][c];
          const next = points[r][c + 1];
          const xc = (curr.x + next.x) / 2;
          const yc = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
        }
        ctx.stroke();
      }

      // Draw vertical curves
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(points[0][c].x, points[0][c].y);

        for (let r = 0; r < rows - 1; r++) {
          const curr = points[r][c];
          const next = points[r + 1][c];
          const xc = (curr.x + next.x) / 2;
          const yc = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    resize();
    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Canvas Grid Layer with Radial Vignette Fade */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
