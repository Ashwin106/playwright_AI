import { Ollama } from 'ollama';
import { ollamaGenerateResponseSchema } from './schemas/ollamaResponse';

declare const process: {
  env: Record<string, string | undefined>;
};

const host = process.env.OLLAMA_HOST?.trim() || 'http://localhost:11434';
const model = process.env.OLLAMA_MODEL?.trim() || 'qwen2.5-coder:3b';
const ollama = new Ollama({ host });

export async function sendPrompt(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new TypeError('Prompt must not be empty.');
  }

  console.info(`[Ollama] Sending prompt to model "${model}".`);

  try {
    const result = await ollama.generate({
      model,
      prompt,
      stream: false,
    });
    const parsedResponse = ollamaGenerateResponseSchema.safeParse(result);

    if (!parsedResponse.success) {
      throw new Error('Ollama returned an invalid or empty text response.');
    }

    console.info(`[Ollama] Received a non-empty response from "${model}".`);
    return parsedResponse.data.response;
  } catch (error) {
    const errorType = error instanceof Error ? error.name : 'Unknown error';
    const message = `Request to Ollama model "${model}" failed (${errorType}). Confirm Ollama is running and OLLAMA_HOST is reachable.`;
    console.error(`[Ollama] ${message}`);
    throw new Error(message, { cause: error });
  }
}
