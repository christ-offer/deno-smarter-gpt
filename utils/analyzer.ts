import { openai } from "../api/openai.ts";

export async function analyzer(messages: (string | undefined)[], question: string) {
  if (messages === undefined) {
    return;
  }
  const resolverMessage = `
    Users Question: ${question}
    \n
    Research AI Answers:
    \n
    Answer 1:\n ${messages[0]}\n
    Answer 2:\n ${messages[1]}\n
    Answer 3:\n ${messages[2]}\n
    \n
  `
  
  const systemMessage = `
    You are a Higher Level Analysis AI tasked with analyzing the answers provided by our Research AI's, list the flaws and faulty logic in each answer. (If the question/answers are related to code, make sure to point out any security faults or bugs. Also make sure it follows best practices.)
    \n
    Keep a special lookout for "hallucinations" or "delusions" in the answers. Let’s work this out in a step by step way to be sure we find all potential errors and flaws.
  `
  
  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage}, {role: "user", content: resolverMessage}],
    temperature: 0.3,
  });
}