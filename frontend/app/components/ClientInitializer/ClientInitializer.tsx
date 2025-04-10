"use client";

import { useEffect, useState } from "react";
import ConsentModal from "../ConsentModal/ConsentModal";

export default function ClientInitializer() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setShowModal(true);
    }
  }, []);

  const handleConsent = async (username: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Failed to create user");

      const data = await res.json();
      console.log({ data });
      localStorage.setItem("userId", data.userId);
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  return showModal ? (
    <ConsentModal onConfirm={handleConsent} onDecline={handleDecline} />
  ) : null;
}
