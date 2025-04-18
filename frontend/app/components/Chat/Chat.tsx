"use client";

import { useEffect, useState } from "react";
import { getChat, postChat } from "../../api/chat";

type Message = {
  role: string;
  content: string;
};

export default function Chat() {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
      getChat(storedId).then((data) => {
        if (data?.messages) {
          setMessages(data.messages);
        }
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await postChat(input, userId ?? undefined);
      if (res.userId && !userId) {
        localStorage.setItem("userId", res.userId);
        setUserId(res.userId);
      }
      if (res?.messages) {
        setMessages(res.messages);
      }
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
