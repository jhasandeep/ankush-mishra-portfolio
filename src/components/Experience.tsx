"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal, SectionHead } from "./Reveal";

export function Experience() {
  const [open, setOpen] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead
        eyebrow="Experience"
        title="From parcel dashboards to a multi-portal healthcare platform."
      />
      <div ref={lineRef} className="relative">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-line" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent2 shadow-[0_0_12px_var(--accent)]"
        />
        <ul className="space-y-5">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={job.company + job.period} delay={i * 0.05}>
                <li className="relative pl-10">
                  <span
                    className={`absolute left-0 top-7 grid h-6 w-6 place-items-center rounded-full border-2 bg-bg ${
                      job.current ? "border-accent" : "border-line"
                    }`}
                  >
                    {job.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
                    <span className={`relative h-2 w-2 rounded-full ${job.current ? "bg-accent" : "bg-muted"}`} />
                  </span>
                  <div className={`card overflow-hidden ${isOpen ? "border-accent/40" : ""}`}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left"
                    >
                      <div>
                        <p className="font-mono text-xs text-accent">
                          {job.period}
                          {job.current && (
                            <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-500">Current</span>
                          )}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold">{job.role}</h3>
                        <p className="text-sm text-muted">
                          {job.company} · {job.location}
                        </p>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{job.summary}</p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`mt-1 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ul className="space-y-2.5 border-t border-line px-6 pb-6 pt-5">
                            {job.points.map((p) => (
                              <li key={p} className="flex gap-3 text-sm leading-relaxed">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
