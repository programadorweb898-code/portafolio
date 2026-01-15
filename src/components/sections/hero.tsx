
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/data";
import { cn } from '@/lib/utils';

type HeroSectionProps = {
  profileImageUrl?: string;
};

export function HeroSection({ profileImageUrl }: HeroSectionProps) {
  const heroImage = placeholderImages.find(p => p.id === 'hero-portrait');
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (animationStep < 2) {
      timeouts.push(setTimeout(() => {
        setAnimationStep(animationStep + 1);
      }, 3000));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [animationStep]);

  const animationPhases = [
    {
      key: 'text1',
      content: (
        <h2 className="text-3xl lg:text-4xl text-foreground font-semibold text-center">
          Imagina en grande
        </h2>
      ),
    },
    {
      key: 'text2',
      content: (
        <h2 className="text-3xl lg:text-4xl text-foreground font-semibold text-center">
          Si lo puedes imaginar, lo puedes programar
        </h2>
      ),
    },
    {
      key: 'image',
      content: heroImage && profileImageUrl ? (
        <>
          <Image
            id="hero-profile-image"
            src={profileImageUrl}
            alt={heroImage.description}
            fill
            className="rounded-full object-cover shadow-2xl border-4 border-card"
            data-ai-hint={heroImage.imageHint}
            priority
            sizes="(max-width: 1023px) 300px, 400px"
          />
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
        </>
      ) : null,
    },
  ];

  return (
    <section id="about" className="relative w-full pt-20 lg:pt-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary -z-10"></div>
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Luis Alberto Gómez
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Desarrollador de Software Apasionado, 45 años.
            </p>
            <div className="max-w-xl mx-auto lg:mx-0 space-y-4">
              <p className="text-lg text-foreground">
                Especializado en la construcción de aplicaciones web modernas, responsivas y fáciles de usar. Mi objetivo es transformar problemas complejos en soluciones de software elegantes que generen valor empresarial y mejoren la experiencia del usuario.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start pt-4">
              <Button asChild size="lg">
                <Link href="#projects">
                  Ver Mi Trabajo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">
                  Contáctame <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
              {animationPhases.map((phase, index) => (
                <div
                  key={phase.key}
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
                    animationStep === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                >
                  {phase.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
