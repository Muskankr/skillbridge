import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/layout/Footer";
import WhySkillBridge from "@/components/landing/WhySkillBridge";
import ProfilePreview from "@/components/landing/ProfilePreview";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        
        <Features />
        <HowItWorks />
        <WhySkillBridge />
        <ProfilePreview />
        <CTA />
      </main>

      <Footer />
    </>
  );
}