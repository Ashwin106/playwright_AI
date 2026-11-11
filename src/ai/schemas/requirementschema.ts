/**
 * This file defines the schema for a requirement specification using the Zod library.
 * The schema includes fields for feature, summary, requirements, missing information, and status.
 * Each requirement has an id, description, acceptance criteria, and priority.
 * The status can be 'draft', 'review', or 'approved'.
 */

import z from 'zod';

export const RequirementSchema = z.object({

    feature: z.string(),
    summary: z.string(),
    requirements: z.array(z.object({
        id: z.string(),
        description: z.string(),
        acceptanceCriteria: z.string(),
        priority: z.enum(['low', 'medium', 'high']),
    })),

    missinginformation: z.array(z.string()),
    status: z.enum(['draft', 'review', 'approved'])



});

export type Requirementspecs = z.infer<typeof RequirementSchema>;

