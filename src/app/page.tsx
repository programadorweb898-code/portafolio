
'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { placeholderImages } from "@/lib/data";

export default function Home() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    placeholderImages.find(p => p.id === 'hero-portrait')?.imageUrl
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header profileImageUrl={profileImageUrl} onProfileImageChange={setProfileImageUrl} />
      <main className="flex-1">
        <HeroSection profileImageUrl={profileImageUrl} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
