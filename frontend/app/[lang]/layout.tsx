import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";
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

// interface RootLayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ lang: "uk" | "en" | "es" | "fr" | "de" }>;
// }

// export default async function RootLayout({
//   children,
//   params,
// }: RootLayoutProps) {
//   const { lang } = await params;
//   const dict = await getDictionary(lang);

//   return (
//     <html lang={lang}>
//       <body className={`${geistSans.variable} ${geistMono.variable} page`}>
//         <Header dict={dict} />
//         {children}
//         <Footer dict={dict} />
//       </body>
//     </html>
//   );
// }

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Оголошуємо як Promise
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params; // Розгортаємо Promise
  const { lang } = resolvedParams;
  const supportedLangs = ["uk", "en", "es", "fr", "de"] as const;
  type SupportedLang = (typeof supportedLangs)[number];

  if (!supportedLangs.includes(lang as SupportedLang)) {
    console.error(`Unsupported language: ${lang}`);
    return <div>Unsupported language</div>;
  }

  const dict = await getDictionary(lang as SupportedLang);

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
