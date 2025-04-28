import express from 'express';
import { getBotResponse } from '../../chat/chatService.js';
import { getUserSettings } from '../../chat/userSettings.js';
import { getChatHistory } from '../../db/chatHistory.js';
import { deleteChatHistory } from '../../db/chatHistory.js';

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
    const content = response.content;
    if (!content) {
      return res.status(500).json({ error: 'No content in response' });
    }


    res.json({ content });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await getChatHistory(userId);
    res.json(history);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await deleteChatHistory(userId);
    res.json({
      message: `Chat history for user ${userId} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting chat history:', error);
    res.status(500).json({ error: 'Failed to delete chat history' });
  }
});

export default router;
