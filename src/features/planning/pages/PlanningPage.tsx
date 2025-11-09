import { useState } from "react";
import { SectionTitle } from "@/features/home/sections/SectionTitle.tsx";
import { SessionPlanningForm } from "@/features/planning/components/SessionPlanningForm.tsx";
import { SessionSummary } from "@/features/planning/components/SessionSummary.tsx";
import { useSessionStore } from "@/app/store/session.store.ts";
import type { Session } from "@/services/sessionService.ts";

export function PlanningPage() {
  const { session, setSession, clearSession } = useSessionStore();
  const [lastCreatedSession, setLastCreatedSession] = useState<Session | undefined>(session);

  const handleSessionCreated = (newSession: Session) => {
    setSession(newSession);
    setLastCreatedSession(newSession);
  };

  const handleClearSession = () => {
    clearSession();
    setLastCreatedSession(undefined);
  };

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Planificación personalizada"
        title="Activa tu sesión de planificación con Origen Tours"
        subtitle="Recopilamos intereses, fechas y restricciones para iniciar la sesión de planificación con el backend y generar un código único. Así podemos hilar las siguientes etapas del viaje cultural, rural o académico."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SessionPlanningForm onSuccess={handleSessionCreated} />
        <SessionSummary session={lastCreatedSession} onClear={handleClearSession} />
      </div>
    </div>
  );
}

