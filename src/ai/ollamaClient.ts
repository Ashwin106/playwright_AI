import { Ollama } from 'ollama';
const host = process.env.OLLAMA_HOST?.trim() || 'http://localhost:11434'; //ollama's standard port is 11434
const model = process.env.OLLAMA_MODEL?.trim() || 'qwen2.5-coder:3b'; // AI model
const ollama = new Ollama({ host }); //create active client object ready to send requests to ollama server

export async function sendPrompt(prompt: string): Promise<string> {
  const cleanPrompt = prompt?.trim(); // to remove whitespaces

// check whether the prompt is empty after trimming whitespace
  if (!cleanPrompt) {
    throw new Error('Prompt cannot be empty.');
  }

  try {
    const result = await ollama.generate({
      model,
      prompt: cleanPrompt,
      stream: false,
    });
   // check if the response is a string and trim it, otherwise set it to an empty string
    const response = typeof result?.response === 'string' ? result.response.trim() : '';
   // error handling for empty response from Ollama
    if (!response) {
      throw new Error('Ollama returned an empty response.');
    }

    return response;
    // return the trimmed response from Ollama
  } catch (error) {
    // log the error and throw a new error with a user-friendly message
    const message = 'Ollama request failed. Check that Ollama is running and OLLAMA_HOST is correct.';
    console.error(message, error);
    throw new Error(message);
  }
}
