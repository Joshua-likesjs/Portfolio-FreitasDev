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
  title: "Portfolio - Freitas",
  description: "Designing human experiences in code.",
  keywords: ["portfolio", "design", "developer", "Freitas"],
  icons: {
    // Certifique-se que a imagem esteja em: public/FreitasTopLogo.png
    icon: "/FreitasTopLogo.png?v=1", 
  },
  openGraph: {
    title: "Portfolio - Freitas",
    description: "Designing human experiences in code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Freitas",
    description: "Designing human experiences in code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* O Next.js injetará o viewport e metadados aqui automaticamente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
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
              "name": "Freitas",
              "url": "https://freitas.dev",
              "jobTitle": "Creative Developer & Designer",
              "description": "Designing human experiences in code.",
              "sameAs": [
                "https://github.com/freitas",
                "https://linkedin.com/in/freitas",
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
