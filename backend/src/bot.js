import readline from 'readline';
import { getBotResponse } from './chat/chatbot.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('👾 Chatbot запущено! Напишіть щось, щоб розпочати розмову.');

const chat = async () => {
  rl.question('Ви: ', async (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      console.log('🤖 Бот: До побачення!');
      rl.close();
      return;
    }

    const botResponse = await getBotResponse([
      { role: 'user', content: userInput },
    ]);
    console.log(`🤖 Бот: ${botResponse.content}`);

    chat();
  });
};

chat();
