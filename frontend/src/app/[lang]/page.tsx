import styles from "./page.module.css";
import { getDictionary } from "./dictionaries";

// export default async function Home({
//   params,
// }: {
//   params: { lang: "uk" | "en" | "es" | "fr" | "de" };
// }) {
//   const dict = await getDictionary(params.lang);
//   return (
//     <div className={styles.page}>
//       {/* <header>This is header</header> */}
//       <h1>{dict.welcomeMessage}</h1>
//       <main className={styles.main}>Hello</main>
//       <footer className={styles.footer}>This is footer</footer>
//     </div>
//   );
// }

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "uk" | "en" | "es" | "fr" | "de" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className={styles.page}>
      {/* <header>This is header</header> */}
      <h1>{dict.welcomeMessage}</h1>
      <main className={styles.main}>Hello</main>
      <footer className={styles.footer}>This is footer</footer>
    </div>
  );
}
