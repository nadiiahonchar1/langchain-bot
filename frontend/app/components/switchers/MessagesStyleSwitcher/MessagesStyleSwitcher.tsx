"use client";

import styles from "../switchers.module.css";
import { SUPPORTED_MESSAGE_STYLE } from "../../../constants/messageStyles";

type Props = {
  dict: Pick<Dictionary, "messagesStyle" | "loading" | "style">;
};

export default function MessagesStyleSwitcher({ dict }: Props) {
  const currentStyle = "formal";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.target.value;
    console.log({ newStyle });
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
        <span>{dict.loading}...</span>
      </div>
    </div>
  );
}
