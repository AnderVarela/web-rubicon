import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Icon, IconName, IconSize } from '@components/icon';
import { Text, TypographyVariant } from '@components/text';
import { useConsent } from '@hooks/use-consent';
import { LegalDocumentId, getLegalPath } from '@screens/components/legal-nav';
import styles from './cookie-banner.module.css';
import { COOKIE_BANNER_MESSAGES } from './cookie-banner.const';

// Aviso de la primera visita. Rechazar es tan fácil como aceptar.
export const CookieBanner = () => {
  const { formatMessage } = useIntl();
  const { decided, settingsOpen, acceptAll, rejectAll, openSettings } = useConsent();

  if (decided || settingsOpen) return null;

  return (
    <section aria-label={formatMessage({ id: COOKIE_BANNER_MESSAGES.region })} className={styles.cookieBanner}>
      <Text variant={TypographyVariant.TITLE_XS} className={styles.title}>
        <Icon name={IconName.COOKIE} size={IconSize.L} />
        {formatMessage({ id: COOKIE_BANNER_MESSAGES.title })}
      </Text>
      <Text variant={TypographyVariant.BODY_S} className={styles.text}>
        {formatMessage({ id: COOKIE_BANNER_MESSAGES.text })}{' '}
        <Button href={getLegalPath(LegalDocumentId.COOKIES)} variant={ButtonVariant.LINK} className={styles.policy}>
          {formatMessage({ id: COOKIE_BANNER_MESSAGES.policy })}
        </Button>
      </Text>
      <div className={styles.actions}>
        <Button size={ButtonSize.M} onClick={acceptAll} className={styles.action}>
          {formatMessage({ id: COOKIE_BANNER_MESSAGES.accept })}
        </Button>
        <Button size={ButtonSize.M} onClick={rejectAll} className={styles.action}>
          {formatMessage({ id: COOKIE_BANNER_MESSAGES.reject })}
        </Button>
        <Button size={ButtonSize.M} aria-haspopup="dialog" onClick={openSettings} className={styles.action}>
          {formatMessage({ id: COOKIE_BANNER_MESSAGES.settings })}
        </Button>
      </div>
    </section>
  );
};
