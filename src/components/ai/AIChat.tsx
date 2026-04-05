'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  Loader2,
  Mic,
  MicOff,
  Send,
  User,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioChat } from '@/ai/flows/portfolio-chat-flow';
import { portfolioChatTts } from '@/ai/flows/portfolio-chat-tts-flow';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  image?: string;
};

type SpeechRecognitionResultLike = {
  0: {
    transcript: string;
  };
};

type SpeechRecognitionEventLike = {
  results: {
    0: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionErrorEventLike = {
  error: string;
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  }
}

const initialMessage: Message = {
  id: 'intro',
  role: 'assistant',
  text: 'Â¡Hola! Soy el asistente de IA de Luis. Â¿QuÃ© te gustarÃ­a saber sobre su portafolio? Puedes preguntarme sobre sus habilidades, proyectos o cÃ³mo contactarlo. TambiÃ©n puedes usar el micrÃ³fono para hablar.',
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const { toast } = useToast();

  const handleSendMessage = useCallback(
    async (messageText: string | React.FormEvent) => {
      let currentInput = '';
      if (typeof messageText === 'string') {
        currentInput = messageText;
      } else {
        messageText.preventDefault();
        currentInput = input;
      }

      if (!currentInput.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: currentInput,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await portfolioChat({
          query: currentInput,
        });

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: response.responseText,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        if (isAudioEnabled) {
          setIsTtsLoading(true);
          try {
            const ttsResponse = await portfolioChatTts({
              text: response.responseText,
            });
            if (audioRef.current) {
              audioRef.current.src = ttsResponse.audioDataUri;
              audioRef.current.play();
            }
          } catch (ttsError) {
            console.error('TTS error:', ttsError);
          } finally {
            setIsTtsLoading(false);
          }
        }

        if (response.sectionId && response.sectionId !== 'none') {
          const element = document.getElementById(response.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } catch (error) {
        console.error('AI chat error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'Lo siento, no pude procesar tu solicitud. Por favor, intÃ©ntalo de nuevo.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isAudioEnabled, isLoading]
  );

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (
        event: SpeechRecognitionErrorEventLike
      ) => {
        if (event.error === 'not-allowed') {
          toast({
            variant: 'destructive',
            title: 'Permiso de micrÃ³fono denegado',
            description:
              'Por favor, habilita el acceso al micrÃ³fono en la configuraciÃ³n de tu navegador para usar el chat de voz.',
          });
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [handleSendMessage, toast]);

  const handleToggleMic = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggle}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          aria-label="Toggle AI Chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex h-[60vh] flex-col animate-in fade-in-0 slide-in-from-bottom-5 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Asistente de IA</CardTitle>
                <CardDescription>
                  PregÃºntame cualquier cosa sobre Luis.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5 text-red-500" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="space-y-4 p-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex items-start gap-3',
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="rounded-full bg-primary p-2 text-primary-foreground">
                          <Bot className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                          message.role === 'user'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'border bg-card'
                        )}
                      >
                        {message.image && (
                          <div className="mb-2">
                            <Image
                              src={message.image}
                              alt="User upload"
                              width={150}
                              height={150}
                              className="rounded-md"
                            />
                          </div>
                        )}
                        {message.text}
                      </div>
                      {message.role === 'user' && (
                        <div className="rounded-full bg-muted p-2 text-muted-foreground">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
                  {(isLoading || isTtsLoading) && (
                    <div className="flex items-start justify-start gap-3">
                      <div className="rounded-full bg-primary p-2 text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="rounded-lg border bg-card px-4 py-2 text-sm">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={handleSendMessage}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe o habla..."
                  disabled={isLoading || isRecording}
                />
                {recognitionRef.current && (
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleToggleMic}
                    disabled={isLoading}
                    variant={isRecording ? 'default' : 'outline'}
                  >
                    {isRecording ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || isRecording || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
          <audio ref={audioRef} className="hidden" />
        </div>
      )}
    </>
  );
}
