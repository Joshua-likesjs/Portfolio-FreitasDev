'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most projects take 4-8 weeks from kickoff to launch, depending on complexity. A simple marketing site might take 2-3 weeks, while a full-featured SaaS application could take 8-12 weeks. I always provide a detailed timeline upfront after our initial discovery call.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer: "I work with both! I've partnered with early-stage startups building their MVP, as well as enterprise companies modernizing their web presence. The most important thing to me is a shared vision and clear communication — size doesn't matter.",
  },
  {
    question: "What does your design-to-development process look like?",
    answer: "I typically start with a discovery phase to understand your goals, users, and constraints. Then I move into wireframing and high-fidelity design in Figma, followed by development with regular check-ins. I believe in an iterative approach — you'll see progress early and often.",
  },
  {
    question: "Can you work with my existing design system or brand guidelines?",
    answer: "Absolutely. I'm experienced in working within existing design systems and extending them. Whether you have a comprehensive Figma library or just a brand color palette, I'll make sure the final product aligns perfectly with your brand.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "My core stack is React, Next.js, TypeScript, and Tailwind CSS for the frontend. For backend, I work with Node.js, PostgreSQL, and Prisma. I also have experience with Python, GraphQL, and various cloud services (AWS, Vercel, Cloudflare).",
  },
  {
    question: "How do you handle project communication and updates?",
    answer: "I use Slack or Discord for daily communication and provide weekly progress updates via Loom video walkthroughs. For project management, I prefer Notion or Linear — whichever fits your team's workflow. You'll always know exactly where things stand.",
  },
];

function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <h2
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6"
      style={{
        fontFamily: "'Fira Code', monospace",
        color: "#C3E41D",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        filter: inView ? "blur(0px)" : "blur(8px)",
        transition: "all 0.7s ease-out",
      }}
    >
      {text}
    </h2>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 rounded-xl dark:bg-[hsl(0,0%,10%)] bg-white dark:border-neutral-800 border-neutral-200 border dark:hover:border-[#C3E41D]/30 hover:border-[#C3E41D]/50 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <h3
            className="text-base md:text-lg font-semibold dark:text-neutral-200 text-neutral-800 group-hover:text-[#C3E41D] transition-colors duration-300"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {question}
          </h3>
          <div
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center dark:bg-neutral-800 bg-neutral-100 transition-colors duration-300 group-hover:bg-[#C3E41D20]"
          >
            {isOpen ? (
              <Minus className="w-4 h-4" style={{ color: "#C3E41D" }} />
            ) : (
              <Plus className="w-4 h-4 dark:text-neutral-500 text-neutral-400 group-hover:text-[#C3E41D] transition-colors" />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t dark:border-neutral-800 border-neutral-200">
                <p
                  className="text-sm md:text-base dark:text-neutral-400 text-neutral-600 leading-relaxed"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,7%)] bg-[hsl(0,0%,100%)] transition-colors"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatedHeading text="FAQ" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Common questions about working together. Can&apos;t find what you&apos;re looking for? Reach out directly.
        </p>

        <ScrollReveal>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
