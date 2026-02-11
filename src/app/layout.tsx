import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jcpomo.com"),
  title: {
    default: "José Carlos Pomo González - Full Stack Web Developer",
    template: "%s | José Carlos Pomo González",
  },
  description:
    "Portfolio and CV of José Carlos Pomo González, experienced Full Stack Web Developer specializing in PHP, Laravel, React, Angular, Vue.js, Docker, and modern web technologies. Based in Munich, Germany.",
  keywords: [
    "José Carlos Pomo González",
    "José Carlos Pomo",
    "Pomo González",
    "JCP",
    "Full Stack Developer",
    "Web Developer Munich",
    "PHP Developer",
    "Laravel Developer",
    "React Developer",
    "Angular Developer",
    "Vue.js Developer",
    "Docker",
    "DevOps",
    "Web Development Germany",
    "Munich Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "José Carlos Pomo González" }],
  creator: "José Carlos Pomo González",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    url: "https://www.jcpomo.com",
    title: "José Carlos Pomo González - Full Stack Web Developer",
    description:
      "Portfolio and CV of José Carlos Pomo González, experienced Full Stack Web Developer specializing in PHP, Laravel, React, Angular, Vue.js, Docker, and modern web technologies.",
    siteName: "José Carlos Pomo González Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 800,
        height: 800,
        alt: "José Carlos Pomo González",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Carlos Pomo González - Full Stack Web Developer",
    description:
      "Portfolio and CV of José Carlos Pomo González, Full Stack Web Developer",
    images: ["/images/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Agrega aquí tu código de verificación de Google Search Console cuando lo tengas
    // google: 'tu-codigo-de-verificacion',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
