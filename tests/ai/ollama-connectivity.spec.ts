import { expect, test } from '@playwright/test';
import { sendPrompt } from '../../src/ai/ollamaClient';

test('Test ollama response', async () => {
  test.setTimeout(120_000);

  const response = await sendPrompt(
    'Explain Playwright in two sentences.'
);

console.log('Ollama response:', response);

expect(response.length).toBeGreaterThan(0);
});
