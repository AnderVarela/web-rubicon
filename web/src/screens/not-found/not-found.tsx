import { useIntl } from 'react-intl';
import { Button, ButtonJustify } from '@components/button';
import { renderEmphasis } from '@components/emphasis';
import { IconName } from '@components/icon';
import { Logo } from '@components/logo';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { useDocumentTitle } from '@hooks/use-document-title';
import styles from './not-found.module.css';
import { HOME_PATH, NOT_FOUND_MAIN_ID, NOT_FOUND_MESSAGES } from './not-found.const';

export const NotFound = () => {
  const { formatMessage } = useIntl();
  useDocumentTitle(formatMessage({ id: NOT_FOUND_MESSAGES.pageTitle }));

  return (
    <main id={NOT_FOUND_MAIN_ID} className={styles.notFound}>
      <a href={HOME_PATH} aria-label={formatMessage({ id: NOT_FOUND_MESSAGES.home })} className={styles.home}>
        <Logo className={styles.logo} />
      </a>
      <div className={styles.body}>
        <div className={styles.copy}>
          <Text variant={TypographyVariant.EYEBROW} tone={TypographyTone.SECONDARY}>
            {formatMessage({ id: NOT_FOUND_MESSAGES.eyebrow })}
          </Text>
          <Text kind={TypographyKinds.H1} variant={TypographyVariant.DISPLAY} className={styles.title}>
            {formatMessage({ id: NOT_FOUND_MESSAGES.title }, { em: renderEmphasis })}
          </Text>
          <Text variant={TypographyVariant.BODY_LEAD} className={styles.text}>
            {formatMessage({ id: NOT_FOUND_MESSAGES.text })}
          </Text>
          <Button href={HOME_PATH} justify={ButtonJustify.BETWEEN} icon={IconName.ARROW_RIGHT} className={styles.back}>
            {formatMessage({ id: NOT_FOUND_MESSAGES.back })}
          </Button>
        </div>
        <span role="img" aria-label={formatMessage({ id: NOT_FOUND_MESSAGES.illustration })} className={styles.illustration} />
      </div>
    </main>
  );
};
