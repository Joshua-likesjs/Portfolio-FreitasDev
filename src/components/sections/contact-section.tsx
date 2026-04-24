'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Send, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";
import emailjs from '@emailjs/browser'; // ✅ Importar EmailJS

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

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
        color: "#8A00C4",
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

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null); // ✅ Referência para o formulário
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ FUNÇÃO ATUALIZADA COM EMAILJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // ✅ Enviar email usando EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!, // Referência ao formulário
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast({
          title: "✉️ Mensagem enviada!",
          description: "Obrigado pelo contato! Retornarei em breve.",
        });
        
        // Limpar  formulário
        setFormData({ name: "", email: "", message: "" });
        
        // Mostrar sucesso por 3 segundos
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        throw new Error('Erro ao enviar');
      }

    } catch (error) {
      console.error('Erro ao enviar email:', error);
      
      toast({
        title: "❌ Erro ao enviar",
        description: "Não foi possível enviar a mensagem. Verifique sua rede.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 dark:bg-[hsl(0,0%,4%)] bg-[hsl(0,0%,96%)] transition-colors relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: "#8A00C4", opacity: 0.03 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedHeading text="GET IN TOUCH" />
        <p
          className="text-base md:text-lg dark:text-neutral-400 text-neutral-500 mb-12 md:mb-16 max-w-xl"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "#8A00C415" }}
                >
                  <Mail className="w-5 h-5" style={{ color: "#8A00C4" }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-500 mb-0.5" style={{ fontFamily: "'Fira Code', monospace" }}>Email</p>
                  <span className="text-sm dark:text-neutral-300 text-neutral-700" style={{ fontFamily: "'Fira Code', monospace" }}>
                    freitascontactdev@gmail.com
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "#8A00C415" }}
                >
                  <User className="w-5 h-5" style={{ color: "#8A00C4" }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-500 mb-0.5" style={{ fontFamily: "'Fira Code', monospace" }}>Based in</p>
                  <span className="text-sm dark:text-neutral-300 text-neutral-700" style={{ fontFamily: "'Fira Code', monospace" }}>
                    Manaus, AM
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs uppercase tracking-widest dark:text-neutral-500 text-neutral-500 mb-3" style={{ fontFamily: "'Fira Code', monospace" }}>Connect</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/Joshua-likesjs" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/josu%C3%A9-freitas-442a1a402/" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl dark:bg-[hsl(0,0%,12%)] bg-white dark:border-neutral-800 border-neutral-200 border dark:hover:border-[#8A00C4]/50 hover:border-[#8A00C4]/60 dark:hover:text-[#8A00C4] hover:text-[#8a9d17] dark:text-neutral-400 text-neutral-500 transition-all duration-300 hover:-translate-y-0.5"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - ✅ ATUALIZADO COM REF E NAME NOS CAMPOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form 
              ref={formRef} // ✅ Adicionar referência aqui
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              {/* Name - ✅ Adicionar name attribute */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-neutral-500 text-neutral-400" />
                <Input
                  type="text"
                  name="user_name" // ✅ IMPORTANTE: deve corresponder ao template
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="pl-10 dark:bg-[hsl(0,0%,10%)] dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-500 focus:dark:border-[#8A00C4]/50 focus:border-[#8A00C4]/50 transition-colors"
                />
              </div>

              {/* Email - ✅ Adicionar name attribute */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-neutral-500 text-neutral-400" />
                <Input
                  type="email"
                  name="user_email" // ✅ IMPORTANTE: deve corresponder ao template
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10 dark:bg-[hsl(0,0%,10%)] dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-500 focus:dark:border-[#8A00C4]/50 focus:border-[#8A00C4]/50 transition-colors"
                />
              </div>

              {/* Message - ✅ Adicionar name attribute */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 dark:text-neutral-500 text-neutral-400" />
                <Textarea
                  name="message" // ✅ IMPORTANTE: deve corresponder ao template
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="pl-10 dark:bg-[hsl(0,0%,10%)] dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-500 focus:dark:border-[#8A00C4]/50 focus:border-[#8A00C4]/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full h-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-[#8A00C420] disabled:opacity-60"
                style={{
                  backgroundColor: isSuccess ? "#16a34a" : "#8A00C4",
                  color: isSuccess ? "white" : "black",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                {isSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Sent Successfully!
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}