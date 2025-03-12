import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>This is header</header>
      <main className={styles.main}>Hello</main>
      <footer className={styles.footer}>This is footer</footer>
    </div>
  );
}
