const highlights = [
  {
    title: "Diseño cultural participativo",
    description:
      "Programas co-creados con líderes culturales y académicos para garantizar contenidos rigurosos.",
    metric: "35",
    metricLabel: "laboratorios culturales activos"
  },
  {
    title: "Turismo regenerativo",
    description:
      "Cada itinerario incluye prácticas de bajo impacto y contribuciones verificadas a proyectos rurales.",
    metric: "12%",
    metricLabel: "de ingresos reinvertidos localmente"
  },
  {
    title: "Logística académica",
    description:
      "Coordinación integral de misiones y visitas técnicas con agenda curada y seguimiento 24/7.",
    metric: "48h",
    metricLabel: "para entregar agenda preliminar"
  }
];

export function Highlights() {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-[var(--color-text)]">
        ¿Por qué elegir Origen Tours?
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight.title}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-[var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <p className="text-3xl font-black text-[var(--color-primary)]">
                {highlight.metric}
              </p>
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                {highlight.metricLabel}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {highlight.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {highlight.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

