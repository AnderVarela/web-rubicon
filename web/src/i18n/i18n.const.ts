import es from './messages/es.json';
import en from './messages/en.json';

export enum Locale {
  ES = 'es',
  EN = 'en',
}

export const DEFAULT_LOCALE = Locale.ES;

export const LOCALE_QUERY_PARAM = 'lang';

export const MESSAGES: Record<Locale, Record<string, string>> = {
  [Locale.ES]: es,
  [Locale.EN]: en,
};
