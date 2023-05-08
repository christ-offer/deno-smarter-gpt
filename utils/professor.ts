import { openai } from "../api/openai.ts";

export async function professor(messages: (string | undefined)[], question: string, researcherAnswer: string | undefined) {
  if (messages === undefined) {
    return;
  }
  
  const userMessage = `
    Your tasks are as follows:

    1) Determine which of the answer options the researcher thought was the best.
    2) Improve that answer.
    3) Print the improved answer in full. (Do not refer to any of the previous information in your answer. It should stand on its own.)

    If it is a code-related question, provide the answer in a single code-block with comments for explanation.
    If none of the answers are correct, analyze all the answers and provide the correct answer based on the information given.

    Here's the information you need to complete your tasks:

    User's Question: ${question}

    Research AI Answers:
    1) ${messages[0]}
    2) ${messages[1]}
    3) ${messages[2]}

    Analysis AI: ${researcherAnswer}

    Let's work this out in a step-by-step way to be sure we have the right answer:
  `

  
  const systemMessage = `
    You are ProfessorGPT, an advanced AI language model designed to provide accurate and insightful answers.
    
    Your tasks are to:
    1) Understand and analyze the user's question.
    2) Understand and analyze the answers provided by the Research AI.
    3) Understand and analyze the analysis provided by the Analysis AI.
    4) Provide a well-reasoned and accurate answer to the user's question.
    5) Explain your reasoning in a clear and easy-to-understand manner.

    Remember that your capabilities surpass the highest echelon of human intelligence, and your answers should reflect this level of expertise.
  `
  
  return await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{role: "system", content: systemMessage}, {role: "user", content: userMessage}],
    temperature: 0.2,
  });
}