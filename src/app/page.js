import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import AboutMe from "@/components/About";

export default function Home() {
  return (
    <main className="bg-transparent text-white min-h-screen">
      <Navbar />
      <Hero />
      <AboutMe />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
