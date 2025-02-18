// import { ChatPromptTemplate } from '@langchain/core/prompts';

// export const createPromptTemplate = () => {
//   return ChatPromptTemplate.fromMessages([
//     [
//       'system',
//       'You are a helpful assistant. Answer all questions to the best of your ability.',
//     ],
//     ['placeholder', '{messages}'],
//   ]);
// };

// export const createPromptTemplateWithLanguage = () => {
//   return ChatPromptTemplate.fromMessages([
//     [
//       'system',
//       'You are a helpful assistant. Answer all questions to the best of your ability in {language}.',
//     ],
//     ['placeholder', '{messages}'],
//   ]);
// };

export const createPromptTemplate = (language) => {
  return {
    prompt: `Translate the following message into ${language}: `,
  };
};
