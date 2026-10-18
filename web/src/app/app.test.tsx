import { render, waitFor } from '@testing-library/react';
import en from '@i18n/messages/en.json';
import es from '@i18n/messages/es.json';
import { App } from './app';
import { APP_MESSAGES } from './app.const';

describe('App', () => {
  it('abre la web en castellano con el título de la panadería', async () => {
    render(<App search="" />);

    await waitFor(() => expect(document.title).toBe(es[APP_MESSAGES.title]));
    expect(document.documentElement.lang).toBe('es');
  });

  it('vuelve al castellano si se pide un idioma que no existe y usa el inglés cuando se pide', async () => {
    const { unmount } = render(<App search="?lang=fr" />);
    await waitFor(() => expect(document.documentElement.lang).toBe('es'));
    unmount();

    render(<App search="?lang=en" />);
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    expect(document.title).toBe(en[APP_MESSAGES.title]);
  });
});
