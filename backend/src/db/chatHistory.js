import { FieldValue } from 'firebase-admin/firestore';
import { db } from './firebase.js';

export const saveChatHistory = async (userId, message) => {
  try {
    const chatRef = db.collection('chats').doc(userId);

    await chatRef.set(
      {
        messages: FieldValue.arrayUnion(message),
      },
      { merge: true },
    );
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

export const deleteChatHistory = async (userId) => {
  try {
    const chatRef = db.collection('chats').doc(userId);
    await chatRef.delete();
    console.log(`Chat history for user ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting chat history:', error);
    throw error;
  }
};
