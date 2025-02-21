import { ChatPromptTemplate } from '@langchain/core/prompts';

export const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You talk like a {style}. Answer all questions to the best of your ability.',
  ],
  ['human', '{messages}'],
]);
