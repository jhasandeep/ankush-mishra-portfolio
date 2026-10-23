"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-fg"
    >
      <Moon size={16} className="theme-icon-moon" />
      <Sun size={16} className="theme-icon-sun" />
    </button>
  );
}
