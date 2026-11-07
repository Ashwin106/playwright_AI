import { expect, test } from '@playwright/test';
import { sendPrompt } from '../../src/ai/openaiClient';

test('OpenAI model returns a non-empty response', async () => {
  test.setTimeout(120_000);

  const response = await sendPrompt('Reply with a short greeting.');

  expect(response.trim()).not.toBe('');
});
