'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, ArrowRight, Sparkles } from "lucide-react";

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

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.details?.email?.[0] || data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors overflow-hidden"
    >
      {/* Decorative gradient glow behind the form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(195,228,29,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          {/* Decorative mail icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{ backgroundColor: "rgba(195,228,29,0.1)" }}
          >
            <Mail className="w-7 h-7" style={{ color: "#C3E41D" }} />
          </motion.div>

          <AnimatedHeading text="STAY UPDATED" />

          <p
            className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 max-w-md mx-auto"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            Get notified about new projects, articles, and creative experiments.
          </p>
        </motion.div>

        {/* Form / Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl dark:bg-[hsl(0,0%,8%)] bg-white border dark:border-neutral-800 border-neutral-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(34,197,94,0.15)" }}
              >
                <Check className="w-8 h-8 text-green-500" />
              </motion.div>
              <p
                className="text-2xl font-bold dark:text-white text-black"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                You&apos;re in! 🎉
              </p>
              <p
                className="text-sm dark:text-neutral-400 text-neutral-500"
                style={{ fontFamily: "'Antic', sans-serif" }}
              >
                Thanks for subscribing. You&apos;ll hear from us soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3 relative">
                {/* Gradient glow behind form row */}
                <div
                  className="absolute -inset-2 rounded-2xl pointer-events-none -z-10"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(195,228,29,0.06) 0%, transparent 80%)",
                  }}
                />

                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading"}
                  className="flex-1 rounded-xl px-4 py-3 dark:bg-[hsl(0,0%,8%)] bg-white dark:border-neutral-800 border-neutral-200 border focus:border-[#C3E41D] dark:text-white text-black placeholder-neutral-500 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none whitespace-nowrap"
                  style={{
                    backgroundColor: "#C3E41D",
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-red-500 text-center"
                >
                  {errorMessage}
                </motion.p>
              )}
            </form>
          )}

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 text-center text-xs dark:text-neutral-500 text-neutral-400 flex items-center justify-center gap-1.5"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            <Sparkles className="w-3 h-3" />
            No spam. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
