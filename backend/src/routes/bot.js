import express from 'express';

import { getPersonalizedBotResponse } from '../chatbot.js';
const router = express.Router();
const SUPPORTED_LANGUAGES = [
  'Ukrainian',
  'English',
  'Spanish',
  'French',
  'German',
];
let selectedLanguage = 'Ukrainian';
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    console.log('Received messages:', messages);
    console.log('Current language:', selectedLanguage);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const response = await getPersonalizedBotResponse(
      messages,
      selectedLanguage,
    );

    res.json({ response, selectedLanguage });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/language', (req, res) => {
  const { language } = req.body;

  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  selectedLanguage = language;
  console.log('Language updated to:', selectedLanguage);
  res.json({
    message: `Language set to ${selectedLanguage}`,
    selectedLanguage,
  });
});

router.get('/language', (req, res) => {
  res.json({ selectedLanguage });
});

export default router;
