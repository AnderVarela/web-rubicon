import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import es from '@i18n/messages/es.json';

export const messages = es as Record<string, string>;

export const t = (id: string, values?: Record<string, string | number>) => {
  const message = messages[id];
  if (message === undefined) throw new Error(`Falta el mensaje ${id}`);
  return values
    ? Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), message)
    : message;
};

export const renderWithProviders = (ui: ReactElement) =>
  render(
    <IntlProvider locale="es" messages={messages}>
      {ui}
    </IntlProvider>,
  );
