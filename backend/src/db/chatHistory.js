import { db } from './firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

export const saveChatHistory = async (userId, message) => {
  console.log('Saving chat history message:', message);
  try {
    const chatRef = db.collection('chats').doc(userId);

    await chatRef.set(
      {
        messages: FieldValue.arrayUnion(message),
      },
      { merge: true },
    );

    console.log('Message saved to chat history');
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
