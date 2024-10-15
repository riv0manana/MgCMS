export type Locale = (typeof locales)[number];

export const locales = ['fr'] as const;
export const defaultLocale: Locale = 'fr';