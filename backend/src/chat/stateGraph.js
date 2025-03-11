import {
  START,
  END,
  StateGraph,
  MemorySaver,
  Annotation,
  MessagesAnnotation,
} from '@langchain/langgraph';
import { callModel } from './modelService.js';

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation(),
  style: Annotation(),
  userId: Annotation(),
});

export const createStateGraph = () => {
  const workflow = new StateGraph(GraphAnnotation)
    .addNode('model', callModel)
    .addEdge(START, 'model')
    .addEdge('model', END);

  return workflow.compile({ checkpointer: new MemorySaver() });
};
