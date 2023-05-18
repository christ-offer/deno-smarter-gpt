import { openai } from "../api/openai.ts";
import { systemMessage } from '../messages/system-messages.ts'

export async function analyzer(messages: (string | undefined)[], question: string) {
  if (messages === undefined) {
    return;
  }

  // dynamically create the message content
  let answersContent = '';

  messages.forEach((message, index) => {
    if (message) {
      answersContent += `Answer ${index + 1}:\n ${message}\n`;
    }
  });

  const resolverMessage = `
    User's Question: ${question}
    \n
    Research AI Answers:
    \n
    ${answersContent}
    \n
  `;

  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage.logicAuditor.message}, {role: "user", content: resolverMessage}],
    temperature: systemMessage.logicAuditor.temperature,
  });
}
