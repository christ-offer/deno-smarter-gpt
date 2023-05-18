import { openai } from "../api/openai.ts";
import { systemMessage } from '../messages/system-messages.ts'

export async function professor(messages: (string | undefined)[], question: string, researcherAnswer: string | undefined) {
  if (messages === undefined) {
    return;
  }

  // dynamically create the message content
  let internAnswersContent = '';

  messages.forEach((message, index) => {
    if (message) {
      internAnswersContent += `${index + 1}) ${message}\n`;
    }
  });

  const userMessage = `
    Here's the information you need to complete your tasks:
    \n
    User's Question: ${question}
    \n
    Intern AI Answers:
    ${internAnswersContent}
    \n
    Researcher AI: ${researcherAnswer}
    \n
    Let's work this out in a step-by-step way to be sure we have the right answer:\n
  `;

  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage.analyticalSynthesis.message}, {role: "user", content: userMessage}],
    temperature: systemMessage.analyticalSynthesis.temperature,
  });
}
