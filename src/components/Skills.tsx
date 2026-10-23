"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { Reveal, SectionHead } from "./Reveal";
import { TechIcon, hasBrandIcon, techColor } from "./TechIcon";
import { TechOrbit } from "./Charts";

const all = skills.flatMap((s) => s.items.map((name) => ({ name, group: s.group })));

// "All" shows each branded technology once; concepts (indexing, RBAC...) live under their area.
const ALIASES: Record<string, string> = { "React.js": "React", "React 19": "React", "Next.js 15": "Next.js", "Django REST Framework": "Django" };
const featured = (() => {
  const seen = new Set<string>();
  return all
    .filter((s) => hasBrandIcon(s.name) && s.group !== "AI-assisted dev")
    .map((s) => ({ ...s, name: ALIASES[s.name] ?? s.name }))
    .filter((s) => !seen.has(s.name) && seen.add(s.name));
})();

export function Skills() {
  const [group, setGroup] = useState<string>("all");
  const visible = group === "all" ? featured : all.filter((s) => s.group === group);

  return (
    <section id="skills" className="relative overflow-hidden border-y border-line bg-soft">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent2/10 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="flex items-center justify-between gap-10">
          <SectionHead
            eyebrow="Toolbox"
            title="The stack I work with every day."
            intro="The core technologies I ship with. Pick an area to see everything in it, and hover a tile to light it up."
          />
          <TechOrbit className="-mt-10 mb-6 hidden lg:block" renderIcon={(n) => <TechIcon name={n} size={20} />} />
        </div>
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2">
            {["all", ...skills.map((s) => s.group)].map((g) => {
              const on = group === g;
              return (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  aria-pressed={on}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    on ? "text-ink" : "border border-line bg-surface text-muted hover:text-fg"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="skill-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent2"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{g === "all" ? "All" : g}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {visible.map((s) => {
              const color = techColor(s.name);
              return (
                <motion.li
                  key={s.group + s.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="group relative"
                  style={{ ["--c" as string]: color }}
                >
                  <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface px-3 py-5 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[color:var(--c)]">
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(120px circle at 50% 30%, color-mix(in srgb, var(--c) 22%, transparent), transparent 70%)",
                      }}
                    />
                    <span className="relative transition-transform duration-300 group-hover:scale-110">
                      <TechIcon name={s.name} size={30} />
                    </span>
                    <span className="relative text-xs font-medium leading-tight">{s.name}</span>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
