// import styles from "./header.module.css";
// import LanguageSwitcher from "../switchers/LanguageSwitcher/LanguageSwitcher";
// import MessagesStyleSwitcher from "../switchers/MessagesStyleSwitcher/MessagesStyleSwitcher";
// import Logo from "../Logo/logo";

// type Props = {
//   dict: Pick<
//     Dictionary,
//     "languageMessage" | "loading" | "messagesStyle" | "style"
//   >;
// };

// export default async function Header({ dict }: Props) {
//   return (
//     <header className={styles.header}>
//       <Logo />
//       <LanguageSwitcher dict={dict} />
//       <MessagesStyleSwitcher dict={dict} />
//     </header>
//   );
// }

// =================================================

"use client";

import { useEffect, useState, useTransition } from "react";
import styles from "./header.module.css";
// import LanguageSwitcher from "../switchers/LanguageSwitcher/LanguageSwitcher";
// import MessagesStyleSwitcher from "../switchers/MessagesStyleSwitcher/MessagesStyleSwitcher";
import Switcher from "../switchers/switcher";
import Logo from "../Logo/logo";
import { getUser, putUser } from "../../api/user";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
} from "../../constants/languages";
import { SUPPORTED_MESSAGE_STYLE } from "../../constants/messageStyles";

type Props = {
  dict: Pick<
    Dictionary,
    "languageMessage" | "loading" | "messagesStyle" | "style"
  >;
};

export default function Header({ dict }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("uk");
  const [style, setStyle] = useState<string>("formal");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      setIsLoading(true);
      getUser(id)
        .then((user) => {
          if (user?.language) setLanguage(user.language);
          if (user?.style) setStyle(user.style);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, []);

  const updateLanguage = (newLang: string) => {
    setLanguage(newLang);
    if (userId) putUser(userId, newLang, style);
    const segments = window.location.pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    startTransition(() => {
      window.location.assign(newPath);
    });
  };

  const updateStyle = (newStyle: string) => {
    setStyle(newStyle);
    if (userId) putUser(userId, language, newStyle);
  };

  return (
    <header className={styles.header}>
      <Logo />
      <Switcher
        label={dict.languageMessage}
        value={language}
        isLoading={isPending}
        onChange={updateLanguage}
        options={SUPPORTED_LANGUAGES.map((lang) => ({
          value: lang,
          label: LANGUAGE_LABELS[lang],
        }))}
        loadingText={dict.loading}
      />
      <Switcher
        label={dict.messagesStyle}
        value={style}
        isLoading={isLoading}
        onChange={updateStyle}
        options={SUPPORTED_MESSAGE_STYLE.map((type) => ({
          value: type,
          label: dict.style[type],
        }))}
        loadingText={dict.loading}
      />
    </header>
  );
}
