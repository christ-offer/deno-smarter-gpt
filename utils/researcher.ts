import { openai } from "../api/openai.ts";

export async function researcher(question: string, temperature: number, message: string) {

  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: message}, {role: "user", content: question}],
    temperature: temperature,
  });
}