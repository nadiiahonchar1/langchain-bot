"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import styles from "../switchers.module.css";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
} from "../../../constants/languages";

type Props = {
  dict: Pick<Dictionary, "languageMessage" | "loading">;
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

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language">{dict.languageMessage}</label>
      <div className={styles.selectWrapper}>
        <select id="language" value={currentLang} onChange={handleChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {LANGUAGE_LABELS[lang]}
            </option>
          ))}
        </select>
        <span
          className={`${styles.loading} ${isPending ? styles.visible : ""}`}
        >
          {dict.loading}...
        </span>
      </div>
    </div>
  );
}
