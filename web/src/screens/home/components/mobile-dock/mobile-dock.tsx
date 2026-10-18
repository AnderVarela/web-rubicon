import type { Ref } from 'react';
import { useIntl } from 'react-intl';
import { Button, ButtonSize } from '@components/button';
import { IconName } from '@components/icon';
import { Logo } from '@components/logo';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { SectionId } from '@screens/components/section-nav';
import styles from './mobile-dock.module.css';
import { MOBILE_DOCK_MESSAGES } from './mobile-dock.const';
import { getNavItem } from './mobile-dock.helper';

export interface MobileDockProps {
  activeId: SectionId;
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef?: Ref<HTMLButtonElement & HTMLAnchorElement>;
}

// Barra inferior en móvil: inicio, sección actual y botón de menú.
export const MobileDock = ({ activeId, menuOpen, onOpenMenu, menuButtonRef }: MobileDockProps) => {
  const { formatMessage } = useIntl();
  const current = getNavItem(activeId);

  return (
    <nav aria-label={formatMessage({ id: MOBILE_DOCK_MESSAGES.label })} className={styles.mobileDock}>
      <a href={`#${SectionId.HOME}`} aria-label={formatMessage({ id: MOBILE_DOCK_MESSAGES.home })} className={styles.home}>
        <Logo className={styles.logo} />
      </a>
      <span aria-live="polite" className={styles.current}>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.EYEBROW} tone={TypographyTone.SECONDARY} tabular className={styles.number}>
          {current.number}
        </Text>
        <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.BODY_S}>
          {formatMessage({ id: current.messageId })}
        </Text>
      </span>
      <Button
        ref={menuButtonRef}
        size={ButtonSize.S}
        icon={IconName.MENU}
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
        onClick={onOpenMenu}
      >
        {formatMessage({ id: MOBILE_DOCK_MESSAGES.menu })}
      </Button>
    </nav>
  );
};
