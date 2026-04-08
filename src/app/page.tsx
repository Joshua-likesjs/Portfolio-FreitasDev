'use client';

import PortfolioHero from "@/components/ui/portfolio-hero";
import ScrollProgress from "@/components/ui/scroll-progress";
import AboutSection from "@/components/ui/about-section";
import StatsSection from "@/components/ui/stats-section";
import ServicesSection from "@/components/ui/services-section";
import ProcessSection from "@/components/ui/process-section";
import TechMarqueeSection from "@/components/ui/tech-marquee-section";
import ProjectsSection from "@/components/ui/projects-section";
import ExperienceSection from "@/components/ui/experience-section";
import EducationSection from "@/components/ui/education-section";
import WritingSection from "@/components/ui/writing-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import FAQSection from "@/components/ui/faq-section";
import AchievementsSection from "@/components/ui/achievements-section";
import SkillsRadarSection from "@/components/ui/skills-radar-section";
import NowSection from "@/components/ui/now-section";
import NewsletterSection from "@/components/ui/newsletter-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/portfolio-footer";
import BackToTop from "@/components/ui/back-to-top";
import SectionDivider from "@/components/ui/section-divider";
import CursorGlow from "@/components/ui/cursor-glow";
import AvailabilityBanner from "@/components/ui/availability-banner";
import ToolsSection from "@/components/ui/tools-section";
import ContributionGraphSection from "@/components/ui/contribution-graph-section";
import TimelineJourneySection from "@/components/ui/timeline-journey-section";
import QuoteSection from "@/components/ui/quote-section";
import MusicPlayerWidget from "@/components/ui/music-player-widget";
import CommandPalette from "@/components/ui/command-palette";
import PricingSection from "@/components/ui/pricing-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorGlow />
      <CommandPalette />
      <AvailabilityBanner />
      <ScrollProgress />
      <PortfolioHero />
      <div className="flex-1">
        <AboutSection />
        <SectionDivider />
        <SkillsRadarSection />
        <StatsSection />
        <ServicesSection />
        <SectionDivider />
        <ProcessSection />
        <TechMarqueeSection />
        <SectionDivider />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <SectionDivider />
        <WritingSection />
        <TestimonialsSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <AchievementsSection />
        <SectionDivider />
        <ToolsSection />
        <SectionDivider />
        <ContributionGraphSection />
        <SectionDivider />
        <TimelineJourneySection />
        <SectionDivider />
        <NowSection />
        <SectionDivider />
        <QuoteSection />
        <SectionDivider />
        <NewsletterSection />
        <ContactSection />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
