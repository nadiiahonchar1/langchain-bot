import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

export const model = new ChatOpenAI({
  model: 'gpt-3.5-turbo',
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
