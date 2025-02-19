import { db } from '../db/firebase.js';

export const getUserSettings = async (userId) => {
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { language: 'en', style: 'professional' };
    }

    return userDoc.data();
  } catch (error) {
    console.error('Помилка отримання налаштувань користувача:', error);
    return { language: 'en', style: 'professional' };
  }
};
