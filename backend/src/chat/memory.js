// import {
//   START,
//   END,
//   MessagesAnnotation,
//   StateGraph,
//   MemorySaver,
// } from '@langchain/langgraph';
// import { model } from '../models/chatModels.js';
// import { getChatHistory, saveChatHistory } from '../db/chatHistory.js';

// export const callModel = async (state) => {
//   const { userId, messages } = state;

//   const chatHistory = await getChatHistory(userId);
//   const updatedMessages = [...chatHistory, ...messages];

//   const response = await model.invoke(updatedMessages);

//   await saveChatHistory(userId, [...updatedMessages, response]);

//   return { messages: response };
// };

// export const workflow = new StateGraph(MessagesAnnotation)
//   .addNode('model', callModel)
//   .addEdge(START, 'model')
//   .addEdge('model', END);

// const memory = new MemorySaver();
// export const app = workflow.compile({ checkpointer: memory });


// import {
//   START,
//   END,
//   MessagesAnnotation,
//   StateGraph,
//   MemorySaver,
// } from '@langchain/langgraph';
// import { model } from '../models/chatModels.js';
// import { getChatHistory, saveChatHistory } from '../db/chatHistory.js';

// export const callModel = async (state) => {
//   const { userId, messages } = state;

//   if (!userId) {
//     throw new Error('User ID is required for chat history.');
//   }

//   const chatHistory = await getChatHistory(userId);
//   const updatedMessages = [...chatHistory, ...messages];

//   const response = await model.invoke(updatedMessages);

//   await saveChatHistory(userId, [...updatedMessages, response]);

//   return { messages: response };
// };

// export const workflow = new StateGraph(MessagesAnnotation)
//   .addNode('model', callModel)
//   .addEdge(START, 'model')
//   .addEdge('model', END);

// const memory = new MemorySaver();
// export const app = workflow.compile({ checkpointer: memory });

// import { model } from '../models/chatModels.js';
// import { promptTemplate } from './promptTemplates.js';
// import {
//   trimMessages,
// } from '@langchain/core/messages';

// const trimmer = trimMessages({
//   maxTokens: 10,
//   strategy: 'last',
//   tokenCounter: (msgs) => msgs.length,
//   includeSystem: true,
//   allowPartial: false,
//   startOn: 'human',
// });

// export const callModel = async (state) => {
//   const { userId, messages } = state;
//   console.log(' userId', userId);
//   const trimmedMessage = await trimmer.invoke(messages);
//   const prompt = await promptTemplate.invoke({
//     messages: trimmedMessage,
//     language: state.language,
//   });
//   const response = await model.invoke(prompt);
//   return { messages: [response] };
// };
