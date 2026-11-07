//imports the official OpenAI client library and a schema for validating the response from OpenAI's chat completion API. 
// It defines a function `sendPrompt` that takes a prompt string, sends it to the specified OpenAI model, and returns the generated response. The function includes error handling for empty prompts, missing API keys, and invalid responses from OpenAI.
import OpenAI from 'openai';
import { openAIChatCompletionResponseSchema } from './schemas/openAIResponse';

const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';

export async function sendPrompt(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new TypeError('Prompt must not be empty.');
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required to send prompts to OpenAI.');
  }

  console.info(`[OpenAI] Sending prompt to model "${model}".`);

  try {
    const openai = new OpenAI({ apiKey });
    const result = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    const parsedResponse = openAIChatCompletionResponseSchema.safeParse(result);

    if (!parsedResponse.success) {
      throw new Error('OpenAI returned an invalid or empty text response.');
    }

    console.info(`[OpenAI] Received a non-empty response from "${model}".`);
    return parsedResponse.data.choices[0].message.content!;
  } catch (error) {
    const errorType = error instanceof Error ? error.name : 'Unknown error';
    const message = `Request to OpenAI model "${model}" failed (${errorType}). Confirm OPENAI_API_KEY and OPENAI_MODEL are valid.`;
    console.error(`[OpenAI] ${message}`);
    throw new Error(message, { cause: error });
  }
}
