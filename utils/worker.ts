// worker.ts
import { researcher } from "./researcher.ts";

self.onmessage = async (e: MessageEvent) => {
  console.log('Starting researcher....')
  const { question, temperature } = e.data;
  const result = await researcher(question, temperature);
  const content = result.data.choices[0].message?.content;
  console.log(`Researcher: ${content} \n`)
  self.postMessage(content);
  self.close();
};