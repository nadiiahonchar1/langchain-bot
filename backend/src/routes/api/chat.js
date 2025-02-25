import express from 'express';
import { getBotResponse } from '../../chat/chatbot.js';
import { getUserSettings } from '../../chat/userSettings.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages, userId } = req.body;

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.some((msg) => !msg.role || !msg.content)
    ) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    let language = 'Ukrainian';
    let style = 'formal';

    if (userId) {
      const userSettings = await getUserSettings(userId);

      language = userSettings.language || language;
      style = userSettings.style || style;
    } else {
      console.warn('No userId provided, using default settings');
    }

    const response = await getBotResponse(
      messages,
      userId || null,
      language,
      style,
    );

    res.json(response);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Error processing chat' });
  }
});

export default router;
