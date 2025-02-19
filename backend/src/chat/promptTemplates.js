import { ChatPromptTemplate } from '@langchain/core/prompts';

// export const promptTemplate = ChatPromptTemplate.fromMessages([
//   [
//     'system',
//     'You talk like a pirate. Answer all questions to the best of your ability.',
//   ],
//   ['human', '{messages}'],
// ]);

export const promptTemplate = {
  invoke: ({ messages, language, style }) => {
    if (
      !Array.isArray(messages) ||
      messages.some((msg) => !msg.role || !msg.content)
    ) {
      throw new Error('Invalid messages format');
    }

    let styleMessage =
      'You talk like a professional. Answer all questions to the best of your ability.';

    switch (style) {
      case 'pirate':
        styleMessage =
          'You talk like a pirate. Answer all questions to the best of your ability.';
        break;
      case 'formal':
        styleMessage =
          'You talk in a formal tone. Answer all questions politely and with proper etiquette.';
        break;
      case 'business':
        styleMessage =
          'You talk in a business-like manner. Provide concise and professional answers.';
        break;
      case 'scientific':
        styleMessage =
          'You speak in a scientific tone. Your answers should be based on facts and research.';
        break;
      case 'casual':
        styleMessage =
          'You talk in a casual manner. Keep the conversation informal and friendly.';
        break;
      default:
        styleMessage =
          'You talk like a professional. Answer all questions to the best of your ability.';
        break;
    }

    return ChatPromptTemplate.fromMessages([
      ['system', styleMessage],
      ['human', '{messages}'],
    ]);
  },
};
