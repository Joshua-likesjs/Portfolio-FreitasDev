'use client';

import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection from "@/components/ui/about-section";
import ProjectsSection from "@/components/ui/projects-section";
import ExperienceSection from "@/components/ui/experience-section";
import EducationSection from "@/components/ui/education-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/portfolio-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioHero />
      <div className="flex-1">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
