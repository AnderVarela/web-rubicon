import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, createIntl } from 'react-intl';
import es from '@i18n/messages/es.json';

export const messages = es as Record<string, string>;

const intl = createIntl({ locale: 'es', messages });

// Texto esperado sacado de los mensajes i18n (con plurales, select e interpolación).
export const t = (id: string, values?: Record<string, string | number>) => {
  if (messages[id] === undefined) throw new Error(`Falta el mensaje ${id}`);
  return intl.formatMessage({ id }, values) as string;
};

export const renderWithProviders = (ui: ReactElement) =>
  render(
    <IntlProvider locale="es" messages={messages}>
      {ui}
    </IntlProvider>,
  );
