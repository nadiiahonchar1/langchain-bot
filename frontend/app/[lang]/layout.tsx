import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import Header from "../components/Header/Header";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

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
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: (typeof SUPPORTED_LANGUAGES)[number] };
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} page`}>
        <Header dict={dict} />
        {children}
        <footer>{dict.footerMessage}</footer>
      </body>
    </html>
  );
}
