import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Session,
  SessionServiceError,
  startSession,
  type StartSessionPayload
} from "@/services/sessionService.ts";

const interestOptions = [
  { value: "cultura-viva", label: "Cultura viva" },
  { value: "turismo-rural", label: "Turismo rural" },
  { value: "mision-academica", label: "Misión académica" },
  { value: "gastronomia-local", label: "Gastronomía local" },
  { value: "impacto-social", label: "Impacto social" },
  { value: "innovacion", label: "Innovación y emprendimiento" }
];

const experienceOptions = [
  { value: "cultural-profunda", label: "Inmersión cultural profunda" },
  { value: "eco-regenerativa", label: "Turismo ecológico regenerativo" },
  { value: "misiones-academicas", label: "Misiones académicas y visitas técnicas" },
  { value: "cooperacion", label: "Programas de cooperación y voluntariado" },
  { value: "gastronomia-territorial", label: "Rutas gastronómicas territoriales" },
  { value: "innovacion-social", label: "Innovación social y emprendimiento" }
];

const restrictionSuggestions = [
  { value: "alimentacion-vegana", label: "Alimentación vegana" },
  { value: "alergia-gluten", label: "Alergia al gluten" },
  { value: "movilidad-reducida", label: "Movilidad reducida" },
  { value: "sin-alturas", label: "Evitar grandes alturas" },
  { value: "sin-multitudes", label: "Evitar lugares concurridos" }
];

const planningSchema = z
  .object({
    usuarioId: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    intereses: z.array(z.string()).min(1, "Selecciona al menos un interés"),
    fechaInicio: z.string({ required_error: "Selecciona la fecha de inicio" }),
    fechaFin: z.string({ required_error: "Selecciona la fecha de fin" }),
    tipoExperiencia: z.string().min(1, "Selecciona el tipo de experiencia"),
    numeroViajeros: z.coerce
      .number({
        invalid_type_error: "Introduce el número de viajeros",
        required_error: "Introduce el número de viajeros"
      })
      .int("Debe ser un número entero")
      .min(1, "Debe haber al menos 1 viajero")
      .max(99, "Máximo 99 viajeros"),
    restricciones: z.array(z.string()).optional(),
    restriccionesTexto: z
      .string()
      .optional()
      .transform((value) => value?.trim() || undefined)
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.fechaInicio);
    const endDate = new Date(data.fechaFin);

    if (Number.isNaN(startDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fechaInicio"],
        message: "Fecha de inicio inválida"
      });
    }

    if (Number.isNaN(endDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fechaFin"],
        message: "Fecha de fin inválida"
      });
    }

    if (!Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
      if (endDate < startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["fechaFin"],
          message: "La fecha de fin debe ser posterior o igual a la fecha de inicio"
        });
      }
    }
  });

type PlanningSchema = z.infer<typeof planningSchema>;

type SessionPlanningFormProps = {
  onSuccess: (session: Session) => void;
};

