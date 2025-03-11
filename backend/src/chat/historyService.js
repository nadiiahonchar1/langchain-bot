import { getChatHistory } from '../db/chatHistory.js';
import { MAX_HISTORY } from './constants.js';

export const getUpdatedHistory = async (userId, input) => {
  let history = [];
  if (userId) {
    history = await getChatHistory(userId);
  }
  return [...history, ...input].slice(-MAX_HISTORY);
};
