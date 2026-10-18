import en from './messages/en.json';
import es from './messages/es.json';
import { Locale } from './i18n.const';
import { getLocaleFromSearch } from './i18n.helper';

describe('i18n', () => {
  it('tiene en inglés todas las claves que existen en castellano y ninguna más', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
    expect(Object.values(en).every((text) => text.trim().length > 0)).toBe(true);
  });

  it('usa el castellano salvo que se pida inglés en la dirección', () => {
    expect(getLocaleFromSearch('')).toBe(Locale.ES);
    expect(getLocaleFromSearch('?lang=de')).toBe(Locale.ES);
    expect(getLocaleFromSearch('?lang=en')).toBe(Locale.EN);
  });
});
