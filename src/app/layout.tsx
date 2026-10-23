import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ankush Mishra | Senior DevOps Engineer",
  description:
    "Senior DevOps Engineer (AWS, Kubernetes, Terraform, ArgoCD, Jenkins) building scalable cloud infrastructure and CI/CD pipelines. AWS and Azure certified.",
  keywords: [
    "DevOps Engineer",
    "AWS",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "GitOps",
    "Noida",
  ],
  authors: [{ name: "Ankush Mishra" }],
  openGraph: {
    title: "Ankush Mishra | Senior DevOps Engineer",
    description:
      "Scalable cloud infrastructure and CI/CD on AWS and Azure. Open to senior DevOps roles and consulting.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${space.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
