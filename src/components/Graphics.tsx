"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

// Wavy gradient line that draws itself as it scrolls through the viewport.
export function Divider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 40%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const d = "M0,40 C160,0 320,80 480,40 S800,0 960,40 S1280,80 1440,40";

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none mx-auto max-w-6xl px-5">
      <svg viewBox="0 0 1440 80" className={`h-12 w-full ${flip ? "-scale-x-100" : ""}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`div-grad-${flip ? 1 : 0}`} x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.3" stopColor="var(--accent)" />
            <stop offset="0.7" stopColor="var(--accent-2)" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={d} fill="none" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#div-grad-${flip ? 1 : 0})`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

// Outlined wordmark that traces its strokes once it comes into view.
export function Signature({ text }: { text: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg ref={ref} viewBox="0 0 1000 190" className="mt-14 w-full select-none" aria-hidden="true">
      <defs>
        <linearGradient id="sig-grad" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <text
        x="500"
        y="155"
        textAnchor="middle"
        className={`signature font-display ${inView ? "signature-on" : ""}`}
        fontSize="190"
        fontWeight="700"
        letterSpacing="-6"
        fill="none"
        stroke="url(#sig-grad)"
        strokeWidth="1.5"
      >
        {text}
      </text>
    </svg>
  );
}

// Paper plane looping along a dashed flight path.
export function PaperPlane({ className = "" }: { className?: string }) {
  const d = "M10,150 C80,40 180,170 260,80 S380,20 430,60";
  return (
    <svg viewBox="0 0 450 190" className={className} aria-hidden="true">
      <path id="plane-path" d={d} fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 7" className="arch-flow" />
      <g className="arch-packet">
        <g>
          <path d="M-12,-9 L14,0 L-12,9 L-6,0 Z" fill="url(#plane-grad)" />
          <path d="M-6,0 L14,0" stroke="var(--bg)" strokeWidth="1" />
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#plane-path" />
          </animateMotion>
        </g>
      </g>
      <defs>
        <linearGradient id="plane-grad" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Rotating gradient rings with orbiting dots, wrapped around the hero avatar.
export function Orbit() {
  return (
    <svg viewBox="0 0 120 120" className="pointer-events-none absolute -inset-[18px] h-[100px] w-[100px] overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="orbit-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <g className="orbit-spin">
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#orbit-grad)" strokeWidth="1.2" strokeDasharray="2 6" />
        <circle cx="60" cy="4" r="3.5" fill="var(--accent-2)" />
      </g>
      <g className="orbit-spin-rev">
        <circle cx="60" cy="60" r="48" fill="none" stroke="url(#orbit-grad)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="30 14" />
        <circle cx="108" cy="60" r="2.5" fill="var(--accent)" />
      </g>
    </svg>
  );
}
