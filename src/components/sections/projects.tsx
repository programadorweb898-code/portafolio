import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, placeholderImages } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";


export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Proyectos Destacados</h2>
          <p className="mt-4 text-muted-foreground">
            Una selección de mi trabajo. Cada proyecto muestra mi capacidad para resolver problemas y entregar código de alta calidad.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => {
            const projectImage = placeholderImages.find(p => p.id === project.imageId);

            
            return (
              <Card key={project.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {projectImage && (
                  <Image
                    src={projectImage.imageUrl}
                    alt={projectImage.description}
                    width={500}
                    height={300}
                    className="w-full h-auto object-contain rounded-t-lg"
                    data-ai-hint={projectImage.imageHint}
                  />
                )}
                <CardHeader>
                  <h3 className="font-headline text-2xl font-bold">{project.title}</h3>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 bg-secondary/50 p-4">
                  {project.liveUrl && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo en Vivo
                      </Link>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button asChild size="sm">
                       <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Código
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
