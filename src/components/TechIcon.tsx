import {
  siAnsible,
  siArgo,
  siClaude,
  siCloudflare,
  siElasticstack,
  siGithubactions,
  siGooglecloud,
  siGrafana,
  siCss,
  siCursor,
  siDjango,
  siDocker,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siGnubash,
  siGooglemaps,
  siGraphql,
  siHasura,
  siHelm,
  siHtml5,
  siJavascript,
  siJenkins,
  siJsonwebtokens,
  siKubernetes,
  siLetsencrypt,
  siLinux,
  siMongodb,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPassport,
  siPostman,
  siOwasp,
  siPrometheus,
  siPython,
  siRadixui,
  siReact,
  siReacthookform,
  siReactquery,
  siRedis,
  siRedux,
  siSonarqubeserver,
  siSwagger,
  siTailwindcss,
  siTerraform,
  siTraefikproxy,
  siTrivy,
  siTypeorm,
  siTypescript,
  siZoho,
  type SimpleIcon,
} from "simple-icons";
import {
  Boxes,
  Cloud,
  CreditCard,
  Database,
  FlaskConical,
  KeyRound,
  Network,
  Smartphone,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Ordered: first matching prefix wins, so "React Native" must not be caught by a looser rule first.
const brand: [RegExp, SimpleIcon][] = [
  [/^next/i, siNextdotjs],
  [/^react hook form/i, siReacthookform],
  [/^(tanstack|react) query/i, siReactquery],
  [/^react/i, siReact],
  [/^nest/i, siNestjs],
  [/^typescript/i, siTypescript],
  [/^javascript/i, siJavascript],
  [/^node/i, siNodedotjs],
  [/^mysql/i, siMysql],
  [/^mongo/i, siMongodb],
  [/^graphql/i, siGraphql],
  [/^hasura/i, siHasura],
  [/^docker/i, siDocker],
  [/^kubernetes/i, siKubernetes],
  [/^helm/i, siHelm],
  [/^jenkins/i, siJenkins],
  [/^nginx/i, siNginx],
  [/^tailwind/i, siTailwindcss],
  [/^(django|drf)/i, siDjango],
  [/^python/i, siPython],
  [/^redux/i, siRedux],
  [/^material ui|^mui/i, siMui],
  [/^radix/i, siRadixui],
  [/^express/i, siExpress],
  [/^firebase/i, siFirebase],
  [/^google maps/i, siGooglemaps],
  [/^postman/i, siPostman],
  [/^git$/i, siGit],
  [/^github actions/i, siGithubactions],
  [/^github/i, siGithub],
  [/^terraform/i, siTerraform],
  [/^ansible/i, siAnsible],
  [/^argo/i, siArgo],
  [/^grafana/i, siGrafana],
  [/^prometheus/i, siPrometheus],
  [/^(elk|elastic)/i, siElasticstack],
  [/^cloudflare/i, siCloudflare],
  [/^traefik/i, siTraefikproxy],
  [/^redis/i, siRedis],
  [/^(gcp|google cloud)/i, siGooglecloud],
  [/^sonarqube/i, siSonarqubeserver],
  [/^trivy/i, siTrivy],
  [/^owasp/i, siOwasp],
  [/^linux/i, siLinux],
  [/^html/i, siHtml5],
  [/^css/i, siCss],
  [/^typeorm/i, siTypeorm],
  [/^jwt/i, siJsonwebtokens],
  [/^passport/i, siPassport],
  [/^cursor/i, siCursor],
  [/^claude/i, siClaude],
  [/^zoho/i, siZoho],
  [/^swagger/i, siSwagger],
  [/^ssl/i, siLetsencrypt],
  [/^bash/i, siGnubash],
];

const generic: [RegExp, LucideIcon][] = [
  [/aws|azure|cloud|s3|ec2|eks|ecr|lambda|ses\b|ebs|iam/i, Cloud],
  [/playwright|test|e2e|regression|parity/i, FlaskConical],
  [/m-pesa|flutterwave|payu|payment/i, CreditCard],
  [/chime|video/i, Video],
  [/rbac|acl|auth|dto|validation/i, KeyRound],
  [/mobile|push|offline/i, Smartphone],
  [/sql|index|schema|database|query/i, Database],
  [/api|microservice|ci\/cd|integration|vpc|load balanc|route 53|auto scaling|dns/i, Network],
  [/etims|insurance|cron|admin/i, Boxes],
];

// Near-black brand colors would vanish in dark mode, so those follow the text color instead.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 60;
}

export function hasBrandIcon(name: string) {
  return brand.some(([re]) => re.test(name.trim()));
}

// Brand color for glows; falls back to the theme accent for generic or near-black icons.
export function techColor(name: string) {
  const hit = brand.find(([re]) => re.test(name.trim()));
  return hit && !isDark(hit[1].hex) ? `#${hit[1].hex}` : "var(--accent)";
}

export function TechIcon({ name, size = 14, mono = false }: { name: string; size?: number; mono?: boolean }) {
  const hit = brand.find(([re]) => re.test(name.trim()));
  if (hit) {
    const icon = hit[1];
    const color = mono || isDark(icon.hex) ? "currentColor" : `#${icon.hex}`;
    return (
      <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill={color} className="shrink-0">
        <path d={icon.path} />
      </svg>
    );
  }
  const Ico = generic.find(([re]) => re.test(name))?.[1] ?? Wrench;
  return <Ico size={size} aria-hidden="true" className="shrink-0 text-accent" />;
}
