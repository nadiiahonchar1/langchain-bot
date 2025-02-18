import { MemorySaver } from '@langchain/langgraph';
import { v4 as uuidv4 } from 'uuid';

export const createMemory = () => {
  return new MemorySaver();
};

export const createConfig = () => {
  return { configurable: { thread_id: uuidv4() } };
};
