import { ChatPromptTemplate } from '@langchain/core/prompts';

const systemTemplate =
  'You talk like a {style}. Answer all questions to the best of your ability in {language}.';

export const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', systemTemplate],
  ['placeholder', '{messages}'],
]);
