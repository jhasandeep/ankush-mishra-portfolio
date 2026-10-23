"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

// Gradient ring that trails the pointer and swells over interactive elements. Desktop only.
export function Cursor() {
  const enabled = useMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHot(!!t?.closest?.("a, button, [role=tab], input, textarea, label"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-accent/70"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hot ? 46 : 28,
          height: hot ? 46 : 28,
          backgroundColor: hot ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "rgba(0,0,0,0)",
          scale: down ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-accent2"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

// Pulls its child gently toward the pointer.
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/";

// Decodes from random glyphs into the real text the first time it scrolls into view.
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const total = text.length * 2 + 8;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.max(0, Math.floor((frame - 6) / 2));
      el.textContent = text
        .split("")
        .map((ch, i) => (ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (frame >= total) {
        el.textContent = text;
        clearInterval(id);
      }
    }, 35);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} aria-label={text}>
      {text}
    </span>
  );
}

// Floating back-to-top button whose ring fills with page progress.
export function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/80 text-fg shadow-xl backdrop-blur-xl"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id="top-grad" x1="0" x2="1">
                <stop offset="0" stopColor="var(--accent)" />
                <stop offset="1" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="url(#top-grad)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <ArrowUp size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// Opening monogram that draws itself, then lifts away. Has a CSS fallback exit so it can never get stuck.
export function Intro() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setDone(true), reduce ? 0 : 1300);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="intro-failsafe fixed inset-0 z-[200] grid place-items-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <svg viewBox="0 0 160 100" className="w-40" aria-hidden="true">
              <defs>
                <linearGradient id="intro-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--accent)" />
                  <stop offset="1" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
              <text
                x="80"
                y="78"
                textAnchor="middle"
                fontSize="88"
                fontWeight="700"
                className="intro-mono font-display"
                fill="none"
                stroke="url(#intro-grad)"
                strokeWidth="2"
              >
                SJ
              </text>
            </svg>
            <div className="h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent2"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Sandeep Kumar Jha</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const BURST = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2;
  const d = 70 + (i % 5) * 18;
  return { x: Math.round(Math.cos(a) * d), y: Math.round(Math.sin(a) * d - 30), r: (i * 47) % 360, c: i % 3 };
});

// One-shot confetti burst; remount with a new key to replay.
export function Burst() {
  const colors = ["var(--accent)", "var(--accent-2)", "#f472b6"];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {BURST.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute block ${i % 2 ? "h-2 w-2 rounded-full" : "h-1.5 w-3 rounded-sm"}`}
          style={{ background: colors[p.c] }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 60], opacity: [1, 1, 0], rotate: p.r, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
