import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import { SUPPORTED_LANGUAGES } from "../constants/languages";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";

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

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    console.error(`Unsupported language: ${lang}`);
    return <div>Unsupported language</div>;
  }

  const dict = await getDictionary(lang as SupportedLanguage);

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} page`}>
        <Header dict={dict} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
