'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact-schema';

const API_URL = '/api/contact';

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

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
      form.reset();
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
                <Form {...form}>
                  <form
                    className="grid gap-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu Nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu.correo@ejemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tu mensaje aquí..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
