"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, FileCheck2, Lock, X } from "lucide-react";
import { projects, type Project, featuredStats } from "@/data/portfolio";
import { Reveal, SectionHead } from "./Reveal";
import { TechIcon } from "./TechIcon";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

function BrowserShot({
  image,
  url,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  image: string;
  url: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface2 shadow-xl shadow-black/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1 truncate rounded-md bg-surface2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
          <Lock size={9} className="shrink-0" />
          <span className="truncate">{host(url)}</span>
        </span>
        <span className="w-[34px]" />
      </div>
      <div className="shine relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

// Fanned stack for projects that span several live sites.
function GalleryStack({ project }: { project: Project }) {
  const g = project.gallery!;
  return (
    <div className="relative mb-5 aspect-[16/11]">
      {g.map((s, i) => (
        <div
          key={s.url}
          className="absolute w-[78%] transition-transform duration-500"
          style={{
            left: `${i * 11}%`,
            top: `${i * 9}%`,
            zIndex: i,
            transform: `rotate(${(i - 1) * 2.5}deg)`,
          }}
        >
          <BrowserShot image={s.image} url={s.url} alt={`${s.label} website`} sizes="(min-width: 1024px) 280px, 80vw" />
        </div>
      ))}
    </div>
  );
}

function Placeholder() {
  return (
    <div className="relative mb-5 grid aspect-[16/11] place-items-center overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/15 to-accent2/10">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent2 text-ink">
        <FileCheck2 size={28} />
      </div>
    </div>
  );
}

function Visual({ project }: { project: Project }) {
  if (project.gallery) return <GalleryStack project={project} />;
  if (project.image && project.url)
    return (
      <BrowserShot
        image={project.image}
        url={project.url}
        alt={`${project.title} screenshot`}
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
        className="mb-5"
      />
    );
  return <Placeholder />;
}

function Chips({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((s) => (
        <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted">
          <TechIcon name={s} size={12} />
          {s}
        </span>
      ))}
      {limit && items.length > limit && (
        <span className="rounded-full px-2 py-1 font-mono text-[11px] text-accent">+{items.length - limit}</span>
      )}
    </div>
  );
}

function LiveLink({ url, label = "Live", className = "" }: { url: string; label?: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <ExternalLink size={12} /> {label}
    </a>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const shots = project.gallery ?? (project.image && project.url ? [{ label: project.title, url: project.url, image: project.image }] : []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="card max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-b-none p-6 sm:rounded-b-[1.25rem] sm:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.kind}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line hover:border-accent"
          >
            <X size={16} />
          </button>
        </div>

        {shots.length > 0 && (
          <div className={`mt-6 grid gap-4 ${shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {shots.map((s, i) => (
              <div key={s.url} className={`group ${shots.length === 3 && i === 0 ? "sm:col-span-2" : ""}`}>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={`Open ${s.label}`}>
                  <BrowserShot image={s.image} url={s.url} alt={`${s.label} screenshot`} sizes="(min-width: 768px) 700px, 95vw" />
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.gallery
            ? project.gallery.map((s) => <LiveLink key={s.url} url={s.url} label={s.label} />)
            : project.url && <LiveLink url={project.url} label={`Visit ${host(project.url)}`} />}
        </div>
        {project.note && <p className="mt-3 text-xs text-muted">{project.note}</p>}

        <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed">
              <Check size={16} className="mt-0.5 shrink-0 text-accent2" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">Tech stack</p>
          <Chips items={project.stack} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead
        eyebrow="Selected work"
        title="Pipelines, platforms and infrastructure I have built and run."
        intro="Production infrastructure and delivery pipelines. Open any project for the details."
      />

      {/* Featured */}
      <Reveal>
        <div className="spot card card-hover ring-anim group relative mb-6 overflow-hidden">
          <button
            onClick={() => setActive(featured)}
            aria-label={`Open details for ${featured.title}`}
            className="absolute inset-0 z-[1] rounded-[inherit]"
          />
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <span className="rounded-full bg-gradient-to-r from-accent to-accent2 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                Featured · current role
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{featured.summary}</p>
              <div className="mt-6">
                <Chips items={featured.stack} limit={8} />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read the details
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {featured.url && <LiveLink url={featured.url} label="Live admin portal" />}
              </div>
            </div>
            {featured.image && featured.url && (
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-accent/20 blur-3xl" />
                <BrowserShot
                  image={featured.image}
                  url={featured.url}
                  alt={`${featured.title} screenshot`}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="relative"
                  priority
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-4">
            {featuredStats.map(([v, l]) => (
              <div key={l} className="bg-surface p-5 sm:p-6">
                <p className="grad-text font-display text-3xl font-semibold">{v}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
            <div className="spot card card-hover group relative flex h-full flex-col p-5 hover:-translate-y-1">
              <button
                onClick={() => setActive(p)}
                aria-label={`Open details for ${p.title}`}
                className="absolute inset-0 z-[1] rounded-[inherit]"
              />
              <Visual project={p} />
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{p.kind}</p>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              {p.metric && (
                <p className="mt-4 text-sm">
                  <span className="grad-text font-display text-xl font-semibold">{p.metric.value}</span>{" "}
                  <span className="text-muted">{p.metric.label}</span>
                </p>
              )}
              <div className="mt-5 flex items-end justify-between gap-3">
                <Chips items={p.stack} limit={3} />
                {p.url && <LiveLink url={p.url} className="shrink-0" />}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectModal key={active.slug} project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
