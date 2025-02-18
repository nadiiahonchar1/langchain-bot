// import { createConfig } from './history/history.js';
// import { createPromptTemplateWithLanguage } from './/prompt/promptTemplate.js';
// import { invokeModel } from './models/chatModels.js';

// export const getConfigAndTemplate = () => {
//   const config = createConfig();
//   const promptTemplate = createPromptTemplateWithLanguage();
//   return { config, promptTemplate };
// };

// export const callModelWithTemplate = async (state, promptTemplate) => {
//   const prompt = await promptTemplate.invoke(state);
//   const response = await invokeModel(prompt);
//   return { messages: [response] };
// };

// import { createPromptTemplate } from "./prompt/promptTemplate";

// export const getConfigAndTemplate = (language) => {
//   const config = { language };
//   const promptTemplate = createPromptTemplate(language);
//   return { config, promptTemplate };
// };

// export const callModelWithTemplate = async (
//   { messages, language },
//   promptTemplate,
// ) => {
//   const generatedMessage = {
//     role: 'assistant',
//     content: `This is a response to: ${messages[messages.length - 1].content}`,
//   };

//   return { messages: [...messages, generatedMessage] };
// };

import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';

dotenv.config();

export const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
