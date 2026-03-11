'use server';
/**
 * @fileOverview This flow optimizes a job seeker's 'open to work' status for various recruiter AI and ATS systems.
 *
 * - optimizeOpenToWorkStatus - A function that takes candidate preferences and returns an optimized 'open to work' status.
 * - OptimizeOpenToWorkStatusInput - The input type for the optimizeOpenToWorkStatus function.
 * - OptimizeOpenToWorkStatusOutput - The return type for the optimizeOpenToWorkStatus function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OptimizeOpenToWorkStatusInputSchema = z.object({
  availability: z
    .string()
    .describe("The candidate's current availability (e.g., 'immediately available', 'available in 2-4 weeks', 'actively interviewing')."),
  preferredRoles: z
    .array(z.string())
    .describe('A list of job roles the candidate is interested in.'),
  remotePreference: z
    .string()
    .describe("The candidate's remote work preference (e.g., 'remote only', 'hybrid', 'on-site')."),
});
export type OptimizeOpenToWorkStatusInput = z.infer<
  typeof OptimizeOpenToWorkStatusInputSchema
>;

const OptimizeOpenToWorkStatusOutputSchema = z.object({
  isOpenToWork: z
    .boolean()
    .describe('A boolean indicating if the candidate is currently open to work.'),
  humanReadableSummary: z
    .string()
    .describe(
      'A concise, human-readable summary of the optimized \'open to work\' status for recruiters.'
    ),
  atsOptimizedStatus: z.object({
    openToWorkFlag: z
      .boolean()
      .describe('An explicit flag for ATS indicating if the candidate is open to work.'),
    optimizedRoles: z
      .array(z.string())
      .describe('A list of keywords or phrases for preferred roles, optimized for ATS search.'),
    availabilityPhrase: z
      .string()
      .describe('A standardized phrase describing availability for ATS systems.'),
    remoteWorkPreference: z
      .string()
      .describe('A standardized term for remote work preference for ATS systems.'),
    relevantKeywords: z
      .array(z.string())
      .describe(
        'Additional keywords relevant to the candidate\'s open to work status for ATS parsing.'
      ),
  }),
});
export type OptimizeOpenToWorkStatusOutput = z.infer<
  typeof OptimizeOpenToWorkStatusOutputSchema
>;

export async function optimizeOpenToWorkStatus(
  input: OptimizeOpenToWorkStatusInput
): Promise<OptimizeOpenToWorkStatusOutput> {
  return optimizeOpenToWorkStatusFlow(input);
}

const optimizeOpenToWorkStatusPrompt = ai.definePrompt({
  name: 'optimizeOpenToWorkStatusPrompt',
  input: { schema: OptimizeOpenToWorkStatusInputSchema },
  output: { schema: OptimizeOpenToWorkStatusOutputSchema },
  prompt: `You are an AI assistant specialized in optimizing job seeker profiles for Applicant Tracking Systems (ATS) and recruiter AI.
Your goal is to analyze a candidate's preferences and generate an 'open to work' status that is highly effective, accurately interpreted, and discoverable by various recruiter AI and ATS systems.

Analyze the following information to determine the best way to present the candidate's 'open to work' status:

Candidate Availability: {{{availability}}}
Preferred Roles: {{#each preferredRoles}}- {{{this}}} {{/each}}
Remote Work Preference: {{{remotePreference}}}

Based on this, generate a structured output that includes:
1. A boolean 'isOpenToWork' indicating if the candidate is actively seeking new opportunities.
2. A 'humanReadableSummary' that briefly and positively summarizes the candidate's status for a human recruiter.
3. An 'atsOptimizedStatus' object containing:
   - 'openToWorkFlag': A boolean flag specifically for ATS.
   - 'optimizedRoles': A list of concise, keyword-rich phrases for the preferred roles that ATS can easily parse.
   - 'availabilityPhrase': A clear, standardized phrase for their availability.
   - 'remoteWorkPreference': A standardized term for their remote work preference (e.g., 'Remote Only', 'Hybrid', 'On-site').
   - 'relevantKeywords': A list of additional keywords that would help ATS and AI systems categorize and match the candidate.

Ensure all strings in arrays are double-quoted.`,
});

const optimizeOpenToWorkStatusFlow = ai.defineFlow(
  {
    name: 'optimizeOpenToWorkStatusFlow',
    inputSchema: OptimizeOpenToWorkStatusInputSchema,
    outputSchema: OptimizeOpenToWorkStatusOutputSchema,
  },
  async (input) => {
    const { output } = await optimizeOpenToWorkStatusPrompt(input);
    if (!output) {
      throw new Error('Failed to generate optimized open to work status.');
    }
    return output;
  }
);
