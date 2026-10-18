import { Icon, IconName, IconSize, IconTone } from '@components/icon';
import { Text, TypographyKinds, TypographyTone, TypographyVariant } from '@components/text';
import { getExternalLinkProps } from '@components/button';
import styles from './action-row.module.css';

export interface ActionRowProps {
  href: string;
  icon: IconName;
  title: string;
  subtitle: string;
  external?: boolean;
  iconTone?: IconTone;
  hoverSubtle?: boolean;
}

// Fila de acción grande: icono, título serif, subtítulo y flecha.
export const ActionRow = ({ href, icon, title, subtitle, external, iconTone, hoverSubtle }: ActionRowProps) => (
  <a
    href={href}
    className={[styles.actionRow, hoverSubtle ? styles.hoverSubtle : styles.hoverBase].join(' ')}
    {...getExternalLinkProps(external)}
  >
    <Icon name={icon} size={IconSize.XL} tone={iconTone} />
    <span className={styles.texts}>
      <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.TITLE_ACTION}>
        {title}
      </Text>{' '}
      <Text kind={TypographyKinds.SPAN} variant={TypographyVariant.CAPTION} tone={TypographyTone.SECONDARY} tabular>
        {subtitle}
      </Text>
    </span>
    <Icon name={external ? IconName.ARROW_UP_RIGHT : IconName.ARROW_RIGHT} />
  </a>
);
