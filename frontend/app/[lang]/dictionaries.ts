import "server-only";

const dictionaries = {
  uk: () => import("./dictionaries/uk.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: "uk" | "en" | "es" | "fr" | "de") =>
  dictionaries[locale]();

// export const getDictionary = async (locale: string) => {
//     return dictionaries[locale as keyof typeof dictionaries]();
// };