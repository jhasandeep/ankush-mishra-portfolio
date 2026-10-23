"use client";

import { useState } from "react";
import { Activity, BarChart3, Bell, Boxes, FileText, GitBranch, Layers, ScanSearch, Server, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

type N = { id: string; x: number; y: number; w: number; h: number; title: string; sub?: string; icon: LucideIcon; chips?: string[]; bars?: number };

// Layout follows the delivery flow: source -> pipeline -> registry and GitOps -> Kubernetes runtime -> observability.
const nodes: N[] = [
  { id: "git", x: 20, y: 70, w: 170, h: 120, title: "Source control", sub: "GitHub · Git", icon: GitBranch, chips: ["PR", "Main"] },
  { id: "iac", x: 20, y: 250, w: 170, h: 120, title: "Terraform", sub: "Infrastructure as Code", icon: Layers, chips: ["VPC", "EC2"] },
  { id: "ci", x: 235, y: 70, w: 170, h: 74, title: "CI pipelines", sub: "Actions · Jenkins", icon: Workflow },
  { id: "scan", x: 235, y: 250, w: 170, h: 74, title: "Quality gates", sub: "SonarQube · Trivy", icon: ScanSearch },
  { id: "ecr", x: 450, y: 70, w: 170, h: 74, title: "AWS ECR", sub: "image registry", icon: Boxes },
  { id: "argo", x: 450, y: 250, w: 170, h: 74, title: "ArgoCD", sub: "GitOps · Helm", icon: GitBranch },
  { id: "eks", x: 665, y: 100, w: 170, h: 210, title: "EKS Fargate", sub: "Kubernetes workloads", icon: Server, bars: 7 },
  { id: "prom", x: 880, y: 40, w: 170, h: 70, title: "Prometheus", sub: "metrics · alerts", icon: Activity },
  { id: "graf", x: 880, y: 140, w: 170, h: 70, title: "Grafana", sub: "dashboards", icon: BarChart3 },
  { id: "loki", x: 880, y: 240, w: 170, h: 70, title: "Loki", sub: "log aggregation", icon: FileText },
  { id: "cw", x: 880, y: 340, w: 170, h: 70, title: "CloudWatch", sub: "AWS monitoring", icon: Bell },
];

const edges: [string, string][] = [
  ["git", "ci"],
  ["git", "scan"],
  ["iac", "ci"],
  ["ci", "ecr"],
  ["ci", "argo"],
  ["scan", "argo"],
  ["ecr", "eks"],
  ["argo", "eks"],
  ["eks", "prom"],
  ["eks", "graf"],
  ["eks", "loki"],
  ["eks", "cw"],
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
        title="How a change reaches production."
        intro="A map of the delivery and observability pipeline I build and run. Hover any part to trace its connections."
      />
      <Reveal>
        <div className="card relative overflow-hidden p-3 sm:p-6">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="relative -mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
            <svg viewBox="0 0 1070 440" className="min-w-[760px]" role="img" aria-label="CI/CD and observability architecture diagram">
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
                [105, "SOURCE"],
                [320, "PIPELINE"],
                [535, "GITOPS"],
                [750, "RUNTIME"],
                [965, "OBSERVABILITY"],
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
