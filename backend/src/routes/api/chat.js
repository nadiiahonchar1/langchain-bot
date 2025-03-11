import express from 'express';
import { getBotResponse } from '../../chat/chatService.js';
import { getUserSettings } from '../../chat/userSettings.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ error: 'Messages are required and must be an array' });
    }

    let language = 'Ukrainian';
    let style = 'formal';

    if (userId) {
      try {
        const userSettings = await getUserSettings(userId);
        language = userSettings.language || language;
        style = userSettings.style || style;
      } catch (error) {
        console.warn('Failed to fetch user settings, using defaults:', error);
      }
    } else {
      console.warn('No userId provided, using default settings');
    }

    const response = await getBotResponse(messages, userId, language, style);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

export default router;
