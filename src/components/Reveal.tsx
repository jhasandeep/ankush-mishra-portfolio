"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ScrambleText } from "./Interactions";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Splits a string title into words that rise in one after another.
function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.05 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block pr-[0.25em]"
            variants={{
              hidden: { y: "105%" },
              show: { y: 0, transition: { duration: 0.6, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  intro,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <motion.p
        id={id}
        className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <motion.span
          className="h-px bg-gradient-to-r from-accent to-accent2"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        />
        <ScrambleText text={eyebrow} />
      </motion.p>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
        {typeof title === "string" ? <WordReveal text={title} /> : title}
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
