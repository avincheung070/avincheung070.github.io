import content from "@/data/content.json";

export type Lang = "en" | "zh";

export const translations = content as {
  en: typeof content.en;
  zh: typeof content.zh;
};

export type Translations = typeof content.en;
