import styles from "./page.module.css";
import { getDictionary } from "./dictionaries";
import Chat from "../components/Chat/Chat";

interface PageProps {
  params: Promise<{ lang: SupportedLanguage }>;
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
