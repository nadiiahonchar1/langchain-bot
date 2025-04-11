import styles from "./footer.module.css";
import Logo from "../Logo/logo";

type Props = {
  dict: Pick<Dictionary, "footerMessage">;
};

export default async function Footer({ dict }: Props) {
  return (
    <footer className={styles.footer}>
      <p>{dict.footerMessage}</p>
      <Logo />
    </footer>
  );
}
