import { analyzer } from "./utils/analyzer.ts";
import { professor } from "./utils/professor.ts";


const smartGpt = async (question: string) => {
  // Make 3 requests to the API
  const worker1 = new Worker(new URL("./utils/worker.ts", import.meta.url).href, { type: "module" });
  const worker2 = new Worker(new URL("./utils/worker.ts", import.meta.url).href, { type: "module" });
  const worker3 = new Worker(new URL("./utils/worker.ts", import.meta.url).href, { type: "module" });

  const workers = [worker1, worker2, worker3];
  const temperatures = [0.2, 0.5, 0.8];

  const internAnswers = await Promise.all(workers.map((worker, index) => {
    return new Promise((resolve) => {
      worker.postMessage({ question, temperature: temperatures[index] });
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
If it takes 5 hours for 5 clothes to dry, how many hours would it take for 131 clothes to dry?
`);