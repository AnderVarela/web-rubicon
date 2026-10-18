import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { useConsent } from '@hooks/use-consent';
import styles from './legal-nav.module.css';
import { LEGAL_DOCUMENTS, LEGAL_NAV_MESSAGES } from './legal-nav.const';

// Enlaces legales del pie y acceso a la configuración de cookies.
export const LegalNav = () => {
  const { formatMessage } = useIntl();
  const { openSettings } = useConsent();

  return (
    <nav aria-label={formatMessage({ id: LEGAL_NAV_MESSAGES.label })}>
      <ul className={styles.list}>
        {LEGAL_DOCUMENTS.map((document) => (
          <li key={document.id}>
            <Button href={document.path} variant={ButtonVariant.LINK_INVERSE} size={ButtonSize.S}>
              {formatMessage({ id: document.messageId })}
            </Button>
          </li>
        ))}
        <li>
          <Button variant={ButtonVariant.LINK_INVERSE} size={ButtonSize.S} aria-haspopup="dialog" onClick={openSettings}>
            {formatMessage({ id: LEGAL_NAV_MESSAGES.configure })}
          </Button>
        </li>
      </ul>
    </nav>
  );
};
