"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { engineering } from "@/data/portfolio";
import { Icon } from "./Icon";
import { Reveal, SectionHead } from "./Reveal";

const CYCLE_MS = 6500;

export function Engineering() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const item = engineering[active];

  // Auto-advance while visible, until the visitor picks one themselves.
  useEffect(() => {
    if (!inView || paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % engineering.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, inView, paused]);

  return (
    <section id="engineering" className="border-y border-line bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow="DevOps in practice"
          title="Automate it, ship it, watch it run."
          intro="The pipelines, platforms and guardrails I build to make releases fast and production dependable. Pick one to see it run."
        />

        <Reveal>
          <div ref={ref} className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <ul className="grid gap-2" role="tablist" aria-label="DevOps practices">
              {engineering.map((e, i) => {
                const on = i === active;
                return (
                  <li key={e.title}>
                    <button
                      role="tab"
                      aria-selected={on}
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-colors ${
                        on ? "border-accent/50 bg-surface" : "border-transparent hover:bg-surface/60"
                      }`}
                    >
                      <span
                        className={`draw-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                          on ? "bg-gradient-to-br from-accent to-accent2 text-ink" : "bg-surface2 text-muted"
                        }`}
                      >
                        <Icon name={e.icon} size={18} />
                      </span>
                      <span className={`font-display text-[15px] font-semibold ${on ? "text-fg" : "text-muted"}`}>
                        {e.title}
                      </span>
                      {on && !paused && inView && (
                        <motion.span
                          key={active}
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent2"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="relative overflow-hidden rounded-2xl border border-line bg-[#0a0c14] text-[#c9d1e6] shadow-2xl shadow-accent/10">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-[11px] text-white/40">devops — bash</span>
              </div>
              <div className="min-h-[300px] p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>
                      <span className="text-emerald-400">$</span>{" "}
                      <motion.span
                        className="inline-block overflow-hidden whitespace-nowrap align-bottom"
                        initial={{ maxWidth: 0 }}
                        animate={{ maxWidth: 600 }}
                        transition={{ duration: 0.9, ease: "linear" }}
                      >
                        {item.cmd}
                      </motion.span>
                    </p>
                    <div className="mt-4 space-y-2">
                      {item.out.map((line, i) => (
                        <motion.p
                          key={line}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.45, duration: 0.3 }}
                          className={i === item.out.length - 1 ? "text-emerald-400" : "text-white/70"}
                        >
                          {i === item.out.length - 1 ? "✓" : "›"} {line}
                        </motion.p>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + item.out.length * 0.45 }}
                      className="mt-6 border-t border-white/10 pt-4 font-sans text-[13px] leading-relaxed text-white/50"
                    >
                      {item.text}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 + item.out.length * 0.45 }}
                      className="mt-5"
                    >
                      <span className="text-emerald-400">$</span>{" "}
                      <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/70" />
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
