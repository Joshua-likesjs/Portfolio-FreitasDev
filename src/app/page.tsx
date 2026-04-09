'use client';

// ─── Effects (Visual animations & backgrounds) ───────────────────────────────
import FloatingPathsBackground from "@/components/effects/floating-paths";
import CursorGlow from "@/components/effects/cursor-glow";

// ─── Navigation (UI navigation utilities) ────────────────────────────────────
import ScrollProgress from "@/components/navigation/scroll-progress";
import AvailabilityBanner from "@/components/navigation/availability-banner";
import BackToTop from "@/components/navigation/back-to-top";
import SectionDivider from "@/components/navigation/section-divider";

// ─── Features (Interactive widgets) ──────────────────────────────────────────
import CommandPalette from "@/components/features/command-palette";
import MusicPlayerWidget from "@/components/features/music-player-widget";
import KeyboardShortcutsPanel from "@/components/features/keyboard-shortcuts-panel";

// ─── Sections (Page content blocks) ──────────────────────────────────────────
import PortfolioHero from "@/components/sections/portfolio-hero";
import AboutSection from "@/components/sections/about-section";
import StatsSection from "@/components/sections/stats-section";
import ServicesSection from "@/components/sections/services-section";
import ProcessSection from "@/components/sections/process-section";
import TechMarqueeSection from "@/components/sections/tech-marquee-section";
import ProjectsSection from "@/components/sections/projects-section";
import ExperienceSection from "@/components/sections/experience-section";
import EducationSection from "@/components/sections/education-section";
import FeaturedArticlesSection from "@/components/sections/featured-articles-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import FAQSection from "@/components/sections/faq-section";
import AchievementsSection from "@/components/sections/achievements-section";
import SkillsRadarSection from "@/components/sections/skills-radar-section";
import TrustedBrandsSection from "@/components/sections/trusted-brands-section";
import NowSection from "@/components/sections/now-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import ContactSection from "@/components/sections/contact-section";
import PortfolioFooter from "@/components/sections/portfolio-footer";
import ToolsSection from "@/components/sections/tools-section";
import ContributionGraphSection from "@/components/sections/contribution-graph-section";
import TimelineJourneySection from "@/components/sections/timeline-journey-section";
import QuoteSection from "@/components/sections/quote-section";
import PricingSection from "@/components/sections/pricing-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingPathsBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <CursorGlow />
        <CommandPalette />
        <AvailabilityBanner />
        <ScrollProgress />
        <PortfolioHero />
        <div className="flex-1">
        <AboutSection />
        <SectionDivider />
        <TrustedBrandsSection />
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
        <FeaturedArticlesSection />
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
        <div className="flex justify-center py-8"><MusicPlayerWidget /></div>
        <SectionDivider />
        <QuoteSection />
        <SectionDivider />
        <NewsletterSection />
        <ContactSection />
        </div>
        <PortfolioFooter />
        <BackToTop />
        <KeyboardShortcutsPanel />
      </div>
    </div>
  );
}
