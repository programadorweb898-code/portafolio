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
        title: 'Input Required',
        description: 'Please describe at least one project.',
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
        title: 'Suggestions Ready!',
        description: 'Here are some skills you might want to add to your list.',
      });
    } catch (error) {
      console.error('Error suggesting skills:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to get skill suggestions. Please try again later.',
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
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">My Skills</h2>
          <p className="mt-4 text-muted-foreground">
            A showcase of the technologies and tools I work with to bring ideas to life.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-card hover:shadow-lg hover:-translate-y-1">
              <skill.icon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{skill.name}</h3>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="mx-auto max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="text-xl font-headline font-bold">AI Skill Suggester</h3>
                    <CardDescription>
                      Describe your projects to get AI-powered skill suggestions.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={projectsInput}
                  onChange={(e) => setProjectsInput(e.target.value)}
                  placeholder="Describe your projects here, one per line. For example:&#10;- Built a full-stack e-commerce site with Next.js and Stripe.&#10;- Developed a real-time chat application using Firebase."
                  className="min-h-[120px] bg-background"
                />
                <Button onClick={handleSuggestSkills} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Suggest Skills'
                  )}
                </Button>
              </CardContent>
              {(isLoading || suggestedSkills.length > 0) && (
                <CardFooter>
                  <div className="w-full space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">Suggested Skills:</h4>
                    {isLoading && <p className="text-sm text-muted-foreground">AI is thinking...</p>}
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
