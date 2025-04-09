export const SUPPORTED_LANGUAGES = ["uk", "en", "es", "fr", "de"] as const;

export const LANGUAGE_LABELS: Record<
  (typeof SUPPORTED_LANGUAGES)[number],
  string
> = {
  uk: "Українська",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};