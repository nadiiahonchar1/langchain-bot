// import { db } from '../db/firebase.js';

// export const getUserSettings = async (userId) => {
//   try {
//     const userRef = db.collection('users').doc(userId);
//     const userDoc = await userRef.get();

//     if (!userDoc.exists) {
//       return { language: 'en', style: 'professional' };
//     }

//     return userDoc.data();
//   } catch (error) {
//     console.error('Помилка отримання налаштувань користувача:', error);
//     return { language: 'en', style: 'professional' };
//   }
// };

// import { db } from '../db/firebase.js';

// export const getUserSettings = async (userId) => {
//   try {
//     const userRef = db.collection('users').doc(userId);
//     const userDoc = await userRef.get();

//     if (!userDoc.exists) {
//       return { language: 'Ukrainian', style: 'formal' };
//     }

//     return userDoc.data();
//   } catch (error) {
//     console.error('Error fetching user settings:', error);
//     return { language: 'Ukrainian', style: 'formal' };
//   }
// };

// export const updateUserSettings = async (userId, settings) => {
//   try {
//     const userRef = db.collection('users').doc(userId);
//     await userRef.set(settings, { merge: true });
//     return { success: true, message: 'Settings updated successfully' };
//   } catch (error) {
//     console.error('Error updating user settings:', error);
//     return { success: false, message: 'Failed to update settings' };
//   }
// };

import { db } from '../db/firebase.js';


export const getUserSettings = async (userId) => {
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { language: 'Ukrainian', style: 'formal' };
    }

    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return { language: 'Ukrainian', style: 'formal' };
  }
};

export const updateUserSettings = async (userId, settings) => {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.set(settings, { merge: true });
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error('Error updating user settings:', error);
    return { success: false, message: 'Failed to update settings' };
  }
};
