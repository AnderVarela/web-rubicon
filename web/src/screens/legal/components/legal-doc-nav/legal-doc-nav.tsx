import { useIntl } from 'react-intl';
import { LEGAL_DOCUMENTS, LegalDocumentId } from '@screens/components/legal-nav';
import styles from './legal-doc-nav.module.css';
import { ARIA_CURRENT_PAGE, LEGAL_DOC_NAV_MESSAGES } from './legal-doc-nav.const';

export interface LegalDocNavProps {
  current: LegalDocumentId;
}

export const LegalDocNav = ({ current }: LegalDocNavProps) => {
  const { formatMessage } = useIntl();

  return (
    <nav aria-label={formatMessage({ id: LEGAL_DOC_NAV_MESSAGES.label })} className={styles.legalDocNav}>
      <ul className={styles.list}>
        {LEGAL_DOCUMENTS.map((document) => {
          const active = document.id === current;
          return (
            <li key={document.id}>
              <a
                href={document.path}
                aria-current={active ? ARIA_CURRENT_PAGE : undefined}
                className={[styles.link, active && styles.active].filter(Boolean).join(' ')}
              >
                {formatMessage({ id: document.messageId })}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
