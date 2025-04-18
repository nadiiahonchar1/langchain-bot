// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { usePathname } from "next/navigation";
// import styles from "./header.module.css";
// import Switcher from "../switchers/switcher";
// import GreetingBanner from "../GreetingBanner/GreetingBanner";
// import ConsentModal from "../ConsentModal/ConsentModal";
// import Logo from "../Logo/logo";
// import { getUser, putUser, createUser } from "../../api/user";
// import {
//   SUPPORTED_LANGUAGES,
//   LANGUAGE_LABELS,
// } from "../../constants/languages";
// import { SUPPORTED_MESSAGE_STYLE } from "../../constants/messageStyles";

// type Props = {
//   dict: Pick<
//     Dictionary,
//     | "languageMessage"
//     | "loading"
//     | "messagesStyle"
//     | "style"
//     | "modalP1"
//     | "modalP2"
//     | "modalP3"
//     | "yes"
//     | "no"
//     | "modalPaceholder"
//   >;
// };

// export default function Header({ dict }: Props) {
//   const pathname = usePathname();
//   const initialLangFromPath = pathname.split("/")[1] || "uk";

//   const [userId, setUserId] = useState<string | null>(null);
//   const [name, setName] = useState<string | null>(null);
//   const [language, setLanguage] = useState<string>(initialLangFromPath);
//   const [style, setStyle] = useState<string>("formal");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isPending, startTransition] = useTransition();
//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     if (id) {
//       setUserId(id);
//       setIsLoading(true);
//       getUser(id)
//         .then((user) => {
//           if (user?.style) setStyle(user.style);
//           if (user?.username) setName(user.username);
//         })
//         .catch(console.error)
//         .finally(() => setIsLoading(false));
//     }
//   }, []);

//   const updateLanguage = async (newLang: string) => {
//     // console.log("Changing language to:", newLang);
//     setLanguage(newLang);

//     if (userId) {
//       setIsLoading(true);
//       try {
//         await putUser(userId, newLang, style);
//       } catch (err) {
//         console.error("Failed to save user:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     const segments = pathname.split("/");
//     segments[1] = newLang;
//     const newPath = segments.join("/");

//     startTransition(() => {
//       window.location.assign(newPath);
//     });
//   };

//   const updateStyle = async (newStyle: string) => {
//     setStyle(newStyle);

//     if (userId) {
//       setIsLoading(true);
//       try {
//         await putUser(userId, language, newStyle);
//       } catch (err) {
//         console.error("Failed to save style:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // const handleConfirmRegistration = async (username: string) => {
//   //   try {
//   //     const data = await createUser(username);
//   //     console.log({ data });
//   //     localStorage.setItem("userId", data.userId);
//   //   } catch (error) {
//   //     console.error(error);
//   //   } finally {
//   //     setShowRegisterModal(false);
//   //   }
//   // };

//   const handleConfirmRegistration = async (username: string) => {
//     try {
//       const data = await createUser(username, language, style);
//       localStorage.setItem("userId", data.userId);
//       setUserId(data.userId);

//       const user = await getUser(data.userId);
//       if (user?.username) setName(user.username);
//       if (user?.style) setStyle(user.style);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setShowRegisterModal(false);
//     }
//   };

//   const handleDeclineRegistration = () => {
//     setShowRegisterModal(false);
//   };

//   return (
//     <header className={styles.header}>
//       <Logo />
//       <Switcher
//         label={dict.languageMessage}
//         value={language}
//         isLoading={isPending}
//         onChange={updateLanguage}
//         options={SUPPORTED_LANGUAGES.map((lang) => ({
//           value: lang,
//           label: LANGUAGE_LABELS[lang],
//         }))}
//         loadingText={dict.loading}
//       />
//       <Switcher
//         label={dict.messagesStyle}
//         value={style}
//         isLoading={isLoading}
//         onChange={updateStyle}
//         options={SUPPORTED_MESSAGE_STYLE.map((type) => ({
//           value: type,
//           label: dict.style[type],
//         }))}
//         loadingText={dict.loading}
//       />
//       <GreetingBanner
//         name={name}
//         openRegisterModal={() => setShowRegisterModal(true)}
//       />
//       {showRegisterModal && (
//         <ConsentModal
//           dict={dict}
//           onConfirm={handleConfirmRegistration}
//           onDecline={handleDeclineRegistration}
//         />
//       )}
//     </header>
//   );
// }

"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Switcher from "../switchers/switcher";
import GreetingBanner from "../GreetingBanner/GreetingBanner";
import ConsentModal from "../ConsentModal/ConsentModal";
import Logo from "../Logo/logo";
import { getUser, putUser, createUser } from "../../api/user";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
} from "../../constants/languages";
import { SUPPORTED_MESSAGE_STYLE } from "../../constants/messageStyles";

type Props = {
  dict: Pick<
    Dictionary,
    | "languageMessage"
    | "loading"
    | "messagesStyle"
    | "style"
    | "modalP1"
    | "modalP2"
    | "modalP3"
    | "yes"
    | "no"
    | "modalPaceholder"
    | "greeting"
    | "linkAuth"
  >;
};

export default function Header({ dict }: Props) {
  const pathname = usePathname();
  const initialLangFromPath = pathname.split("/")[1] || "uk";

  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(initialLangFromPath);
  const [style, setStyle] = useState<string>("formal");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      setIsLoading(true);
      getUser(id)
        .then((user) => {
          if (user?.style) setStyle(user.style);
          if (user?.username) setName(user.username);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setShowRegisterModal(true);
    }
  }, []);

  const updateLanguage = async (newLang: string) => {
    setLanguage(newLang);

    if (userId) {
      setIsLoading(true);
      try {
        await putUser(userId, newLang, style);
      } catch (err) {
        console.error("Failed to save user:", err);
      } finally {
        setIsLoading(false);
      }
    }

    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");

    startTransition(() => {
      window.location.assign(newPath);
    });
  };

  const updateStyle = async (newStyle: string) => {
    setStyle(newStyle);

    if (userId) {
      setIsLoading(true);
      try {
        await putUser(userId, language, newStyle);
      } catch (err) {
        console.error("Failed to save style:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirmRegistration = async (username: string) => {
    try {
      const data = await createUser(username, language, style);
      localStorage.setItem("userId", data.userId);
      setUserId(data.userId);

      const user = await getUser(data.userId);
      if (user?.username) setName(user.username);
      if (user?.style) setStyle(user.style);
    } catch (error) {
      console.error(error);
    } finally {
      setShowRegisterModal(false);
    }
  };

  const handleDeclineRegistration = () => {
    setShowRegisterModal(false);
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
      <GreetingBanner
        dict={dict}
        name={name}
        openRegisterModal={() => setShowRegisterModal(true)}
      />
      {showRegisterModal && (
        <ConsentModal
          dict={dict}
          onConfirm={handleConfirmRegistration}
          onDecline={handleDeclineRegistration}
        />
      )}
    </header>
  );
}
