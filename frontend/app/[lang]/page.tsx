import styles from "./page.module.css";
import { getDictionary } from "./dictionaries";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

export default async function Home({
  params,
}: {
  params: { lang: (typeof SUPPORTED_LANGUAGES)[number] };
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
