import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from '@langchain/langgraph';
import { model } from './config.js';

export const callModel = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: response };
};

export const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

export const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });
