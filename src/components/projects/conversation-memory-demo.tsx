'use client';

import { useState } from 'react';
import { Check, Database, MessageSquare, RotateCcw, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const suggestedQuestions = [
  '¿En qué proyecto estaba trabajando?',
  '¿Qué stack estaba usando?',
  '¿Qué base de datos elegí?',
];

export function ConversationMemoryDemo() {
  const [session, setSession] = useState<1 | 2>(1);
  const [demoId, setDemoId] = useState('');
  const [question, setQuestion] = useState('');
  const [searching, setSearching] = useState(false);
  const [starting, setStarting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const startNewSession = async () => {
    setStarting(true);
    setError('');

    try {
      const response = await fetch('/api/conversation-memory-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'session' }),
      });
      const data = await response.json();

      if (!response.ok || !data.demoId) {
        throw new Error(data.error || 'No se pudo iniciar la demo.');
      }

      setDemoId(data.demoId);
      setSession(2);
      setQuestion('');
      setAnswer('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar la demo.');
    } finally {
      setStarting(false);
    }
  };

  const recoverContext = async (value: string) => {
    if (!demoId) return;

    setQuestion(value);
    setAnswer('');
    setError('');
    setSearching(true);

    try {
      const response = await fetch('/api/conversation-memory-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'search', demoId, query: value }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo recuperar el contexto.');
      }

      setAnswer(data.context || 'No se encontró contexto relevante.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo recuperar el contexto.');
    } finally {
      setSearching(false);
    }
  };

  const resetDemo = () => {
    setSession(1);
    setDemoId('');
    setQuestion('');
    setSearching(false);
    setStarting(false);
    setAnswer('');
    setError('');
  };

  return (
    <section className="mt-20" aria-labelledby="demo-title">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Demo interactiva · memoria real
        </div>
        <h2 id="demo-title" className="mt-3 font-headline text-3xl font-bold">
          See persistent memory in action
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Probá el flujo con el backend real de Conversation Memory. Los mensajes de
          esta demo se guardan en PostgreSQL y se recuperan desde una nueva sesión.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-5 py-4">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Conversation Memory MCP
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border px-2.5 py-1">Session 0{session}</span>
            <span className="rounded-full border px-2.5 py-1">Live demo</span>
          </div>
        </div>

        <div className="space-y-5 p-5 md:p-7">
          {session === 1 ? (
            <>
              <div className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-muted/60 p-4 text-sm leading-6">
                  <p className="font-medium">Vos</p>
                  <p className="mt-1 text-muted-foreground">
                    Estoy construyendo TaskFlow, una API de gestión de tareas con
                    Node.js, Express y PostgreSQL.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border p-4 text-sm leading-6">
                  <p className="font-medium">Agente</p>
                  <p className="mt-1 text-muted-foreground">
                    Entendido. Guardaré este contexto para poder recuperarlo en
                    futuras sesiones.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-dashed px-4 py-3 text-xs text-muted-foreground">
                <Check className="h-4 w-4" />
                Message saved · PostgreSQL · project: portfolio-demo
              </div>

              <Button onClick={startNewSession} disabled={starting} className="w-full sm:w-auto">
                {starting ? 'Creating new session...' : 'Start new session'}
              </Button>
            </>
          ) : (
            <>
              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Nueva sesión · el contexto anterior ya no está en la conversación
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-muted/60 p-4">
                    <p className="text-sm font-medium">Vos</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {question || 'Elegí una pregunta para recuperar el contexto.'}
                    </p>
                  </div>
                </div>

                {(searching || answer || error) && (
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                      <Search className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-3 rounded-2xl rounded-tl-sm border p-4">
                      {searching ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="animate-pulse">Searching conversation memory...</span>
                        </div>
                      ) : error ? (
                        <p className="text-sm text-muted-foreground">{error}</p>
                      ) : (
                        <>
                          <p className="text-sm leading-6">{answer}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="rounded-full border px-2.5 py-1">✓ searchMessages()</span>
                            <span className="rounded-full border px-2.5 py-1">✓ PostgreSQL context found</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((item) => (
                  <Button
                    key={item}
                    variant={question === item ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => recoverContext(item)}
                    disabled={searching}
                  >
                    {item}
                  </Button>
                ))}
              </div>

              <div className="grid gap-3 border-t pt-5 text-xs text-muted-foreground sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Backend called
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" /> Context retrieved
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Response returned
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={resetDemo}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar demo
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-muted/20 p-5 md:p-6">
        <p className="text-sm font-semibold">How it works</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center text-xs font-mono text-muted-foreground sm:flex-row sm:gap-3">
          <span className="rounded-lg border bg-card px-3 py-2">Portfolio</span>
          <span>→</span>
          <span className="rounded-lg border bg-card px-3 py-2">Demo API</span>
          <span>→</span>
          <span className="rounded-lg border bg-card px-3 py-2">Conversation Memory</span>
          <span>→</span>
          <span className="rounded-lg border bg-card px-3 py-2">PostgreSQL + pgvector</span>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          La demo usa un proyecto y un agente aislados para no mezclar datos con otras
          conversaciones. No solicita credenciales ni datos reales del visitante.
        </p>
      </div>
    </section>
  );
}
