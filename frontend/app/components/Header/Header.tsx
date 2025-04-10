import styles from "./header.module.css";
import LanguageSwitcher from "../switchers/LanguageSwitcher/LanguageSwitcher";
import MessagesStyleSwitcher from "../switchers/MessagesStyleSwitcher/MessagesStyleSwitcher";

type Props = {
  dict: Pick<
    Dictionary,
    "languageMessage" | "loading" | "messagesStyle" | "style"
  >;
};

export default async function Header({ dict }: Props) {
  return (
    <header className={styles.header}>
      <LanguageSwitcher dict={dict} />
      <MessagesStyleSwitcher dict={dict} />
    </header>
  );
}
