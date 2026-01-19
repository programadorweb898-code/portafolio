"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("https://render-repo-36pu.onrender.com/webhook/68877325-a096-45a6-b44e-b25c78b55ff4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al enviar el mensaje");

      toast({
        title: "Correo enviado",
        description: "Tu mensaje ha sido enviado con éxito.",
        variant: "success",
      });
    } catch (error) {
      console.log("error en el servidor", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el correo. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Ponte en Contacto</h2>
          <p className="mt-4 text-muted-foreground">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Completa el formulario a continuación y te responderé lo antes posible.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" /> Contáctame
              </CardTitle>
              <CardDescription>
                Por favor, completa tus datos a continuación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu Nombre" {...register("name", { required: true })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu.correo@ejemplo.com" {...register("email", { required: true })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" placeholder="Tu mensaje aquí..." className="min-h-[150px]" {...register("message", { required: true })} />
                </div>
                <Button type="submit" className="w-full" size="lg">Enviar Mensaje</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
