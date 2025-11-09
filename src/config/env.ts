const FALLBACK_API_BASE_URL = "http://localhost:3000";

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.toString().trim() || FALLBACK_API_BASE_URL
} as const;

