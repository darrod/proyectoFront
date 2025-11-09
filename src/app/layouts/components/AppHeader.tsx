import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle.tsx";
import logoUrl from "@/assets/logo.svg";

const navigationLinks = [
  { to: "/", label: "Inicio" },
  { to: "/experiencias", label: "Experiencias culturales" },
  { to: "/servicios", label: "Servicios integrales" },
  { to: "/planificacion", label: "Planificación" }
];

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Origen Tours" className="h-10 w-10" />
          <div>
            <p className="font-display text-xl font-semibold text-[var(--color-primary)]">
              Origen Tours
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Diseñamos itinerarios que transforman comunidades.
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+34911223344"
            className="hidden rounded-full border border-[var(--color-primary)] px-4 py-1 text-sm font-semibold text-[var(--color-primary)] hover:border-[var(--color-primary)]/80 hover:text-[var(--color-primary)]/80 md:inline-block"
          >
            (91) 122 33 44
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

