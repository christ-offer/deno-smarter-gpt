import { Configuration, OpenAIApi } from 'npm:openai'

const OpenAIKey = Deno.env.get("OPENAI_API_KEY") || "";

const configuration = new Configuration({
  apiKey: OpenAIKey,
});

export const openai = new OpenAIApi(configuration);