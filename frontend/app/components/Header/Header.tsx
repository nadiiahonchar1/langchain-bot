import styles from "./header.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

type Props = {
  dict: Pick<Dictionary, "languageMessage" | "loading">;
};

export default async function Header({ dict }: Props) {
  return (
    <header className={styles.header}>
      <LanguageSwitcher dict={dict} />
    </header>
  );
}
