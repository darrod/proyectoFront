import { NavLink } from "react-router-dom";

const footerLinks = [
  { to: "/experiencias", label: "Experiencias culturales" },
  { to: "/servicios", label: "Servicios integrales" },
  { to: "/planificacion", label: "Planificación" },
  { to: "/contacto", label: "Contacto (pronto)" }
];

export function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[var(--color-surface-alt)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-[var(--color-primary)]">
            Origen Tours
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Portafolio especializado en experiencias culturales, turismo rural y misiones académicas.
          </p>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          {footerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <p className="text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Origen Tours. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

