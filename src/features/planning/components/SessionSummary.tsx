import { Session } from "@/services/sessionService.ts";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

type SessionSummaryProps = {
  session?: Session;
  onClear?: () => void;
};

export function SessionSummary({ session, onClear }: SessionSummaryProps) {
  if (!session) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-[var(--color-text-muted)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
          Aún sin sesión activa
        </p>
        <p className="text-sm">
          Completa el formulario para generar el código de sesión y continuar con la planificación
          junto al equipo de Origen Tours.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-3xl border border-[var(--color-primary)]/30 bg-white px-6 py-7 shadow-md shadow-[var(--color-primary)]/10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          Sesión activa
        </p>
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          Código {session.id.slice(0, 8)}…
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Estado:{" "}
          <span className="font-semibold capitalize text-[var(--color-primary)]">
            {session.estado}
          </span>
        </p>
      </div>

      <dl className="grid gap-4 text-sm">
        <div>
          <dt className="font-semibold text-[var(--color-text)]">Fechas</dt>
          <dd className="text-[var(--color-text-muted)]">
            {dateFormatter.format(new Date(session.fechaInicio))} —{" "}
            {dateFormatter.format(new Date(session.fechaFin))}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-[var(--color-text)]">Intereses</dt>
          <dd className="flex flex-wrap gap-2">
            {session.intereses.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
              >
                {interest}
              </span>
            ))}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-[var(--color-text)]">Tipo de experiencia</dt>
          <dd className="capitalize text-[var(--color-text-muted)]">{session.tipoExperiencia}</dd>
        </div>

        <div>
          <dt className="font-semibold text-[var(--color-text)]">Viajeros</dt>
          <dd className="text-[var(--color-text-muted)]">{session.numeroViajeros}</dd>
        </div>

        <div>
          <dt className="font-semibold text-[var(--color-text)]">Restricciones</dt>
          <dd className="flex flex-wrap gap-2">
            {session.restricciones.length ? (
              session.restricciones.map((restriction) => (
                <span
                  key={restriction}
                  className="rounded-full bg-[var(--color-secondary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-secondary)]"
                >
                  {restriction}
                </span>
              ))
            ) : (
              <span className="text-[var(--color-text-muted)]">Sin restricciones registradas</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <div>
          <p>
            Creada:{" "}
            <span className="font-medium text-[var(--color-text)]">
              {dateFormatter.format(new Date(session.createdAt))}
            </span>
          </p>
          <p>
            Actualizada:{" "}
            <span className="font-medium text-[var(--color-text)]">
              {dateFormatter.format(new Date(session.updatedAt))}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-rose-200 px-4 py-2 font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
        >
          Limpiar sesión guardada
        </button>
      </div>
    </div>
  );
}

