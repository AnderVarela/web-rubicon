import { Icon, IconName, IconSize } from '@components/icon';
import { getExternalLinkProps } from '@components/button';
import styles from './action-tile.module.css';

export interface ActionTileProps {
  href: string;
  icon: IconName;
  label: string;
  external?: boolean;
}

// Acceso rápido con icono encima del texto, sobre fondo oscuro.
export const ActionTile = ({ href, icon, label, external }: ActionTileProps) => (
  <a href={href} className={styles.actionTile} {...getExternalLinkProps(external)}>
    <Icon name={icon} size={IconSize.L} />
    {label}
  </a>
);
