// import { createMemory } from './history/history.js';
// import { createPromptTemplate } from './prompt/promptTemplate.js';
// import { getConfigAndTemplate, callModelWithTemplate, callModelWithTemplate } from './config.js';

// const corsOptions = {
//   origin: 'https://fullstack-translator.netlify.app',
//   methods: ['GET', 'POST'],
//   allowedHeaders: 'Content-Type',
// };

// app.use(cors(corsOptions));

import express from 'express';
import cors from 'cors';
import router from './routes/bot.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use('/chat', router);

app.listen(3001, () => console.log('Server running'));

// const chat = async () => {
//   const inputMessages = [
//     {
//       role: 'user',
//       content: "Hi! I'm Bob.",
//     },
//   ];

//   const output = await callModelWithTemplate(
//     { messages: inputMessages, language: 'English' },
//     promptTemplate,
//   );
//   console.log(output.messages[output.messages.length - 1]);
// };

// chat();

// import { getBotResponse, getPersonalizedBotResponse } from './chatbot.js';

// const startBot = async () => {
//   const input = [{ role: 'user', content: "Hi! I'm Bob." }];

//   const response = await getBotResponse(input);
//   console.log(response);

//   const personalizedResponse = await getPersonalizedBotResponse(
//     input,
//     'Spanish',
//   );
//   console.log(personalizedResponse);
// };

// startBot();
