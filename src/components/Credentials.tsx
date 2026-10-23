import { Award, GraduationCap } from "lucide-react";
import { achievements, certifications, education } from "@/data/portfolio";
import { Reveal, SectionHead } from "./Reveal";
import { Tilt } from "./Tilt";
import { MiniChart } from "./Charts";

export function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead eyebrow="Impact and credentials" title="Results, learning and certifications." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.value + a.text} delay={i * 0.07}>
            <Tilt className="h-full">
              <div className="spot card card-hover h-full p-6">
                <div className="flex items-start justify-between gap-2">
                  <p className="grad-text font-display text-5xl font-semibold">{a.value}</p>
                  <MiniChart kind={i} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="card h-full p-6">
            <p className="flex items-center gap-2 font-display text-lg font-semibold">
              <GraduationCap size={18} className="text-accent" /> Education
            </p>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li key={e.title} className="flex justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{e.title}</p>
                    <p className="text-sm text-muted">{e.place}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">{e.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card h-full p-6">
            <p className="flex items-center gap-2 font-display text-lg font-semibold">
              <Award size={18} className="text-accent" /> Certifications
            </p>
            <ul className="mt-5 space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex gap-3 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
