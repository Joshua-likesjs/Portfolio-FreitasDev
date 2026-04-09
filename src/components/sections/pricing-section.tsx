'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

type BillingType = 'project' | 'monthly';

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    monthlyPrice: "$500",
    period: "per project",
    monthlyPeriod: "month",
    description: "Perfect for small businesses and personal projects that need a professional online presence.",
    features: [
      "Single page website",
      "Responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "Up to 5 sections",
      "1 revision round",
      "2-week delivery",
    ],
    notIncluded: ["Custom animations", "CMS integration", "Analytics dashboard"],
    popular: false,
    accent: "transparent",
  },
  {
    name: "Professional",
    price: "$5,000",
    monthlyPrice: "$1,200",
    period: "per project",
    monthlyPeriod: "month",
    description: "For growing businesses that need a feature-rich web application with polished UX.",
    features: [
      "Multi-page application",
      "Custom design system",
      "Advanced animations",
      "CMS integration",
      "Performance optimization",
      "Analytics dashboard",
      "3 revision rounds",
      "4-week delivery",
      "Priority support",
    ],
    notIncluded: [],
    popular: true,
    accent: "#C3E41D",
  },
  {
    name: "Enterprise",
    price: "Custom",
    monthlyPrice: "Custom",
    period: "contact for quote",
    monthlyPeriod: "contact for quote",
    description: "Full-scale digital products with dedicated support, ongoing maintenance, and scaling.",
    features: [
      "Full-stack development",
      "Custom architecture",
      "Real-time features",
      "API development",
      "DevOps & CI/CD",
      "Security audit",
      "Unlimited revisions",
      "Dedicated support",
      "SLA guarantee",
      "Ongoing maintenance",
    ],
    notIncluded: [],
    popular: false,
    accent: "transparent",
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

export default function PricingSection() {
  const [billingType, setBillingType] = useState<BillingType>('project');

  return (
    <section
      id="pricing"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,98%)] transition-colors relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse, #C3E41D 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedHeading text="INVESTMENT" />
          <p
            className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 max-w-2xl mx-auto"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Transparent pricing for every stage of your project. No hidden fees, no surprises — just great work.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {/* Per Project Label */}
            <span
              className="flex items-center gap-2 text-sm cursor-pointer select-none"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: billingType === 'project' ? '#C3E41D' : undefined,
              }}
              onClick={() => setBillingType('project')}
            >
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: billingType === 'project' ? '#C3E41D' : undefined,
                }}
                className={`text-sm select-none transition-colors duration-300 ${billingType === 'project' ? '' : 'dark:text-neutral-500 text-neutral-400'}`}
              >
                Per Project
              </span>
              <AnimatePresence>
                {billingType === 'monthly' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center rounded-full bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            {/* Toggle switch */}
            <button
              type="button"
              onClick={() => setBillingType(billingType === 'project' ? 'monthly' : 'project')}
              className="relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0 focus:outline-none"
              style={{
                backgroundColor: billingType === 'monthly' ? '#C3E41D' : 'hsl(0,0%,25%)',
              }}
              aria-label="Toggle between per project and monthly pricing"
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
                animate={{ left: billingType === 'monthly' ? '1.625rem' : '0.125rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            {/* Monthly Label */}
            <span
              className="flex items-center text-sm cursor-pointer select-none"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: billingType === 'monthly' ? '#C3E41D' : undefined,
              }}
              onClick={() => setBillingType('monthly')}
            >
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: billingType === 'monthly' ? '#C3E41D' : undefined,
                }}
                className={`text-sm select-none transition-colors duration-300 ${billingType === 'monthly' ? '' : 'dark:text-neutral-500 text-neutral-400'}`}
              >
                Monthly
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative"
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black"
                    style={{
                      backgroundColor: "#C3E41D",
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`relative h-full p-6 md:p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-1 dark:bg-[hsl(0,0%,8%)] bg-white ${
                  plan.popular ? "dark:border-[#C3E41D]/30 border-[#C3E41D]/40 shadow-[0_0_40px_rgba(195,228,29,0.08)]" : "dark:border-neutral-800 border-neutral-200"
                }`}
              >
                {/* Glow effect for popular */}
                {plan.popular && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: "0 0 60px rgba(195, 228, 29, 0.1), inset 0 0 60px rgba(195, 228, 29, 0.03)",
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Plan name */}
                  <h3
                    className="text-lg font-bold mb-2 dark:text-white text-neutral-900 group-hover:text-[#C3E41D] transition-colors duration-300"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {plan.name}
                  </h3>

                  {/* Price with animation */}
                  <div className="mb-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${plan.name}-${billingType}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="flex items-baseline"
                      >
                        <span
                          className="text-4xl md:text-5xl font-bold dark:text-white text-neutral-900"
                          style={{ fontFamily: "'Fira Code', monospace" }}
                        >
                          {billingType === 'project' ? plan.price : plan.monthlyPrice}
                        </span>
                        <span
                          className="text-sm dark:text-neutral-500 text-neutral-400 ml-2"
                          style={{ fontFamily: "'Antic', sans-serif" }}
                        >
                          {billingType === 'project' ? plan.period : plan.monthlyPeriod}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-6 min-h-[3rem]"
                    style={{ fontFamily: "'Antic', sans-serif" }}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-6"
                    style={{
                      background: plan.popular
                        ? "linear-gradient(to right, transparent, rgba(195,228,29,0.3), transparent)"
                        : "linear-gradient(to right, transparent, hsl(0,0%,20%), transparent)",
                    }}
                  />

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            backgroundColor: plan.popular ? "rgba(195,228,29,0.15)" : "hsl(0,0%,15%)",
                          }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: plan.popular ? "#C3E41D" : "hsl(0,0%,60%)" }}
                          />
                        </div>
                        <span
                          className="text-sm dark:text-neutral-300 text-neutral-700"
                          style={{ fontFamily: "'Antic', sans-serif" }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 opacity-40">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 dark:bg-neutral-800 bg-neutral-100">
                          <span className="text-xs dark:text-neutral-600 text-neutral-400">—</span>
                        </div>
                        <span
                          className="text-sm dark:text-neutral-500 text-neutral-400 line-through"
                          style={{ fontFamily: "'Antic', sans-serif" }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      backgroundColor: plan.popular ? "#C3E41D" : "transparent",
                      color: plan.popular ? "black" : undefined,
                      border: plan.popular ? "none" : "1px solid",
                      borderColor: plan.popular ? undefined : "hsl(0,0%,25%)",
                    }}
                    onMouseEnter={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.borderColor = "#C3E41D";
                        e.currentTarget.style.color = "#C3E41D";
                      } else {
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(195,228,29,0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.borderColor = "hsl(0,0%,25%)";
                        e.currentTarget.style.color = "";
                      } else {
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {plan.name === "Enterprise" ? "Get in Touch" : "Get Started"}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-sm dark:text-neutral-500 text-neutral-400"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          All prices are in USD. Need something different?{" "}
          <a
            href="#contact"
            className="text-[#C3E41D] hover:underline underline-offset-4 transition-all"
          >
            Let&apos;s talk about your project.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
