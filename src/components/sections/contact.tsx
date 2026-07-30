'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const API_URL = '/api/contact';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Error al enviar el mensaje');

      setIsSuccess(true);
      reset();
      toast({
        title: 'Correo enviado',
        description: 'Tu mensaje ha sido enviado con éxito.',
        variant: 'success',
      });
    } catch (error) {
      console.log('error en el servidor', error);
      toast({
        title: 'Error',
        description:
          'No se pudo enviar el correo. Inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Ponte en Contacto
          </h2>
          <p className="mt-4 text-muted-foreground">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Completa
            el formulario a continuación y te responderé lo antes posible.
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
              {isSuccess ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <p className="text-lg font-semibold">
                    Mensaje enviado con éxito
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Gracias por contactarme, te responderé pronto.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form
                  className="grid gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      placeholder="Tu Nombre"
                      {...register('name', { required: true })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu.correo@ejemplo.com"
                      {...register('email', { required: true })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Tu mensaje aquí..."
                      className="min-h-[150px]"
                      {...register('message', { required: true })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
