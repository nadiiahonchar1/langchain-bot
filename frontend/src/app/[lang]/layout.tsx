import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Langchine bot",
  description: "This bot will provide you with a great conversation partner",
};

export async function generateStaticParams() {
  return [
    { lang: "uk" },
    { lang: "en" },
    { lang: "es" },
    { lang: "fr" },
    { lang: "de" },
  ];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "uk" | "en" | "es" | "fr" | "de" }>;
}>) {
  return (
    <html lang={(await params).lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>This is header</header>
        {children}
      </body>
    </html>
  );
}
