// import bot from '../services/botServices.js';
// import { createPromptTemplate } from '../prompt/promptTemplate';
// import { callModelWithTemplate } from '../config';

// router.get('/', async (req, res) => {
//     const { text } = req.query;
//     if (!text) {
//       return res
//         .status(400)
//         .json({ error: 'Missing required query parameter: text' });
//     }
//   try {
//     const response = await bot({ text });
//     res.json({ response });
//   } catch (error) {
//     console.error('Error during bot interaction:', error);
//     res.status(500).json({ error: 'Failed to get response from bot' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { messages, language } = req.body;
//     const promptTemplate = await createPromptTemplate(language);
//     const output = await callModelWithTemplate(
//       { messages, language },
//       promptTemplate,
//     );

//     res.json({
//       messages: output.messages,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: 'An error occurred while processing the request' });
//   }
// });

import express from 'express';

import { getPersonalizedBotResponse } from '../chatbot.js';
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { messages, language } = req.body;
    console.log('Received messages:', messages);
    console.log('Received language:', language);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const response = await getPersonalizedBotResponse(
      messages,
      language || 'English',
    );

    res.json({ response });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
