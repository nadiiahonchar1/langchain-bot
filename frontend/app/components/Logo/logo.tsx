import Image from "next/image";
import myLogo from "../../assets/logo.png";
import styles from "./logo.module.css";

export default function Logo() {
  return <Image src={myLogo} alt="logo" width={300} className={styles.logo} />;
}
