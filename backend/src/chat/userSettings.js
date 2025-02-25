import { db } from '../db/firebase.js';

const SUPPORTED_LANGUAGES = [
  'Ukrainian',
  'English',
  'Spanish',
  'French',
  'German',
];
const SUPPORTED_MESSAGE_STYLE = [
  'formal',
  'scientific',
  'business',
  'pirate',
  'bard',
  'fantasy',
  'sarcastic',
  'casual',
  'meme',
  'hacker',
  'legal',
  'future_ai',
  'child',
  'friendly',
  'mentor',
];

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
    const { language, style } = settings;

    if (language && !SUPPORTED_LANGUAGES.includes(language)) {
      return { success: false, message: 'Unsupported language' };
    }

    if (style && !SUPPORTED_MESSAGE_STYLE.includes(style)) {
      return { success: false, message: 'Unsupported message style' };
    }

    const userRef = db.collection('users').doc(userId);
    await userRef.set(settings, { merge: true });

    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error('Error updating user settings:', error);
    return { success: false, message: 'Failed to update settings' };
  }
};
