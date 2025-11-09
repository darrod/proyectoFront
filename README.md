# Origen Tours Frontend

Aplicación base en React + TypeScript para **Origen Tours**, una operadora colombiana especializada en experiencias culturales, turismo ecológico-rural, viajes académicos y servicios complementarios. El proyecto usa Vite como bundler, Tailwind CSS como capa de estilos utilitarios y una arquitectura modular pensada para crecer con nuevos casos de uso.

## Oferta de servicios

El frontend refleja el portafolio ficticio de Origen Tours:

- **Experiencias culturales:** inmersiones con comunidades, rutas gastronómicas y talleres patrimoniales.
- **Turismo ecológico y rural:** circuitos regenerativos con cooperativas campesinas y reservas naturales.
- **Viajes académicos y misiones:** agendas personalizadas para universidades, cámaras de comercio y entidades de cooperación.
- **Servicios complementarios:** seguros, visados, logística integral, intérpretes y producción de memorias.

## Stack

- React 18 con TypeScript
- React Router 6.27
- TanStack Query para manejo de datos remotos
- Tailwind CSS 3.4 para utilidades y tokens personalizados
- ESLint + Prettier configurados con el modo flat de ESLint

## Scripts principales

- `npm run dev`: levanta el servidor de desarrollo en `http://localhost:5173/`.
- `npm run build`: construye la aplicación optimizada para producción.
- `npm run preview`: sirve el build de producción de manera local.
- `npm run lint`: ejecuta las reglas de ESLint.
- `npm run format`: formatea el código con Prettier.

## Estructura de carpetas

- `src/app`: configuración de layout, rutas y proveedores globales.
- `src/components`: componentes reutilizables (accesibilidad, UI, etc.).
- `src/features`: módulos verticales con páginas y secciones específicas.
- `src/styles`: estilos globales y setup de Tailwind.
- `src/assets`: elementos gráficos (logotipo, ilustraciones, íconos).

## Puesta en marcha

```bash
cd projectFront
npm install
npm run dev
```

> _Nota_: en PowerShell es posible que necesites habilitar la ejecución de scripts para ejecutar `npm`. Puedes hacerlo temporalmente con `Set-ExecutionPolicy -Scope Process Bypass`.

## Configuración de entorno

- `VITE_API_BASE_URL` (opcional): URL base del backend. Por defecto apunta a `http://localhost:3000`.

Puedes crear un archivo `.env` en `projectFront` para sobrescribir valores:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Flujo implementado (Ticket T-001)

- Página `Planificación` (`/planificacion`) con formulario para activar la sesión de planificación.
- Campos capturados: intereses, rango de fechas, tipo de experiencia, número de viajeros, restricciones adicionales y `usuarioId` (opcional).
- Validaciones de frontend con Zod + React Hook Form.
- Integración con `POST /api/sesion/iniciar`; manejo de errores de validación devolviendo mensajes por campo.
- Persistencia del `session.id` usando Zustand + `localStorage` para reutilizarlo en futuros pasos.
- Resumen visual de la última sesión creada, con opción para limpiar el estado guardado.
- Navegación y contenidos alineados al portafolio de Origen Tours (experiencias culturales, turismo ecológico y misiones académicas).

## Refrescar la aplicación

Vite realiza recargas automáticas en cuanto se guardan cambios. Si necesitas forzar un refresco manual:

- Mantén `npm run dev` ejecutándose en la terminal.
- Abre o actualiza `http://localhost:5173/` en el navegador (`Ctrl+R` o `Ctrl+Shift+R` para forzar recarga).
- Si modificas variables de entorno, reinicia el servidor de desarrollo deteniéndolo con `Ctrl+C` y ejecuta de nuevo `npm run dev`.

## Próximos pasos sugeridos

- Conectar con la API del backend (`projectBack`) para obtener catálogos dinámicos.
- Añadir pruebas de componentes con Vitest + React Testing Library.
- Crear un sistema de diseño compartido con tokens tipográficos y de espaciado.
