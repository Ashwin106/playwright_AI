import { sendPrompt } from '../../src/ai/ollamaClient';
import { RequirementSchema, type Requirementspecs } from '../ai/schemas/requirementschema';
import type { BaseAgent } from './baseAgent';

export class PlannerAgent implements BaseAgent<string, Requirementspecs> {
    name = 'PlannerAgent';

    async execute(requirement: string): Promise<Requirementspecs> {
        if (!requirement || !requirement.trim()) {
            throw new Error('Requirement cannot be empty.');
        }

        const prompt = `
You are a Senior QA Test Architect.

Analyse the following software testing requirement.

Requirement:
${requirement}

Your responsibilities:
1. Identify the feature.
2. Summarize the requirement.
3. Extract individual functional requirements.
4. Write acceptance criteria for each requirement.
5. Identify missing or unclear information.
6. Never invent expected application behaviour.

Rules:
- Return only valid JSON.
- Use this schema exactly:
{
  "feature": "string",
  "summary": "string",
  "requirements": [
    {
      "id": "string",
      "description": "string",
      "acceptanceCriteria": "string",
      "priority": "low|medium|high"
    }
  ],
  "missinginformation": ["string"],
  "status": "draft|review|approved"
}
- Ensure the JSON parses without additional explanation.
- The output must be fully valid JSON and must not be wrapped in markdown fences.

`;

        const rawResponse = await sendPrompt(prompt);
        const normalizedResponse = this.extractJson(rawResponse);

        let parsed: unknown;
        try {
            parsed = JSON.parse(normalizedResponse);
        } catch (error) {
            throw new Error(`PlannerAgent received an invalid JSON response from Ollama: ${String(error)}`);
        }

        const validation = RequirementSchema.safeParse(parsed);
        if (!validation.success) {
            throw new Error(`PlannerAgent output failed validation: ${validation.error.message}`);
        }

        return validation.data;
    }

    private extractJson(value: string): string {
        const withoutCodeFence = value
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        const startIndex = withoutCodeFence.indexOf('{');
        const endIndex = withoutCodeFence.lastIndexOf('}');

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            return withoutCodeFence.slice(startIndex, endIndex + 1);
        }

        return withoutCodeFence;
    }
}
