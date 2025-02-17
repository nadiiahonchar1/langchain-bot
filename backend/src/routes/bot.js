import express from 'express';

import bot from '../services/botServices.js';

const router = express.Router();

router.get('/', async (req, res) => {
//   const { fromLanguage, toLanguage, text } = req.query;

//   if (!fromLanguage || !toLanguage || !text) {
//     return res
//       .status(400)
//       .json({ error: 'Missing required query parameters: language and text' });
//   }
  try {
    const translation = await bot();
    res.json({ translation });
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

export default router;
