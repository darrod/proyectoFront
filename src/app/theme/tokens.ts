type ThemeTokens = Record<string, string>;

type ThemeTokenMap = {
  light: ThemeTokens;
  dark: ThemeTokens;
};

export const themeTokens: ThemeTokenMap = {
  light: {
    "color-background": "#f8fafc",
    "color-surface": "#ffffff",
    "color-surface-alt": "#f1f5f9",
    "color-text": "#0f172a",
    "color-text-muted": "#475569",
    "color-primary": "#1b8aff",
    "color-primary-contrast": "#ffffff",
    "color-secondary": "#ff7a2b",
    "color-secondary-contrast": "#ffffff",
    "color-accent": "#8b5cf6"
  },
  dark: {
    "color-background": "#0f172a",
    "color-surface": "#1e293b",
    "color-surface-alt": "#334155",
    "color-text": "#f8fafc",
    "color-text-muted": "#cbd5f5",
    "color-primary": "#52a8ff",
    "color-primary-contrast": "#0f172a",
    "color-secondary": "#ff9654",
    "color-secondary-contrast": "#0f172a",
    "color-accent": "#c084fc"
  }
};

