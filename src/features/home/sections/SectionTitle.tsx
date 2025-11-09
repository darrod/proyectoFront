type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
        {eyebrow}
      </span>
      <h1 className="font-display text-4xl font-semibold text-[var(--color-text)] md:text-5xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="max-w-xl text-base text-[var(--color-text-muted)]">{subtitle}</p>
      ) : null}
    </div>
  );
}

