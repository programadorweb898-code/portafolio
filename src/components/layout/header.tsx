
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CodeXml, Download, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLinks, navLinks } from "@/lib/data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type HeaderProps = {
  profileImageUrl?: string;
  onProfileImageChange: (url: string) => void;
};

export function Header({ profileImageUrl, onProfileImageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const newImageUrl = loadEvent.target?.result as string;
        onProfileImageChange(newImageUrl);
      };
      reader.readAsDataURL(file);
      closeMobileMenu();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <CodeXml className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">LuisDev</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
          <Button asChild>
            <a href="/luis_CV_FullStack.pdf" target="_blank">
              <Download className="mr-2 h-4 w-4" />
              CV
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full h-auto">
                    <div className="flex items-center gap-2 p-2">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={profileImageUrl} alt="Tu foto de perfil" />
                            <AvatarFallback>LG</AvatarFallback>
                        </Avatar>
                        <Menu className="h-6 w-6" />
                    </div>
                    <span className="sr-only">Abrir menú de navegación</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card">
                 <SheetHeader>
                   <SheetTitle className="sr-only">Menú de Navegación Móvil</SheetTitle>
                 </SheetHeader>
                <div className="flex h-full flex-col justify-between p-6 pt-0">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                    <CodeXml className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold font-headline">LuisDev</span>
                    </Link>
                    <nav className="grid gap-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                        onClick={closeMobileMenu}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                <div className="flex flex-col gap-4">
                    <input type="file" ref={fileInputRef} onChange={handleProfilePictureChange} accept="image/*" className="hidden" />
                    <div className="flex justify-center gap-4">
                    {socialLinks.map((social) => (
                        <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        onClick={closeMobileMenu}
                        >
                        <Button variant="outline" size="icon">
                            <social.icon className="h-6 w-6" />
                        </Button>
                        </Link>
                    ))}
                    </div>
                    <Button asChild size="lg">
                    <a href="/luis_CV_FullStack.pdf" target="_blank">
                        <Download className="mr-2 h-5 w-5" />
                        Descargar CV
                    </a>
                    </Button>
                </div>
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
