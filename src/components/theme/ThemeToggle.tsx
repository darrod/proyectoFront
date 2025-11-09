import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import { SunIcon, MoonIcon } from "@/components/ui/icons.tsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

