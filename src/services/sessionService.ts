import { env } from "@/config/env.ts";

export type StartSessionPayload = {
  usuarioId?: string;
  intereses: string[];
  fechaInicio: string;
  fechaFin: string;
  tipoExperiencia: string;
  numeroViajeros: number;
  restricciones: string[];
};

export type Session = {
  id: string;
  usuarioId?: string | null;
  esInvitado: boolean;
  intereses: string[];
  fechaInicio: string;
  fechaFin: string;
  tipoExperiencia: string;
  numeroViajeros: number;
  restricciones: string[];
  estado: string;
  createdAt: string;
  updatedAt: string;
};

export type StartSessionSuccessResponse = {
  status: "success";
  data: {
    session: Session;
  };
};

export type StartSessionErrorResponse = {
  status: "error";
  message: string;
  details?: Record<string, string[]>;
};

export class SessionServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "SessionServiceError";
  }
}

export async function startSession(payload: StartSessionPayload) {
  const response = await fetch(`${env.apiBaseUrl}/api/sesion/iniciar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let errorMessage = "No se pudo iniciar la sesión de planificación";
    let details: Record<string, string[]> | undefined;

    if (isJson) {
      const errorBody = (await response.json()) as StartSessionErrorResponse;
      errorMessage = errorBody.message ?? errorMessage;
      details = errorBody.details;
    }

    throw new SessionServiceError(errorMessage, response.status, details);
  }

  if (!isJson) {
    throw new SessionServiceError("Respuesta inesperada del servidor", response.status);
  }

  return (await response.json()) as StartSessionSuccessResponse;
}

