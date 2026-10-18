import type { MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import { Icon, IconName } from '@components/icon';
import styles from './section-nav.module.css';
import {
  ARIA_CURRENT_LOCATION,
  NAV_ITEMS,
  SECTION_NAV_MESSAGES,
  SectionId,
  SectionNavVariant,
} from './section-nav.const';
import { getSectionHref } from './section-nav.helper';

export interface SectionNavProps {
  variant: SectionNavVariant;
  activeId?: SectionId;
  fromHome?: boolean;
  labelId?: string;
  onNavigate?: (id: SectionId, event: MouseEvent<HTMLAnchorElement>) => void;
}

export const SectionNav = ({
  variant,
  activeId,
  fromHome = true,
  labelId = SECTION_NAV_MESSAGES.label,
  onNavigate,
}: SectionNavProps) => {
  const { formatMessage } = useIntl();
  const isMenu = variant === SectionNavVariant.MENU;

  return (
    <nav aria-label={formatMessage({ id: labelId })} className={[styles.sectionNav, styles[variant]].join(' ')}>
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => {
          const current = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={getSectionHref(item.id, fromHome)}
                aria-current={current ? ARIA_CURRENT_LOCATION : undefined}
                className={[styles.link, current && styles.current].filter(Boolean).join(' ')}
                onClick={onNavigate ? (event) => onNavigate(item.id, event) : undefined}
              >
                {isMenu && (
                  <span aria-hidden="true" className={styles.number}>
                    {item.number}
                  </span>
                )}
                <span className={styles.label}>{formatMessage({ id: item.messageId })}</span>
                {isMenu && current && <span className={styles.here}>{formatMessage({ id: SECTION_NAV_MESSAGES.here })}</span>}
                {isMenu && <Icon name={IconName.ARROW_RIGHT} />}
                {variant === SectionNavVariant.HEADER && <span aria-hidden="true" className={styles.bar} />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
