import { ChatPromptTemplate } from '@langchain/core/prompts';

export const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You talk like a pirate. Answer all questions to the best of your ability.',
  ],
  ['human', '{messages}'],
]);
