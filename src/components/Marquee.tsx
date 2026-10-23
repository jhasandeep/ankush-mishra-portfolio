import { TechIcon } from "./TechIcon";

const items = [
  "AWS",
  "Kubernetes",
  "Terraform",
  "Docker",
  "ArgoCD",
  "Jenkins",
  "GitHub Actions",
  "Helm",
  "Prometheus",
  "Grafana",
  "Python",
  "Azure",
];

const items2 = [
  "Ansible",
  "Loki",
  "ELK Stack",
  "Traefik",
  "Cloudflare",
  "SonarQube",
  "Trivy",
  "Redis",
  "Linux",
  "Bash",
  "Git",
  "GCP",
];

const clients = ["Livia Health", "Astro Arun Pandit", "HCL Technologies", "Stanley Black & Decker"];

export function Marquee() {
  return (
    <section aria-label="Clients and technologies" className="border-t border-line py-10">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        Worked with teams and clients including{" "}
        {clients.map((c, i) => (
          <span key={c} className="text-fg">
            {c}
            {i < clients.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {[...items, ...items].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="mx-3 flex items-center gap-3 whitespace-nowrap font-display text-2xl font-semibold text-muted/60 grayscale transition-all hover:text-fg hover:grayscale-0 sm:text-3xl"
            >
              <TechIcon name={t} size={28} />
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
      <div className="marquee mt-4 overflow-hidden">
        <div className="marquee-track marquee-reverse">
          {[...items2, ...items2].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= items2.length}
              className="mx-3 flex items-center gap-3 whitespace-nowrap font-display text-xl font-semibold text-muted/60 grayscale transition-all hover:text-fg hover:grayscale-0 sm:text-2xl"
            >
              <TechIcon name={t} size={22} />
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
