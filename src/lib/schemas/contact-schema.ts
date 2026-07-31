import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Este campo es requerido')
    .min(2, 'El nombre debe contener un mínimo de 2 caracteres'),
  email: z
    .string()
    .min(1, 'Este campo es requerido')
    .email('Ingresá un correo electrónico válido'),
  message: z
    .string()
    .min(1, 'Este campo es requerido')
    .min(10, 'El mensaje debe contener un mínimo de 10 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
