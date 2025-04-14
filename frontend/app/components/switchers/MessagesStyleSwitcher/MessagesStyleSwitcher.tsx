// "use client";

// import { useEffect, useState } from "react";
// import styles from "../switchers.module.css";
// import { SUPPORTED_MESSAGE_STYLE } from "../../../constants/messageStyles";
// import { getUser } from "../../../api/user";

// type Props = {
//   dict: Pick<Dictionary, "messagesStyle" | "loading" | "style">;
// };

// export default function MessagesStyleSwitcher({ dict }: Props) {
//   const [currentStyle, setCurrentStyle] = useState<string>("formal");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchUserStyle = async () => {
//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         setIsLoading(true);
//         try {
//           const user = await getUser(userId);
//           if (user?.style) {
//             setCurrentStyle(user.style);
//           }
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchUserStyle();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newStyle = e.target.value;
//     setCurrentStyle(newStyle);
//     console.log({ newStyle });
//   };

//   return (
//     <div className={styles.languageSwitcher}>
//       <label htmlFor="language">{dict.messagesStyle}</label>
//       <div className={styles.selectWrapper}>
//         <select id="style" value={currentStyle} onChange={handleChange}>
//           {SUPPORTED_MESSAGE_STYLE.map((type) => (
//             <option key={type} value={type}>
//               {dict.style[type]}
//             </option>
//           ))}
//         </select>
//         <span
//           className={`${styles.loading} ${isLoading ? styles.visible : ""}`}
//         >
//           {dict.loading}...
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import styles from "../switchers.module.css";
import { SUPPORTED_MESSAGE_STYLE } from "../../../constants/messageStyles";

type Props = {
  dict: Pick<Dictionary, "messagesStyle" | "loading" | "style">;
  currentStyle: string;
  isLoading: boolean;
  onChange: (style: string) => void;
};

export default function MessagesStyleSwitcher({
  dict,
  currentStyle,
  isLoading,
  onChange,
}: Props) {
  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="style">{dict.messagesStyle}</label>
      <div className={styles.selectWrapper}>
        <select
          id="style"
          value={currentStyle}
          onChange={(e) => onChange(e.target.value)}
        >
          {SUPPORTED_MESSAGE_STYLE.map((type) => (
            <option key={type} value={type}>
              {dict.style[type]}
            </option>
          ))}
        </select>
        <span
          className={`${styles.loading} ${isLoading ? styles.visible : ""}`}
        >
          {dict.loading}...
        </span>
      </div>
    </div>
  );
}
