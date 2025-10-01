import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/data";

export function HeroSection() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-portrait');

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
              Passionate Software Developer, aged 45.
            </p>
            <div className="max-w-xl mx-auto lg:mx-0 space-y-4">
              <p className="text-lg text-foreground">
                With over 15 years in the industry, I specialize in building modern, responsive, and user-friendly web applications. My goal is to transform complex problems into elegant software solutions that drive business value and enhance user experience.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start pt-4">
              <Button asChild size="lg">
                <Link href="#projects">
                  View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">
                  Contact Me <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {heroImage && (
              <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={400}
                  height={400}
                  className="rounded-full object-cover shadow-2xl border-4 border-card"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
                 <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
