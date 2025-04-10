"use client";

import { useEffect, useState } from "react";
import ConsentModal from "../ConsentModal/ConsentModal";
import { createUser } from "../../api/user";

type Props = {
  dict: Pick<
    Dictionary,
    "modalP1" | "modalP2" | "modalP3" | "yes" | "no" | "modalPaceholder"
  >;
};

export default function ClientInitializer({ dict }: Props) {
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
    <ConsentModal
      dict={dict}
      onConfirm={handleConsent}
      onDecline={handleDecline}
    />
  ) : null;
}
