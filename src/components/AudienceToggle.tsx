"use client";

import { motion } from "framer-motion";
import { Building2, Rocket } from "lucide-react";
import { useAudience } from "./Providers";
import type { Audience } from "@/data/portfolio";

const options: { id: Audience; label: string; short: string; icon: typeof Building2 }[] = [
  { id: "company", label: "Hiring for a company", short: "Company", icon: Building2 },
  { id: "freelance", label: "Need a freelancer", short: "Freelance", icon: Rocket },
];

export function AudienceToggle({ compact = false, id = "aud" }: { compact?: boolean; id?: string }) {
  const { audience, setAudience } = useAudience();
  return (
    <div
      role="tablist"
      aria-label="Choose how you'd like to view this portfolio"
      className="relative inline-flex rounded-full border border-line bg-surface p-1"
    >
      {options.map((o) => {
        const active = audience === o.id;
        const Ico = o.icon;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => setAudience(o.id)}
            className={`relative z-10 flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              active ? "text-ink" : "text-muted hover:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`pill-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent2"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Ico size={15} />
            {compact ? (
              <span>{o.short}</span>
            ) : (
              <>
                <span className="sm:hidden">{o.short}</span>
                <span className="hidden sm:inline">{o.label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
