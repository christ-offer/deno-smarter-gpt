import { openai } from "../api/openai.ts";
import { systemMessage } from '../messages/system-messages.ts'

export async function routing(message: string) {

  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage.routingAi.message}, {role: "user", content: message}],
    temperature: systemMessage.routingAi.temperature,
  });
}