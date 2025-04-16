import styles from "./greetingBanner.module.css";

type Props = {
  dict: Pick<Dictionary, "greeting" | "linkAuth">;
  name: string | null;
  openRegisterModal: () => void;
};

export default function GreetingBanner({
  dict,
  name,
  openRegisterModal,
}: Props) {
  return (
    <div className={styles.banner}>
      {name ? (
        <p>
          {dict.greeting} {name}!
        </p>
      ) : (
        <button onClick={openRegisterModal} className={styles.registerButton}>
          {dict.linkAuth}
        </button>
      )}
    </div>
  );
}
