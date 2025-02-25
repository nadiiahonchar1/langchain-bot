import { db } from './firebase.js';

const MAX_HISTORY = 100;

export const saveChatHistory = async (userId, messages) => {
  try {
    const chatRef = db.collection('chats').doc(userId);
    const chatDoc = await chatRef.get();

    const chatHistory = chatDoc.exists ? chatDoc.data().messages : [];
    const updatedMessages = [...chatHistory, ...messages].slice(-MAX_HISTORY);

    await chatRef.set({ messages: updatedMessages }, { merge: true });
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const getChatHistory = async (userId) => {
  try {
    const chatRef = db.collection('chats').doc(userId);
    const doc = await chatRef.get();
    return doc.exists ? doc.data().messages : [];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};
