import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import AboutMe from "@/components/About";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="bg-transparent text-white w-full">
      <Navbar />

      <FadeIn direction="up">
        <Hero />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <AboutMe />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <Timeline />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <Projects />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <Skills />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <Contact />
      </FadeIn>
    </main>
  );
}
