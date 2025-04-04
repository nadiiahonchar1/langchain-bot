import styles from "./page.module.css";
import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "uk" | "en" | "es" | "fr" | "de" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <main className={styles.main}>
        <h1>{dict.welcomeMessage}</h1>
        <p>Hello</p>
      </main>
    </div>
  );
}
