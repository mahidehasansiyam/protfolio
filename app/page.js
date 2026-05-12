import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import Stats from "@/components/Stats";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Stats />
        <Education />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
