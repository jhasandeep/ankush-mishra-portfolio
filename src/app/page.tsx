import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Offerings } from "@/components/Offerings";
import { Projects } from "@/components/Projects";
import { Engineering } from "@/components/Engineering";
import { Architecture } from "@/components/Architecture";
import { Divider } from "@/components/Graphics";
import { Cursor, Intro, ScrollTop } from "@/components/Interactions";
import { Experience } from "@/components/Experience";
import { Process } from "@/components/Process";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <ScrollTop />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Divider />
        <About />
        <Offerings />
        <Projects />
        <Divider flip />
        <Architecture />
        <Engineering />
        <Experience />
        <Divider />
        <Process />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
