// import {
//   START,
//   END,
//   MessagesAnnotation,
//   StateGraph,
//   MemorySaver,
// } from '@langchain/langgraph';
// import { model } from '../models/chatModels.js';

// export const callModel = async (state) => {
//   const response = await model.invoke(state.messages);
//   return { messages: response };
// };

// export const workflow = new StateGraph(MessagesAnnotation)
//   .addNode('model', callModel)
//   .addEdge(START, 'model')
//   .addEdge('model', END);

// export const memory = new MemorySaver();
// export const app = workflow.compile({ checkpointer: memory });

// import { v4 as uuidv4 } from 'uuid';
// import { getChatHistory, saveChatHistory } from '../db/chatHistory.js';

// const MAX_HISTORY_LENGTH = 10;

// export const updateMemory = async (userId, newMessages) => {
//   try {
//     const chatHistory = await getChatHistory(userId);


//     const updatedHistory = [...chatHistory, ...newMessages].slice(
//       -MAX_HISTORY_LENGTH,
//     );

//     await saveChatHistory(userId, updatedHistory);
//     return updatedHistory;
//   } catch (error) {
//     console.error('Error updating memory:', error);
//     return [];
//   }
// };

// export const createThread = () => {
//   return uuidv4();
// };

import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
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

export const app = workflow.compile();
