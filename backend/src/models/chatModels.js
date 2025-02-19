import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';

dotenv.config();

export const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
