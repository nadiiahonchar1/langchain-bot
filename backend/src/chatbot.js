import { v4 as uuidv4 } from 'uuid';
import { app } from './memory.js';
import { promptTemplate } from './promptTemplates.js';

export const getBotResponse = async (input) => {
  const config = { configurable: { thread_id: uuidv4() } };

  const output = await app.invoke({ messages: input }, config);

  return output.messages[output.messages.length - 1];
};

// export const getPersonalizedBotResponse = async (input, language) => {
//   const config = { configurable: { thread_id: uuidv4() } };

//   const prompt = await promptTemplate.invoke({ ...input, language });
//   const output = await app.invoke({ messages: prompt }, config);

//   return output.messages[output.messages.length - 1];
// };
export const getPersonalizedBotResponse = async (input, language) => {
  if (!Array.isArray(input) || input.length === 0) {
    throw new Error('Invalid input: messages must be a non-empty array');
  }

  const config = { configurable: { thread_id: uuidv4() } };
  const prompt = await promptTemplate.invoke({ messages: input, language });

  const output = await app.invoke({ messages: prompt.messages }, config);
  return output.messages[output.messages.length - 1];
};
