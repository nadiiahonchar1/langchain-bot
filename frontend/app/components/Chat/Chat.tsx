"use client";

import { useEffect, useState } from "react";
import { getChat, postChat } from "../../api/chat";

export default function Chat() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
      getChat(storedId)
        .then((data) => {
          setMessages(data); // getChat повертає масив ChatMessage
        })
        .catch((error) => {
          console.error("Failed to load chat history:", error);
        });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await postChat(input, userId ?? undefined);

      // Додаємо нову відповідь бота до чату
      const botMessage: ChatMessage = { role: "system", content: res.content };
      setMessages((prev) => [...prev, botMessage]);

      // Якщо повернувся новий userId
      //   if (!userId && res.userId) {
      //     localStorage.setItem("userId", res.userId);
      //     setUserId(res.userId);
      //   }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      {!userId && (
        <div style={{ marginBottom: 16 }}>
          <p>Вітаю, пропоную познайомитись!</p>
        </div>
      )}

      <p>Про що сьогодні поговоримо?</p>

      <div style={{ marginBottom: 16 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 8 }}>
            <strong>{msg.role === "user" ? "Ви:" : "Бот:"}</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          placeholder="Напишіть щось..."
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{ flexGrow: 1 }}
        />
        <button onClick={handleSend} disabled={loading}>
          Надіслати
        </button>
      </div>
    </div>
  );
}
