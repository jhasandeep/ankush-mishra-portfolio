"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ORBITS = [
  { r: 62, cls: "spin-slow-rev", counter: "counter-slow-rev", items: ["React", "NestJS", "Next.js"] },
  { r: 118, cls: "spin-slow", counter: "counter-slow", items: ["Docker", "MySQL", "TypeScript", "MongoDB", "Kubernetes", "Node.js"] },
];

// Logos orbiting a glowing core; each logo counter-rotates so it stays upright.
export function TechOrbit({ className = "", renderIcon }: { className?: string; renderIcon: (name: string) => ReactNode }) {
  const size = 280;
  const c = size / 2;
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <defs>
          <radialGradient id="core-grad">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={c} cy={c} r="60" fill="url(#core-grad)" />
        {ORBITS.map((o) => (
          <circle key={o.r} cx={c} cy={c} r={o.r} fill="none" stroke="var(--line)" strokeDasharray="3 6" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-display text-sm font-bold text-ink shadow-lg shadow-accent/40">
        SJ
      </div>
      {ORBITS.map((o) => (
        <div key={o.r} className={`absolute inset-0 ${o.cls}`}>
          {o.items.map((name, i) => {
            const a = (i / o.items.length) * Math.PI * 2;
            // Rounded so server and client render identical style values.
            const left = Math.round(c + o.r * Math.cos(a) - 20);
            const top = Math.round(c + o.r * Math.sin(a) - 20);
            return (
              <div key={name} className="absolute" style={{ left, top }}>
                <div className={`grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface shadow-lg ${o.counter}`}>
                  {renderIcon(name)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Grad({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="1" y2="0">
        <stop offset="0" stopColor="var(--accent)" />
        <stop offset="1" stopColor="var(--accent-2)" />
      </linearGradient>
    </defs>
  );
}

const view = { initial: "hide", whileInView: "show", viewport: { once: true } } as const;

// Small animated charts for the impact cards: bars, trend line, gauge, team.
export function MiniChart({ kind }: { kind: number }) {
  const id = `mini-${kind}`;
  const fill = `url(#${id})`;

  if (kind === 0)
    return (
      <motion.svg viewBox="0 0 60 40" className="h-10 w-16" {...view} aria-hidden="true">
        <Grad id={id} />
        {[14, 22, 18, 30, 38].map((h, i) => (
          <motion.rect
            key={i}
            x={i * 12 + 2}
            width="8"
            rx="2"
            fill={fill}
            variants={{ hide: { height: 0, y: 40 }, show: { height: h, y: 40 - h } }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
          />
        ))}
      </motion.svg>
    );

  if (kind === 1)
    return (
      <motion.svg viewBox="0 0 60 40" className="h-10 w-16" {...view} aria-hidden="true">
        <Grad id={id} />
        <motion.path
          d="M2,8 L14,12 L24,10 L34,22 L44,26 L58,34"
          fill="none"
          stroke={fill}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hide: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <motion.circle
          cx="58"
          cy="34"
          r="3"
          fill="var(--accent-2)"
          variants={{ hide: { scale: 0 }, show: { scale: 1 } }}
          transition={{ delay: 1.3 }}
        />
      </motion.svg>
    );

  if (kind === 2)
    return (
      <motion.svg viewBox="0 0 60 40" className="h-10 w-16" {...view} aria-hidden="true">
        <Grad id={id} />
        <path d="M8,36 A22,22 0 0 1 52,36" fill="none" stroke="var(--line)" strokeWidth="5" strokeLinecap="round" />
        <motion.path
          d="M8,36 A22,22 0 0 1 52,36"
          fill="none"
          stroke={fill}
          strokeWidth="5"
          strokeLinecap="round"
          variants={{ hide: { pathLength: 0 }, show: { pathLength: 0.78 } }}
          transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
        />
      </motion.svg>
    );

  const team = [10, 22, 38, 50];
  return (
    <motion.svg viewBox="0 0 60 40" className="h-10 w-16" {...view} aria-hidden="true">
      <Grad id={id} />
      {team.map((x, i) => (
        <motion.line
          key={`l${x}`}
          x1="30"
          y1="20"
          x2={x}
          y2="27"
          stroke="var(--muted)"
          strokeOpacity="0.5"
          variants={{ hide: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ delay: 0.2 + i * 0.12 }}
        />
      ))}
      <circle cx="30" cy="14" r="7" fill={fill} />
      {team.map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="32"
          r="5.5"
          fill="var(--surface-2)"
          stroke={fill}
          strokeWidth="1.5"
          variants={{ hide: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.3 + i * 0.12 }}
        />
      ))}
    </motion.svg>
  );
}