export function SessionPlanningForm({ onSuccess }: SessionPlanningFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();
  const [serverErrorDetails, setServerErrorDetails] = useState<Record<string, string[]> | undefined>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors }
  } = useForm<PlanningSchema>({
    resolver: zodResolver(planningSchema),
    defaultValues: {
      usuarioId: "",
      intereses: [],
      fechaInicio: "",
      fechaFin: "",
      tipoExperiencia: "",
      numeroViajeros: 2,
      restricciones: [],
      restriccionesTexto: ""
    }
  });

  const {
    mutateAsync,
    isPending,
    isSuccess,
    data,
    reset: resetMutation
  } = useMutation({
    mutationFn: async (payload: StartSessionPayload) => startSession(payload),
    onSuccess: (response) => {
      setServerError(undefined);
      setServerErrorDetails(undefined);
      onSuccess(response.data.session);
      const currentUsuarioId = getValues("usuarioId") ?? "";
      const currentNumeroViajeros = getValues("numeroViajeros") ?? 2;
      reset({
        usuarioId: currentUsuarioId,
        intereses: [],
        fechaInicio: "",
        fechaFin: "",
        tipoExperiencia: "",
        numeroViajeros: currentNumeroViajeros,
        restricciones: [],
        restriccionesTexto: ""
      });
    },
    onError: (error: unknown) => {
      if (error instanceof SessionServiceError) {
        setServerError(error.message);
        setServerErrorDetails(error.details);
        return;
      }
      setServerError("Ocurrió un error inesperado. Intenta nuevamente.");
      setServerErrorDetails(undefined);
    }
  });

  const selectedInterests = watch("intereses") ?? [];
  const selectedRestrictions = watch("restricciones") ?? [];

  const onSubmit = async (values: PlanningSchema) => {
    resetMutation();
    setServerError(undefined);
    setServerErrorDetails(undefined);

    const additionalRestrictions =
      values.restriccionesTexto?.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean) ?? [];

    const restricciones = Array.from(
      new Set([...(values.restricciones ?? []), ...additionalRestrictions])
    );

    const payload: StartSessionPayload = {
      usuarioId: values.usuarioId,
      intereses: values.intereses,
      fechaInicio: values.fechaInicio,
      fechaFin: values.fechaFin,
      tipoExperiencia: values.tipoExperiencia,
      numeroViajeros: values.numeroViajeros,
      restricciones
    };

    await mutateAsync(payload);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-[var(--color-surface)] p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          Datos para diseñar la experiencia Origen
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Con esta información iniciaremos la sesión de planificación y podremos sugerirte ideas
          personalizadas para experiencias culturales, turismo rural o misiones académicas.
        </p>
      </div>

      {isSuccess && data ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          ¡Perfecto! Hemos iniciado tu sesión de planificación en Origen Tours. Guarda el código{" "}
          <span className="font-semibold">{data.data.session.id}</span> para continuar más tarde.
        </div>
      ) : null}

      {serverError ? (
        <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <p className="font-semibold">{serverError}</p>
          {serverErrorDetails ? (
            <ul className="list-disc space-y-1 pl-5">
              {Object.entries(serverErrorDetails).map(([field, messages]) => (
                <li key={field}>
                  <span className="font-medium capitalize">{field}:</span>{" "}
                  {messages.join(" • ")}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="usuarioId" className="text-sm font-semibold text-[var(--color-text)]">
              ID de usuario (opcional)
            </label>
            <input
              id="usuarioId"
              type="text"
              placeholder="Si el viajero está autenticado"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
              {...register("usuarioId")}
            />
            <p className="text-xs text-[var(--color-text-muted)]">
              Si se deja vacío, la sesión se creará como invitado.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="numeroViajeros"
              className="text-sm font-semibold text-[var(--color-text)]"
            >
              Número de viajeros
            </label>
            <input
              id="numeroViajeros"
              type="number"
              min={1}
              max={99}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
              {...register("numeroViajeros", { valueAsNumber: true })}
            />
            {errors.numeroViajeros ? (
              <p className="text-xs text-rose-600">{errors.numeroViajeros.message}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">
            Intereses principales
          </span>
          <Controller
            control={control}
            name="intereses"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((option) => {
                  const isSelected = value?.includes(option.value) ?? false;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onChange(value.filter((item) => item !== option.value));
                        } else {
                          onChange([...(value ?? []), option.value]);
                        }
                      }}
                      className={[
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        isSelected
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                          : "border-slate-200 bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40"
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.intereses ? (
            <p className="text-xs text-rose-600">{errors.intereses.message}</p>
          ) : null}
          <p className="text-xs text-[var(--color-text-muted)]">
            Puedes combinar varias opciones para ajustar más la propuesta.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fechaInicio" className="text-sm font-semibold text-[var(--color-text)]">
              Fecha de inicio
            </label>
            <input
              id="fechaInicio"
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
              {...register("fechaInicio")}
            />
            {errors.fechaInicio ? (
              <p className="text-xs text-rose-600">{errors.fechaInicio.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="fechaFin" className="text-sm font-semibold text-[var(--color-text)]">
              Fecha de fin
            </label>
            <input
              id="fechaFin"
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
              {...register("fechaFin")}
            />
            {errors.fechaFin ? (
              <p className="text-xs text-rose-600">{errors.fechaFin.message}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tipoExperiencia" className="text-sm font-semibold text-[var(--color-text)]">
            Tipo de experiencia deseada
          </label>
          <select
            id="tipoExperiencia"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
            {...register("tipoExperiencia")}
          >
            <option value="">Selecciona una opción</option>
            {experienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.tipoExperiencia ? (
            <p className="text-xs text-rose-600">{errors.tipoExperiencia.message}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          <span className="text-sm font-semibold text-[var(--color-text)]">Restricciones</span>
          <Controller
            control={control}
            name="restricciones"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-wrap gap-2">
                {restrictionSuggestions.map((option) => {
                  const isSelected = value?.includes(option.value) ?? false;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onChange(value.filter((item) => item !== option.value));
                        } else {
                          onChange([...(value ?? []), option.value]);
                        }
                      }}
                      className={[
                        "rounded-full border px-4 py-2 text-xs font-medium transition",
                        isSelected
                          ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                          : "border-slate-200 bg-white text-[var(--color-text-muted)] hover:border-[var(--color-secondary)]/40"
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />

          <div className="space-y-2">
            <label
              htmlFor="restriccionesTexto"
              className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
            >
              Otras restricciones (separadas por coma o salto de línea)
            </label>
            <textarea
              id="restriccionesTexto"
              rows={2}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
              placeholder="Ej. alergia a frutos secos, evitar vuelos nocturnos"
              {...register("restriccionesTexto")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            <strong>Intereses seleccionados:</strong> {selectedInterests.length}
            {selectedRestrictions.length
              ? ` · Restricciones: ${selectedRestrictions.length}`
              : ""}
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-[var(--color-primary-contrast)] shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[var(--color-primary)]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Iniciando..." : "Iniciar sesión de planificación"}
          </button>
        </div>
      </form>
    </div>
  );
}

