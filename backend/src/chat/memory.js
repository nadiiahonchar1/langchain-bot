import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from '@langchain/langgraph';
import { model } from '../models/chatModels.js';
import { getChatHistory, saveChatHistory } from '../db/chatHistory.js';

export const callModel = async (state) => {
  const { userId, messages } = state;

  const chatHistory = await getChatHistory(userId);
  const updatedMessages = [...chatHistory, ...messages];

  const response = await model.invoke(updatedMessages);

  await saveChatHistory(userId, [...updatedMessages, response]);

  return { messages: response };
};

export const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });
