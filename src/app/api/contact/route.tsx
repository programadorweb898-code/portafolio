import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';
import { contactFormSchema } from '@/lib/schemas/contact-schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar con Zod
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    if (!process.env.CONTACT_EMAIL_TO) {
      return NextResponse.json({ error: 'Configuración de servidor incompleta' }, { status: 500 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Configuración de servidor incompleta' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // TODO: verificar dominio propio en Resend (SPF/DKIM) antes de producción y volver a from: no-reply@luis.email.com
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      react: <ContactFormEmail name={name} email={email} message={message} />,
    });

    if (error) {
      console.error('Error Resend:', error);
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error API /api/contact:', error instanceof Error ? error.stack : error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
