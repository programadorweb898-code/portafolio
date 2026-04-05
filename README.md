# LuisDev Portfolio

Portafolio profesional desarrollado con Next.js, TypeScript y Tailwind CSS para presentar experiencia, habilidades, proyectos destacados y canales de contacto en una sola interfaz moderna.

## Descripción

Este proyecto funciona como sitio personal y vitrina profesional. Incluye:

- Sección principal de presentación.
- Showcase de habilidades técnicas.
- Cards de proyectos con demo en vivo y repositorio.
- Formulario de contacto.
- Descarga de CV en PDF.
- Asistente de IA integrado para responder preguntas sobre el perfil y guiar la navegación.

## Demo

- Sitio en producción: agrega aquí tu URL final si quieres publicarlo en el README.

## Tecnologías

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Firebase
- Genkit + Google AI
- Radix UI
- Shadcn/ui
- React Hook Form
- Zod
- Lucide React

## Características principales

- Arquitectura basada en `App Router`.
- Diseño responsive para desktop y mobile.
- Proyectos destacados con imagen, stack, demo y código fuente.
- Chat con IA para responder preguntas sobre el portafolio.
- Text-to-speech integrado para respuestas del asistente.
- Configuración de ESLint y Prettier lista para desarrollo.

## Estructura del proyecto

```text
src/
  app/                # Layout global y página principal
  components/         # UI, secciones, layout y chat
  ai/                 # Flujos de IA con Genkit
  hooks/              # Hooks reutilizables
  lib/                # Datos del portafolio y utilidades
public/               # Imágenes, CV y assets estáticos
```

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

La aplicación se inicia por defecto en:

```bash
http://localhost:9002
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run genkit:dev
npm run genkit:watch
```

## Calidad de código

El proyecto ya incluye:

- ESLint para análisis estático.
- Prettier para formato consistente.
- TypeScript para tipado.

Comandos recomendados antes de publicar cambios:

```bash
npm run lint
npm run format:check
npm run typecheck
```

## Personalización de contenido

La información principal del portafolio se administra desde:

- `src/lib/data.ts`: habilidades, proyectos, enlaces sociales e imágenes.
- `public/`: CV, foto de perfil e imágenes de proyectos.

## Variables y servicios

Este proyecto usa integraciones externas para algunas funciones, como IA y contacto. Si vas a desplegarlo o clonarlo, revisa especialmente:

- configuración de Genkit / Google AI
- credenciales de Firebase si aplican
- endpoint del formulario de contacto

## Despliegue

Puedes desplegar este proyecto fácilmente en:

- Vercel
- Firebase Hosting
- cualquier entorno compatible con Next.js

Para producción:

```bash
npm run build
npm run start
```

## Autor

Luis Alberto Gomez

- LinkedIn: https://www.linkedin.com/in/luis-programadorweb
- GitHub: https://github.com/programadorweb898-code

## Licencia

Este proyecto puede adaptarse a la licencia que prefieras. Si quieres, puedo agregar una licencia MIT y dejarla declarada también en este repositorio.
