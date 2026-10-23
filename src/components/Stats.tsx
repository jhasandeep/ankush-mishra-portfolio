"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { stats } from "@/data/portfolio";
import { Reveal } from "./Reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const unsub = mv.on("change", (v) => {
      el.textContent = `${Math.round(v)}${suffix}`;
    });
    if (inView) animate(mv, to, { duration: 1.6, ease: "easeOut" });
    return unsub;
  }, [inView, to, suffix, mv, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

// Decorative ring that sweeps around the number as it counts up.
function Ring({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
      <defs>
        <linearGradient id={`stat-grad-${i}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" strokeWidth="2" />
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke={`url(#stat-grad-${i})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.82 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: i * 0.08, ease: "easeOut" }}
      />
      {Array.from({ length: 24 }, (_, t) => (
        <line
          key={t}
          x1="50"
          y1="2"
          x2="50"
          y2={t % 6 === 0 ? 7 : 5}
          stroke="var(--line)"
          strokeWidth="1"
          transform={`rotate(${t * 15} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function Stats() {
  return (
    <section aria-label="Key numbers" className="border-y border-line bg-soft">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="px-2 text-center">
            <div className="relative mx-auto grid h-28 w-28 place-items-center">
              <Ring i={i} />
              <p className="grad-text font-display text-3xl font-semibold">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
            </div>
            <p className="mx-auto mt-3 max-w-[11rem] text-xs leading-snug text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
