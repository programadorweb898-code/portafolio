'use server';
/**
 * @fileOverview Suggests skills based on project descriptions.
 *
 * - suggestSkillsFromProjects - A function that suggests skills based on project descriptions.
 * - SuggestSkillsFromProjectsInput - The input type for the suggestSkillsFromProjects function.
 * - SuggestSkillsFromProjectsOutput - The return type for the suggestSkillsFromProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SuggestSkillsFromProjectsInputSchema = z.object({
  projectDescriptions: z
    .array(z.string())
    .describe('An array of project descriptions.'),
});
export type SuggestSkillsFromProjectsInput = z.infer<
  typeof SuggestSkillsFromProjectsInputSchema
>;

const SuggestSkillsFromProjectsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of skills suggested based on the project descriptions.'),
});
export type SuggestSkillsFromProjectsOutput = z.infer<
  typeof SuggestSkillsFromProjectsOutputSchema
>;

export async function suggestSkillsFromProjects(
  input: SuggestSkillsFromProjectsInput
): Promise<SuggestSkillsFromProjectsOutput> {
  return suggestSkillsFromProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsFromProjectsPrompt',
  input: {schema: SuggestSkillsFromProjectsInputSchema},
  output: {schema: SuggestSkillsFromProjectsOutputSchema},
  prompt: `You are an expert software development portfolio assistant.

You will review the provided project descriptions and suggest skills that the portfolio owner may have used in these projects but not explicitly listed in their skills section.

Project Descriptions:
{{#each projectDescriptions}}- {{{this}}}\n{{/each}}

Suggested Skills:`,
});

const suggestSkillsFromProjectsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFromProjectsFlow',
    inputSchema: SuggestSkillsFromProjectsInputSchema,
    outputSchema: SuggestSkillsFromProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
