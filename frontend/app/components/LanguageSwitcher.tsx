"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from "../constants/languages";
// import { getDictionary } from "../[lang]/dictionaries";

type Props = {
  dict: {
    languageMessage: string;
    loading: string;
  };
};

export default function LanguageSwitcher({ dict }: Props) {
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
  // const dict = await getDictionary(lang);

  return (
    <div>
      <label htmlFor="language">{dict.languageMessage}</label>
      <select id="language" value={currentLang} onChange={handleChange}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_LABELS[lang]}
          </option>
        ))}
      </select>
      {isPending && <span>{dict.loading}...</span>}
    </div>
  );
}
