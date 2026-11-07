import { z } from 'zod';

export const ollamaGenerateResponseSchema = z.object({
  response: z.string().trim().min(1),
});

export type OllamaGenerateResponse = z.infer<typeof ollamaGenerateResponseSchema>;
