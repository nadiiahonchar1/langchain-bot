import express from 'express';
import { getBotResponse } from '../chat/chatbot.js';

const router = express.Router();

const SUPPORTED_LANGUAGES = [
  'Ukrainian',
  'English',
  'Spanish',
  'French',
  'German',
];
let selectedLanguage = 'Ukrainian';

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
let selectedMessageStyle = 'formal';

router.post('/', async (req, res) => {
  try {
    const { messages, language, style } = req.body;
    console.log('Received language:', language);
    console.log('Received style:', style);

    if (!language || !style) {
      throw new Error('Invalid input: language and style must be provided');
    }

    const response = await getBotResponse(messages, language, style);
    res.json(response);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).send('Error processing chat');
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

router.post('/style-message', (req, res) => {
  const { style } = req.body;

  if (!SUPPORTED_MESSAGE_STYLE.includes(style)) {
    return res.status(400).json({ error: "Unsupported message's style " });
  }

  selectedMessageStyle = style;
  console.log(" Message's style updated to:", selectedMessageStyle);
  res.json({
    message: `Message's style set to ${selectedMessageStyle}`,
    selectedMessageStyle,
  });
});

router.get('/style-message', (req, res) => {
  res.json({ selectedMessageStyle });
});

export default router;
