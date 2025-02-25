import { v4 as uuidv4 } from 'uuid';
import { model } from '../models/chatModels.js';
import { promptTemplate } from './promptTemplates.js';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

export const getBotResponse = async (input, userId, language, style) => {

  const config = { configurable: { thread_id: uuidv4() } };

  const prompt = await promptTemplate.invoke({
    messages: input,
    language,
    style,
  });
  
  const formattedMessages = prompt.messages.map((msg) => {
    if (msg instanceof SystemMessage) {
      return { role: 'system', content: msg.content };
    } else if (msg instanceof HumanMessage) {
      const parsedContent = msg.content.startsWith('[')
        ? JSON.parse(msg.content)[0].content
        : msg.content;
      return { role: 'user', content: parsedContent };
    }
    return { role: 'assistant', content: msg.content };
  });
  const output = await model.invoke(formattedMessages, config);
  return output.content;
};
