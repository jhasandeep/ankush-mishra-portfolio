"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Loader2, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useAudience } from "./Providers";
import { GithubIcon, LinkedinIcon } from "./Icon";
import { Reveal } from "./Reveal";
import { PaperPlane } from "./Graphics";
import { Burst } from "./Interactions";

export function Contact() {
  const { audience } = useAudience();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const isCompany = audience === "company";

  const subject = isCompany ? "Job opportunity" : "Freelance project inquiry";
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `${message}\n\n${name ? "- " + name : ""}`,
  )}`;

  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: profile.phoneHref },
    { icon: LinkedinIcon, label: "LinkedIn", href: profile.linkedin },
    ...(profile.github ? [{ icon: GithubIcon, label: "GitHub", href: profile.github }] : []),
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-soft">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <PaperPlane className="pointer-events-none absolute bottom-8 left-1/2 hidden w-[300px] -translate-x-[105%] opacity-80 lg:block" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {isCompany ? (
              <>Let&apos;s talk about <span className="grad-text">your next hire.</span></>
            ) : (
              <>Have a project in mind? <span className="grad-text">Let&apos;s build it.</span></>
            )}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {isCompany
              ? "I'm open to senior DevOps and cloud roles. Send a note or grab my resume and I'll get back to you."
              : "Tell me a bit about what you need: scope, timeline and your current cloud setup. I'll reply with how I'd approach it."}
          </p>

          <ul className="mt-8 space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-fg"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface transition-colors group-hover:border-accent group-hover:text-accent">
                    <l.icon className="h-[18px] w-[18px]" />
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={profile.resume}
            download
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-accent"
          >
            <Download size={16} /> Download resume (PDF)
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("sending");
              setError("");
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, message, website, audience }),
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(data.error || "Something went wrong.");
                setStatus("sent");
                setName("");
                setEmail("");
                setMessage("");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
                setStatus("error");
              }
            }}
            className="card relative space-y-5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
            />
            <div>
              <label htmlFor="msg" className="mb-2 block text-sm font-medium">
                {isCompany ? "About the role" : "About the project"}
              </label>
              <textarea
                id="msg"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isCompany
                    ? "Company, role, team size and cloud stack..."
                    : "What are you building? Timeline and budget range help too."
                }
                className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            <div className="relative">
            {status === "sent" && <Burst />}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
            </div>
            <div aria-live="polite" className="min-h-5 text-center text-sm">
              {status === "sent" && (
                <p className="inline-flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle2 size={16} /> Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400">
                  <span className="inline-flex items-center gap-1.5">
                    <AlertCircle size={16} /> {error}
                  </span>{" "}
                  <a href={mailto} className="underline">
                    Open email app
                  </a>
                </p>
              )}
              {(status === "idle" || status === "sending") && (
                <p className="text-xs text-muted">Goes straight to my inbox. I usually reply within a day.</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
