import { v4 as uuidv4 } from 'uuid';
import { getUpdatedHistory } from './historyService.js';
import { saveChatHistory } from '../db/chatHistory.js';
import { createStateGraph } from './stateGraph.js';

const app = createStateGraph();

export const getBotResponse = async (input, userId, language, style) => {
  const threadId = uuidv4();
  const config = { configurable: { thread_id: threadId } };

  try {
    const updatedMessages = await getUpdatedHistory(userId, input);

    const result = await app.invoke(
      { userId, messages: updatedMessages, language, style },
      config,
    );

    const botMessage = result.messages[result.messages.length - 1];
    const formattedBotMessage = {
      role: 'system',
      content: botMessage.content,
    };
    if (userId) {
      await saveChatHistory(userId, input[0]);
      await saveChatHistory(userId, formattedBotMessage);
    }

    return botMessage;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    throw new Error('Failed to get bot response');
  }
};
