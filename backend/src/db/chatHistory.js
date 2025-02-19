import { db } from './firebase.js';

export const saveChatHistory = async (userId, messages) => {
  const chatRef = db.collection('chats').doc(userId);
  await chatRef.set({ messages }, { merge: true });
};

export const getChatHistory = async (userId) => {
  const chatRef = db.collection('chats').doc(userId);
  const doc = await chatRef.get();
  return doc.exists ? doc.data().messages : [];
};
