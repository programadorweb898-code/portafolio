
'use server';
/**
 * @fileOverview Converts text to speech for the portfolio chatbot.
 *
 * - portfolioChatTts - A function that takes text and returns audio data.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const PortfolioChatTtsInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});

const PortfolioChatTtsOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data as a Base64 encoded WAV data URI.'),
});

export type PortfolioChatTtsInput = z.infer<typeof PortfolioChatTtsInputSchema>;
export type PortfolioChatTtsOutput = z.infer<typeof PortfolioChatTtsOutputSchema>;

export async function portfolioChatTts(
  input: PortfolioChatTtsInput
): Promise<PortfolioChatTtsOutput> {
  return portfolioChatTtsFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}


const portfolioChatTtsFlow = ai.defineFlow(
  {
    name: 'portfolioChatTtsFlow',
    inputSchema: PortfolioChatTtsInputSchema,
    outputSchema: PortfolioChatTtsOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Alloy' },
          },
        },
      },
      prompt: text,
    });
    
    if (!media || !media.url) {
      throw new Error('No audio media returned from the model.');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);
    
    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
