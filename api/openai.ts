import { Configuration, OpenAIApi } from 'npm:openai'

const OpenAIKey = Deno.env.get("OPENAI_API_KEY") || "";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);