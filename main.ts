import { analyzer } from "./utils/analyzer.ts";
import { professor } from "./utils/professor.ts";
import { routing } from "./utils/routing.ts";
import { systemMessage } from './messages/system-messages.ts'

const smartGpt = async (question: string) => {
  
  console.log('Starting routing.... \n')
  const routingResult = await routing(question);
  const routingDecisions = routingResult?.data.choices[0].message?.content;
  console.log(`Routing: ${routingDecisions} \n`)
  
  // turn the returned string into an array
  const routingMessageArray = routingDecisions
    .slice(1, -1) // remove the brackets
    .split(',') // split by comma
    .map(s => s.trim().slice(1, -1));

  // Prepare the workers with corresponding system messages and temperatures
  const internAnswers = await Promise.all(routingMessageArray.map((aiType) => {
    const worker = new Worker(new URL("./utils/worker.ts", import.meta.url).href, { type: "module" });
    const message = systemMessage[aiType].message;
    const temperature = systemMessage[aiType].temperature;

    return new Promise((resolve) => {
      worker.postMessage({ question, message, temperature });
      worker.onmessage = (event: MessageEvent) => {
        resolve(event.data);
        worker.terminate();
      };
    });
  }));

  console.log('Starting analyzer.... \n')
  const analysis = await analyzer(internAnswers, question);
  console.log(`Researcher: ${analysis?.data.choices[0].message?.content} \n`)
  
  console.log('Starting professor.... \n')
  const resolved = await professor(internAnswers, question, analysis?.data.choices[0].message?.content);
  console.log(`Professor: ${resolved?.data.choices[0].message?.content} \n`)
  
  return resolved?.data.choices[0].message?.content;
}

smartGpt(`
In the book 'To Kill a Mockingbird', how does Scout's understanding of the world change throughout the story?
`);
