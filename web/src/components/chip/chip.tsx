import type { MouseEventHandler } from 'react';
import styles from './chip.module.css';

export interface ChipProps {
  label: string;
  count?: number;
  selected?: boolean;
  role?: 'tab';
  controls?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// Botón de filtro o salto con contador («Panes 6»).
export const Chip = ({ label, count, selected = false, role, controls, onClick }: ChipProps) => (
  <button
    type="button"
    role={role}
    aria-selected={role ? selected : undefined}
    aria-controls={controls}
    className={[styles.chip, selected && styles.selected].filter(Boolean).join(' ')}
    onClick={onClick}
  >
    {label}
    {count !== undefined && ' '}
    {count !== undefined && <span className={styles.count}>{count}</span>}
  </button>
);
