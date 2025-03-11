import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  getUserSettings,
  updateUserSettings,
} from '../../chat/userSettings.js';
import { db } from '../../db/firebase.js';
import { SUPPORTED_LANGUAGES } from '../../chat/constants.js';
import { SUPPORTED_MESSAGE_STYLE } from '../../chat/constants.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userId = uuidv4();
    const userRef = db.collection('users').doc(userId);

    const newUser = {
      userId,
      username,
      language: 'Ukrainian',
      style: 'formal',
      createdAt: new Date().toISOString(),
    };

    await userRef.set(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userSettings = await getUserSettings(userId);

    res.json(userSettings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Failed to fetch user settings' });
  }
});

router.put('/:userId/settings', async (req, res) => {
  try {
    const { userId } = req.params;
    let { language, style } = req.body;

    if (!language && !style) {
      return res.status(400).json({ error: 'No valid settings provided' });
    }

    if (language && !SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    if (style && !SUPPORTED_MESSAGE_STYLE.includes(style)) {
      return res.status(400).json({ error: 'Unsupported message style' });
    }

    const updatedSettings = await updateUserSettings(userId, {
      language,
      style,
    });

    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update user settings' });
  }
});

export default router;
