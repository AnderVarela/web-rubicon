import { DEFAULT_LOCALE, LOCALE_QUERY_PARAM, Locale } from './i18n.const';

const isLocale = (value: string | null): value is Locale =>
  Object.values(Locale).includes(value as Locale);

// El contenido de web.json está en castellano; el inglés se activa con ?lang=en.
export const getLocaleFromSearch = (search: string): Locale => {
  const value = new URLSearchParams(search).get(LOCALE_QUERY_PARAM);
  return isLocale(value) ? value : DEFAULT_LOCALE;
};
