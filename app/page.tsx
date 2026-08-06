import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#05050a] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features /> 
      <HowItWorks />
      <Footer />
    </main>
  );
}