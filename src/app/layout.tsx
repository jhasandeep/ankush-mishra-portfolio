import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sandeep Kumar Jha | Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer (React, Next.js, NestJS, TypeScript, MySQL) building and modernizing enterprise web and mobile platforms. Available for full-time roles and freelance projects.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "Freelance developer",
    "Delhi",
  ],
  authors: [{ name: "Sandeep Kumar Jha" }],
  openGraph: {
    title: "Sandeep Kumar Jha | Senior Full Stack Developer",
    description:
      "Enterprise web and mobile platforms with React, Next.js and NestJS. Open to full-time roles and freelance work.",
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
