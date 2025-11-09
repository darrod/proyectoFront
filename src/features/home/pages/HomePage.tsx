import { useNavigate } from "react-router-dom";
import heroIllustrationUrl from "@/assets/hero-illustration.svg";
import { SectionTitle } from "@/features/home/sections/SectionTitle.tsx";
import { Highlights } from "@/features/home/sections/Highlights.tsx";
import { TravelInsights } from "@/features/home/sections/TravelInsights.tsx";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Origen Tours"
            title="Conectamos culturas, territorio y conocimiento"
            subtitle="Co-creamos experiencias culturales, turismo rural y misiones académicas que fortalecen redes locales y generan impacto sostenible para las comunidades colombianas."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-secondary)]">
                +40 aliados locales
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Comunidades y colectivos culturales certificados
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-secondary)]">
                Impacto medido
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Trazabilidad socioambiental en cada itinerario
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/planificacion")}
            className="w-full rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-contrast)] shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[var(--color-primary)]/90 sm:w-auto"
          >
            Iniciar planificación
          </button>
        </div>
        <div className="relative h-72 overflow-hidden rounded-3xl shadow-lg md:h-full">
          <img
            src={heroIllustrationUrl}
            alt="Ilustración de experiencias culturales y naturaleza luminosa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
        </div>
      </section>

      <Highlights />

      <TravelInsights />
    </div>
  );
}

