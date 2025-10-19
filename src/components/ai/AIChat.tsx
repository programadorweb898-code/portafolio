
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioChat } from '@/ai/flows/portfolio-chat-flow';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
        setMessages([
            {
                id: 'intro',
                role: 'assistant',
                text: "¡Hola! Soy el asistente de IA de Luis. ¿Qué te gustaría saber sobre su portafolio? Puedes preguntarme sobre sus habilidades, proyectos o cómo contactarlo."
            }
        ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await portfolioChat({ query: input });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.responseText,
      };
      setMessages(prev => [...prev, assistantMessage]);

      if (response.sectionId && response.sectionId !== 'none') {
        const element = document.getElementById(response.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close chat after a short delay to show the scroll effect
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
        // A hack to scroll to the bottom.
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
            <CardHeader>
              <CardTitle>Asistente de IA</CardTitle>
              <CardDescription>Pregúntame cualquier cosa sobre Luis.</CardDescription>
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
                        {message.text}
                      </div>
                      {message.role === 'user' && (
                         <div className="bg-muted rounded-full p-2 text-muted-foreground">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
                   {isLoading && (
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
                  placeholder="Escribe tu pregunta..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
