import type { MouseEventHandler } from 'react';
import styles from './chip.module.css';

export interface ChipProps {
  label: string;
  count?: number;
  selected?: boolean;
  role?: 'tab';
  controls?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

// Filtro o salto con contador («Panes 6»). Con href es un enlace a un ancla.
export const Chip = ({ label, count, selected = false, role, controls, href, onClick }: ChipProps) => {
  const className = [styles.chip, selected && styles.selected].filter(Boolean).join(' ');
  const content = (
    <>
      {label}
      {count !== undefined && ' '}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      role={role}
      aria-selected={role ? selected : undefined}
      aria-controls={controls}
      className={className}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
