import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Portfolio - Freitas",
  description: "Designing human experiences in code.",
  keywords: ["portfolio", "design", "developer", "Freitas"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Freitas",
              "url": "https://freitas.dev",
              "jobTitle": "Creative Developer & Designer",
              "description": "Designing human experiences in code. Full-stack developer and UI/UX designer with 7+ years of experience.",
              "sameAs": [
                "https://github.com/freitas",
                "https://linkedin.com/in/freitas",
                "https://twitter.com/freitas",
              ],
              "knowsAbout": ["React", "Next.js", "TypeScript", "UI/UX Design", "Framer Motion", "Tailwind CSS", "Node.js", "Python", "PostgreSQL", "Figma"],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
