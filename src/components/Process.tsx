"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Compass, Rocket, Search } from "lucide-react";
import { useAudience } from "./Providers";
import { Reveal, SectionHead } from "./Reveal";

const icons = [Search, Compass, Code2, Rocket];

const steps = {
  freelance: [
    { title: "Assess", text: "A short call and a look at your current infrastructure, pipelines and cloud bill to pin down goals and risks." },
    { title: "Design", text: "Choose the architecture, tooling and environments so the setup can scale without a rewrite." },
    { title: "Automate", text: "Infrastructure as Code, CI/CD and monitoring built in small steps, with demos along the way." },
    { title: "Hand over", text: "Runbooks, dashboards and documentation so your team can operate everything confidently." },
  ],
  company: [
    { title: "Understand the system", text: "Map the services, environments, traffic and failure modes before changing anything." },
    { title: "Codify it", text: "Move infrastructure and deployments into Terraform, Helm and Git so every change is reviewed." },
    { title: "Automate delivery", text: "CI/CD with security scanning and GitOps so releases are fast, repeatable and reversible." },
    { title: "Operate and improve", text: "Monitor, respond to incidents, find root causes and keep tuning cost and performance." },
  ],
};

function StepBadge({ i }: { i: number }) {
  const Ico = icons[i];
  return (
    <div className="draw-icon relative z-10 grid h-16 w-16 place-items-center rounded-full bg-bg">
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={`step-grad-${i}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={`url(#step-grad-${i})`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.25, ease: "easeInOut" }}
        />
      </svg>
      <Ico size={22} className="text-accent" />
      <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-mono text-[10px] font-bold text-ink">
        {i + 1}
      </span>
    </div>
  );
}

export function Process() {
  const { audience } = useAudience();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead
        eyebrow="How I work"
        title={audience === "freelance" ? "A simple, transparent process." : "How I work inside a team."}
      />
      <div ref={ref} className="relative">
        <div className="absolute left-8 right-8 top-8 hidden h-px bg-line lg:block">
          <motion.div style={{ width }} className="relative h-full bg-gradient-to-r from-accent to-accent2">
            <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-accent2 shadow-[0_0_12px_var(--accent-2)]" />
          </motion.div>
        </div>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps[audience].map((s, i) => (
            <Reveal key={audience + s.title} delay={i * 0.1}>
              <li className="group relative">
                <StepBadge i={i} />
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
