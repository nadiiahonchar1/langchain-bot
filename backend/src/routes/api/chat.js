import express from 'express';
import { getBotResponse } from '../../chat/chatbot.js';
import { getUserSettings } from '../../chat/userSettings.js';

const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { messages, userId } = req.body;

//     if (
//       !messages ||
//       !Array.isArray(messages) ||
//       messages.some((msg) => !msg.role || !msg.content)
//     ) {
//       return res.status(400).json({ error: 'Invalid messages format' });
//     }

//     let language = 'Ukrainian';
//     let style = 'formal';

//     if (userId) {
//       const userSettings = await getUserSettings(userId);

//       language = userSettings.language || language;
//       style = userSettings.style || style;
//     } else {
//       console.warn('No userId provided, using default settings');
//     }

//     const response = await getBotResponse(
//       messages,
//       userId || null,
//       language,
//       style,
//     );

//     res.json(response);
//   } catch (error) {
//     console.error('Error processing chat:', error);
//     res.status(500).json({ error: 'Error processing chat' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     console.log('req.body', req.body);
//     const { userId, message, language, style } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Message is required' });
//     }

//     const response = await getBotResponse([message], userId, language, style);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat route:', error);
//     res.status(500).json({ error: 'Failed to process message' });
//   }
// });

router.post('/', async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { userId, messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ error: 'Messages are required and must be an array' });
    }

    let language = 'Ukrainian';
    let style = 'formal';

    // Якщо є userId, отримуємо налаштування користувача
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
