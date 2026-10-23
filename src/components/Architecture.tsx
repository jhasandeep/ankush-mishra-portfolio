"use client";

import { useState } from "react";
import { Bell, Clock, CreditCard, Database, FileText, Globe, HardDrive, ShieldCheck, Smartphone, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

type N = { id: string; x: number; y: number; w: number; h: number; title: string; sub?: string; icon: LucideIcon; chips?: string[]; bars?: number };

// Layout follows the Livia platform described in the resume: portals and apps -> edge -> NestJS services -> data and integrations.
const nodes: N[] = [
  { id: "web", x: 30, y: 100, w: 210, h: 130, title: "Web portals", sub: "Next.js 15 · React 19", icon: Globe, chips: ["Admin", "Doctor", "Patient"] },
  { id: "mobile", x: 30, y: 300, w: 210, h: 130, title: "Mobile apps", sub: "React Native", icon: Smartphone, chips: ["Patient", "Doctor", "Pharmacy"] },
  { id: "edge", x: 320, y: 228, w: 180, h: 74, title: "Nginx edge", sub: "JWT · RBAC · ACL", icon: ShieldCheck },
  { id: "svc", x: 580, y: 95, w: 200, h: 210, title: "NestJS services", sub: "7 microservices", icon: Server, bars: 7 },
  { id: "sched", x: 580, y: 345, w: 200, h: 70, title: "Scheduler", sub: "25 jobs · distributed locks", icon: Clock },
  { id: "mysql", x: 850, y: 40, w: 140, h: 66, title: "MySQL", sub: "TypeORM", icon: Database },
  { id: "s3", x: 850, y: 122, w: 140, h: 66, title: "AWS S3", sub: "presigned URLs", icon: HardDrive },
  { id: "pay", x: 850, y: 204, w: 140, h: 66, title: "Payments", sub: "M-Pesa · Flutterwave", icon: CreditCard },
  { id: "ins", x: 850, y: 286, w: 140, h: 66, title: "Insurance APIs", sub: "claims · pre-auth", icon: FileText },
  { id: "etims", x: 850, y: 368, w: 140, h: 66, title: "KRA eTIMS", sub: "e-invoicing", icon: FileText },
  { id: "fcm", x: 850, y: 450, w: 140, h: 66, title: "Firebase", sub: "push notifications", icon: Bell },
];

const edges: [string, string][] = [
  ["web", "edge"],
  ["mobile", "edge"],
  ["edge", "svc"],
  ["svc", "mysql"],
  ["svc", "s3"],
  ["svc", "pay"],
  ["svc", "ins"],
  ["svc", "fcm"],
  ["sched", "pay"],
  ["sched", "ins"],
  ["sched", "etims"],
  ["sched", "mysql"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function edgePath(a: N, b: N) {
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

export function Architecture() {
  const [hover, setHover] = useState<string | null>(null);
  const linked = (e: [string, string]) => hover !== null && (e[0] === hover || e[1] === hover);
  const nodeLit = (id: string) => hover === null || hover === id || edges.some((e) => linked(e) && e.includes(id));

  return (
    <section id="architecture" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead
        eyebrow="System design"
        title="Inside Livia: how the pieces talk."
        intro="A live map of the healthcare platform I work on every day. Hover any part to trace its connections."
      />
      <Reveal>
        <div className="card relative overflow-hidden p-3 sm:p-6">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="relative -mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
            <svg viewBox="0 0 1020 560" className="min-w-[760px]" role="img" aria-label="Livia platform architecture diagram">
              <defs>
                <linearGradient id="arch-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--accent)" />
                  <stop offset="1" stopColor="var(--accent-2)" />
                </linearGradient>
                <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Column labels */}
              {[
                [135, "CLIENTS"],
                [410, "EDGE"],
                [680, "SERVICES"],
                [920, "DATA & INTEGRATIONS"],
              ].map(([x, t]) => (
                <text key={t} x={x} y={22} textAnchor="middle" className="fill-[var(--muted)] font-mono text-[11px] tracking-[0.2em]">
                  {t}
                </text>
              ))}

              {/* Edges */}
              {edges.map((e, i) => {
                const d = edgePath(byId[e[0]], byId[e[1]]);
                const on = linked(e);
                const dim = hover !== null && !on;
                return (
                  <g key={e.join("-")} style={{ opacity: dim ? 0.15 : 1, transition: "opacity .3s" }}>
                    <path id={`edge-${i}`} d={d} fill="none" stroke="var(--line)" strokeWidth={on ? 0 : 1.5} />
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#arch-grad)"
                      strokeWidth={on ? 2.5 : 1.2}
                      strokeDasharray="4 6"
                      className="arch-flow"
                      style={{ opacity: on ? 1 : 0.55 }}
                    />
                    <circle r={on ? 4.5 : 3.5} fill="var(--accent-2)" filter="url(#arch-glow)" className="arch-packet">
                      <animateMotion dur={`${2.6 + (i % 4) * 0.5}s`} begin={`${(i * 0.37) % 2}s`} repeatCount="indefinite">
                        <mpath href={`#edge-${i}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((n) => {
                const Ico = n.icon;
                const lit = nodeLit(n.id);
                const active = hover === n.id;
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    style={{ opacity: lit ? 1 : 0.35, transition: "opacity .3s", cursor: "default" }}
                  >
                    <rect
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={n.h}
                      rx={14}
                      fill="var(--surface)"
                      stroke={active ? "url(#arch-grad)" : "var(--line)"}
                      strokeWidth={active ? 2 : 1}
                    />
                    <rect x={n.x + 14} y={n.y + 14} width={30} height={30} rx={8} fill="url(#arch-grad)" opacity={0.9} />
                    <g transform={`translate(${n.x + 21},${n.y + 21})`} className="text-[var(--accent-ink)]">
                      <Ico width={16} height={16} strokeWidth={2.2} />
                    </g>
                    <text x={n.x + 54} y={n.y + 28} className="fill-[var(--fg)] font-display text-[14px] font-semibold">
                      {n.title}
                    </text>
                    {n.sub && (
                      <text x={n.x + 54} y={n.y + 44} className="fill-[var(--muted)] text-[10.5px]">
                        {n.sub}
                      </text>
                    )}
                    {n.chips?.map((c, i) => (
                      <g key={c} transform={`translate(${n.x + 14 + i * 64},${n.y + n.h - 46})`}>
                        <rect width={58} height={30} rx={8} fill="var(--surface-2)" stroke="var(--line)" />
                        <text x={29} y={19} textAnchor="middle" className="fill-[var(--fg)] text-[11px]">
                          {c}
                        </text>
                      </g>
                    ))}
                    {n.bars &&
                      Array.from({ length: n.bars }, (_, i) => (
                        <rect
                          key={i}
                          x={n.x + 14}
                          y={n.y + 62 + i * 19}
                          height={11}
                          rx={5.5}
                          width={n.w - 28}
                          fill="var(--surface-2)"
                          stroke="var(--line)"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.5;1;0.5"
                            dur="2.4s"
                            begin={`${i * 0.25}s`}
                            repeatCount="indefinite"
                          />
                        </rect>
                      ))}
                    {n.bars &&
                      Array.from({ length: n.bars }, (_, i) => (
                        <circle key={`d${i}`} cx={n.x + 22} cy={n.y + 67.5 + i * 19} r={2.5} fill="#34d399">
                          <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                      ))}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
