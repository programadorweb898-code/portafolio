'use client';

import { Card, CardContent } from '@/components/ui/card';
import { skills } from '@/lib/data';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Mis Habilidades
          </h2>
          <p className="mt-4 text-muted-foreground">
            Una muestra de las tecnologías y herramientas con las que trabajo
            para dar vida a las ideas.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <Card
                key={skill.name}
                className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-card hover:shadow-lg hover:-translate-y-1"
              >
                <IconComponent
                  className="h-12 w-12"
                  style={{ color: skill.color }}
                />
                <h3 className="mt-4 text-lg font-semibold">{skill.name}</h3>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
