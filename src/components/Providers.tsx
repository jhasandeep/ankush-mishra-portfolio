"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import type { Audience } from "@/data/portfolio";

type Ctx = { audience: Audience; setAudience: (a: Audience) => void };

const AudienceContext = createContext<Ctx>({
  audience: "company",
  setAudience: () => {},
});

export function useAudience() {
  return useContext(AudienceContext);
}

function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

// Feeds cursor position into any `.spot` element so CSS can draw a glow under the pointer.
function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export function Providers({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("company");
  useSmoothScroll();
  useSpotlight();
  return (
    <MotionConfig reducedMotion="user">
      <AudienceContext.Provider value={{ audience, setAudience }}>
        {children}
      </AudienceContext.Provider>
    </MotionConfig>
  );
}
