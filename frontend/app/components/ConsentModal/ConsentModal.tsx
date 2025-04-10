"use client";

import { useEffect, useRef } from "react";
import styles from "./modal.module.css";

type ConsentModalProps = {
  onConfirm: (username: string) => void;
  onDecline: () => void;
  dict: Pick<
    Dictionary,
    "modalP1" | "modalP2" | "modalP3" | "yes" | "no" | "modalPaceholder"
  >;
};

export default function ConsentModal({
  onConfirm,
  onDecline,
  dict,
}: ConsentModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDecline();
        dialog?.close();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialog && e.target === dialog) {
        onDecline();
        dialog.close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialog?.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dialog?.removeEventListener("click", handleClickOutside);
    };
  }, [onDecline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputRef.current?.value;
    if (username) {
      onConfirm(username);
      dialogRef.current?.close();
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <form onSubmit={handleSubmit} method="dialog">
        <p>{dict.modalP1}</p>
        <p>{dict.modalP2}</p>
        <p>{dict.modalP3}</p>
        <input
          type="text"
          placeholder={dict.modalPaceholder}
          ref={inputRef}
          required
        />
        <div className={styles.yesButton}>
          <button type="submit">{dict.yes}</button>
          <button
            type="button"
            onClick={() => {
              onDecline();
              dialogRef.current?.close();
            }}
          >
            {dict.no}
          </button>
        </div>
      </form>
    </dialog>
  );
}
