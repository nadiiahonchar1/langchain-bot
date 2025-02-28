// import { v4 as uuidv4 } from 'uuid';
// import { model } from '../models/chatModels.js';
// import { promptTemplate } from './promptTemplates.js';
// import { SystemMessage, HumanMessage } from '@langchain/core/messages';

// export const getBotResponse = async (input, userId, language, style) => {

//   const config = { configurable: { thread_id: uuidv4() } };

//   const prompt = await promptTemplate.invoke({
//     messages: input,
//     language,
//     style,
//   });

//   const formattedMessages = prompt.messages.map((msg) => {
//     if (msg instanceof SystemMessage) {
//       return { role: 'system', content: msg.content };
//     } else if (msg instanceof HumanMessage) {
//       const parsedContent = msg.content.startsWith('[')
//         ? JSON.parse(msg.content)[0].content
//         : msg.content;
//       return { role: 'user', content: parsedContent };
//     }
//     return { role: 'assistant', content: msg.content };
//   });
//   const output = await model.invoke(formattedMessages, config);
//   return output.content;
// };

// import { v4 as uuidv4 } from 'uuid';
import { model } from '../models/chatModels.js';
import { v4 as uuidv4 } from 'uuid';
import { promptTemplate } from './promptTemplates.js';
import {
  trimMessages
} from '@langchain/core/messages';
import {
  START,
  END,
  StateGraph,
  MemorySaver,
  Annotation,
  MessagesAnnotation,
} from '@langchain/langgraph';


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
  console.log('state:', state);

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
  if (!userId) {
    throw new Error('User ID is required to fetch chat history.');
  }

  const config = { configurable: { thread_id: uuidv4() } };

  try {
    const result = await app.invoke(
      { userId, messages: input, language, style },
      config,
    );
    console.log('result', result);
    console.log(result.messages[result.messages.length - 1]);
    return result.messages[result.messages.length - 1];
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    throw error;
  }
};

// =======================
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
