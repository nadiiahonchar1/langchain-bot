// import { db } from './firebase.js';

// const MAX_HISTORY = 100;

// export const saveChatHistory = async (userId, messages) => {
//   console.log('saveChatHistory messages', messages);
//   try {
//     const chatRef = db.collection('chats').doc(userId);

//     const updatedMessages = [ ...messages].slice(-MAX_HISTORY);

//     await chatRef.set({ messages: updatedMessages }, { merge: true });
//   } catch (error) {
//     console.error('Error saving chat history:', error);
//   }
// };

// export const getChatHistory = async (userId) => {
//   try {
//     const chatRef = db.collection('chats').doc(userId);
//     const doc = await chatRef.get();
//     return doc.exists ? doc.data().messages : [];
//   } catch (error) {
//     console.error('Error fetching chat history:', error);
//     return [];
//   }
// };

// ==============================================================

// export const saveOrUpdateChatHistory = async (userId, messages) => {
//   try {
//     const historyRef = db
//       .collection('users')
//       .doc(userId)
//       .collection('history')
//       .doc('chat');
//     const historySnapshot = await historyRef.get();
//     const currentHistory = historySnapshot.exists
//       ? historySnapshot.data().messages
//       : [];

//     const formattedMessages = messages
//       .filter((msg) => msg.role && msg.text)
//       .map((msg) => ({
//         role: msg.role,
//         content: Array.isArray(msg.text) ? msg.text.join(' ') : msg.text,
//         timestamp: msg.timestamp || new Date().toISOString(),
//       }));

//     if (formattedMessages.length === 0) {
//       console.warn('No valid messages to save');
//       return { success: false, message: 'No valid messages to save' };
//     }

//     const updatedHistory = [...currentHistory, ...formattedMessages];

//     await historyRef.set({ messages: updatedHistory }, { merge: true });

//     console.log('Chat history saved or updated');
//     return { success: true, messages: updatedHistory };
//   } catch (error) {
//     console.error('Failed to save or update chat history:', error);
//     throw new Error('Failed to save or update chat history');
//   }
// };

// export const saveChatHistory = async (userId, newMessages) => {
//   try {
//     const chatRef = db.collection('chats').doc(userId);

//     // Перезаписуємо всю історію, замінюючи дублікати
//     const updatedMessages = newMessages.slice(-MAX_HISTORY);

//     await chatRef.set({ messages: updatedMessages });
//   } catch (error) {
//     console.error('Error saving chat history:', error);
//   }
// };

// export const getChatHistory = async (userId) => {
//   try {
//     const chatRef = db.collection('chatHistory').doc(userId);
//     const chatSnapshot = await chatRef.get();

//     if (chatSnapshot.exists) {
//       return chatSnapshot.data().messages;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error('Failed to get chat history:', error);
//     return [];
//   }
// };

import { db } from './firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

export const saveChatHistory = async (userId, message) => {
  console.log('Saving chat history message:', message);
  try {
    const chatRef = db.collection('chats').doc(userId);

    const cleanedMessage = {
      role: message.role,
      content:
        typeof message.content === 'object'
          ? message.content.content
          : message.content,
    };

    // Додаємо нове повідомлення до масиву messages
    await chatRef.set(
      {
        messages: FieldValue.arrayUnion(cleanedMessage),
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
