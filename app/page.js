import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LogoBar from "@/components/LogoBar";
import Stats from "@/components/Stats";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Expertise from "@/components/Expertise";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <LogoBar />
        <Stats />
        <Skills />
        <Expertise />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
