'use client';

import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection from "@/components/ui/about-section";
import StatsSection from "@/components/ui/stats-section";
import ProjectsSection from "@/components/ui/projects-section";
import ExperienceSection from "@/components/ui/experience-section";
import EducationSection from "@/components/ui/education-section";
import WritingSection from "@/components/ui/writing-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/portfolio-footer";
import BackToTop from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioHero />
      <div className="flex-1">
        <AboutSection />
        <StatsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <WritingSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
