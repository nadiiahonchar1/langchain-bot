
// import { v4 as uuidv4 } from 'uuid';
// import { app } from './memory.js';
// import { promptTemplate } from './promptTemplates.js';

// export const getBotResponse = async (input) => {
//   try {
//     if (
//       !Array.isArray(input) ||
//       input.some((msg) => !msg.role || !msg.content)
//     ) {
//       throw new Error(
//         'Invalid input: each message must have a "role" and "content" property',
//       );
//     }

//     const config = { configurable: { thread_id: uuidv4() } };

//     const output = await app.invoke({ messages: input }, config);

//     return output.messages[output.messages.length - 1];
//   } catch (error) {
//     console.error('Error in getBotResponse:', error);
//     throw error;
//   }
// };

// export const getPersonalizedBotResponse = async (input, language, style) => {
//   try {
//     if (
//       !Array.isArray(input) ||
//       input.length === 0 ||
//       input.some((msg) => !msg.role || !msg.content)
//     ) {
//       throw new Error(
//         'Invalid input: messages must be a non-empty array with each message having a "role" and "content" property',
//       );
//     }

//     const userLanguage = language || 'Ukrainian';
//     const userStyle = style || 'friendly';

//     const config = { configurable: { thread_id: uuidv4() } };
//     const prompt = await promptTemplate.invoke({
//       messages: input,
//       language: userLanguage,
//       style: userStyle,
//     });

//     if (!prompt || !Array.isArray(prompt.messages)) {
//       throw new Error(
//         'Invalid prompt template: messages field is missing or incorrect',
//       );
//     }

//     const output = await app.invoke({ messages: prompt.messages }, config);

//     return output.messages[output.messages.length - 1];
//   } catch (error) {
//     console.error('Error in getPersonalizedBotResponse:', error);
//     throw error;
//   }
// };

// import { v4 as uuidv4 } from 'uuid';
// import { app } from '../../memory.js';
// import { promptTemplate } from './promptTemplates.js';
// import { getUserSettings } from './userSettings.js';

// export const getBotResponse = async (input, userId) => {
//   try {
//     if (
//       !Array.isArray(input) ||
//       input.some((msg) => !msg.role || !msg.content)
//     ) {
//       throw new Error(
//         'Invalid input: each message must have a "role" and "content" property',
//       );
//     }

//     const { language, style } = await getUserSettings(userId);

//     const config = { configurable: { thread_id: uuidv4() } };

//     const prompt = await promptTemplate.invoke({
//       messages: input,
//       language,
//       style,
//     });

//     if (!prompt || !Array.isArray(prompt.messages)) {
//       throw new Error(
//         'Invalid prompt template: messages field is missing or incorrect',
//       );
//     }

//     const output = await app.invoke({ messages: prompt.messages }, config);

//     return output.messages[output.messages.length - 1];
//   } catch (error) {
//     console.error('Error in getBotResponse:', error);
//     throw error;
//   }
// };

import { v4 as uuidv4 } from 'uuid';
import { getChatHistory, saveChatHistory } from '../db/chatHistory.js';
import { promptTemplate } from './promptTemplates.js';
import { getUserSettings } from './userSettings.js';
import { model } from '../models/chatModels.js';



export const getBotResponse = async (input, userId) => {
  try {
    if (
      !Array.isArray(input) ||
      input.some((msg) => !msg.role || !msg.content)
    ) {
      throw new Error('Invalid input format');
    }

    //   const chatHistory = await getChatHistory(userId);
    //   const updatedMessages = [...chatHistory, ...input];

    //   const { language, style } = await getUserSettings(userId);
    //   const config = { configurable: { thread_id: uuidv4() } };
    //   const prompt = await promptTemplate.invoke({
    //     messages: updatedMessages,
    //     language,
    //     style,
    //   });

    //   if (!prompt || !Array.isArray(prompt.messages)) {
    //     throw new Error('Invalid prompt format');
    //   }

    //   const output = await model.invoke({ messages: prompt.messages }, config);
    //   const botResponse = output.messages[output.messages.length - 1];

    //   updatedMessages.push(botResponse);
    //   await saveChatHistory(userId, updatedMessages);

    //   return botResponse;
    // } catch (error) {
    //   console.error('Error in getBotResponse:', error);
    //   throw error;
    // }
    const chatHistory = await getChatHistory(userId);
    const updatedMessages = [...chatHistory, ...input];

    const { language, style } = await getUserSettings(userId);
    const config = { configurable: { thread_id: uuidv4() } };
    const prompt = await promptTemplate.invoke({
      messages: updatedMessages,
      language,
      style,
    });

    if (!prompt || !Array.isArray(prompt.messages)) {
      throw new Error('Invalid prompt format');
    }

    const output = await model.invoke({ messages: prompt.messages }, config);
    const botResponse = output.messages[output.messages.length - 1];

    updatedMessages.push(botResponse);
    await saveChatHistory(userId, updatedMessages);

    return botResponse;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    throw error;
  }
};
