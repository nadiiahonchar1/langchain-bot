import { v4 as uuidv4 } from 'uuid';
import { model } from '../models/chatModels.js';
import { promptTemplate } from './promptTemplates.js';
import { trimMessages } from '@langchain/core/messages';
import {
  START,
  END,
  StateGraph,
  MemorySaver,
  Annotation,
  MessagesAnnotation,
} from '@langchain/langgraph';
import { saveChatHistory, getChatHistory } from '../db/chatHistory.js';

const MAX_HISTORY = 100;

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: 'last',
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: 'human',
});

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation(),
  style: Annotation(),
  userId: Annotation(),
});

export const callModel = async (state) => {
  const { userId, messages } = state;
  console.log('State:', state);

  const trimmedMessage = await trimmer.invoke(messages);
  const prompt = await promptTemplate.invoke({
    messages: trimmedMessage,
    language: state.language,
    style: state.style,
  });

  const response = await model.invoke(prompt);
  return { messages: [response], userId };
};

const workflow = new StateGraph(GraphAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

const app = workflow.compile({ checkpointer: new MemorySaver() });

export const getBotResponse = async (input, userId, language, style) => {
  const threadId = uuidv4();
  const config = { configurable: { thread_id: threadId } };

  try {
    let history = [];

    if (userId) {
      history = await getChatHistory(userId);
      console.log(`Loaded history for user ${userId}:`, history);
    }

    const updatedMessages = [...history, ...input].slice(-MAX_HISTORY);
    console.log('HISTORY', history);
    console.log('INPUT', input);
    const result = await app.invoke(
      {
        userId,
        messages: updatedMessages,
        language,
        style,
      },
      config,
    );

    const botMessage = result.messages[result.messages.length - 1];
    const formattedBotMessage = {
      role: 'system',
      content: botMessage.content,
    };

    // const formattedUserMessage = {
    //   role: 'user',
    //   content: input[0],
    // };

    if (userId) {
      await saveChatHistory(userId, input[0]);
      await saveChatHistory(userId, formattedBotMessage);
      console.log('Chat history updated in DB');
    }

    return botMessage;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    throw error;
  }
};
