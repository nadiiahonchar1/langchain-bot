"use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useTransition } from "react";
import styles from "../switchers.module.css";
import { SUPPORTED_MESSAGE_STYLE } from "../../../constants/messageStyles";

type Props = {
  dict: Pick<Dictionary, "messagesStyle" | "loading" | "style">;
};
// type Props = {
//   dict: Pick<Dictionary, "languageMessage" | "loading" | "messagesStyle">;
// };

export default function MessagesStyleSwitcher({ dict }: Props) {
  // const pathname = usePathname();
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();

  // const currentLang = pathname.split("/")[1];

  const currentStyle = "formal";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const newLang = e.target.value;
    // const segments = pathname.split("/");
    // segments[1] = newLang;
    // const newPath = segments.join("/");
    const newStyle = e.target.value;
    console.log({ newStyle });

    // startTransition(() => {
    //   router.push(newPath);
    // });
  };

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language">{dict.messagesStyle}</label>
      <div className={styles.selectWrapper}>
        <select id="style" value={currentStyle} onChange={handleChange}>
          {SUPPORTED_MESSAGE_STYLE.map((type) => (
            <option key={type} value={type}>
              {dict.style[type]}
            </option>
          ))}
        </select>
        <span
        // className={`${styles.loading} ${isPending ? styles.visible : ""}`}
        >
          {dict.loading}...
        </span>
      </div>
    </div>
  );
}
