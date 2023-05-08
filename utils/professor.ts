import { openai } from "../api/openai.ts";

export async function professor(messages: (string | undefined)[], question: string, researcherAnswer: string | undefined) {
  if (messages === undefined) {
    return;
  }
  const userMessage = `
    Users Question: ${question}
    \n
    Intern Answers:
    \n
    Answer 1:\n ${messages[0]} \n
    Answer 2:\n ${messages[1]} \n
    Answer 3:\n ${messages[2]} \n
    \n
    Researcher Answer:
    \n
    ${researcherAnswer}
    \n
  `
  
  const systemMessage = `
    You are ProfessorGPT, tasked with 1) finding which of the answer options the researcher thought was best 2) improving that answer, and 3) Printing the improved answer in full. (Do not refer to any of the previous information in your answer. It should stand on its own.)
    \n
    If it is a code related question, provide the answer in a single code-block with comments for explanation.
    If none of the answers are correct, analyze all the answers and provide the correct answer based on the information given.
    \n
    Let's work this out in a step by step way to be sure we have the right answer:
  `
  
  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage}, {role: "user", content: userMessage}],
    temperature: 0.2,
  });
}