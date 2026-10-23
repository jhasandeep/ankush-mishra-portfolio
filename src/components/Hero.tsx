"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { heroCopy, profile } from "@/data/portfolio";
import { useAudience } from "./Providers";
import { AudienceToggle } from "./AudienceToggle";
import { HeroBackground } from "./HeroBackground";
import { Orbit } from "./Graphics";
import { Magnetic } from "./Interactions";
import { GithubIcon, LinkedinIcon } from "./Icon";
import { TechIcon } from "./TechIcon";

const stackChips = ["Next.js 15", "React 19", "NestJS", "TypeScript", "MySQL", "React Native", "Docker", "Playwright"];

const floaters = [
  { value: "48", label: "modules migrated", className: "-top-6 right-6", delay: 0 },
  { value: "57", label: "E2E flows", className: "-bottom-10 right-4", delay: 1.2 },
  { value: "99.9%", label: "uptime managed", className: "-bottom-10 left-4", delay: 2.2 },
];

export function Hero() {
  const { audience } = useAudience();
  const copy = heroCopy[audience];
  const isCompany = audience === "company";

  return (
    <section id="top" className="spot relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-7">
            <AudienceToggle id="hero" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={audience}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {copy.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                {[copy.headline[0], copy.headline[1]].flatMap((part, pi) =>
                  part.split(" ").map((w, wi) => (
                    <motion.span
                      key={`${pi}-${wi}`}
                      initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.55, delay: 0.05 * (pi * 5 + wi), ease: [0.22, 1, 0.36, 1] }}
                      className={`inline-block pr-[0.25em] ${pi === 1 ? "grad-text" : ""}`}
                    >
                      {w}
                    </motion.span>
                  )),
                )}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{copy.sub}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                <a
                  href={copy.primary.href}
                  {...(isCompany ? { download: true } : {})}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
                >
                  {isCompany ? <Download size={16} /> : <Mail size={16} />}
                  {copy.primary.label}
                </a>
                </Magnetic>
                <Magnetic>
                <a
                  href={copy.secondary.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold transition-colors hover:border-accent"
                >
                  {copy.secondary.label}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                </Magnetic>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {profile.location}
            </span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <LinkedinIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 mt-6 w-full max-w-md"
        >
          <div className="spot card ring-anim relative p-6 shadow-2xl shadow-accent/10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent2/20 blur-3xl" />
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative mr-2 h-16 w-16 shrink-0">
                <Orbit />
                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-display text-2xl font-bold text-ink shadow-lg shadow-accent/30">
                  SJ
                </div>
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
            </div>

            <div className="relative mt-6 rounded-xl border border-line bg-soft p-4 font-mono text-[13px] leading-6 text-muted">
              <p><span className="text-accent">const</span> sandeep = {"{"}</p>
              <p className="pl-4">experience: <span className="text-accent2">&quot;4+ years&quot;</span>,</p>
              <p className="pl-4">focus: <span className="text-accent2">&quot;full stack&quot;</span>,</p>
              <p className="pl-4">now: <span className="text-accent2">&quot;Livia HMIS @ TeamArcs&quot;</span>,</p>
              <p className="pl-4">openTo: [<span className="text-accent2">&quot;full-time&quot;</span>, <span className="text-accent2">&quot;freelance&quot;</span>],</p>
              <p>{"}"}</p>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {stackChips.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface2 px-3 py-1 text-xs text-muted">
                  <TechIcon name={c} size={12} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {floaters.map((f) => (
            <motion.div
              key={f.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
              className={`absolute ${f.className} rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-xl backdrop-blur`}
            >
              <p className="grad-text font-display text-lg font-semibold leading-none">{f.value}</p>
              <p className="mt-1 text-[11px] text-muted">{f.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
