import { useIntl } from 'react-intl';
import { Text, TypographyKinds, TypographyVariant } from '@components/text';
import type { ContactField, LegalSectionData } from '@screens/legal/legal.const';
import { LegalTable } from '@screens/legal/components/legal-table';
import styles from './legal-section.module.css';

export interface LegalSectionProps {
  section: LegalSectionData;
  values: Record<ContactField, string>;
}

export const LegalSection = ({ section, values }: LegalSectionProps) => {
  const { formatMessage } = useIntl();

  return (
    <section aria-labelledby={section.titleId} className={styles.legalSection}>
      <Text kind={TypographyKinds.H2} variant={TypographyVariant.TITLE_S} id={section.titleId} className={styles.title}>
        {formatMessage({ id: section.titleId })}
      </Text>
      {section.paragraphIds.map((id) => (
        <Text key={id} variant={TypographyVariant.BODY_LEAD} className={styles.paragraph}>
          {formatMessage({ id }, values)}
        </Text>
      ))}
      {section.table && <LegalTable table={section.table} values={values} />}
    </section>
  );
};
