import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';

dotenv.config();

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const invokeModel = async (messages) => {
  try {
    const response = await model.invoke(messages);
    return response;
  } catch (error) {
    console.error('Error invoking model:', error);
  }
};
