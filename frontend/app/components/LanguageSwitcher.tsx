"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const languages = ["uk", "en", "es", "fr", "de"];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLang = pathname.split("/")[1];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div>
      <label htmlFor="language">Language: </label>
      <select id="language" value={currentLang} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
      {isPending && <span>Loading...</span>}
    </div>
  );
}
