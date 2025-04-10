"use client";

import { useEffect, useRef } from "react";

type ConsentModalProps = {
  onConfirm: (username: string) => void;
  onDecline: () => void;
};

export default function ConsentModal({
  onConfirm,
  onDecline,
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
    <dialog ref={dialogRef} className="modal">
      <form onSubmit={handleSubmit} method="dialog">
        <p>Бажаєте зберігати історію чату та налаштування у базі даних?</p>
        <input
          type="text"
          placeholder="Введіть нікнейм"
          ref={inputRef}
          required
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit">Так</button>
          <button
            type="button"
            onClick={() => {
              onDecline();
              dialogRef.current?.close();
            }}
          >
            Ні
          </button>
        </div>
      </form>
    </dialog>
  );
}
