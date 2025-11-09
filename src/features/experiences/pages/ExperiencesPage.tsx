import { SectionTitle } from "@/features/home/sections/SectionTitle.tsx";

const experiences = [
  {
    title: "Experiencias culturales",
    description:
      "Rutas curadas por historiadores y gestores culturales. Incluye encuentros con comunidades artesanales, talleres gastronómicos tradicionales y visitas guiadas por centros históricos con expertos locales.",
    highlights: ["Inmersión comunitaria", "Talleres de patrimonio vivo", "Curaduría académica"],
    cta: "Diseñar experiencia cultural"
  },
  {
    title: "Turismo ecológico y rural",
    description:
      "Programas diseñados junto a cooperativas rurales y reservas naturales. Combinamos hospedajes responsables, voluntariado ambiental y circuitos de naturaleza baja en impacto para regenerar territorios.",
    highlights: ["Rutas bio-diversas", "Alojamiento sostenible", "Saberes campesinos"],
    cta: "Planificar inmersión rural"
  }
];

export function ExperiencesPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Portafolio Origen"
        title="Experiencias que conectan con la identidad del territorio"
        subtitle="Diseñamos itinerarios inmersivos que vinculan culturas vivas con viajeros responsables. Cada programa nace de alianzas con líderes locales y garantiza un impacto positivo en las comunidades."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((experience) => (
          <article
            key={experience.title}
            className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-6 shadow-sm"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">
                {experience.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {experience.description}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-auto self-start text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80"
            >
              {experience.cta} →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

