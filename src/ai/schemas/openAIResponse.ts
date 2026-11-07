import { z } from 'zod';

export const openAIChatCompletionResponseSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string().trim().min(1),
      }),
    }),
  ).min(1),
});
