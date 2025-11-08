import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configure fonts with display swap for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Portfolio | Your Name",
    template: "%s | Your Name",
  },
  description:
    "Modern portfolio website showcasing projects, skills, and experience. Full-stack developer specializing in React, Next.js, and TypeScript.",
  keywords: [
    "portfolio",
    "web developer",
    "full stack developer",
    "react",
    "next.js",
    "typescript",
    "projects",
    "skills",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Portfolio | Your Name",
    description:
      "Modern portfolio website showcasing projects, skills, and experience",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Your Name",
    description:
      "Modern portfolio website showcasing projects, skills, and experience",
    creator: "@yourusername",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
