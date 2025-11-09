import { SectionTitle } from "@/features/home/sections/SectionTitle.tsx";

const serviceLines = [
  {
    name: "Viajes académicos y misiones",
    summary:
      "Diseñamos misiones académicas y visitas técnicas con universidades, cámaras de comercio y entidades de cooperación. Incluye agendas personalizadas, curaduría de expertos y logística integral.",
    features: [
      "Diseño pedagógico por especialistas",
      "Gestión de reuniones institucionales",
      "Logística puerta a puerta con seguros"
    ],
    action: "Solicitar agenda académica"
  },
  {
    name: "Servicios complementarios",
    summary:
      "Soporte end-to-end para viajes: seguros especializados, visados, hospedajes responsables, transporte terrestre certificado, intérpretes y producción de memorias audiovisuales.",
    features: [
      "Red de proveedores auditados en Colombia",
      "Asistencia 24/7 y monitoreo de riesgos",
      "Integración con plataformas de gastos corporativos"
    ],
    action: "Armar kit de servicios"
  }
];

export function ServicesPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Soluciones Origen"
        title="Servicios académicos y soporte integral"
        subtitle="Complementamos cada experiencia de viaje con una arquitectura de servicios que garantiza aprendizaje, seguridad y cumplimiento de objetivos institucionales."
      />

      <div className="space-y-4 rounded-3xl border border-slate-200 bg-[var(--color-surface)] p-6 shadow-sm">
        {serviceLines.map((service) => (
          <article
            key={service.name}
            className="flex flex-col gap-4 border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 md:flex-row md:items-start md:justify-between"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">{service.name}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {service.summary}
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-2 text-left md:text-right">
              <button
                type="button"
                className="self-start rounded-full border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)]/80 hover:text-[var(--color-primary)]/80 md:self-end"
              >
                {service.action} →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

