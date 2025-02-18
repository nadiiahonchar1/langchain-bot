import { model } from "../models/chatModels.js";

export default async function bot({ text }) {
  return await model.invoke([{ role: 'user', content: text }]);
}
