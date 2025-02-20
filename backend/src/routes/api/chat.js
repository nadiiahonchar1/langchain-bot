import express from 'express';
import { getBotResponse } from '../../chat/chatbot.js';
import { db } from '../../db/firebase.js';

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

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const response = await getBotResponse(messages, userId);
    res.json(response);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Error processing chat' });
  }
});

export default router;
