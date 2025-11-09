import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-background)] text-center text-[var(--color-text)]">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Error 404
        </p>
        <h1 className="font-display text-4xl font-semibold">Página no encontrada</h1>
        <p className="max-w-md text-sm text-[var(--color-text-muted)]">
          Lo sentimos, no encontramos la página que buscas. El equipo de Origen Tours puede
          acompañarte para retomar la planificación de tus experiencias culturales o académicas.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-contrast)] shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[var(--color-primary)]/90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

