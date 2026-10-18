import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant, IconPosition } from '@components/button';
import { Container } from '@components/container';
import { IconName } from '@components/icon';
import { Logo, LogoAlign } from '@components/logo';
import styles from './legal-header.module.css';
import { HOME_PATH, LEGAL_HEADER_MESSAGES } from './legal-header.const';

export const LegalHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <header className={styles.legalHeader}>
      <Container className={styles.inner}>
        <Button href={HOME_PATH} variant={ButtonVariant.PLAIN} size={ButtonSize.S} icon={IconName.CHEVRON_LEFT} iconPosition={IconPosition.START}>
          {formatMessage({ id: LEGAL_HEADER_MESSAGES.back })}
        </Button>
        <Logo align={LogoAlign.END} label={formatMessage({ id: LEGAL_HEADER_MESSAGES.brand })} className={styles.logo} />
      </Container>
    </header>
  );
};
