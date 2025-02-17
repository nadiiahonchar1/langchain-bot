import { model } from "../models/chatModels.js";

export default async function bot() {
  return await model.invoke([{ role: 'user', content: 'Hi im bob' }]);
}
