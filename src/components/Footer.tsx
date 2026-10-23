import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icon";
import { Signature } from "./Graphics";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-2xl font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">
              {profile.role} · {profile.location}
            </p>
            <div className="mt-5 flex gap-3">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
              )}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} download className="text-muted transition-colors hover:text-fg">
                Resume
              </a>
            </li>
          </ul>
        </div>

        <Signature text="ANKUSH" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>&copy; {profile.name}. Built with Next.js, Tailwind CSS and Framer Motion.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
