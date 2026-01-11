"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Loader2 } from 'lucide-react';
import { suggestSkillsFromProjects } from '@/ai/flows/suggest-skills-from-projects';
import { useToast } from '@/hooks/use-toast';

export function SkillsSection() {
  const [projectsInput, setProjectsInput] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestSkills = async () => {
    if (!projectsInput.trim()) {
      toast({
        title: 'Entrada Requerida',
        description: 'Por favor, describe al menos un proyecto.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSuggestedSkills([]);
    try {
      const projectDescriptions = projectsInput.split('\n').filter(line => line.trim() !== '');
      const result = await suggestSkillsFromProjects({ projectDescriptions });
      setSuggestedSkills(result.suggestedSkills);
      toast({
        title: '¡Sugerencias Listas!',
        description: 'Aquí hay algunas habilidades que podrías agregar a tu lista.',
      });
    } catch (error) {
      console.error('Error suggesting skills:', error);
      toast({
        title: 'Ocurrió un Error',
        description: 'No se pudieron obtener sugerencias de habilidades. Por favor, intenta más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Mis Habilidades</h2>
          <p className="mt-4 text-muted-foreground">
            Una muestra de las tecnologías y herramientas con las que trabajo para dar vida a las ideas.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <Card key={skill.name} className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-card hover:shadow-lg hover:-translate-y-1">
                <IconComponent 
                  className="h-12 w-12" 
                  style={{ color: skill.color }}
                />
                <h3 className="mt-4 text-lg font-semibold">{skill.name}</h3>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-20">
          <div className="mx-auto max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="text-xl font-headline font-bold">Sugeridor de Habilidades con IA</h3>
                    <CardDescription>
                      Describe tus proyectos para obtener sugerencias de habilidades impulsadas por IA.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={projectsInput}
                  onChange={(e) => setProjectsInput(e.target.value)}
                  placeholder="Describe tus proyectos aquí, uno por línea. Por ejemplo:&#10;- Construí un sitio de comercio electrónico full-stack con Next.js y Stripe.&#10;- Desarrollé una aplicación de chat en tiempo real usando Firebase."
                  className="min-h-[120px] bg-background"
                />
                <Button onClick={handleSuggestSkills} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    'Sugerir Habilidades'
                  )}
                </Button>
              </CardContent>
              {(isLoading || suggestedSkills.length > 0) && (
                <CardFooter>
                  <div className="w-full space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">Habilidades Sugeridas:</h4>
                    {isLoading && <p className="text-sm text-muted-foreground">La IA está pensando...</p>}
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill, index) => (
                        <Badge key={index} variant="default" className="bg-accent text-accent-foreground animate-in fade-in-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
