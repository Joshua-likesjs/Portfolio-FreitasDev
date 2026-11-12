import type { Metadata, Viewport } from "next"; // Importe Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração correta do Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FreitasDev — Engenharia de Software • Backend & IoT",
  description:
    "Portfólio de Josué Freitas: APIs bancárias em Go com Clean Architecture, telemetria IoT com ESP32 e dashboards Next.js — de Manaus para produção.",
  keywords: [
    "portfólio",
    "engenharia de software",
    "backend",
    "golang",
    "IoT",
    "ESP32",
    "Next.js",
    "Freitas",
    "FreitasDev",
    "Manaus",
  ],
  icons: {
    // Certifique-se que a imagem esteja em: public/FreitasTopLogo.png
    icon: "/FreitasTopLogo.png?v=1", 
  },
  openGraph: {
    title: "FreitasDev — Engenharia de Software • Backend & IoT",
    description:
      "APIs bancárias em Go, telemetria IoT com ESP32 e dashboards Next.js — software resiliente, escalável e orientado a retorno real de negócio.",
    type: "website",
    url: "https://portfolio-freitasdev.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreitasDev — Engenharia de Software • Backend & IoT",
    description:
      "APIs bancárias em Go, telemetria IoT com ESP32 e dashboards Next.js — de Manaus para produção.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* O Next.js injetará o viewport e metadados aqui automaticamente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();(function(){try{var l=localStorage.getItem('portfolio-lang');document.documentElement.lang=(l==='en')?'en':'pt-BR'}catch(e){}})();`,
          }}
        />
        {/* JSON-LD e fontes externas permanecem aqui */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Josué Freitas",
              "alternateName": "FreitasDev",
              "url": "https://portfolio-freitasdev.vercel.app",
              "jobTitle": "Software Engineer — Backend Architecture & IoT",
              "description": "Construo software resiliente, escalável e orientado a retorno real de negócio — conectando hardware embarcado e tempo real a backends críticos de alta concorrência.",
              "knowsLanguage": ["pt-BR", "en"],
              "sameAs": [
                "https://github.com/Joshua-likesjs",
                "https://www.linkedin.com/in/josué-freitas-442a1a402/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
