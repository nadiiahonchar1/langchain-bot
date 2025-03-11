import { trimMessages } from '@langchain/core/messages';
import { model } from '../models/chatModels.js';
import { promptTemplate } from './promptTemplates.js';

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: 'last',
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: 'human',
});

export const callModel = async (state) => {
  const { userId, messages } = state;

  const trimmedMessage = await trimmer.invoke(messages);
  const prompt = await promptTemplate.invoke({
    messages: trimmedMessage,
    language: state.language,
    style: state.style,
  });

  const response = await model.invoke(prompt);
  return { messages: [response], userId };
};
