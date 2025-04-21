"use client";

import { useEffect, useRef, useState } from "react";
import { getChat, postChat } from "../../api/chat";
import styles from "./chat.module.css";

export default function Chat() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const draft = localStorage.getItem("draftMessage");

    if (storedId) {
      setUserId(storedId);
      getChat(storedId)
        .then((data) => setMessages(data))
        .catch((error) => console.error("Failed to load chat history:", error));
    }

    if (draft) setInput(draft);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await postChat(input, userId ?? undefined);
      const botMessage: ChatMessage = {
        role: "system",
        content: res.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    localStorage.setItem("draftMessage", e.target.value);
  };

  return (
    <div className={styles.chatWrapper}>
      {!userId && (
        <p className={styles.welcome}>Вітаю, пропоную познайомитись!</p>
      )}

      <p className={styles.chatHeader}>Про що сьогодні поговоримо?</p>

      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            <strong>{msg.role === "user" ? "Ви:" : "Бот:"}</strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputWrapper}>
        <textarea
          value={input}
          ref={inputRef}
          placeholder="Напишіть щось..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className={styles.textarea}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={styles.button}
        >
          Надіслати
        </button>
      </div>
    </div>
  );
}
