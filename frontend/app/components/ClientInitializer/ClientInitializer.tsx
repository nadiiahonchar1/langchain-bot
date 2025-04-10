"use client";

import { useEffect, useState } from "react";
import ConsentModal from "../ConsentModal/ConsentModal";
import { createUser } from "../../api/user";

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
      const data = await createUser(username);
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
