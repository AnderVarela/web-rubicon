import { useEffect, type ReactNode } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { MESSAGES, getLocaleFromSearch } from '@i18n/index';
import { APP_MESSAGES } from './app.const';
import { applyDocumentMeta } from './app.helper';

interface AppProps {
  search?: string;
  children?: ReactNode;
}

const DocumentMeta = () => {
  const { formatMessage, locale } = useIntl();
  const title = formatMessage({ id: APP_MESSAGES.title });
  const description = formatMessage({ id: APP_MESSAGES.description });

  useEffect(() => {
    applyDocumentMeta(document, { lang: locale, title, description });
  }, [locale, title, description]);

  return null;
};

export const App = ({ search = window.location.search, children }: AppProps) => {
  const locale = getLocaleFromSearch(search);

  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <DocumentMeta />
      {children}
    </IntlProvider>
  );
};
