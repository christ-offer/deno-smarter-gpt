// worker.ts
import { researcher } from "./researcher.ts";

self.onmessage = async (e: MessageEvent) => {
  console.log('Starting research worker....')
  const { question, temperature, message } = e.data;
  const result = await researcher(question, temperature, message);
  const content = result.data.choices[0].message?.content;
  console.log(`Researcher: ${content} \n`)
  self.postMessage(content);
  self.close();
};