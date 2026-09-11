import Link from 'next/link';
import { ArrowLeft, Github, Database, Brain, Search, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const technologies = [
  'Node.js',
  'TypeScript',
  'MCP',
  'Express',
  'PostgreSQL',
  'Neon',
  'pgvector',
  'Zod',
];

export default function ConversationMemoryMcpPage() {
  return (
    <main className="min-h-screen">
      <section className="container px-4 py-16 md:py-24">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a proyectos
        </Link>

        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <Badge variant="secondary">Proyecto destacado · AI / MCP</Badge>
            <h1 className="mt-5 font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              Conversation Memory MCP
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Memoria conversacional persistente para agentes de IA mediante el
              Model Context Protocol, con recuperación de contexto entre sesiones.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link
                  href="https://github.com/programadorweb898-code/conversation-memory-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Ver en GitHub
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6">
              <Search className="h-7 w-7" />
              <h2 className="mt-4 font-headline text-xl font-semibold">
                Recuperación
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Búsqueda histórica, búsqueda semántica y recuperación de sesiones
                para reconstruir contexto relevante.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <Database className="h-7 w-7" />
              <h2 className="mt-4 font-headline text-xl font-semibold">
                Memoria persistente
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                PostgreSQL sobre Neon y pgvector permiten conservar conversaciones
                y realizar búsquedas por similitud semántica.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <Layers className="h-7 w-7" />
              <h2 className="mt-4 font-headline text-xl font-semibold">
                Agent-agnostic
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                El servidor expone herramientas MCP para que distintos agentes y
                clientes compatibles puedan utilizar la misma memoria.
              </p>
            </div>
          </div>

          <section className="mt-20">
            <h2 className="font-headline text-3xl font-bold">El problema</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Una conversación con un agente no debería perder todo su contexto
              cuando termina una sesión. El proyecto separa la memoria de la
              conversación de la memoria técnica durable para que cada tipo de
              información pueda recuperarse de la forma adecuada.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="font-headline text-3xl font-bold">Arquitectura</h2>
            <div className="mt-6 rounded-2xl border bg-muted/30 p-6 font-mono text-sm leading-8 md:p-8">
              <div>AI Agent</div>
              <div>↓</div>
              <div>MCP Server</div>
              <div>↓</div>
              <div className="grid gap-1 md:grid-cols-2">
                <div>→ Conversation Search</div>
                <div>→ Semantic Search</div>
                <div>→ Session Recovery</div>
                <div>→ Memory Extraction</div>
              </div>
              <div>↓</div>
              <div>PostgreSQL + pgvector</div>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="font-headline text-3xl font-bold">
              Conversation Memory + Engram
            </h2>
            <div className="mt-6 rounded-2xl border p-6 md:p-8">
              <Brain className="h-8 w-8" />
              <p className="mt-5 text-lg font-medium">
                Conversation Memory recuerda lo que ocurrió. Engram recuerda lo
                que vale la pena conservar.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                El flujo puede extraer candidatos de memoria, auditarlos y
                promover los conocimientos durables a Engram. Así se evita tratar
                todo el historial como memoria permanente y se mantiene una
                separación clara entre contexto conversacional y conocimiento
                técnico.
              </p>
            </div>
          </section>

          <section className="mt-16 border-t pt-12">
            <h2 className="font-headline text-2xl font-bold">Qué demuestra</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>• Diseño de APIs y herramientas MCP.</li>
              <li>• Persistencia y recuperación de contexto con PostgreSQL.</li>
              <li>• Búsqueda semántica con pgvector.</li>
              <li>• Arquitectura orientada a agentes y separación de responsabilidades.</li>
              <li>• Integración opcional con memoria técnica durable mediante un adaptador.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
