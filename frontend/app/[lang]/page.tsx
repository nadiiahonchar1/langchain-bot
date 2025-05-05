import styles from "./page.module.css";
import { getDictionary } from "./dictionaries";
import { SUPPORTED_LANGUAGES } from "../constants/languages";
import Chat from "../components/Chat/Chat";

// export default async function Home({
//   params,
// }: {
//   params: { lang: (typeof SUPPORTED_LANGUAGES)[number] };
// }) {
//   const { lang } = await params;
//   const dict = await getDictionary(lang);
//   return (
//     <div>
//       <main className={styles.main}>
//         <h1>{dict.welcomeMessage}</h1>
//         <Chat
//           dict={{
//             sendButton: dict.sendButton,
//             welcomeStranger: dict.welcomeStranger,
//             smallTalk: dict.smallTalk,
//             you: dict.you,
//             bot: dict.bot,
//             writeInvitacion: dict.writeInvitacion,
//           }}
//         />
//       </main>
//     </div>
//   );
// }

interface PageProps {
  params: Promise<{ lang: (typeof SUPPORTED_LANGUAGES)[number] }>;
}

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const dict = await getDictionary(lang);
  return (
    <div>
      <main className={styles.main}>
        <h1>{dict.welcomeMessage}</h1>
        <Chat
          dict={{
            sendButton: dict.sendButton,
            welcomeStranger: dict.welcomeStranger,
            smallTalk: dict.smallTalk,
            you: dict.you,
            bot: dict.bot,
            writeInvitacion: dict.writeInvitacion,
          }}
        />
      </main>
    </div>
  );
}
