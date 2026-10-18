import { useIntl } from 'react-intl';
import { Container } from '@components/container';
import { Eyebrow } from '@components/eyebrow';
import { SkipLink } from '@components/skip-link';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { useDocumentTitle } from '@hooks/use-document-title';
import { CookieBanner } from '@screens/components/cookie-banner';
import { CookieSettings } from '@screens/components/cookie-settings';
import type { LegalDocumentId } from '@screens/components/legal-nav';
import { SiteFooter } from '@screens/components/site-footer';
import { LegalDocNav } from '@screens/legal/components/legal-doc-nav';
import { LegalHeader } from '@screens/legal/components/legal-header';
import { LegalSection } from '@screens/legal/components/legal-section';
import styles from './legal.module.css';
import { LEGAL_DOCUMENT_CONTENT, LEGAL_MAIN_ID, LEGAL_MESSAGES, LEGAL_UPDATED_AT } from './legal.const';
import { getContactValues } from './legal.helper';

export interface LegalProps {
  documentId: LegalDocumentId;
}

export const Legal = ({ documentId }: LegalProps) => {
  const intl = useIntl();
  const document = LEGAL_DOCUMENT_CONTENT[documentId];
  const title = intl.formatMessage({ id: document.titleId });
  const values = getContactValues(CONTENT.contacto);
  useDocumentTitle(intl.formatMessage({ id: LEGAL_MESSAGES.pageTitle }, { title }));

  return (
    <>
      <SkipLink targetId={LEGAL_MAIN_ID} label={intl.formatMessage({ id: LEGAL_MESSAGES.skipToContent })} />
      <LegalHeader />
      <Container className={styles.layout}>
        <LegalDocNav current={documentId} />
        <main id={LEGAL_MAIN_ID} tabIndex={-1} className={styles.article}>
          <Eyebrow>{intl.formatMessage({ id: LEGAL_MESSAGES.eyebrow })}</Eyebrow>
          <Text kind={TypographyKinds.H1} variant={TypographyVariant.TITLE_XL} className={styles.title}>
            {title}
          </Text>
          <Text variant={TypographyVariant.BODY_S} tone={TypographyTone.SECONDARY} className={styles.updated}>
            {intl.formatMessage(
              { id: LEGAL_MESSAGES.updated },
              { date: intl.formatDate(`${LEGAL_UPDATED_AT}T12:00:00Z`, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) },
            )}
          </Text>
          {document.sections.map((section) => (
            <LegalSection key={section.titleId} section={section} values={values} />
          ))}
        </main>
      </Container>
      <SiteFooter fromHome={false} />
      <CookieBanner />
      <CookieSettings />
    </>
  );
};
