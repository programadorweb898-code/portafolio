
'use server';
/**
 * @fileOverview A portfolio chatbot that answers questions and can scroll to sections.
 *
 * - portfolioChat - A function that handles user queries about the portfolio.
 * - PortfolioChatInput - The input type for the portfolioChat function.
 * - PortfolioChatOutput - The return type for the portfolioChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { skills, projects, socialLinks, navLinks } from '@/lib/data';

// Prepare data for the prompt
const skillsList = skills.map(s => s.name).join(', ');
const projectsList = projects.map(p => `- ${p.title}: ${p.description}`).join('\n');
const socialLinksList = socialLinks.map(s => `- ${s.name}: ${s.url}`).join('\n');
const personalInfo = "Luis Alberto Gómez is a passionate software developer with over 15 years of experience, specializing in modern, responsive web applications. He is 45 years old.";

const PortfolioChatInputSchema = z.object({
  query: z.string().describe('The user\'s question about the portfolio.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  responseText: z.string().describe('The text-based answer to the user\'s query.'),
  sectionId: z
    .enum(['about', 'skills', 'projects', 'contact', 'none'])
    .describe(
      "The ID of the page section relevant to the query. Use 'none' if no specific section applies."
    ),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

export async function portfolioChat(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  return portfolioChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioChatPrompt',
  input: { schema: PortfolioChatInputSchema },
  output: { schema: PortfolioChatOutputSchema },
  prompt: `You are a friendly and helpful AI assistant for Luis Alberto Gómez's personal portfolio.
Your goal is to answer questions from visitors and help them navigate the site.

**Your knowledge base:**

**About Luis (section 'about'):**
${personalInfo}

**Skills (section 'skills'):**
${skillsList}

**Projects (section 'projects'):**
${projectsList}

**Social Media & Contact (section 'contact'):**
You can contact Luis via the form in the 'contact' section.
His social links are:
${socialLinksList}

**Your Task:**
1.  Analyze the user's query: \`{{{query}}}\`
2.  Formulate a concise and helpful answer based on the knowledge base.
3.  Determine which section of the portfolio is most relevant to the query. The sections are: 'about', 'skills', 'projects', 'contact'.
4.  If the query is a general greeting, a thank you, or doesn't relate to a specific section, set the sectionId to 'none'.
5.  You MUST set \`sectionId\` to a specific section ('about', 'skills', 'projects', 'contact') **if and only if** the user gives an explicit navigation command, such as 'llévame a', 'muéstrame la sección de', 'quiero ver', 'go to', or 'show me'. For any other questions, even if they are about a specific section (e.g., 'what are his skills?'), you should answer directly and set \`sectionId\` to \`'none'\`.
6.  When navigating, your response MUST be a short, natural phrase that confirms the action. For example: "Claro, aquí están sus proyectos." or "Te llevo a la sección de contacto."
7.  Respond in Spanish.

Examples:
- Query: "llévame a la sección de habilidades" -> Response: "Estas son las habilidades de Luis." and set sectionId to 'skills'.
- Query: "Show me his work" -> Response: "Claro, aquí están sus proyectos." and set sectionId to 'projects'.
- Query: "Cómo lo contacto?" -> Response: "Puedes contactarlo usando el formulario en la sección de contacto. Te llevo allí." and set sectionId to 'contact'.
- Query: "Qué tecnologías usa?" -> Response: "Luis utiliza una variedad de tecnologías, incluyendo: ${skillsList}." and set sectionId to 'none'.
- Query: "Hola" -> Response: "¡Hola! ¿Cómo puedo ayudarte a conocer mejor el trabajo de Luis?" and set sectionId to 'none'.
`,
});

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("The AI model did not return an output.");
    }
    return output;
  }
);
