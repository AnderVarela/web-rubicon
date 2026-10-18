import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { ActionTile } from '@components/action-tile';
import { Button, ButtonSize, ButtonVariant } from '@components/button';
import { Dialog, DialogPlacement, DialogTone } from '@components/dialog';
import { IconName } from '@components/icon';
import { Logo, LogoTone } from '@components/logo';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { CONTENT } from '@/content';
import { SectionId, SectionNav, SectionNavVariant } from '@screens/components/section-nav';
import { SocialLinks, SocialLinksVariant } from '@screens/components/social-links';
import { StoreStatus, StoreStatusTone } from '@screens/components/store-status';
import styles from './mobile-menu.module.css';
import { MOBILE_MENU_MESSAGES } from './mobile-menu.const';

export interface MobileMenuProps {
  open: boolean;
  activeId: SectionId;
  onClose: () => void;
}

export const MobileMenu = ({ open, activeId, onClose }: MobileMenuProps) => {
  const { formatMessage } = useIntl();
  const closeRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const { contacto } = CONTENT;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={formatMessage({ id: MOBILE_MENU_MESSAGES.label })}
      placement={DialogPlacement.FULL}
      tone={DialogTone.INVERSE}
      backdrop={false}
      initialFocusRef={closeRef}
    >
      <div className={styles.top}>
        <Logo tone={LogoTone.INVERSE} label={formatMessage({ id: MOBILE_MENU_MESSAGES.brand })} className={styles.logo} />
        <StoreStatus tone={StoreStatusTone.INVERSE} />
      </div>
      <SectionNav variant={SectionNavVariant.MENU} activeId={activeId} onNavigate={onClose} />
      <div className={styles.extra}>
        <div className={styles.tiles}>
          <ActionTile href={contacto.telefono.enlace} icon={IconName.PHONE} label={formatMessage({ id: MOBILE_MENU_MESSAGES.call })} />
          <ActionTile href={contacto.whatsapp.enlace} icon={IconName.WHATSAPP} label={formatMessage({ id: MOBILE_MENU_MESSAGES.whatsapp })} external />
          <ActionTile
            href={contacto.urlComoLlegar}
            icon={IconName.NAVIGATION}
            label={formatMessage({ id: MOBILE_MENU_MESSAGES.directions })}
            external
          />
        </div>
        <div className={styles.address}>
          <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.CAPTION} tone={TypographyTone.INVERSE_MUTED}>
            {formatMessage({ id: MOBILE_MENU_MESSAGES.address }, { address: contacto.direccion, town: contacto.localidad })}
          </Text>
          <SocialLinks variant={SocialLinksVariant.GHOST_INVERSE} />
        </div>
      </div>
      <div className={styles.bottom}>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.SERIF_NOTE} tone={TypographyTone.INVERSE_MUTED} className={styles.slogan}>
          {formatMessage({ id: MOBILE_MENU_MESSAGES.slogan })}
        </Text>
        <Button
          ref={closeRef}
          variant={ButtonVariant.INVERSE}
          size={ButtonSize.S}
          icon={IconName.CLOSE}
          aria-label={formatMessage({ id: MOBILE_MENU_MESSAGES.closeLabel })}
          onClick={onClose}
        >
          {formatMessage({ id: MOBILE_MENU_MESSAGES.close })}
        </Button>
      </div>
    </Dialog>
  );
};
