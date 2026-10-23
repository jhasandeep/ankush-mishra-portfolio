"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";
import { GraduationCap, MapPin, Sparkles, Briefcase } from "lucide-react";
import { about, aiWorkflow, profile } from "@/data/portfolio";
import { Reveal, SectionHead } from "./Reveal";
import { TechIcon } from "./TechIcon";

function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});
const partsFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function AnalogClock({ h, m, s }: { h: number; m: number; s: number }) {
  const hand = (deg: number) => ({ transform: `rotate(${deg}deg)`, transformOrigin: "50px 50px" });
  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="clock-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="var(--surface-2)" stroke="url(#clock-grad)" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="7"
          x2="50"
          y2={i % 3 === 0 ? 14 : 11}
          stroke={i % 3 === 0 ? "var(--fg)" : "var(--muted)"}
          strokeWidth={i % 3 === 0 ? 2 : 1}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <line x1="50" y1="50" x2="50" y2="28" stroke="var(--fg)" strokeWidth="3.5" strokeLinecap="round" style={hand((h % 12) * 30 + m * 0.5)} />
      <line x1="50" y1="50" x2="50" y2="18" stroke="var(--fg)" strokeWidth="2.2" strokeLinecap="round" style={hand(m * 6 + s * 0.1)} />
      <line x1="50" y1="58" x2="50" y2="14" stroke="var(--accent-2)" strokeWidth="1.2" strokeLinecap="round" style={hand(s * 6)} />
      <circle cx="50" cy="50" r="3" fill="var(--accent-2)" />
    </svg>
  );
}

function DelhiClock() {
  // Rendered only on the client so server HTML never shows a stale time.
  const snap = useSyncExternalStore(
    subscribeClock,
    () => {
      const now = Date.now();
      return `${partsFmt.format(now)}|${fmt.format(now)}`;
    },
    () => null,
  );
  const [parts, time] = snap ? snap.split("|") : ["10:10:30", null];
  const [hour, min, sec] = parts.split(":").map(Number);
  const awake = hour >= 9 && hour < 23;

  return (
    <div className="spot card flex h-full flex-col justify-between p-6">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
        <MapPin size={13} className="text-accent" /> {profile.location}
      </p>
      <div>
        <div className="flex items-center gap-4">
          <AnalogClock h={hour} m={min} s={sec} />
          <p className="font-display text-xl font-semibold tabular-nums tracking-tight" suppressHydrationWarning>
            {time ?? "--:--:--"}
          </p>
        </div>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span className={`h-2 w-2 rounded-full ${awake ? "bg-emerald-400" : "bg-amber-400"}`} />
          {awake ? "Online now · usually replies same day" : "Probably asleep · replies in the morning"}
        </p>
      </div>
    </div>
  );
}

const script = [
  { cmd: "whoami", out: "sandeep-kumar-jha · senior full stack developer" },
  { cmd: "cat stack.txt", out: "next.js · react · nestjs · typescript · mysql · mongodb" },
  { cmd: "uptime", out: "4+ years shipping web, mobile, apis and infra" },
  { cmd: "echo $STATUS", out: "open to full-time roles and freelance projects" },
];

function TypingTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [chars, setChars] = useState(0);
  const total = script.reduce((n, l) => n + l.cmd.length + 1, 0);

  useEffect(() => {
    if (!inView || chars >= total) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setChars(reduce ? total : (c) => c + 1), chars === 0 ? 300 : 38);
    return () => clearTimeout(id);
  }, [inView, chars, total]);

  // Character budget remaining when each line starts typing.
  const starts = script.map((_, i) => chars - script.slice(0, i).reduce((n, l) => n + l.cmd.length + 1, 0));
  return (
    <div ref={ref} className="card flex h-full flex-col overflow-hidden bg-[#0a0c14] p-0 text-[#c9d1e6]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-[11px] text-white/40">~/sandeep — zsh</span>
      </div>
      <div className="flex-1 space-y-2 p-5 font-mono text-[13px] leading-relaxed">
        {script.map((l, i) => {
          const left = starts[i];
          if (left <= 0) return null;
          const typed = l.cmd.slice(0, left);
          const done = left > l.cmd.length;
          const isLast = left - (l.cmd.length + 1) <= 0;
          return (
            <div key={i}>
              <p>
                <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span> {typed}
                {isLast && !done && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/70" />}
              </p>
              {done && <p className="text-white/50">{l.out}</p>}
            </div>
          );
        })}
        {chars >= total && (
          <p>
            <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span>{" "}
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/70" />
          </p>
        )}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead eyebrow="About" title={about.title} />

      <div className="grid auto-rows-[minmax(190px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Reveal className="md:col-span-2 lg:row-span-2">
          <div className="spot card flex h-full flex-col justify-between gap-6 p-7 sm:p-8">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              {about.paragraphs.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "NestJS", "TypeScript", "MySQL", "MongoDB", "React Native", "Docker"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface2 px-3 py-1.5 text-xs"
                >
                  <TechIcon name={t} size={13} /> {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <DelhiClock />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="spot card relative flex h-full flex-col justify-between overflow-hidden p-6">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent2/25 blur-2xl" />
            <p className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
              <Briefcase size={13} className="text-accent" /> Currently building
            </p>
            <div className="relative">
              <p className="font-display text-xl font-semibold leading-tight">Livia HMIS</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                7 microservices · 3 mobile apps · @ TeamArcs Technologies
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface2">
                <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-accent to-accent2" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <TypingTerminal />
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2">
          <div className="spot card flex h-full flex-col justify-between gap-5 p-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-display text-lg font-semibold">
                <Sparkles size={18} className="text-accent" /> AI-assisted workflow
              </p>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface2">
                  <TechIcon name="Cursor" size={18} />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface2">
                  <TechIcon name="Claude" size={18} />
                </span>
              </div>
            </div>
            <p className="text-sm text-muted">{about.paragraphs[2]}</p>
            <div className="flex flex-wrap gap-2">
              {aiWorkflow.map((a) => (
                <span key={a} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="card grid h-full grid-cols-2 gap-px overflow-hidden bg-line p-0">
            {about.facts.map((f, i) => (
              <div key={f.label} className="flex flex-col justify-center gap-1 bg-surface p-5">
                <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {i === 3 && <GraduationCap size={13} className="text-accent" />}
                  {f.label}
                </p>
                <p className="text-base font-semibold">{f.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
