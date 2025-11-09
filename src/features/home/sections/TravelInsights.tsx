const insights = [
  {
    title: "Rutas culturales por el Caribe colombiano",
    description:
      "Itinerarios de música tradicional, gastronomía costeña y talleres de saberes afrodescendientes en alianza con escuelas locales.",
    tag: "Experiencias culturales",
    cta: "Explorar propuesta"
  },
  {
    title: "Circuito rural en el Eje Cafetero",
    description:
      "Hospedajes rurales certificados, voluntariado ambiental y laboratorios de innovación agrícola junto a cooperativas campesinas.",
    tag: "Turismo ecológico y rural",
    cta: "Conocer itinerario"
  },
  {
    title: "Misiones académicas en Bogotá y Medellín",
    description:
      "Encuentros con universidades, visitas a hubs de innovación y sesiones de intercambio con entidades públicas y privadas.",
    tag: "Viajes académicos",
    cta: "Solicitar agenda"
  }
];

export function TravelInsights() {
  return (
    <section className="space-y-8 rounded-3xl bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Inspiración semanal
          </p>
          <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
            Ideas recientes desde nuestra red de aliados
          </h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-[var(--color-text)] px-5 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
        >
          Conectar con experto Origen
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((insight) => (
          <article
            key={insight.title}
            className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-[var(--color-surface)] p-6 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
              {insight.tag}
            </span>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">
                {insight.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {insight.description}
              </p>
            </div>
            <button
              type="button"
              className="self-start text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80"
            >
              {insight.cta} →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

