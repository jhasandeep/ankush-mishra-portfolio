"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { AudienceToggle } from "./AudienceToggle";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["top", ...navLinks.map((l) => l.href.slice(1))];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`relative mx-auto max-w-6xl overflow-hidden rounded-2xl border transition-all duration-500 ${
          scrolled || open
            ? "border-line bg-bg/70 shadow-2xl shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <motion.div
          style={{ scaleX }}
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent2 transition-opacity ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="flex h-14 items-center justify-between gap-4 px-4">
          <a href="#top" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-xs font-bold text-ink">
              AM
            </span>
            <span className="hidden sm:inline">Ankush Mishra</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface2"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <AudienceToggle compact id="nav" />
            </div>
            <ThemeToggle />
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-1.5 rounded-full bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 sm:flex"
            >
              <Download size={14} /> Resume
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden"
            >
              <div className="border-t border-line px-4 pb-5 pt-4">
                <div className="mb-3 md:hidden">
                  <AudienceToggle compact id="nav-m" />
                </div>
                <ul className="grid gap-1">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base text-muted hover:bg-surface hover:text-fg"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={profile.resume} download className="block rounded-lg px-3 py-3 text-base font-medium text-accent">
                      Download resume
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
