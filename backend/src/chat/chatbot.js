// import { model } from '../models/chatModels.js';
// import { v4 as uuidv4 } from 'uuid';
// import { promptTemplate } from './promptTemplates.js';
// import { trimMessages } from '@langchain/core/messages';
// import {
//   START,
//   END,
//   StateGraph,
//   MemorySaver,
//   Annotation,
//   MessagesAnnotation,
// } from '@langchain/langgraph';
// import { saveChatHistory, getChatHistory } from '../db/chatHistory.js';

// const MAX_HISTORY = 100;

// const trimmer = trimMessages({
//   maxTokens: 10,
//   strategy: 'last',
//   tokenCounter: (msgs) => msgs.length,
//   includeSystem: true,
//   allowPartial: false,
//   startOn: 'human',
// });

// const GraphAnnotation = Annotation.Root({
//   ...MessagesAnnotation.spec,
//   language: Annotation(),
//   style: Annotation(),
//   userId: Annotation(),
// });

// export const callModel = async (state) => {
//   const { userId, messages } = state;
//   console.log('state:', state);

//   const trimmedMessage = await trimmer.invoke(messages);
//   const prompt = await promptTemplate.invoke({
//     messages: trimmedMessage,
//     language: state.language,
//     style: state.style,
//   });

//   const response = await model.invoke(prompt);

//   if (userId) {
//     await saveChatHistory(userId, [...messages, response]);
//   }

//   return { messages: [response], userId };
// };

// const workflow = new StateGraph(GraphAnnotation)
//   .addNode('model', callModel)
//   .addEdge(START, 'model')
//   .addEdge('model', END);

// const app = workflow.compile({ checkpointer: new MemorySaver() });

// export const getBotResponse = async (input, userId, language, style) => {
//   const config = { configurable: { thread_id: uuidv4() } };

//   try {
//     let history = [];

//     if (userId) {
//       history = await getChatHistory(userId);
//     }

//     const result = await app.invoke(
//       {
//         userId,
//         messages: [...history, ...input].slice(-MAX_HISTORY),
//         language,
//         style,
//       },
//       config,
//     );

//     console.log('result', result);
//     console.log(result.messages[result.messages.length - 1]);

//     return result.messages[result.messages.length - 1];
//   } catch (error) {
//     console.error('Error in getBotResponse:', error);
//     throw error;
//   }
// };

// import express from 'express';
// ================================================
// import { v4 as uuidv4 } from 'uuid';
// import { model } from '../models/chatModels.js';
// import { promptTemplate } from './promptTemplates.js';
// import { trimMessages } from '@langchain/core/messages';
// import {
//   START,
//   END,
//   StateGraph,
//   MemorySaver,
//   Annotation,
//   MessagesAnnotation,
// } from '@langchain/langgraph';
// import { saveChatHistory, getChatHistory } from '../db/chatHistory.js';


// const MAX_HISTORY = 100;

// const trimmer = trimMessages({
//   maxTokens: 10,
//   strategy: 'last',
//   tokenCounter: (msgs) => msgs.length,
//   includeSystem: true,
//   allowPartial: false,
//   startOn: 'human',
// });

// const GraphAnnotation = Annotation.Root({
//   ...MessagesAnnotation.spec,
//   language: Annotation(),
//   style: Annotation(),
//   userId: Annotation(),
// });

// export const callModel = async (state) => {
//   const { userId, messages } = state;
//   console.log('State:', state);


//   const trimmedMessage = await trimmer.invoke(messages);
//   const prompt = await promptTemplate.invoke({
//     messages: trimmedMessage,
//     language: state.language,
//     style: state.style,
//   });

//   const response = await model.invoke(prompt);

//   const formattedBotMessage = {
//     role: 'bot',
//     content: response.content,
//   };

//   if (userId) {
//     console.log('responce in chatbot', response);
//     await saveChatHistory(userId, ...messages);
//     await saveChatHistory(userId, formattedBotMessage);
//   }

//   return { messages: [response], userId };
// };

// const workflow = new StateGraph(GraphAnnotation)
//   .addNode('model', callModel)
//   .addEdge(START, 'model')
//   .addEdge('model', END);

// const app = workflow.compile({ checkpointer: new MemorySaver() });

// export const getBotResponse = async (input, userId, language, style) => {
//   const threadId = uuidv4();
//   const config = { configurable: { thread_id: threadId } };



//   try {
//     let history = [];

//     if (userId) {
//       history = await getChatHistory(userId);
//       console.log(`Loaded history for user ${userId}:`, history);
//     }

//     const updatedMessages = [...history, ...input].slice(-MAX_HISTORY);

//     const result = await app.invoke(
//       {
//         userId,
//         messages: updatedMessages,
//         language,
//         style,
//       },
//       config,
//     );

//     const botMessage = result.messages[result.messages.length - 1];

//     console.log('Bot response:', botMessage);
//     const formattedBotMessage = {
//       role: 'bot',
//       content: botMessage.content,
//     };

//     if (userId) {
//       console.log('updatedMessages', updatedMessages);
//       await saveChatHistory(userId, updatedMessages);
//       await saveChatHistory(userId, formattedBotMessage);
//       console.log('Chat history updated in DB');
//     }

//     return botMessage;
//   } catch (error) {
//     console.error('Error in getBotResponse:', error);
//     throw error;
//   }
// };
// ===================================================================
// router.post('/chat', async (req, res) => {
//   try {
//     const { userId, message, language, style } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Message is required' });
//     }

//     const response = await getBotResponse([message], userId, language, style);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error in chat route:', error);
//     res.status(500).json({ error: 'Failed to process message' });
//   }
// });

// router.get('/history/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const history = await getChatHistory(userId);
//     res.json(history);
//   } catch (error) {
//     console.error('Error fetching chat history:', error);
//     res.status(500).json({ error: 'Failed to fetch chat history' });
//   }
// });

// export default router;

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

  const formattedBotMessage = {
    role: 'system',
    content: response.content,
  };

  if (userId) {
    console.log('Response in chatbot:', response);
    await saveChatHistory(userId, formattedBotMessage);
  }

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
    // const updatedMessages = [...input].slice(-MAX_HISTORY);
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

    if (userId) {
      await saveChatHistory(userId, { role: 'user', content: input[0] });
      await saveChatHistory(userId, formattedBotMessage);
      console.log('Chat history updated in DB');
    }

    return botMessage;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    throw error;
  }
};
