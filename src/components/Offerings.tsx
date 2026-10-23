"use client";

import { AnimatePresence, motion } from "framer-motion";
import { offerings } from "@/data/portfolio";
import { useAudience } from "./Providers";
import { Icon } from "./Icon";
import { SectionHead } from "./Reveal";
import { Tilt } from "./Tilt";

export function Offerings() {
  const { audience } = useAudience();
  const o = offerings[audience];

  return (
    <section id="services" className="border-y border-line bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={audience === "company" ? "For teams" : "For clients"}
          title={o.heading}
          intro={o.intro}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {o.items.map((it) => (
              <Tilt key={it.title} className="h-full">
              <div className="spot card card-hover group h-full p-6">
                <div className="draw-icon mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:from-accent group-hover:to-accent2 group-hover:text-ink">
                  <Icon name={it.icon} size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
              </div>
              </Tilt>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
