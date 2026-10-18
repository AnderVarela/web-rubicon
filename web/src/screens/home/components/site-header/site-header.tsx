import { useIntl } from 'react-intl';
import { Button, ButtonSize, ButtonVariant, IconPosition } from '@components/button';
import { IconName, IconSize } from '@components/icon';
import { Logo } from '@components/logo';
import { CONTENT } from '@/content';
import { SectionId, SectionNav, SectionNavVariant } from '@screens/components/section-nav';
import { StoreStatus, StoreStatusVariant } from '@screens/components/store-status';
import styles from './site-header.module.css';
import { SITE_HEADER_MESSAGES } from './site-header.const';

export interface SiteHeaderProps {
  activeId: SectionId;
  scrolled: boolean;
}

// Cabecera de escritorio (en móvil la navegación va en la barra inferior).
export const SiteHeader = ({ activeId, scrolled }: SiteHeaderProps) => {
  const { formatMessage } = useIntl();
  const { telefono } = CONTENT.contacto;

  return (
    <header className={[styles.siteHeader, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <a href={`#${SectionId.HOME}`} aria-label={formatMessage({ id: SITE_HEADER_MESSAGES.home })} className={styles.home}>
          <Logo className={styles.logo} />
        </a>
        <SectionNav variant={SectionNavVariant.HEADER} activeId={activeId} />
        <div className={styles.extra}>
          <StoreStatus variant={StoreStatusVariant.SHORT} />
          <Button
            href={telefono.enlace}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.S}
            icon={IconName.PHONE}
            iconSize={IconSize.XS}
            iconPosition={IconPosition.START}
            aria-label={formatMessage({ id: SITE_HEADER_MESSAGES.call }, { phone: telefono.texto })}
          >
            {telefono.texto}
          </Button>
        </div>
      </div>
    </header>
  );
};
