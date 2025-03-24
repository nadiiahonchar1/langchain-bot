"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export const SUPPORTED_LANGUAGES = [
  { code: "uk", label: "Українська" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function LanguageSelector({
  currentLang,
}: {
  currentLang: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState(currentLang);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);

    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <select value={selectedLang} onChange={handleChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
