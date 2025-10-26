
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Mic, MicOff, Send, User, Volume2, VolumeX, X, Paperclip } from 'lucide-react';
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

// Extend window type for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          toast({
            variant: 'destructive',
            title: 'Permiso de micrófono denegado',
            description: 'Por favor, habilita el acceso al micrófono en la configuración de tu navegador para usar el chat de voz.',
          });
        }
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [toast]);

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
    if (!isOpen) {
        setMessages([
            {
                id: 'intro',
                role: 'assistant',
                text: "¡Hola! Soy el asistente de IA de Luis. ¿Qué te gustaría saber sobre su portafolio? Puedes preguntarme sobre sus habilidades, proyectos o cómo contactarlo. También puedes usar el micrófono para hablar."
            }
        ]);
    }
  };

  const handleSendMessage = async (messageText: string | React.FormEvent) => {
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
    setMessages(prev => [...prev, userMessage]);
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
      setMessages(prev => [...prev, assistantMessage]);

      if (isAudioEnabled) {
        setIsTtsLoading(true);
        try {
          const ttsResponse = await portfolioChatTts({ text: response.responseText });
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
          setTimeout(() => setIsOpen(false), 1000);
        }
      }
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Lo siento, no pude procesar tu solicitud. Por favor, inténtalo de nuevo.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          className="rounded-full w-14 h-14 shadow-lg"
          aria-label="Toggle AI Chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-2xl animate-in fade-in-0 slide-in-from-bottom-5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Asistente de IA</CardTitle>
                <CardDescription>Pregúntame cualquier cosa sobre Luis.</CardDescription>
              </div>
               <div className='flex gap-2'>
                <Button variant="ghost" size="icon" onClick={() => setIsAudioEnabled(!isAudioEnabled)}>
                  {isAudioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 text-red-500" />}
                </Button>
               </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-6 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex items-start gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="bg-primary rounded-full p-2 text-primary-foreground">
                          <Bot className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                           message.role === 'user'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-card border'
                        )}
                      >
                         {message.image && (
                          <div className="mb-2">
                             <Image src={message.image} alt="User upload" width={150} height={150} className="rounded-md" />
                          </div>
                        )}
                        {message.text}
                      </div>
                      {message.role === 'user' && (
                         <div className="bg-muted rounded-full p-2 text-muted-foreground">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
                   {(isLoading || isTtsLoading) && (
                    <div className="flex items-start gap-3 justify-start">
                        <div className="bg-primary rounded-full p-2 text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-card border rounded-lg px-4 py-2 text-sm">
                           <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                   )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Escribe o habla..."
                  disabled={isLoading || isRecording}
                />
                 {recognitionRef.current && (
                  <Button type="button" size="icon" onClick={handleToggleMic} disabled={isLoading} variant={isRecording ? 'destructive' : 'outline'}>
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
                <Button type="submit" size="icon" disabled={isLoading || isRecording || !input.trim()}>
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
