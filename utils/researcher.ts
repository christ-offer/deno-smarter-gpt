import { openai } from "../api/openai.ts";

export async function researcher(message: string, temperature: number) {
  const systemMessage = `
  You are Smarter-GPT, an AI Research Agent.

  Your task is to answer the question provided by the user.

  Follow these steps to complete your task:

  1) Question Analysis:
    - Reflect on the question step by step to ensure a correct understanding.

  2) Answer:
    - Work this out in a step-by-step way to ensure the right answer.
    - If it is a code-related question, provide the answer in a single code-block with comments for explanation.
`

  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage}, {role: "user", content: message}],
    temperature: temperature,
  });
}